import { prisma } from '../../../utils/prisma'
import { created } from '../../../utils/response'
import { handleApiError } from '../../../utils/errors'

export default defineEventHandler(async (event) => {
  try {
    const user = event.context.user
    if (!user) {
      throw createError({ statusCode: 401, message: 'Unauthorized' })
    }

    if (user.role !== 'student') {
      throw createError({ statusCode: 403, message: 'Only students can enroll in courses' })
    }

    const courseId = getRouterParam(event, 'id')
    if (!courseId) {
      throw createError({ statusCode: 400, message: 'Course ID required' })
    }

    const course = await prisma.course.findFirst({
      where: { id: courseId, status: 'live', deleted_at: null },
    })

    if (!course) {
      throw createError({ statusCode: 404, message: 'Course not found' })
    }

    if (!course.is_free) {
      throw createError({
        statusCode: 402,
        message: 'This course requires payment. Please purchase before enrolling.',
      })
    }

    const existing = await prisma.enrollment.findUnique({
      where: {
        student_id_course_id: {
          student_id: user.id,
          course_id: courseId,
        },
      },
    })

    if (existing) {
      throw createError({ statusCode: 409, message: 'Already enrolled in this course' })
    }

    const enrollment = await prisma.$transaction(async (tx) => {
      const newEnrollment = await tx.enrollment.create({
        data: {
          student_id: user.id,
          course_id: courseId,
          status: 'active',
        },
      })

      await tx.course.update({
        where: { id: courseId },
        data: { enrolled_count: { increment: 1 } },
      })

      return newEnrollment
    })

    return created(enrollment)
  } catch (err) {
    handleApiError(err)
  }
})
