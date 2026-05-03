import { prisma } from '../../../utils/prisma'
import { handleApiError } from '../../../utils/errors'

export default defineEventHandler(async (event) => {
  try {
    const user = event.context.user
    if (!user) throw createError({ statusCode: 401, message: 'Unauthorized' })

    const body = await readBody(event)

    // Upsert: teacher has at most one active experience entry
    const existing = await prisma.teacherExperience.findFirst({ where: { teacher_id: user.id } })

    if (existing) {
      await prisma.teacherExperience.update({
        where: { id: existing.id },
        data: {
          role: body.role ?? existing.role,
          started_month: body.started_month ? Number(body.started_month) : existing.started_month,
          started_year: body.started_year ? Number(body.started_year) : existing.started_year,
          description: body.description ?? existing.description,
          expertise: Array.isArray(body.expertise) ? body.expertise : existing.expertise,
        },
      })
    } else {
      await prisma.teacherExperience.create({
        data: {
          teacher_id: user.id,
          role: body.role || 'teacher',
          started_month: body.started_month ? Number(body.started_month) : null,
          started_year: body.started_year ? Number(body.started_year) : null,
          description: body.description || null,
          expertise: Array.isArray(body.expertise) ? body.expertise : [],
        },
      })
    }

    const experience = await prisma.teacherExperience.findMany({
      where: { teacher_id: user.id },
      orderBy: { id: 'desc' },
    })

    return { experience }
  } catch (err) {
    handleApiError(err)
  }
})
