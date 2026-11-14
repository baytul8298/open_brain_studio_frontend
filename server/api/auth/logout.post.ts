import { getLaravelToken, deleteLaravelToken, laravelFetch } from '../../utils/laravel'
import { noContent } from '../../utils/response'
import { handleApiError } from '../../utils/errors'

export default defineEventHandler(async (event) => {
  try {
    const user = event.context.user
    if (user?.id) {
      const token = user.id.includes('|') ? user.id : await getLaravelToken(user.id)
      if (token) {
        try {
          await laravelFetch(token, 'auth/logout', { method: 'POST' })
        } catch {
          // Ignore if token is already revoked on Laravel side
        }
      }
      await deleteLaravelToken(user.id)
    }

    deleteCookie(event, 'obs_refresh', { path: '/' })

    return noContent()
  } catch (err) {
    handleApiError(err)
  }
})
