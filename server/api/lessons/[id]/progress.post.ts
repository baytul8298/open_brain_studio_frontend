import { z } from 'zod'
import { prisma } from '../../../utils/prisma'
import { ok } from '../../../utils/response'
import { handleApiError } from '../../../utils/errors'

const progressSchema = z.object({
  last_position_sec: z.number().int().min(0),
  watch_seconds: z.number().int().min(0),
  completed: z.boolean().optional(),
})

export default defineEventHandler(async (event) => {
  try {
    const user = event.context.user
    if (!user) {
      throw createError({ statusCode: 401, message: 'Unauthorized' })
    }

    if (user.role !== 'student') {
      throw createError({ statusCode: 403, message: 'Only students can track progress' })
    }

    const lessonId = getRouterParam(event, 'id')
    if (!lessonId) {
      throw createError({ statusCode: 400, message: 'Lesson ID required' })
    }

    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
      select: { id: true, course_id: true },
    })

    if (!lesson) {
      throw createError({ statusCode: 404, message: 'Lesson not found' })
    }

    // Verify enrollment
    const enrollment = await prisma.enrollment.findUnique({
      where: {
        student_id_course_id: {
          student_id: user.id,
          course_id: lesson.course_id,
        },
      },
    })

    if (!enrollment || enrollment.status !== 'active') {
      throw createError({ statusCode: 403, message: 'Not enrolled in this course' })
    }

    const body = await readBody(event)
    const parsed = progressSchema.safeParse(body)

    if (!parsed.success) {
      throw createError({
        statusCode: 422,
        message: 'Validation failed',
        data: parsed.error.flatten(),
      })
    }

    const { last_position_sec, watch_seconds, completed } = parsed.data

    // Check previous progress
    const existing = await prisma.lessonProgress.findUnique({
      where: {
        student_id_lesson_id: {
          student_id: user.id,
          lesson_id: lessonId,
        },
      },
    })

    const wasCompleted = existing?.completed ?? false
    const nowCompleted = completed ?? existing?.completed ?? false

    const progress = await prisma.lessonProgress.upsert({
      where: {
        student_id_lesson_id: {
          student_id: user.id,
          lesson_id: lessonId,
        },
      },
      update: {
        last_position_sec,
        watch_seconds: { increment: watch_seconds },
        completed: nowCompleted,
        completed_at: nowCompleted && !wasCompleted ? new Date() : existing?.completed_at,
      },
      create: {
        student_id: user.id,
        lesson_id: lessonId,
        last_position_sec,
        watch_seconds,
        completed: nowCompleted,
        completed_at: nowCompleted ? new Date() : null,
      },
    })

    // Update enrollment progress if newly completed
    if (nowCompleted && !wasCompleted) {
      const [totalLessons, completedLessons] = await Promise.all([
        prisma.lesson.count({ where: { course_id: lesson.course_id } }),
        prisma.lessonProgress.count({
          where: {
            student_id: user.id,
            completed: true,
            lesson: { course_id: lesson.course_id },
          },
        }),
      ])

      const progress_pct =
        totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0

      await prisma.enrollment.update({
        where: {
          student_id_course_id: {
            student_id: user.id,
            course_id: lesson.course_id,
          },
        },
        data: { progress_pct },
      })
    }

    return ok(progress)
  } catch (err) {
    handleApiError(err)
  }
})
