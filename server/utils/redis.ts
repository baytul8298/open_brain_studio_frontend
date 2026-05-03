import Redis from 'ioredis'

declare global {
  // eslint-disable-next-line no-var
  var __redis: Redis | undefined
}

function createRedisClient(): Redis {
  const config = useRuntimeConfig()
  const redisUrl = config.redisUrl || 'redis://127.0.0.1:6379'

  const client = new Redis(redisUrl, {
    maxRetriesPerRequest: 3,
    retryStrategy(times: number) {
      if (times > 10) {
        console.error('[Redis] Max retries reached, giving up')
        return null
      }
      const delay = Math.min(times * 100, 3000)
      console.warn(`[Redis] Retrying connection in ${delay}ms (attempt ${times})`)
      return delay
    },
    reconnectOnError(err: Error) {
      const targetErrors = ['READONLY', 'ECONNRESET', 'ECONNREFUSED']
      return targetErrors.some((e) => err.message.includes(e))
    },
    lazyConnect: true,
    enableOfflineQueue: true,
  })

  client.on('connect', () => console.log('[Redis] Connected'))
  client.on('error', (err: Error) => console.error('[Redis] Error:', err.message))
  client.on('close', () => console.warn('[Redis] Connection closed'))

  return client
}

let redis: Redis

if (process.env.NODE_ENV === 'production') {
  redis = createRedisClient()
} else {
  if (!globalThis.__redis) {
    globalThis.__redis = createRedisClient()
  }
  redis = globalThis.__redis
}

export { redis }
export default redis
