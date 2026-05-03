import { prisma } from '../../../utils/prisma'
import { handleApiError } from '../../../utils/errors'

export default defineEventHandler(async (event) => {
  try {
    const user = event.context.user
    if (!user) throw createError({ statusCode: 401, message: 'Unauthorized' })

    const body = await readBody(event)
    if (!body.name || !body.description) {
      throw createError({ statusCode: 422, message: 'Name and description are required' })
    }

    const teaching_style = await prisma.teachingStyle.create({
      data: {
        teacher_id: user.id,
        name: body.name,
        description: body.description,
        color: body.color || null,
      },
    })

    const teaching_styles = await prisma.teachingStyle.findMany({
      where: { teacher_id: user.id },
      orderBy: { id: 'asc' },
    })

    return { teaching_style, teaching_styles }
  } catch (err) {
    handleApiError(err)
  }
})
