import { z } from 'zod'
import { storeLaravelToken } from '../../utils/laravel'
import { generateTokenPair } from '../../utils/jwt'
import { ok } from '../../utils/response'

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
  role: z.enum(['student', 'teacher']).optional(),
})

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const parsed = loginSchema.safeParse(body)

    if (!parsed.success) {
      throw createError({
        statusCode: 422,
        message: 'Validation failed',
        data: parsed.error.flatten(),
      })
    }

    const { email, password, role } = parsed.data
    const laravelPath = role === 'student' ? 'auth/student/login' : 'auth/teacher/login'
    const { laravelApiUrl } = useRuntimeConfig()

    const lr: any = await $fetch(`${laravelApiUrl}/api/${laravelPath}`, {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: { email, password },
    })

    const user = lr?.user
    if (!user || !lr?.token) {
      throw createError({ statusCode: 401, message: 'Invalid email or password' })
    }

    await storeLaravelToken(user.id, lr.token)

    let accessToken = lr.token
    try {
      const tokenPayload = { sub: user.id, email: user.email, role: user.role }
      const tokens = generateTokenPair(tokenPayload)
      accessToken = tokens.accessToken

      setCookie(event, 'obs_refresh', tokens.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60,
        path: '/',
      })
    } catch (e) {
      console.warn('[JWT] Could not generate local token pair, using Laravel token', e)
    }

    return ok({
      token: lr.token,
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        phone: user.phone ?? null,
        role: user.role,
        status: user.status ?? 'active',
        phone_verified: user.phone_verified ?? true,
        email_verified: user.email_verified ?? false,
        profile: {
          first_name: user.profile?.first_name ?? '',
          last_name: user.profile?.last_name ?? '',
          avatar_url: user.profile?.avatar_url ?? null,
        },
      },
    })
  } catch (err: any) {
    const status = err.response?.status ?? err.statusCode ?? 500
    const message = err.data?.message ?? err.message ?? 'Login failed'
    throw createError({
      statusCode: status,
      message,
      data: err.data,
    })
  }
})
