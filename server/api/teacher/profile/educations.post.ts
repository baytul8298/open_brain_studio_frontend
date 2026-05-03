import { prisma } from '../../../utils/prisma'
import { handleApiError } from '../../../utils/errors'

export default defineEventHandler(async (event) => {
  try {
    const user = event.context.user
    if (!user) throw createError({ statusCode: 401, message: 'Unauthorized' })

    const body = await readBody(event)
    if (!body.title || !body.institution) {
      throw createError({ statusCode: 422, message: 'Title and institution are required' })
    }

    await prisma.teacherEducation.create({
      data: {
        teacher_id: user.id,
        type: body.type || 'degree',
        title: body.title,
        institution: body.institution,
        start_year: body.start_year ? Number(body.start_year) : null,
        end_year: body.end_year ? Number(body.end_year) : null,
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
