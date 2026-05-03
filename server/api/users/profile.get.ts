import { prisma } from '../../utils/prisma'
import { ok } from '../../utils/response'
import { handleApiError } from '../../utils/errors'

export default defineEventHandler(async (event) => {
  try {
    const user = event.context.user
    if (!user) {
      throw createError({ statusCode: 401, message: 'Unauthorized' })
    }

    const profile = await prisma.profile.findUnique({
      where: { id: user.id },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            role: true,
            status: true,
            email_verified: true,
            created_at: true,
            student_profile: true,
            teacher_profile: true,
          },
        },
      },
    })

    if (!profile) {
      throw createError({ statusCode: 404, message: 'Profile not found' })
    }

    return ok(profile)
  } catch (err) {
    handleApiError(err)
  }
})
