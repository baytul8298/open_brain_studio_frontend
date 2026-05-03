import { prisma } from '../../../utils/prisma'
import { handleApiError } from '../../../utils/errors'

export default defineEventHandler(async (event) => {
  try {
    const user = event.context.user
    if (!user) throw createError({ statusCode: 401, message: 'Unauthorized' })

    const body = await readBody(event)
    const session_types: string[] = Array.isArray(body.session_types) ? body.session_types : []

    await prisma.teacherProfile.upsert({
      where: { id: user.id },
      create: { id: user.id, session_types },
      update: { session_types },
    })

    return { session_types }
  } catch (err) {
    handleApiError(err)
  }
})
