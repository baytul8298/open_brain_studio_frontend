import { prisma } from '../../utils/prisma'
import { ok } from '../../utils/response'
import { handleApiError } from '../../utils/errors'

export default defineEventHandler(async (event) => {
  try {
    const user = event.context.user
    if (!user) {
      throw createError({ statusCode: 401, message: 'Unauthorized' })
    }

    const lessonId = getRouterParam(event, 'id')
    if (!lessonId) {
      throw createError({ statusCode: 400, message: 'Lesson ID required' })
    }

    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
      include: {
        resources: {
          include: { media: true },
        },
        video: true,
        course: {
          select: { id: true, teacher_id: true, status: true, deleted_at: true },
        },
      },
    })

    if (!lesson || lesson.course.deleted_at !== null) {
      throw createError({ statusCode: 404, message: 'Lesson not found' })
    }

    const isOwner =
      lesson.course.teacher_id === user.id ||
      user.role === 'admin' ||
      user.role === 'super_admin'

    if (isOwner) {
      return ok(lesson)
    }

    // Free preview lessons accessible to all authenticated users
    if (lesson.is_free_preview) {
      return ok(lesson)
    }

    // Otherwise must be enrolled student
    const enrollment = await prisma.enrollment.findUnique({
      where: {
        student_id_course_id: {
          student_id: user.id,
          course_id: lesson.course_id,
        },
      },
    })

    if (!enrollment || enrollment.status !== 'active') {
      throw createError({ statusCode: 403, message: 'You must be enrolled to access this lesson' })
    }

    return ok(lesson)
  } catch (err) {
    handleApiError(err)
  }
})
