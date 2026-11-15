import { requireToken, laravelFetch } from '../../utils/laravel'
import { handleApiError } from '../../utils/errors'

export default defineEventHandler(async (event) => {
  try {
    const authHeader = getRequestHeader(event, 'authorization')
    const rawToken = authHeader?.startsWith('Bearer ') ? authHeader.slice(7).trim() : null

    let token: string | null = null
    if (rawToken && rawToken.includes('|')) {
      token = rawToken
    } else if (event.context.user?.id) {
      token = await requireToken(event.context.user.id)
    } else if (rawToken) {
      token = rawToken
    }

    if (!token) {
      throw createError({ statusCode: 401, message: 'Unauthorized' })
    }

    return await laravelFetch(token, 'auth/nav-menus')
  } catch (err) {
    handleApiError(err)
  }
})
