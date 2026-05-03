import { prisma } from '../../../../utils/prisma'
import { handleApiError } from '../../../../utils/errors'

export default defineEventHandler(async (event) => {
  try {
    const user = event.context.user
    if (!user) throw createError({ statusCode: 401, message: 'Unauthorized' })

    const id = Number(getRouterParam(event, 'id'))
    const body = await readBody(event)

    const existing = await prisma.teacherEducation.findFirst({ where: { id, teacher_id: user.id } })
    if (!existing) throw createError({ statusCode: 404, message: 'Education entry not found' })

    await prisma.teacherEducation.update({
      where: { id },
      data: {
        type: body.type ?? existing.type,
        title: body.title ?? existing.title,
        institution: body.institution ?? existing.institution,
        start_year: body.start_year !== undefined ? (body.start_year ? Number(body.start_year) : null) : existing.start_year,
        end_year: body.end_year !== undefined ? (body.end_year ? Number(body.end_year) : null) : existing.end_year,
      },
    })

    const educations = await prisma.teacherEducation.findMany({
      where: { teacher_id: user.id },
      orderBy: { id: 'desc' },
    })

    return { educations }
  } catch (err) {
    handleApiError(err)
  }
})
