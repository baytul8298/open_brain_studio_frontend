import { prisma } from '../../utils/prisma'
import { verifyRefreshToken, generateTokenPair } from '../../utils/jwt'
import { ok } from '../../utils/response'
import { handleApiError } from '../../utils/errors'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event).catch(() => ({}))
    const cookieToken = getCookie(event, 'obs_refresh')
    const refreshToken = cookieToken ?? body?.refreshToken

    if (!refreshToken) {
      throw createError({ statusCode: 401, message: 'Refresh token required' })
    }

    const payload = verifyRefreshToken(refreshToken)

    const session = await prisma.session.findUnique({
      where: { refresh_token: refreshToken },
      include: { user: { include: { profile: true } } },
    })

    if (!session) {
      throw createError({ statusCode: 401, message: 'Session not found' })
    }

    if (session.is_revoked) {
      throw createError({ statusCode: 401, message: 'Session revoked' })
    }

    if (session.expires_at < new Date()) {
      throw createError({ statusCode: 401, message: 'Session expired' })
    }

    if (session.user.status === 'suspended') {
      throw createError({ statusCode: 403, message: 'Account suspended' })
    }

    const tokenPayload = { sub: payload.sub, email: payload.email, role: payload.role }
    const tokens = generateTokenPair(tokenPayload)

    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    await prisma.session.update({
      where: { id: session.id },
      data: {
        refresh_token: tokens.refreshToken,
        expires_at: expiresAt,
        is_revoked: false,
      },
    })

    setCookie(event, 'obs_refresh', tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60,
      path: '/',
    })

    return ok({ accessToken: tokens.accessToken })
  } catch (err) {
    handleApiError(err)
  }
})
