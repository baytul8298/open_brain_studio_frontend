import { prisma } from '../../../utils/prisma'
import { handleApiError } from '../../../utils/errors'

const DAY_MAP: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }
const DAY_NAMES: Record<number, string> = { 0: 'Sun', 1: 'Mon', 2: 'Tue', 3: 'Wed', 4: 'Thu', 5: 'Fri', 6: 'Sat' }

function parseTime(timeStr: string): Date {
  const parts = timeStr.trim().split(' ')
  const period = parts[1]?.toUpperCase()
  const [hStr, mStr] = (parts[0] || '0:00').split(':')
  let h = parseInt(hStr, 10)
  const m = parseInt(mStr || '0', 10)
  if (period === 'PM' && h !== 12) h += 12
  if (period === 'AM' && h === 12) h = 0
  return new Date(`1970-01-01T${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:00Z`)
}

function formatTime(t: Date | string): string {
  let h: number, m: number
  if (t instanceof Date) {
    h = t.getUTCHours(); m = t.getUTCMinutes()
  } else {
    const [hStr, mStr] = t.split(':')
    h = parseInt(hStr, 10); m = parseInt(mStr, 10)
  }
  const period = h >= 12 ? 'PM' : 'AM'
  const h12 = h > 12 ? h - 12 : h === 0 ? 12 : h
  return `${h12}:${m.toString().padStart(2, '0')} ${period}`
}

export default defineEventHandler(async (event) => {
  try {
    const user = event.context.user
    if (!user) throw createError({ statusCode: 401, message: 'Unauthorized' })

    const body = await readBody(event)
    const availability: { day: string; slots: string[] }[] = Array.isArray(body.availability) ? body.availability : []

    // Expand { day, slots[] } → individual rows { teacher_id, day_of_week, time_slot }
    const rows: { teacher_id: string; day_of_week: number; time_slot: Date }[] = []
    for (const a of availability) {
      const dow = DAY_MAP[a.day]
      if (dow === undefined) continue
      for (const slot of (a.slots ?? [])) {
        rows.push({ teacher_id: user.id, day_of_week: dow, time_slot: parseTime(slot) })
      }
    }

    await prisma.$transaction(async (tx) => {
      await tx.teacherAvailability.deleteMany({ where: { teacher_id: user.id } })
      if (rows.length > 0) {
        await tx.teacherAvailability.createMany({ data: rows, skipDuplicates: true })
      }
    })

    const saved = await prisma.teacherAvailability.findMany({
      where: { teacher_id: user.id },
      orderBy: [{ day_of_week: 'asc' }, { time_slot: 'asc' }],
    })

    // Return in grouped { day, slots[] } format for the frontend grid
    const availMap: Record<string, string[]> = {}
    saved.forEach(row => {
      const dayName = DAY_NAMES[row.day_of_week] ?? String(row.day_of_week)
      if (!availMap[dayName]) availMap[dayName] = []
      availMap[dayName].push(formatTime(row.time_slot))
    })
    const grouped = Object.entries(availMap).map(([day, slots]) => ({ day, slots }))

    return { availability: grouped }
  } catch (err) {
    handleApiError(err)
  }
})
