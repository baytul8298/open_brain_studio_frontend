import Redis from 'ioredis'

declare global {
  // eslint-disable-next-line no-var
  var __redis: Redis | undefined
}

function createRedisClient(): Redis {
  const config = useRuntimeConfig()
  const redisUrl = config.redisUrl || 'redis://127.0.0.1:6379'

  const client = new Redis(redisUrl, {
    maxRetriesPerRequest: 0,
    retryStrategy(times: number) {
      // Give up after 2 attempts — in-memory fallback takes over
      if (times >= 2) return null
      return times * 200
    },
    reconnectOnError() { return false },
    lazyConnect: true,
    enableOfflineQueue: false,
  })

  client.on('connect', () => console.log('[Redis] Connected'))
  client.on('error', (err: Error) => {
    // Only log once — suppress repeated ECONNREFUSED noise
    if (!err.message.includes('ECONNREFUSED')) console.warn('[Redis]', err.message)
  })

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
