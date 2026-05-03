import { prisma } from '../../utils/prisma'
import { ok } from '../../utils/response'
import { handleApiError } from '../../utils/errors'

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')
    if (!id) {
      throw createError({ statusCode: 400, message: 'Course ID required' })
    }

    const ctxUser = event.context.user

    const course = await prisma.course.findFirst({
      where: { id, deleted_at: null },
      include: {
        teacher: {
          include: {
            profile: {
              select: { first_name: true, last_name: true, avatar_url: true, bio: true },
            },
          },
        },
        sections: {
          orderBy: { order_num: 'asc' },
          include: {
            lessons: {
              orderBy: { order_num: 'asc' },
              select: {
                id: true,
                title: true,
                lesson_type: true,
                duration_sec: true,
                order_num: true,
                is_free_preview: true,
              },
            },
          },
        },
        _count: {
          select: { enrollments: true, reviews: true },
        },
      },
    })

    if (!course) {
      throw createError({ statusCode: 404, message: 'Course not found' })
    }

    // Draft courses: only accessible to the teacher owner or admin
    if (course.status !== 'live') {
      if (!ctxUser) {
        throw createError({ statusCode: 401, message: 'Unauthorized' })
      }
      if (
        ctxUser.id !== course.teacher_id &&
        ctxUser.role !== 'admin' &&
        ctxUser.role !== 'super_admin'
      ) {
        throw createError({ statusCode: 403, message: 'Forbidden' })
      }
    }

    return ok(course)
  } catch (err) {
    handleApiError(err)
  }
})
