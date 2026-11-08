import { requireToken, laravelFetch, mapExpToLaravel, mapExpToFrontend } from '../../../utils/laravel'

export default defineEventHandler(async (event) => {
  const user = event.context.user
  if (!user) throw createError({ statusCode: 401, message: 'Unauthorized' })

  const token = await requireToken(user.id)
  const body  = await readBody(event)

  // Frontend sends: { role, started_month, started_year, description, expertise }
  // Laravel expects: { role_type, start_month, start_year, description, expertise_tags }
  const data: any = await laravelFetch(token, 'teacher/profile/experience', {
    method: 'PUT',
    body: mapExpToLaravel(body),
  })

  // Frontend expects: { experience: [{ role, started_month, ... }], message }
  const exp = data.experience ?? data.data
  return {
    message:    data.message,
    experience: exp ? [mapExpToFrontend(exp)] : [],
  }
})
