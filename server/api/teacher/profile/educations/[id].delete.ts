import { requireToken, laravelFetch } from '../../../../utils/laravel'

export default defineEventHandler(async (event) => {
  const user = event.context.user
  if (!user) throw createError({ statusCode: 401, message: 'Unauthorized' })

  const token = await requireToken(user.id)
  const id    = getRouterParam(event, 'id')

  return laravelFetch(token, `teacher/profile/education/${id}`, { method: 'DELETE' })
})
