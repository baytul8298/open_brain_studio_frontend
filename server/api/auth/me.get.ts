import { requireToken, laravelFetch } from '../../utils/laravel'
import { ok } from '../../utils/response'
import { handleApiError } from '../../utils/errors'

export default defineEventHandler(async (event) => {
  try {
    const ctxUser = event.context.user
    if (!ctxUser) {
      throw createError({ statusCode: 401, message: 'Unauthorized' })
    }

    const token = await requireToken(ctxUser.id)
    const user: any = await laravelFetch(token, 'auth/me')

    if (!user) {
      throw createError({ statusCode: 404, message: 'User not found' })
    }

    return ok({
      id: user.id,
      email: user.email,
      phone: user.phone ?? null,
      role: user.role,
      status: user.status ?? 'active',
      phone_verified: user.phone_verified ?? true,
      email_verified: user.email_verified ?? false,
      profile: user.profile ?? null,
    })
  } catch (err) {
    handleApiError(err)
  }
})
