import { prisma } from '../../utils/prisma'
import { noContent } from '../../utils/response'
import { handleApiError } from '../../utils/errors'

export default defineEventHandler(async (event) => {
  try {
    const user = event.context.user
    if (!user) {
      throw createError({ statusCode: 401, message: 'Unauthorized' })
    }

    const refreshToken = getCookie(event, 'obs_refresh')

    if (refreshToken) {
      await prisma.session.updateMany({
        where: {
          user_id: user.id,
          refresh_token: refreshToken,
          is_revoked: false,
        },
        data: { is_revoked: true },
      })
    } else {
      // Revoke all sessions for user if no specific token
      await prisma.session.updateMany({
        where: { user_id: user.id, is_revoked: false },
        data: { is_revoked: true },
      })
    }

    deleteCookie(event, 'obs_refresh', { path: '/' })

    return noContent()
  } catch (err) {
    handleApiError(err)
  }
})
