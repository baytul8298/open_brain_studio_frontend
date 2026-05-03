import { prisma } from '../../../../utils/prisma'
import { ok } from '../../../../utils/response'
import { handleApiError } from '../../../../utils/errors'

export default defineEventHandler(async (event) => {
  try {
    const user = event.context.user
    if (!user) {
      throw createError({ statusCode: 401, message: 'Unauthorized' })
    }

    const notificationId = getRouterParam(event, 'id')
    if (!notificationId) {
      throw createError({ statusCode: 400, message: 'Notification ID required' })
    }

    const notification = await prisma.notification.findUnique({
      where: { id: notificationId },
    })

    if (!notification) {
      throw createError({ statusCode: 404, message: 'Notification not found' })
    }

    if (notification.user_id !== user.id) {
      throw createError({ statusCode: 403, message: 'Forbidden' })
    }

    const updated = await prisma.notification.update({
      where: { id: notificationId },
      data: {
        is_read: true,
        read_at: new Date(),
      },
    })

    return ok(updated)
  } catch (err) {
    handleApiError(err)
  }
})
