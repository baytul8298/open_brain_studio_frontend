import { z } from 'zod'
import { prisma } from '../../utils/prisma'
import { comparePassword } from '../../utils/password'
import { generateTokenPair } from '../../utils/jwt'
import { ok } from '../../utils/response'

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
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

    const { email, password } = parsed.data

    const user = await prisma.user.findUnique({
      where: { email },
      include: { profile: true },
    })

    if (!user) {
      throw createError({ statusCode: 401, message: 'Invalid email or password' })
    }

    const valid = await comparePassword(password, user.password_hash)
    if (!valid) {
      throw createError({ statusCode: 401, message: 'Invalid email or password' })
    }

    if (user.status === 'suspended') {
      throw createError({ statusCode: 403, message: 'Your account has been suspended' })
    }

    const tokenPayload = { sub: user.id, email: user.email, role: user.role }
    const tokens = generateTokenPair(tokenPayload)

    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    const ip = getRequestHeader(event, 'x-forwarded-for') ?? getRequestIP(event) ?? null
    const ua = getRequestHeader(event, 'user-agent') ?? null

    await prisma.session.upsert({
      where: { refresh_token: tokens.refreshToken },
      update: {
        refresh_token: tokens.refreshToken,
        is_revoked: false,
        expires_at: expiresAt,
        ip_address: ip,
        device_info: ua ? { user_agent: ua } : undefined,
      },
      create: {
        user_id: user.id,
        refresh_token: tokens.refreshToken,
        expires_at: expiresAt,
        ip_address: ip,
        device_info: ua ? { user_agent: ua } : undefined,
      },
    })

    await prisma.user.update({
      where: { id: user.id },
      data: { last_login_at: new Date(), last_login_ip: ip },
    })

    setCookie(event, 'obs_refresh', tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60,
      path: '/',
    })

    return ok({
      accessToken: tokens.accessToken,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        profile: {
          first_name: user.profile?.first_name ?? '',
          last_name: user.profile?.last_name ?? '',
          avatar_url: user.profile?.avatar_url ?? null,
        },
      },
    })
  } catch (err) {
    throw err
  }
})
