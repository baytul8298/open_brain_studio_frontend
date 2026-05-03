import type { H3Event } from 'h3'
import { getQuery } from 'h3'

export interface PaginationParams {
  skip: number
  take: number
  cursor: string | undefined
}

export interface PaginationMeta {
  limit: number
  page: number
  cursor: string | undefined
  nextCursor: string | undefined
  hasMore: boolean
}

const DEFAULT_LIMIT = 25
const MAX_LIMIT = 100

export function parsePaginationParams(event: H3Event): PaginationParams {
  const query = getQuery(event)

  const rawLimit = parseInt(String(query.limit ?? DEFAULT_LIMIT), 10)
  const take = isNaN(rawLimit) ? DEFAULT_LIMIT : Math.min(Math.max(1, rawLimit), MAX_LIMIT)

  const rawPage = parseInt(String(query.page ?? '1'), 10)
  const page = isNaN(rawPage) ? 1 : Math.max(1, rawPage)

  const cursor = query.cursor ? String(query.cursor) : undefined

  // When cursor is provided, use cursor-based pagination; otherwise use offset
  const skip = cursor ? 0 : (page - 1) * take

  return { skip, take, cursor }
}

export function buildCursorMeta(
  items: Array<{ id: string }>,
  take: number,
  requestedCursor?: string,
): Omit<PaginationMeta, 'page'> & { page: number } {
  const hasMore = items.length === take
  const nextCursor = hasMore ? items[items.length - 1]?.id : undefined

  return {
    limit: take,
    page: 1,
    cursor: requestedCursor,
    nextCursor,
    hasMore,
  }
}
