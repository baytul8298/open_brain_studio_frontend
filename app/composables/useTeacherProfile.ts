import type { TeacherProfilePageData } from '../types'

export function useTeacherProfile() {
  const config    = useRuntimeConfig()
  const authStore = useAuthStore()

  const base = computed(() => `${config.public.laravelApiUrl}/api/teacher`)
  const headers = computed(() => ({ Authorization: `Bearer ${authStore.token}` }))

  async function fetchProfile(): Promise<TeacherProfilePageData> {
    return $fetch<TeacherProfilePageData>(`${base.value}/profile`, { headers: headers.value })
  }

  async function updateAbout(payload: { bio: string; headline: string }) {
    return $fetch(`${base.value}/profile/about`, {
      method: 'PUT',
      headers: headers.value,
      body: payload,
    })
  }

  async function storeEducation(payload: {
    type: string; title: string; institution?: string
    start_year?: number | null; end_year?: number | null; is_current?: boolean
  }) {
    return $fetch(`${base.value}/profile/education`, {
      method: 'POST',
      headers: headers.value,
      body: payload,
    })
  }

  async function updateEducation(id: number, payload: {
    type: string; title: string; institution?: string
    start_year?: number | null; end_year?: number | null; is_current?: boolean
  }) {
    return $fetch(`${base.value}/profile/education/${id}`, {
      method: 'PUT',
      headers: headers.value,
      body: payload,
    })
  }

  async function destroyEducation(id: number) {
    return $fetch(`${base.value}/profile/education/${id}`, {
      method: 'DELETE',
      headers: headers.value,
    })
  }

  async function updateExperience(payload: {
    role_type: string; start_month?: number | null; start_year?: number | null
    description: string; expertise_tags?: string[]
  }) {
    return $fetch(`${base.value}/profile/experience`, {
      method: 'PUT',
      headers: headers.value,
      body: payload,
    })
  }

  async function updateSubjects(payload: {
    subject_ids: number[]; grade_level_ids: number[]; session_types: string[]
  }) {
    return $fetch(`${base.value}/profile/subjects`, {
      method: 'PUT',
      headers: headers.value,
      body: payload,
    })
  }

  async function storeTeachingStyle(payload: { name: string; description?: string; color?: string }) {
    return $fetch(`${base.value}/profile/teaching-styles`, {
      method: 'POST',
      headers: headers.value,
      body: payload,
    })
  }

  async function updateTeachingStyle(id: number, payload: { name: string; description?: string; color?: string }) {
    return $fetch(`${base.value}/profile/teaching-styles/${id}`, {
      method: 'PUT',
      headers: headers.value,
      body: payload,
    })
  }

  async function destroyTeachingStyle(id: number) {
    return $fetch(`${base.value}/profile/teaching-styles/${id}`, {
      method: 'DELETE',
      headers: headers.value,
    })
  }

  async function updateAvailability(payload: {
    is_flexible_time: boolean
    slots: { day: number; time: string }[]
  }) {
    return $fetch(`${base.value}/profile/availability`, {
      method: 'PUT',
      headers: headers.value,
      body: payload,
    })
  }

  async function storeVerification(docType: string, file: File) {
    const form = new FormData()
    form.append('doc_type', docType)
    form.append('document', file)
    return $fetch(`${base.value}/profile/verification`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${authStore.token}` },
      body: form,
    })
  }

  return {
    fetchProfile,
    updateAbout,
    storeEducation,
    updateEducation,
    destroyEducation,
    updateExperience,
    updateSubjects,
    storeTeachingStyle,
    updateTeachingStyle,
    destroyTeachingStyle,
    updateAvailability,
    storeVerification,
  }
}
