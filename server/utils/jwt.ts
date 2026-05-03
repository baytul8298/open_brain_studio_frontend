import jwt from 'jsonwebtoken'

export interface JwtPayload {
  sub: string
  email: string
  role: string
  iat?: number
  exp?: number
}

export interface TokenPair {
  accessToken: string
  refreshToken: string
}

export function signAccessToken(payload: Omit<JwtPayload, 'iat' | 'exp'>): string {
  const config = useRuntimeConfig()
  return jwt.sign(payload, config.jwtSecret, {
    expiresIn: '15m',
    issuer: 'open-brain-studio',
    audience: 'obs-client',
  })
}

export function signRefreshToken(payload: Omit<JwtPayload, 'iat' | 'exp'>): string {
  const config = useRuntimeConfig()
  return jwt.sign(payload, config.jwtRefreshSecret, {
    expiresIn: '7d',
    issuer: 'open-brain-studio',
    audience: 'obs-client',
  })
}

export function verifyAccessToken(token: string): JwtPayload {
  const config = useRuntimeConfig()
  try {
    return jwt.verify(token, config.jwtSecret, {
      issuer: 'open-brain-studio',
      audience: 'obs-client',
    }) as JwtPayload
  } catch (err) {
    throw createError({ statusCode: 401, message: 'Invalid or expired access token' })
  }
}

export function verifyRefreshToken(token: string): JwtPayload {
  const config = useRuntimeConfig()
  try {
    return jwt.verify(token, config.jwtRefreshSecret, {
      issuer: 'open-brain-studio',
      audience: 'obs-client',
    }) as JwtPayload
  } catch (err) {
    throw createError({ statusCode: 401, message: 'Invalid or expired refresh token' })
  }
}

export function generateTokenPair(payload: Omit<JwtPayload, 'iat' | 'exp'>): TokenPair {
  return {
    accessToken: signAccessToken(payload),
    refreshToken: signRefreshToken(payload),
  }
}
