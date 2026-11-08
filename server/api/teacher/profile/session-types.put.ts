import { requireToken, laravelFetch } from '../../../utils/laravel'

export default defineEventHandler(async (event) => {
  const user = event.context.user
  if (!user) throw createError({ statusCode: 401, message: 'Unauthorized' })

  const token = await requireToken(user.id)
  const body  = await readBody(event)

  // Forward { session_types } — Laravel's updateSubjects handles partial updates
  return laravelFetch(token, 'teacher/profile/subjects', { method: 'PUT', body })
})
