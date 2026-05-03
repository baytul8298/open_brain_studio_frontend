import { prisma } from '../../utils/prisma'
import { noContent } from '../../utils/response'
import { handleApiError } from '../../utils/errors'

export default defineEventHandler(async (event) => {
  try {
    const user = event.context.user
    if (!user) {
      throw createError({ statusCode: 401, message: 'Unauthorized' })
    }

    const id = getRouterParam(event, 'id')
    if (!id) {
      throw createError({ statusCode: 400, message: 'Course ID required' })
    }

    const course = await prisma.course.findFirst({
      where: { id, deleted_at: null },
    })

    if (!course) {
      throw createError({ statusCode: 404, message: 'Course not found' })
    }

    if (
      course.teacher_id !== user.id &&
      user.role !== 'admin' &&
      user.role !== 'super_admin'
    ) {
      throw createError({ statusCode: 403, message: 'Forbidden' })
    }

    await prisma.course.update({
      where: { id },
      data: { deleted_at: new Date() },
    })

    return noContent()
  } catch (err) {
    handleApiError(err)
  }
})
