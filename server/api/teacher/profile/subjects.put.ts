import { prisma } from '../../../utils/prisma'
import { handleApiError } from '../../../utils/errors'

export default defineEventHandler(async (event) => {
  try {
    const user = event.context.user
    if (!user) throw createError({ statusCode: 401, message: 'Unauthorized' })

    const body = await readBody(event)
    const subject_ids: number[] = Array.isArray(body.subject_ids) ? body.subject_ids.map(Number) : []

    await prisma.$transaction([
      prisma.teacherSubject.deleteMany({ where: { teacher_id: user.id } }),
      ...(subject_ids.length > 0
        ? [prisma.teacherSubject.createMany({
            data: subject_ids.map(id => ({ teacher_id: user.id, subject_id: id })),
            skipDuplicates: true,
          })]
        : []),
    ])

    const teacherSubjects = await prisma.teacherSubject.findMany({
      where: { teacher_id: user.id },
      include: { subject: true },
    })

    return { subjects: teacherSubjects.map(ts => ts.subject) }
  } catch (err) {
    handleApiError(err)
  }
})
