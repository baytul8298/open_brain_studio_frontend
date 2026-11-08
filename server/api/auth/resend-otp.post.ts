export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { laravelApiUrl } = useRuntimeConfig()

    const res = await $fetch<any>(`${laravelApiUrl}/api/auth/resend-otp`, {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: {
        phone: body.phone,
      },
    })

    return res
  } catch (err: any) {
    const status = err.response?.status ?? err.statusCode ?? 500
    const message = err.data?.message ?? err.message ?? 'Failed to resend OTP'
    throw createError({
      statusCode: status,
      message,
      data: err.data,
    })
  }
})
