import { S3Client } from '@aws-sdk/client-s3'

declare global {
  // eslint-disable-next-line no-var
  var __s3Client: S3Client | undefined
}

function createS3Client(): S3Client {
  const config = useRuntimeConfig()

  const endpoint = config.minioEndpoint || 'http://127.0.0.1:9000'
  const accessKeyId = config.minioAccessKey || 'minioadmin'
  const secretAccessKey = config.minioSecretKey || 'minioadmin'

  return new S3Client({
    endpoint,
    region: 'us-east-1', // MinIO requires a region even if not used
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
    forcePathStyle: true, // Required for MinIO
  })
}

let s3Client: S3Client

if (process.env.NODE_ENV === 'production') {
  s3Client = createS3Client()
} else {
  if (!globalThis.__s3Client) {
    globalThis.__s3Client = createS3Client()
  }
  s3Client = globalThis.__s3Client
}

export { s3Client }
export default s3Client
