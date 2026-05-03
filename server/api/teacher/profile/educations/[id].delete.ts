import { prisma } from '../../../../utils/prisma'
import { handleApiError } from '../../../../utils/errors'

export default defineEventHandler(async (event) => {
  try {
    const user = event.context.user
    if (!user) throw createError({ statusCode: 401, message: 'Unauthorized' })

    const id = Number(getRouterParam(event, 'id'))

    const existing = await prisma.teacherEducation.findFirst({ where: { id, teacher_id: user.id } })
    if (!existing) throw createError({ statusCode: 404, message: 'Education entry not found' })

    await prisma.teacherEducation.delete({ where: { id } })

    return { success: true }
  } catch (err) {
    handleApiError(err)
  }
})
