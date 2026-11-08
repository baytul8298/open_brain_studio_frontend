export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { laravelApiUrl } = useRuntimeConfig()
    const role = body.role || 'teacher'

    const laravelEndpoint = role === 'teacher'
      ? `${laravelApiUrl}/api/auth/teacher/register`
      : `${laravelApiUrl}/api/auth/student/register`

    const payload = role === 'teacher'
      ? {
          full_name: body.full_name || `${body.first_name || ''} ${body.last_name || ''}`.trim(),
          email: body.email,
          phone: body.phone,
          password: body.password,
        }
      : {
          first_name: body.first_name || body.full_name?.split(' ')[0] || '',
          last_name: body.last_name || body.full_name?.split(' ').slice(1).join(' ') || '',
          email: body.email,
          phone: body.phone,
          password: body.password,
        }

    const res = await $fetch<any>(laravelEndpoint, {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: payload,
    })

    return res
  } catch (err: any) {
    const status = err.response?.status ?? err.statusCode ?? 500
    const message = err.data?.message ?? err.message ?? 'Registration failed'
    throw createError({
      statusCode: status,
      message,
      data: err.data,
    })
  }
})
