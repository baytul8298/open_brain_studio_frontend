import { prisma } from '../../../../utils/prisma'
import { ok } from '../../../../utils/response'
import { handleApiError } from '../../../../utils/errors'

export default defineEventHandler(async (event) => {
  try {
    const user = event.context.user
    if (!user) {
      throw createError({ statusCode: 401, message: 'Unauthorized' })
    }

    const courseId = getRouterParam(event, 'id')
    if (!courseId) {
      throw createError({ statusCode: 400, message: 'Course ID required' })
    }

    const course = await prisma.course.findFirst({
      where: { id: courseId, deleted_at: null },
    })

    if (!course) {
      throw createError({ statusCode: 404, message: 'Course not found' })
    }

    const isOwner =
      course.teacher_id === user.id ||
      user.role === 'admin' ||
      user.role === 'super_admin'

    if (!isOwner) {
      // Check enrollment for students
      const enrollment = await prisma.enrollment.findUnique({
        where: {
          student_id_course_id: {
            student_id: user.id,
            course_id: courseId,
          },
        },
      })

      if (!enrollment || enrollment.status !== 'active') {
        throw createError({ statusCode: 403, message: 'You must be enrolled to view sections' })
      }
    }

    const sections = await prisma.section.findMany({
      where: { course_id: courseId },
      orderBy: { order_num: 'asc' },
      include: {
        lessons: {
          orderBy: { order_num: 'asc' },
        },
      },
    })

    return ok(sections)
  } catch (err) {
    handleApiError(err)
  }
})
