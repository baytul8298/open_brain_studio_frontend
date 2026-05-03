<template>
  <div v-if="course" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-10">
      <!-- Left: Course Info -->
      <div class="lg:col-span-2">
        <!-- Thumbnail -->
        <div class="aspect-video bg-gray-200 dark:bg-gray-800 rounded-2xl overflow-hidden mb-8">
          <img
            v-if="course.thumbnail_url"
            :src="course.thumbnail_url"
            :alt="course.title"
            class="w-full h-full object-cover"
          />
          <div v-else class="w-full h-full flex items-center justify-center text-gray-400 text-6xl">
            🎓
          </div>
        </div>

        <!-- Title & Meta -->
        <div class="flex flex-wrap gap-2 mb-4">
          <span
            v-if="course.grade_level"
            class="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 text-xs font-medium rounded-full"
          >
            {{ course.grade_level }}
          </span>
          <span
            v-if="course.subject"
            class="px-3 py-1 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 text-xs font-medium rounded-full"
          >
            {{ course.subject }}
          </span>
          <span
            v-if="course.is_free"
            class="px-3 py-1 bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 text-xs font-bold rounded-full"
          >
            FREE
          </span>
        </div>

        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">{{ course.title }}</h1>

        <p v-if="course.short_description" class="text-gray-600 dark:text-gray-400 text-lg mb-6">
          {{ course.short_description }}
        </p>

        <!-- Teacher -->
        <div v-if="course.teacher?.profile" class="flex items-center gap-3 mb-8">
          <div class="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">
            {{ course.teacher.profile.first_name[0] }}
          </div>
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">Instructor</p>
            <p class="font-semibold text-gray-900 dark:text-white">
              {{ course.teacher.profile.first_name }} {{ course.teacher.profile.last_name }}
            </p>
          </div>
        </div>

        <!-- Stats -->
        <div class="flex flex-wrap gap-6 py-5 border-y border-gray-200 dark:border-gray-700 mb-8">
          <div class="text-center">
            <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ course.enrolled_count }}</p>
            <p class="text-sm text-gray-500 dark:text-gray-400">Students</p>
          </div>
          <div class="text-center">
            <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ course.total_lessons }}</p>
            <p class="text-sm text-gray-500 dark:text-gray-400">Lessons</p>
          </div>
          <div class="text-center">
            <div class="flex items-center gap-1">
              <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">
                {{ Number(course.rating_avg).toFixed(1) }}
              </p>
            </div>
            <p class="text-sm text-gray-500 dark:text-gray-400">Rating</p>
          </div>
        </div>

        <!-- Description -->
        <div v-if="course.description" class="mb-8">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-4">About This Course</h2>
          <div class="text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line">
            {{ course.description }}
          </div>
        </div>

        <!-- Curriculum -->
        <div v-if="course.sections && course.sections.length > 0">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Curriculum</h2>
          <div class="space-y-3">
            <div
              v-for="section in course.sections"
              :key="section.id"
              class="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden"
            >
              <div
                class="bg-gray-50 dark:bg-gray-800 px-4 py-3 flex justify-between items-center cursor-pointer"
                @click="toggleSection(section.id)"
              >
                <h3 class="font-semibold text-gray-900 dark:text-white text-sm">{{ section.title }}</h3>
                <span class="text-xs text-gray-500 dark:text-gray-400">
                  {{ section.lessons?.length ?? 0 }} lessons
                </span>
              </div>
              <div v-if="expandedSections.has(section.id)" class="divide-y divide-gray-100 dark:divide-gray-800">
                <div
                  v-for="lesson in section.lessons"
                  :key="lesson.id"
                  class="px-4 py-3 flex items-center gap-3"
                >
                  <div class="flex-shrink-0">
                    <svg
                      v-if="lesson.is_free_preview || isEnrolled"
                      class="w-4 h-4 text-indigo-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <svg v-else class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <span class="text-sm text-gray-700 dark:text-gray-300 flex-1">{{ lesson.title }}</span>
                  <span v-if="lesson.is_free_preview" class="text-xs text-indigo-600 font-medium">Preview</span>
                  <span v-if="lesson.duration_sec" class="text-xs text-gray-400">
                    {{ formatDuration(lesson.duration_sec) }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right: Enrollment Card (sticky) -->
      <div class="lg:col-span-1">
        <div class="sticky top-24 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-lg">
          <div class="text-center mb-6">
            <p v-if="course.is_free" class="text-3xl font-bold text-green-600 dark:text-green-400">
              Free
            </p>
            <p v-else-if="course.price" class="text-3xl font-bold text-gray-900 dark:text-white">
              ${{ Number(course.price).toFixed(2) }}
            </p>
          </div>

          <div v-if="isEnrolled" class="mb-4">
            <div class="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-xl p-3 text-center text-green-700 dark:text-green-400 text-sm font-medium mb-4">
              You are enrolled in this course
            </div>
            <NuxtLink
              :to="`/student/courses/${course.id}/learn`"
              class="block w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-center transition-colors"
            >
              Continue Learning
            </NuxtLink>
          </div>

          <div v-else>
            <button
              v-if="course.is_free"
              :disabled="enrolling"
              class="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold rounded-xl transition-colors mb-3 flex items-center justify-center gap-2"
              @click="handleEnroll"
            >
              <svg v-if="enrolling" class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              {{ enrolling ? 'Enrolling...' : 'Enroll Now for Free' }}
            </button>
            <button
              v-else
              class="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors mb-3"
              @click="handleEnroll"
            >
              Purchase Course
            </button>
          </div>

          <div
            v-if="enrollError"
            class="mt-3 p-3 rounded-lg bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-sm"
          >
            {{ enrollError }}
          </div>

          <div class="mt-6 space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {{ course.total_lessons }} lessons
            </div>
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Self-paced learning
            </div>
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              Certificate on completion
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else-if="pending" class="max-w-7xl mx-auto px-4 py-20 flex justify-center">
    <div class="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
  </div>

  <div v-else class="max-w-7xl mx-auto px-4 py-20 text-center">
    <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Course not found</h1>
    <NuxtLink to="/courses" class="text-indigo-600 hover:underline">Browse all courses</NuxtLink>
  </div>
</template>

<script setup lang="ts">
import type { ApiResponse, Course } from '../../types'
import { useAuthStore } from '../../stores/auth'

definePageMeta({ layout: 'default' })

const route = useRoute()
const authStore = useAuthStore()
const slug = route.params.slug as string

const { data, pending } = await useAsyncData(`course-${slug}`, () =>
  $fetch<ApiResponse<Course>>(`/api/courses/${slug}`).catch(() => null),
)

const course = computed(() => data.value?.data ?? null)

useHead(() => ({
  title: course.value ? `${course.value.title} — Open Brain Studio` : 'Course — Open Brain Studio',
}))

const expandedSections = ref<Set<string>>(new Set())
const isEnrolled = ref(false)
const enrolling = ref(false)
const enrollError = ref('')

function toggleSection(id: string) {
  if (expandedSections.value.has(id)) {
    expandedSections.value.delete(id)
  } else {
    expandedSections.value.add(id)
  }
}

function formatDuration(seconds: number) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

// Expand first section by default
watch(course, (c) => {
  if (c?.sections?.[0]) {
    expandedSections.value.add(c.sections[0].id)
  }
}, { immediate: true })

async function handleEnroll() {
  if (!authStore.isLoggedIn) {
    await navigateTo('/login')
    return
  }
  if (!course.value) return

  enrolling.value = true
  enrollError.value = ''

  try {
    await $fetch(`/api/courses/${course.value.id}/enroll`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${authStore.accessToken}` },
    })
    isEnrolled.value = true
    await navigateTo(`/student/courses/${course.value.id}/learn`)
  } catch (err: unknown) {
    const error = err as { data?: { message?: string }; message?: string }
    enrollError.value = error?.data?.message ?? error?.message ?? 'Enrollment failed'
  } finally {
    enrolling.value = false
  }
}
</script>
