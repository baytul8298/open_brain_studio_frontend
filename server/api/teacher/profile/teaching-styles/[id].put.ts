import { prisma } from '../../../../utils/prisma'
import { handleApiError } from '../../../../utils/errors'

export default defineEventHandler(async (event) => {
  try {
    const user = event.context.user
    if (!user) throw createError({ statusCode: 401, message: 'Unauthorized' })

    const id = Number(getRouterParam(event, 'id'))
    const body = await readBody(event)

    if (!body.name) throw createError({ statusCode: 422, message: 'The name field is required.' })
    if (!body.description) throw createError({ statusCode: 422, message: 'The description field is required.' })

    const existing = await prisma.teachingStyle.findFirst({ where: { id, teacher_id: user.id } })
    if (!existing) throw createError({ statusCode: 404, message: 'Teaching style not found' })

    const teaching_style = await prisma.teachingStyle.update({
      where: { id },
      data: {
        name: body.name,
        description: body.description,
        color: body.color || null,
      },
    })

    return { teaching_style }
  } catch (err) {
    handleApiError(err)
  }
})
