import { verifyAccessToken } from '../utils/jwt'

export default defineEventHandler((event) => {
  if (!import.meta.server) return

  const authHeader = getRequestHeader(event, 'authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) return

  const token = authHeader.slice(7)
  try {
    const payload = verifyAccessToken(token)
    event.context.user = {
      id: payload.sub,
      email: payload.email,
      role: payload.role,
    }
  } catch {
    // Invalid token - leave context.user undefined
  }
})
