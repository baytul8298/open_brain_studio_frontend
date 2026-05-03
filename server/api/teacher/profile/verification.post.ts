import { prisma } from '../../../utils/prisma'
import { handleApiError } from '../../../utils/errors'

export default defineEventHandler(async (event) => {
  try {
    const user = event.context.user
    if (!user) throw createError({ statusCode: 401, message: 'Unauthorized' })

    const body = await readBody(event)

    const verification = await prisma.teacherVerification.create({
      data: {
        teacher_id: user.id,
        doc_type: body.doc_type || 'id_card',
        doc_url: body.doc_url || '#pending',
        status: 'pending',
      },
    })

    return { verification }
  } catch (err) {
    handleApiError(err)
  }
})
