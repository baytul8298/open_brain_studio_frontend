import { z } from 'zod'
import { prisma } from '../../utils/prisma'
import { ok } from '../../utils/response'
import { handleApiError } from '../../utils/errors'

const updateProfileSchema = z.object({
  first_name: z.string().min(1).max(100).optional(),
  last_name: z.string().min(1).max(100).optional(),
  bio: z.string().nullable().optional(),
  location: z.string().max(255).nullable().optional(),
  avatar_url: z.string().url().nullable().optional(),
})

export default defineEventHandler(async (event) => {
  try {
    const user = event.context.user
    if (!user) {
      throw createError({ statusCode: 401, message: 'Unauthorized' })
    }

    const body = await readBody(event)
    const parsed = updateProfileSchema.safeParse(body)

    if (!parsed.success) {
      throw createError({
        statusCode: 422,
        message: 'Validation failed',
        data: parsed.error.flatten(),
      })
    }

    const profile = await prisma.profile.upsert({
      where: { id: user.id },
      update: parsed.data,
      create: {
        id: user.id,
        first_name: parsed.data.first_name ?? '',
        last_name: parsed.data.last_name ?? '',
        bio: parsed.data.bio,
        location: parsed.data.location,
        avatar_url: parsed.data.avatar_url,
      },
    })

    return ok(profile)
  } catch (err) {
    handleApiError(err)
  }
})
