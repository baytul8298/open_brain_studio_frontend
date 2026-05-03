import { prisma } from '../../../utils/prisma'
import { handleApiError } from '../../../utils/errors'

export default defineEventHandler(async (event) => {
  try {
    const user = event.context.user
    if (!user) throw createError({ statusCode: 401, message: 'Unauthorized' })

    const body = await readBody(event)
    const grade_level_ids: number[] = Array.isArray(body.grade_level_ids) ? body.grade_level_ids.map(Number) : []

    await prisma.$transaction([
      prisma.teacherGradeLevel.deleteMany({ where: { teacher_id: user.id } }),
      ...(grade_level_ids.length > 0
        ? [prisma.teacherGradeLevel.createMany({
            data: grade_level_ids.map(id => ({ teacher_id: user.id, grade_level_id: id })),
            skipDuplicates: true,
          })]
        : []),
    ])

    const teacherGrades = await prisma.teacherGradeLevel.findMany({
      where: { teacher_id: user.id },
      include: { gradeLevel: true },
    })

    return { grade_levels: teacherGrades.map(tg => tg.gradeLevel) }
  } catch (err) {
    handleApiError(err)
  }
})
