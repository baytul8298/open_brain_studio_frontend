import { z } from 'zod'
import { prisma } from '../../../../utils/prisma'
import { created } from '../../../../utils/response'
import { handleApiError } from '../../../../utils/errors'

const createLessonSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255),
  section_id: z.string().uuid().optional(),
  lesson_type: z.enum(['video', 'text', 'quiz', 'assignment', 'live']),
  content: z.string().optional(),
  duration_sec: z.number().int().positive().optional(),
  order_num: z.number().int().min(0).optional(),
  is_free_preview: z.boolean().default(false),
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
    const parsed = createLessonSchema.safeParse(body)

    if (!parsed.success) {
      throw createError({
        statusCode: 422,
        message: 'Validation failed',
        data: parsed.error.flatten(),
      })
    }

    const data = parsed.data

    let orderNum = data.order_num
    if (orderNum === undefined) {
      const lastLesson = await prisma.lesson.findFirst({
        where: {
          course_id: courseId,
          section_id: data.section_id ?? null,
        },
        orderBy: { order_num: 'desc' },
      })
      orderNum = lastLesson ? lastLesson.order_num + 1 : 0
    }

    const lesson = await prisma.$transaction(async (tx) => {
      const newLesson = await tx.lesson.create({
        data: {
          course_id: courseId,
          section_id: data.section_id,
          title: data.title,
          lesson_type: data.lesson_type,
          content: data.content,
          duration_sec: data.duration_sec,
          order_num: orderNum!,
          is_free_preview: data.is_free_preview,
        },
      })

      await tx.course.update({
        where: { id: courseId },
        data: { total_lessons: { increment: 1 } },
      })

      return newLesson
    })

    return created(lesson)
  } catch (err) {
    handleApiError(err)
  }
})
