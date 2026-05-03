import { prisma } from '../../utils/prisma'
import { parsePaginationParams, buildCursorMeta } from '../../utils/paginate'
import { ok } from '../../utils/response'
import { handleApiError } from '../../utils/errors'

export default defineEventHandler(async (event) => {
  try {
    const { skip, take, cursor } = parsePaginationParams(event)
    const query = getQuery(event)

    const subject = query.subject ? String(query.subject) : undefined
    const grade_level = query.grade_level ? String(query.grade_level) : undefined
    const search = query.search ? String(query.search) : undefined
    const sort = query.sort ? String(query.sort) : 'newest'

    const where: Record<string, unknown> = {
      status: 'live',
      deleted_at: null,
    }

    if (subject) where.subject = subject
    if (grade_level) where.grade_level = grade_level
    if (search) {
      where.title = { contains: search, mode: 'insensitive' }
    }

    let orderBy: Record<string, unknown> = { created_at: 'desc' }
    if (sort === 'popular') orderBy = { enrolled_count: 'desc' }
    else if (sort === 'rating') orderBy = { rating_avg: 'desc' }
    else if (sort === 'newest') orderBy = { created_at: 'desc' }

    const cursorClause = cursor ? { cursor: { id: cursor }, skip: 1 } : {}

    const courses = await prisma.course.findMany({
      where,
      orderBy,
      take,
      skip: cursor ? undefined : skip,
      ...cursorClause,
      include: {
        teacher: {
          include: {
            profile: {
              select: { first_name: true, last_name: true, avatar_url: true },
            },
          },
        },
        _count: {
          select: { enrollments: true, reviews: true },
        },
      },
    })

    const meta = buildCursorMeta(courses, take, cursor)

    return ok(
      courses.map((c) => ({
        id: c.id,
        title: c.title,
        slug: c.slug,
        short_description: c.short_description,
        thumbnail_url: c.thumbnail_url,
        status: c.status,
        is_free: c.is_free,
        price: c.price,
        grade_level: c.grade_level,
        subject: c.subject,
        enrolled_count: c.enrolled_count,
        rating_avg: c.rating_avg,
        total_lessons: c.total_lessons,
        created_at: c.created_at,
        teacher: {
          id: c.teacher.id,
          profile: c.teacher.profile,
        },
        _count: c._count,
      })),
      meta as Record<string, unknown>,
    )
  } catch (err) {
    handleApiError(err)
  }
})
