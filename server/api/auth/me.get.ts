import { prisma } from '../../utils/prisma'
import { ok } from '../../utils/response'
import { handleApiError } from '../../utils/errors'

export default defineEventHandler(async (event) => {
  try {
    const ctxUser = event.context.user
    if (!ctxUser) {
      throw createError({ statusCode: 401, message: 'Unauthorized' })
    }

    const user = await prisma.user.findUnique({
      where: { id: ctxUser.id },
      include: {
        profile: true,
        student_profile: ctxUser.role === 'student',
        teacher_profile: ctxUser.role === 'teacher',
      },
    })

    if (!user) {
      throw createError({ statusCode: 404, message: 'User not found' })
    }

    return ok({
      id: user.id,
      email: user.email,
      role: user.role,
      status: user.status,
      email_verified: user.email_verified,
      created_at: user.created_at,
      profile: user.profile,
      student_profile: user.student_profile,
      teacher_profile: user.teacher_profile,
    })
  } catch (err) {
    handleApiError(err)
  }
})
