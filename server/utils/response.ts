export interface ApiEnvelope<T = unknown> {
  success: boolean
  data: T
  meta?: Record<string, unknown>
}

export function ok<T>(data: T, meta?: Record<string, unknown>): ApiEnvelope<T> {
  return {
    success: true,
    data,
    ...(meta !== undefined ? { meta } : {}),
  }
}

export function created<T>(data: T, meta?: Record<string, unknown>): ApiEnvelope<T> {
  return {
    success: true,
    data,
    ...(meta !== undefined ? { meta } : {}),
  }
}

export function noContent(): ApiEnvelope<null> {
  return {
    success: true,
    data: null,
  }
}
