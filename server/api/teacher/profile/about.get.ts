import { prisma } from '../../../utils/prisma'
import { handleApiError } from '../../../utils/errors'

// 0=Sun 1=Mon 2=Tue 3=Wed 4=Thu 5=Fri 6=Sat
const DAY_NAMES: Record<number, string> = { 0: 'Sun', 1: 'Mon', 2: 'Tue', 3: 'Wed', 4: 'Thu', 5: 'Fri', 6: 'Sat' }

function formatTime(t: Date | string): string {
  let h: number, m: number
  if (t instanceof Date) {
    h = t.getUTCHours(); m = t.getUTCMinutes()
  } else {
    const [hStr, mStr] = t.split(':')
    h = parseInt(hStr, 10); m = parseInt(mStr, 10)
  }
  const period = h >= 12 ? 'PM' : 'AM'
  const h12 = h > 12 ? h - 12 : h === 0 ? 12 : h
  return `${h12}:${m.toString().padStart(2, '0')} ${period}`
}

export default defineEventHandler(async (event) => {
  try {
    const user = event.context.user
    if (!user) throw createError({ statusCode: 401, message: 'Unauthorized' })

    const [profile, teacher, educations, experiences, teacherSubjects, teacherGrades, teachingStyles, availRows, latestVerification, allSubjects, allGradeLevels] = await Promise.all([
      prisma.profile.findUnique({
        where: { id: user.id },
        select: { bio: true, first_name: true, last_name: true, avatar_url: true, cover_url: true },
      }),
      prisma.teacherProfile.findUnique({
        where: { id: user.id },
        select: { headline: true, verified: true, id_verified: true, is_flexible_time: true, session_types: true, rating_avg: true, rating_count: true, total_students: true, total_courses: true },
      }),
      prisma.teacherEducation.findMany({ where: { teacher_id: user.id }, orderBy: { id: 'desc' } }),
      prisma.teacherExperience.findMany({ where: { teacher_id: user.id }, orderBy: { id: 'desc' } }),
      prisma.teacherSubject.findMany({ where: { teacher_id: user.id }, include: { subject: true } }),
      prisma.teacherGradeLevel.findMany({ where: { teacher_id: user.id }, include: { gradeLevel: true } }),
      prisma.teachingStyle.findMany({ where: { teacher_id: user.id }, orderBy: { sort_order: 'asc' } }),
      prisma.teacherAvailability.findMany({ where: { teacher_id: user.id }, orderBy: [{ day_of_week: 'asc' }, { time_slot: 'asc' }] }),
      prisma.teacherVerification.findFirst({
        where: { teacher_id: user.id },
        orderBy: { submitted_at: 'desc' },
        select: { id: true, status: true, submitted_at: true },
      }),
      prisma.subject.findMany({ orderBy: { name: 'asc' } }),
      prisma.gradeLevel.findMany({ orderBy: { name: 'asc' } }),
    ])

    // Group availability rows into { day, slots[] } format for the frontend
    const availMap: Record<string, string[]> = {}
    availRows.forEach(row => {
      const dayName = DAY_NAMES[row.day_of_week] ?? String(row.day_of_week)
      if (!availMap[dayName]) availMap[dayName] = []
      availMap[dayName].push(formatTime(row.time_slot))
    })
    const availability = Object.entries(availMap).map(([day, slots]) => ({ day, slots }))

    return {
      profile: profile ?? { bio: '', first_name: '', last_name: '', avatar_url: null, cover_url: null },
      teacher: teacher
        ? { ...teacher, rating_avg: teacher.rating_avg.toString() }
        : { headline: '', verified: false, id_verified: false, is_flexible_time: false, session_types: [], rating_avg: '0.00', rating_count: 0, total_students: 0, total_courses: 0 },
      educations,
      experience: experiences,
      subjects: teacherSubjects.map(ts => ts.subject),
      grade_levels: teacherGrades.map(tg => tg.gradeLevel),
      teaching_styles: teachingStyles,
      availability,
      latest_verification: latestVerification,
      all_subjects: allSubjects,
      all_grade_levels: allGradeLevels,
    }
  } catch (err) {
    handleApiError(err)
  }
})
