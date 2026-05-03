// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ssr: true,

  modules: [
    ['@nuxtjs/tailwindcss', { cssPath: './app/assets/css/main.css' }],
  ],

  nitro: {
    routeRules: {
      '/student/**': { ssr: false },
      '/teacher/**': { ssr: false },
      '/admin/**': { ssr: false },
      '/api/auth/**': { cache: false },
      '/api/teacher/**': { cache: false },
      '/api/health': { cache: false },
      '/api/courses': { cache: { maxAge: 60 } },
      '/api/courses/**': { cache: { maxAge: 60 } },
    },
  },

  runtimeConfig: {
    // Private (server-only)
    databaseUrl: process.env.DATABASE_URL,
    directUrl: process.env.DIRECT_URL,
    redisUrl: process.env.REDIS_URL || 'redis://127.0.0.1:6379',
    jwtSecret: process.env.JWT_SECRET || 'change_me_to_a_random_64_char_secret_in_production',
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || 'change_me_to_another_random_64_char_secret',
    minioEndpoint: process.env.MINIO_ENDPOINT || 'http://127.0.0.1:9000',
    minioAccessKey: process.env.MINIO_ACCESS_KEY || 'minioadmin',
    minioSecretKey: process.env.MINIO_SECRET_KEY || 'minioadmin',
    minioBucketVideosRaw: process.env.MINIO_BUCKET_VIDEOS_RAW || 'obs-videos-raw',
    minioBucketVideosHls: process.env.MINIO_BUCKET_VIDEOS_HLS || 'obs-videos-hls',
    minioBucketResources: process.env.MINIO_BUCKET_RESOURCES || 'obs-resources',
    minioBucketMedia: process.env.MINIO_BUCKET_MEDIA || 'obs-media',
    minioPublicUrl: process.env.MINIO_PUBLIC_URL || 'http://127.0.0.1:9000',
    appUrl: process.env.APP_URL || 'http://localhost:3000',
    laravelApiUrl: process.env.LARAVEL_API_URL || 'http://open_brain.test',

    // Public (exposed to client)
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || '/api',
      laravelApiUrl: process.env.LARAVEL_API_URL || 'http://open_brain.test',
    },
  },
})
