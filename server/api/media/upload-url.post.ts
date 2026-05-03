import { z } from 'zod'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { s3Client } from '../../utils/minio'
import { prisma } from '../../utils/prisma'
import { created } from '../../utils/response'
import { handleApiError } from '../../utils/errors'

const uploadUrlSchema = z.object({
  filename: z.string().min(1, 'Filename is required'),
  mime_type: z.string().min(1, 'MIME type is required'),
  media_type: z.enum(['image', 'video', 'document', 'audio']),
  size_bytes: z.number().int().positive('Size must be positive'),
})

function getBucket(mediaType: string, config: ReturnType<typeof useRuntimeConfig>): string {
  if (mediaType === 'video') return config.minioBucketVideosRaw as string
  if (mediaType === 'image') return config.minioBucketMedia as string
  return config.minioBucketResources as string
}

function generateStorageKey(userId: string, filename: string, mediaType: string): string {
  const ext = filename.split('.').pop() ?? 'bin'
  const randomId = Math.random().toString(36).slice(2, 10)
  const timestamp = Date.now()
  return `${mediaType}/${userId}/${timestamp}-${randomId}.${ext}`
}

export default defineEventHandler(async (event) => {
  try {
    const user = event.context.user
    if (!user) {
      throw createError({ statusCode: 401, message: 'Unauthorized' })
    }

    const body = await readBody(event)
    const parsed = uploadUrlSchema.safeParse(body)

    if (!parsed.success) {
      throw createError({
        statusCode: 422,
        message: 'Validation failed',
        data: parsed.error.flatten(),
      })
    }

    const { filename, mime_type, media_type, size_bytes } = parsed.data
    const config = useRuntimeConfig()

    const bucket = getBucket(media_type, config)
    const storageKey = generateStorageKey(user.id, filename, media_type)

    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: storageKey,
      ContentType: mime_type,
      ContentLength: size_bytes,
    })

    const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 })

    const media = await prisma.media.create({
      data: {
        uploader_id: user.id,
        storage_key: storageKey,
        original_name: filename,
        mime_type,
        file_size: BigInt(size_bytes),
        media_type,
        metadata: { bucket },
      },
    })

    return created({
      uploadUrl,
      mediaId: media.id,
      storageKey,
    })
  } catch (err) {
    handleApiError(err)
  }
})
