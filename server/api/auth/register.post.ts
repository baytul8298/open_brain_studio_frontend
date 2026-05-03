import { z } from 'zod'
import { prisma } from '../../utils/prisma'
import { hashPassword } from '../../utils/password'
import { generateTokenPair } from '../../utils/jwt'
import { created } from '../../utils/response'
import { handleApiError } from '../../utils/errors'

const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  first_name: z.string().min(1, 'First name is required').max(100),
  last_name: z.string().min(1, 'Last name is required').max(100),
  role: z.enum(['student', 'teacher']).default('student'),
})

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const parsed = registerSchema.safeParse(body)

    if (!parsed.success) {
      throw createError({
        statusCode: 422,
        message: 'Validation failed',
        data: parsed.error.flatten(),
      })
    }

    const { email, password, first_name, last_name, role } = parsed.data

    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      throw createError({ statusCode: 409, message: 'Email already registered' })
    }

    const password_hash = await hashPassword(password)

    const user = await prisma.$transaction(async (tx) => {
      const newUser = await tx.user.create({
        data: {
          email,
          password_hash,
          role,
          status: 'active',
          email_verified: false,
          profile: {
            create: {
              first_name,
              last_name,
            },
          },
          ...(role === 'student'
            ? {
                student_profile: {
                  create: {
                    interested_subjects: [],
                  },
                },
              }
            : {
                teacher_profile: {
                  create: {
                    specializations: [],
                    qualifications: [],
                  },
                },
              }),
        },
        include: {
          profile: true,
          student_profile: true,
          teacher_profile: true,
        },
      })
      return newUser
    })

    const tokenPayload = { sub: user.id, email: user.email, role: user.role }
    const tokens = generateTokenPair(tokenPayload)

    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    await prisma.session.create({
      data: {
        user_id: user.id,
        refresh_token: tokens.refreshToken,
        expires_at: expiresAt,
        ip_address: getRequestHeader(event, 'x-forwarded-for') ?? getRequestIP(event) ?? null,
        device_info: getRequestHeader(event, 'user-agent') ? { user_agent: getRequestHeader(event, 'user-agent') } : undefined,
      },
    })

    setCookie(event, 'obs_refresh', tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60,
      path: '/',
    })

    return created({
      accessToken: tokens.accessToken,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        profile: {
          first_name: user.profile!.first_name,
          last_name: user.profile!.last_name,
          avatar_url: user.profile!.avatar_url,
        },
      },
    })
  } catch (err) {
    handleApiError(err)
  }
})
