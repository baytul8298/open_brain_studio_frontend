import { z } from 'zod'
import { prisma } from '../../../../utils/prisma'
import { created } from '../../../../utils/response'
import { handleApiError } from '../../../../utils/errors'

const createSectionSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255),
  order_num: z.number().int().min(0).optional(),
})

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

    if (
      course.teacher_id !== user.id &&
      user.role !== 'admin' &&
      user.role !== 'super_admin'
    ) {
      throw createError({ statusCode: 403, message: 'Forbidden' })
    }

    const body = await readBody(event)
    const parsed = createSectionSchema.safeParse(body)

    if (!parsed.success) {
      throw createError({
        statusCode: 422,
        message: 'Validation failed',
        data: parsed.error.flatten(),
      })
    }

    let orderNum = parsed.data.order_num
    if (orderNum === undefined) {
      const lastSection = await prisma.section.findFirst({
        where: { course_id: courseId },
        orderBy: { order_num: 'desc' },
      })
      orderNum = lastSection ? lastSection.order_num + 1 : 0
    }

    const section = await prisma.section.create({
      data: {
        course_id: courseId,
        title: parsed.data.title,
        order_num: orderNum,
      },
    })

    return created(section)
  } catch (err) {
    handleApiError(err)
  }
})
