import { z } from 'zod'
import { prisma } from '../../utils/prisma'
import { created } from '../../utils/response'
import { handleApiError } from '../../utils/errors'

const createCourseSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255),
  short_description: z.string().max(500).optional(),
  description: z.string().optional(),
  is_free: z.boolean().default(false),
  price: z.number().positive().optional(),
  grade_level: z.string().max(50).optional(),
  subject: z.string().max(100).optional(),
})

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function randomSuffix(): string {
  return Math.random().toString(36).slice(2, 7)
}

export default defineEventHandler(async (event) => {
  try {
    const user = event.context.user
    if (!user) {
      throw createError({ statusCode: 401, message: 'Unauthorized' })
    }

    if (user.role !== 'teacher' && user.role !== 'admin' && user.role !== 'super_admin') {
      throw createError({ statusCode: 403, message: 'Only teachers can create courses' })
    }

    const body = await readBody(event)
    const parsed = createCourseSchema.safeParse(body)

    if (!parsed.success) {
      throw createError({
        statusCode: 422,
        message: 'Validation failed',
        data: parsed.error.flatten(),
      })
    }

    const data = parsed.data

    const baseSlug = slugify(data.title)
    const slug = `${baseSlug}-${randomSuffix()}`

    const course = await prisma.course.create({
      data: {
        teacher_id: user.id,
        title: data.title,
        slug,
        short_description: data.short_description,
        description: data.description,
        is_free: data.is_free,
        price: data.price ? data.price : null,
        grade_level: data.grade_level,
        subject: data.subject,
        status: 'draft',
      },
    })

    return created(course)
  } catch (err) {
    handleApiError(err)
  }
})
