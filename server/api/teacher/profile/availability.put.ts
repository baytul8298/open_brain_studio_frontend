import { requireToken, laravelFetch } from '../../../utils/laravel'

export default defineEventHandler(async (event) => {
  const user = event.context.user
  if (!user) throw createError({ statusCode: 401, message: 'Unauthorized' })

  const token = await requireToken(user.id)
  const body  = await readBody(event)

  await laravelFetch(token, 'teacher/profile/availability', { method: 'PUT', body })

  // Return the sent availability in grouped format so the frontend can rebuild its grid
  return {
    message:      'Availability saved!',
    availability: body.availability ?? [],
  }
})
