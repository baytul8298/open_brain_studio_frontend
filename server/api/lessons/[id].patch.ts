import { z } from 'zod'
import { prisma } from '../../utils/prisma'
import { ok } from '../../utils/response'
import { handleApiError } from '../../utils/errors'

const updateLessonSchema = z.object({
  title: z.string().min(1).max(255).optional(),
  lesson_type: z.enum(['video', 'text', 'quiz', 'assignment', 'live']).optional(),
  content: z.string().optional(),
  duration_sec: z.number().int().positive().nullable().optional(),
  order_num: z.number().int().min(0).optional(),
  is_free_preview: z.boolean().optional(),
  section_id: z.string().uuid().nullable().optional(),
  video_id: z.string().uuid().nullable().optional(),
})

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
        course: { select: { teacher_id: true, deleted_at: true } },
      },
    })

    if (!lesson || lesson.course.deleted_at !== null) {
      throw createError({ statusCode: 404, message: 'Lesson not found' })
    }

    if (
      lesson.course.teacher_id !== user.id &&
      user.role !== 'admin' &&
      user.role !== 'super_admin'
    ) {
      throw createError({ statusCode: 403, message: 'Forbidden' })
    }

    const body = await readBody(event)
    const parsed = updateLessonSchema.safeParse(body)

    if (!parsed.success) {
      throw createError({
        statusCode: 422,
        message: 'Validation failed',
        data: parsed.error.flatten(),
      })
    }

    const updated = await prisma.lesson.update({
      where: { id: lessonId },
      data: parsed.data,
    })

    return ok(updated)
  } catch (err) {
    handleApiError(err)
  }
})
