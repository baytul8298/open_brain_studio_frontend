import { z } from 'zod'
import { prisma } from '../../utils/prisma'
import { ok } from '../../utils/response'
import { handleApiError } from '../../utils/errors'

const updateCourseSchema = z.object({
  title: z.string().min(1).max(255).optional(),
  description: z.string().optional(),
  short_description: z.string().max(500).optional(),
  status: z.enum(['draft', 'pending_review', 'live', 'archived']).optional(),
  is_free: z.boolean().optional(),
  price: z.number().positive().nullable().optional(),
  grade_level: z.string().max(50).nullable().optional(),
  subject: z.string().max(100).nullable().optional(),
  thumbnail_url: z.string().url().nullable().optional(),
})

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

    const body = await readBody(event)
    const parsed = updateCourseSchema.safeParse(body)

    if (!parsed.success) {
      throw createError({
        statusCode: 422,
        message: 'Validation failed',
        data: parsed.error.flatten(),
      })
    }

    const updated = await prisma.course.update({
      where: { id },
      data: parsed.data,
    })

    return ok(updated)
  } catch (err) {
    handleApiError(err)
  }
})
