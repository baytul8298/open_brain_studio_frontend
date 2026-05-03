export class ApiError extends Error {
  statusCode: number
  constructor(message: string, statusCode: number) {
    super(message)
    this.name = 'ApiError'
    this.statusCode = statusCode
  }
}

export class NotFoundError extends ApiError {
  constructor(message = 'Resource not found') {
    super(message, 404)
    this.name = 'NotFoundError'
  }
}

export class ForbiddenError extends ApiError {
  constructor(message = 'Forbidden') {
    super(message, 403)
    this.name = 'ForbiddenError'
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message = 'Unauthorized') {
    super(message, 401)
    this.name = 'UnauthorizedError'
  }
}

export class ValidationError extends ApiError {
  issues?: unknown
  constructor(message = 'Validation failed', issues?: unknown) {
    super(message, 422)
    this.name = 'ValidationError'
    this.issues = issues
  }
}

export class ConflictError extends ApiError {
  constructor(message = 'Conflict') {
    super(message, 409)
    this.name = 'ConflictError'
  }
}

export function handleApiError(err: unknown): never {
  if (err instanceof ApiError) {
    throw createError({ statusCode: err.statusCode, message: err.message })
  }
  if (err instanceof Error) {
    console.error('[API Error]', err)
    throw createError({ statusCode: 500, message: 'Internal server error' })
  }
  throw createError({ statusCode: 500, message: 'Unknown error' })
}
