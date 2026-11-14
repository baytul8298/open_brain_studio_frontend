import { redis } from './redis'

const TOKEN_KEY = (id: string) => `laravel:token:${id}`

// In-memory fallback for when Redis is unavailable (dev / HMR restarts)
declare global { var __laravelTokens: Map<string, string> | undefined }
if (!globalThis.__laravelTokens) globalThis.__laravelTokens = new Map()
const memStore = globalThis.__laravelTokens!

// ── Token storage ──────────────────────────────────────────────
export async function storeLaravelToken(userId: string, token: string) {
  memStore.set(TOKEN_KEY(userId), token)
  try { await redis.set(TOKEN_KEY(userId), token, 'EX', 7 * 24 * 60 * 60) } catch { /* Redis unavailable */ }
}

export async function getLaravelToken(userId: string) {
  try {
    const val = await redis.get(TOKEN_KEY(userId))
    if (val) return val
  } catch { /* Redis unavailable — fall through to memStore */ }
  return memStore.get(TOKEN_KEY(userId)) ?? null
}

export async function deleteLaravelToken(userId: string) {
  memStore.delete(TOKEN_KEY(userId))
  try { await redis.del(TOKEN_KEY(userId)) } catch { /* Redis unavailable */ }
}

export async function requireToken(userId: string): Promise<string> {
  if (userId && userId.includes('|')) return userId
  const token = await getLaravelToken(userId)
  if (!token) throw createError({ statusCode: 401, message: 'Session expired. Please log in again.' })
  return token
}

// ── HTTP proxy helper ──────────────────────────────────────────
export async function laravelFetch<T = any>(
  token: string,
  path: string,
  opts: { method?: string; body?: Record<string, any> } = {},
): Promise<T> {
  const { laravelApiUrl } = useRuntimeConfig()
  try {
    return await $fetch<T>(`${laravelApiUrl}/api/${path}`, {
      method: (opts.method ?? 'GET') as any,
      headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
      body: opts.body,
    })
  } catch (err: any) {
    throw createError({
      statusCode: err.response?.status ?? err.statusCode ?? 500,
      message: err.data?.message ?? err.message ?? 'Laravel API error',
    })
  }
}

// ── Experience field mapping ───────────────────────────────────
// DB columns: role_type, start_month, start_year, expertise_tags
// Frontend expects: role, started_month, started_year, expertise
export function mapExpToLaravel(body: any) {
  return {
    role_type:     body.role,
    start_month:   body.started_month || null,
    start_year:    body.started_year  || null,
    description:   body.description,
    expertise_tags: Array.isArray(body.expertise) ? body.expertise : [],
  }
}

export function mapExpToFrontend(exp: any) {
  if (!exp) return null
  return {
    ...exp,
    role:          exp.role_type      ?? exp.role,
    started_month: exp.start_month    ?? exp.started_month,
    started_year:  exp.start_year     ?? exp.started_year,
    expertise:     exp.expertise_tags ?? exp.expertise ?? [],
  }
}

// ── Availability: raw rows → grouped { day, slots[] } ─────────
// Laravel dayMap: Sat=0, Sun=1, Mon=2, Tue=3, Wed=4, Thu=5, Fri=6
const DOW: Record<number, string> = { 0: 'Sat', 1: 'Sun', 2: 'Mon', 3: 'Tue', 4: 'Wed', 5: 'Thu', 6: 'Fri' }

function fmtSlot(slot: string): string {
  const [hStr, mStr] = slot.split(':')
  const h = parseInt(hStr, 10), m = parseInt(mStr, 10)
  const period = h >= 12 ? 'PM' : 'AM'
  const h12 = h > 12 ? h - 12 : h === 0 ? 12 : h
  return `${h12}:${m.toString().padStart(2, '0')} ${period}`
}

export function groupAvailability(rows: Array<{ day_of_week: number; time_slot: string }>) {
  const map: Record<string, string[]> = {}
  for (const r of rows) {
    const day = DOW[r.day_of_week] ?? String(r.day_of_week)
    if (!map[day]) map[day] = []
    map[day].push(fmtSlot(r.time_slot))
  }
  return Object.entries(map).map(([day, slots]) => ({ day, slots }))
}
