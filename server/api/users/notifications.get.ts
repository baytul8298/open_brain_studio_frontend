import { prisma } from '../../utils/prisma'
import { parsePaginationParams, buildCursorMeta } from '../../utils/paginate'
import { ok } from '../../utils/response'
import { handleApiError } from '../../utils/errors'

export default defineEventHandler(async (event) => {
  try {
    const user = event.context.user
    if (!user) {
      throw createError({ statusCode: 401, message: 'Unauthorized' })
    }

    const { skip, take, cursor } = parsePaginationParams(event)
    const query = getQuery(event)
    const unreadOnly = query.unread_only === 'true' || query.unread_only === '1'

    const where: Record<string, unknown> = { user_id: user.id }
    if (unreadOnly) where.is_read = false

    const cursorClause = cursor ? { cursor: { id: cursor }, skip: 1 } : {}

    const notifications = await prisma.notification.findMany({
      where,
      orderBy: { sent_at: 'desc' },
      take,
      skip: cursor ? undefined : skip,
      ...cursorClause,
    })

    const meta = buildCursorMeta(notifications, take, cursor)

    return ok(notifications, meta as Record<string, unknown>)
  } catch (err) {
    handleApiError(err)
  }
})
