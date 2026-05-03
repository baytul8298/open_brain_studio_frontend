import { prisma } from '../../../utils/prisma'
import { handleApiError } from '../../../utils/errors'

export default defineEventHandler(async (event) => {
  try {
    const user = event.context.user
    if (!user) throw createError({ statusCode: 401, message: 'Unauthorized' })

    const body = await readBody(event)

    const profileUpdates: Record<string, unknown> = {}
    const teacherUpdates: Record<string, unknown> = {}

    if (body.bio !== undefined) profileUpdates.bio = body.bio
    if (body.headline !== undefined) teacherUpdates.headline = body.headline
    if (body.is_flexible_time !== undefined) teacherUpdates.is_flexible_time = body.is_flexible_time

    const [updatedProfile, updatedTeacher] = await Promise.all([
      Object.keys(profileUpdates).length > 0
        ? prisma.profile.update({ where: { id: user.id }, data: profileUpdates, select: { bio: true, first_name: true, last_name: true, avatar_url: true, cover_url: true } })
        : prisma.profile.findUnique({ where: { id: user.id }, select: { bio: true, first_name: true, last_name: true, avatar_url: true, cover_url: true } }),
      Object.keys(teacherUpdates).length > 0
        ? prisma.teacherProfile.upsert({
            where: { id: user.id },
            create: { id: user.id, ...teacherUpdates },
            update: teacherUpdates,
            select: { headline: true, verified: true, id_verified: true, is_flexible_time: true, session_types: true, rating_avg: true, rating_count: true, total_students: true, total_courses: true },
          })
        : prisma.teacherProfile.findUnique({ where: { id: user.id }, select: { headline: true, verified: true, id_verified: true, is_flexible_time: true, session_types: true, rating_avg: true, rating_count: true, total_students: true, total_courses: true } }),
    ])

    return {
      profile: updatedProfile,
      teacher: updatedTeacher ? { ...updatedTeacher, rating_avg: updatedTeacher.rating_avg.toString() } : null,
    }
  } catch (err) {
    handleApiError(err)
  }
})
