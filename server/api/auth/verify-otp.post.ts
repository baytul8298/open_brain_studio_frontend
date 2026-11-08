import { storeLaravelToken } from '../../utils/laravel'
import { generateTokenPair } from '../../utils/jwt'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { laravelApiUrl } = useRuntimeConfig()

    const res = await $fetch<any>(`${laravelApiUrl}/api/auth/verify-otp`, {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: {
        phone: body.phone,
        otp: body.otp,
      },
    })

    if (res?.token && res?.user?.id) {
      await storeLaravelToken(res.user.id, res.token)
    }

    let accessToken = res?.token
    if (res?.user) {
      try {
        const tokenPayload = { sub: res.user.id, email: res.user.email, role: res.user.role }
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
    }

    return {
      success: true,
      token: res.token,
      accessToken,
      user: res.user,
    }
  } catch (err: any) {
    const status = err.response?.status ?? err.statusCode ?? 500
    const message = err.data?.message ?? err.message ?? 'OTP verification failed'
    throw createError({
      statusCode: status,
      message,
      data: err.data,
    })
  }
})
