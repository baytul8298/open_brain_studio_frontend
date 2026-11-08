import { requireToken, laravelFetch, mapExpToFrontend, groupAvailability } from '../../../utils/laravel'

export default defineEventHandler(async (event) => {
  const user = event.context.user
  if (!user) throw createError({ statusCode: 401, message: 'Unauthorized' })

  const token = await requireToken(user.id)
  const data: any = await laravelFetch(token, 'teacher/profile')

  return {
    profile:              data.profile ?? {},
    teacher: {
      ...(data.teacher ?? {}),
      rating_avg: String(data.teacher?.rating_avg ?? '0.00'),
    },
    educations:           data.educations        ?? [],
    experience:           (Array.isArray(data.experience)
                            ? data.experience
                            : data.experience ? [data.experience] : []
                          ).map(mapExpToFrontend),
    subjects:             data.subjects          ?? [],
    grade_levels:         data.grade_levels      ?? [],
    teaching_styles:      data.teaching_styles   ?? [],
    availability:         groupAvailability(data.availability ?? []),
    latest_verification:  data.latest_verification ?? null,
    all_subjects:         data.all_subjects      ?? [],
    all_grade_levels:     data.all_grade_levels  ?? [],
  }
})
