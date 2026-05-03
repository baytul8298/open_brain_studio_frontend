<template>
  <div>
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">My Courses</h1>
        <p class="text-gray-500 dark:text-gray-400 mt-1">Manage your courses</p>
      </div>
      <NuxtLink
        to="/teacher/courses/create"
        class="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-sm transition-colors flex items-center gap-2"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        New Course
      </NuxtLink>
    </div>

    <div v-if="pending" class="space-y-3">
      <div v-for="i in 4" :key="i" class="h-24 rounded-2xl bg-gray-100 dark:bg-gray-800 animate-pulse" />
    </div>

    <div v-else-if="courses.length === 0" class="text-center py-20 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
      <div class="text-5xl mb-3">🎓</div>
      <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No courses yet</h3>
      <p class="text-gray-500 dark:text-gray-400 mb-6">Create your first course to start teaching</p>
      <NuxtLink
        to="/teacher/courses/create"
        class="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors"
      >
        Create Your First Course
      </NuxtLink>
    </div>

    <div v-else class="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
      <table class="w-full">
        <thead>
          <tr class="border-b border-gray-200 dark:border-gray-800">
            <th class="text-left text-xs font-semibold text-gray-500 dark:text-gray-400 px-5 py-3">Course</th>
            <th class="text-left text-xs font-semibold text-gray-500 dark:text-gray-400 px-3 py-3 hidden sm:table-cell">Status</th>
            <th class="text-left text-xs font-semibold text-gray-500 dark:text-gray-400 px-3 py-3 hidden md:table-cell">Students</th>
            <th class="text-left text-xs font-semibold text-gray-500 dark:text-gray-400 px-3 py-3 hidden md:table-cell">Lessons</th>
            <th class="text-right text-xs font-semibold text-gray-500 dark:text-gray-400 px-5 py-3">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100 dark:divide-gray-800">
          <tr
            v-for="course in courses"
            :key="course.id"
            class="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
          >
            <td class="px-5 py-4">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 flex-shrink-0 overflow-hidden">
                  <img
                    v-if="course.thumbnail_url"
                    :src="course.thumbnail_url"
                    :alt="course.title"
                    class="w-full h-full object-cover"
                  />
                  <div v-else class="w-full h-full flex items-center justify-center text-lg">🎓</div>
                </div>
                <div class="min-w-0">
                  <p class="font-medium text-gray-900 dark:text-white text-sm truncate max-w-xs">
                    {{ course.title }}
                  </p>
                  <p class="text-xs text-gray-400 mt-0.5">
                    {{ course.subject ?? 'No subject' }}
                  </p>
                </div>
              </div>
            </td>
            <td class="px-3 py-4 hidden sm:table-cell">
              <span
                class="px-2.5 py-1 text-xs font-medium rounded-full"
                :class="statusBadge(course.status)"
              >
                {{ course.status }}
              </span>
            </td>
            <td class="px-3 py-4 text-sm text-gray-600 dark:text-gray-400 hidden md:table-cell">
              {{ course.enrolled_count }}
            </td>
            <td class="px-3 py-4 text-sm text-gray-600 dark:text-gray-400 hidden md:table-cell">
              {{ course.total_lessons }}
            </td>
            <td class="px-5 py-4 text-right">
              <div class="flex items-center justify-end gap-2">
                <NuxtLink
                  :to="`/teacher/courses/${course.id}/edit`"
                  class="px-3 py-1.5 text-xs font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 rounded-lg transition-colors"
                >
                  Edit
                </NuxtLink>
                <button
                  class="px-3 py-1.5 text-xs font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30 hover:bg-red-100 dark:hover:bg-red-900/50 rounded-lg transition-colors"
                  @click="confirmDelete(course)"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Delete confirmation modal -->
    <div
      v-if="deletingCourse"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
    >
      <div class="bg-white dark:bg-gray-900 rounded-2xl p-6 max-w-sm w-full shadow-xl">
        <h3 class="font-bold text-gray-900 dark:text-white text-lg mb-2">Delete Course</h3>
        <p class="text-gray-500 dark:text-gray-400 text-sm mb-6">
          Are you sure you want to delete "<strong>{{ deletingCourse.title }}</strong>"? This action cannot be undone.
        </p>
        <div class="flex gap-3">
          <button
            class="flex-1 py-2.5 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm"
            @click="deletingCourse = null"
          >
            Cancel
          </button>
          <button
            :disabled="deleting"
            class="flex-1 py-2.5 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-semibold rounded-xl transition-colors text-sm"
            @click="handleDelete"
          >
            {{ deleting ? 'Deleting...' : 'Delete' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ApiResponse, Course } from '../../../types'
import { useAuthStore } from '../../../stores/auth'

definePageMeta({ layout: 'dashboard' })
useHead({ title: 'My Courses — Open Brain Studio' })

const authStore = useAuthStore()

if (!authStore.isLoggedIn) await navigateTo('/login')

const { data, pending, refresh } = await useAsyncData('teacher-courses-list', () =>
  $fetch<ApiResponse<Course[]>>('/api/courses', {
    headers: { Authorization: `Bearer ${authStore.accessToken}` },
    query: { teacher_id: authStore.user?.id, limit: 100 },
  }).catch(() => null),
)

const courses = computed(() => data.value?.data ?? [])
const deletingCourse = ref<Course | null>(null)
const deleting = ref(false)

function confirmDelete(course: Course) {
  deletingCourse.value = course
}

async function handleDelete() {
  if (!deletingCourse.value) return
  deleting.value = true

  try {
    await $fetch(`/api/courses/${deletingCourse.value.id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${authStore.accessToken}` },
    })
    deletingCourse.value = null
    await refresh()
  } catch {
    // handle error
  } finally {
    deleting.value = false
  }
}

function statusBadge(status: string) {
  const map: Record<string, string> = {
    live: 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300',
    draft: 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400',
    pending_review: 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-300',
    archived: 'bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400',
  }
  return map[status] ?? ''
}
</script>
