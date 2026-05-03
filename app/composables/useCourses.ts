import type { Course, ApiResponse, PaginationMeta } from '../types'

interface CourseFilters {
  subject?: string
  grade_level?: string
  search?: string
  sort?: 'newest' | 'popular' | 'rating'
  page?: number
  limit?: number
}

export function useCourses() {
  const courses = ref<Course[]>([])
  const pending = ref(false)
  const error = ref<Error | null>(null)
  const meta = ref<PaginationMeta | null>(null)
  const filters = reactive<CourseFilters>({
    sort: 'newest',
    page: 1,
    limit: 12,
  })

  async function fetchCourses(overrides?: Partial<CourseFilters>) {
    pending.value = true
    error.value = null

    const params = new URLSearchParams()
    const merged = { ...filters, ...overrides }

    if (merged.subject) params.set('subject', merged.subject)
    if (merged.grade_level) params.set('grade_level', merged.grade_level)
    if (merged.search) params.set('search', merged.search)
    if (merged.sort) params.set('sort', merged.sort)
    if (merged.page) params.set('page', String(merged.page))
    if (merged.limit) params.set('limit', String(merged.limit))

    try {
      const res = await $fetch<ApiResponse<Course[]>>(`/api/courses?${params.toString()}`)
      courses.value = res.data
      if (res.meta) meta.value = res.meta as PaginationMeta
    } catch (err) {
      error.value = err as Error
    } finally {
      pending.value = false
    }
  }

  async function loadMore() {
    if (!meta.value?.hasMore) return
    pending.value = true
    error.value = null

    const params = new URLSearchParams()
    const merged = filters

    if (merged.subject) params.set('subject', merged.subject)
    if (merged.grade_level) params.set('grade_level', merged.grade_level)
    if (merged.search) params.set('search', merged.search)
    if (merged.sort) params.set('sort', merged.sort)
    if (merged.limit) params.set('limit', String(merged.limit))
    if (meta.value?.nextCursor) params.set('cursor', meta.value.nextCursor)

    try {
      const res = await $fetch<ApiResponse<Course[]>>(`/api/courses?${params.toString()}`)
      courses.value = [...courses.value, ...res.data]
      if (res.meta) meta.value = res.meta as PaginationMeta
    } catch (err) {
      error.value = err as Error
    } finally {
      pending.value = false
    }
  }

  return {
    courses,
    pending,
    error,
    meta,
    filters,
    fetchCourses,
    loadMore,
  }
}
