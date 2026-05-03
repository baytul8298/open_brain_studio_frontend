<template>
  <div class="flex h-[calc(100vh-4rem)] overflow-hidden">
    <!-- Lesson Sidebar -->
    <aside
      class="w-80 flex-shrink-0 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col overflow-hidden"
    >
      <div class="p-4 border-b border-gray-200 dark:border-gray-800">
        <h2 class="font-bold text-gray-900 dark:text-white text-sm truncate">
          {{ course?.title ?? 'Course' }}
        </h2>
        <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
          {{ completedCount }}/{{ totalLessons }} lessons completed
        </p>
        <div class="mt-2 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full">
          <div
            class="h-full bg-indigo-600 rounded-full transition-all"
            :style="{ width: `${progressPct}%` }"
          />
        </div>
      </div>

      <div class="flex-1 overflow-y-auto">
        <LessonList
          :sections="course?.sections ?? []"
          :current-lesson-id="currentLessonId"
          :progress-map="progressMap"
          @select="selectLesson"
        />
      </div>
    </aside>

    <!-- Main content -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Loading state -->
      <div v-if="loadingLesson" class="flex-1 flex items-center justify-center">
        <div class="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      </div>

      <!-- No lesson selected -->
      <div v-else-if="!currentLesson" class="flex-1 flex items-center justify-center text-center p-8">
        <div>
          <div class="text-5xl mb-4">👈</div>
          <h3 class="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Select a lesson to start learning
          </h3>
        </div>
      </div>

      <!-- Lesson content -->
      <div v-else class="flex-1 flex flex-col overflow-hidden">
        <!-- Video lesson -->
        <div v-if="currentLesson.lesson_type === 'video'" class="bg-black flex-shrink-0">
          <VideoPlayer
            v-if="videoSrc"
            :src="videoSrc"
            class="max-h-[60vh] mx-auto"
            @progress="onVideoProgress"
            @ended="onVideoEnded"
          />
          <div v-else class="aspect-video flex items-center justify-center text-gray-400 max-h-[60vh] mx-auto w-full">
            <div class="text-center">
              <div class="text-4xl mb-2">🎬</div>
              <p class="text-sm">No video available</p>
            </div>
          </div>
        </div>

        <!-- Lesson info panel -->
        <div class="flex-1 overflow-y-auto p-6">
          <div class="max-w-3xl">
            <div class="flex items-center gap-3 mb-4">
              <span
                class="px-2.5 py-1 text-xs font-medium rounded-full"
                :class="lessonTypeBadge"
              >
                {{ currentLesson.lesson_type }}
              </span>
              <h1 class="text-xl font-bold text-gray-900 dark:text-white">
                {{ currentLesson.title }}
              </h1>
            </div>

            <!-- Text lesson content -->
            <div
              v-if="currentLesson.lesson_type === 'text' && currentLesson.content"
              class="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line"
            >
              {{ currentLesson.content }}
            </div>

            <!-- Mark complete button -->
            <div class="mt-6 flex items-center gap-4">
              <button
                v-if="!isCurrentCompleted"
                :disabled="markingComplete"
                class="px-6 py-2.5 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-semibold rounded-xl transition-colors flex items-center gap-2 text-sm"
                @click="markLessonComplete"
              >
                <svg v-if="markingComplete" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Mark as Complete
              </button>
              <div
                v-else
                class="flex items-center gap-2 text-green-600 dark:text-green-400 text-sm font-medium"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Completed
              </div>

              <!-- Next lesson -->
              <button
                v-if="nextLesson"
                class="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors text-sm"
                @click="selectLesson(nextLesson!.id)"
              >
                Next Lesson →
              </button>
            </div>

            <!-- Resources -->
            <div v-if="currentLesson.resources && currentLesson.resources.length > 0" class="mt-8">
              <h3 class="font-semibold text-gray-900 dark:text-white mb-3">Resources</h3>
              <div class="space-y-2">
                <a
                  v-for="resource in currentLesson.resources"
                  :key="resource.id"
                  :href="`/api/media/${resource.media_id}`"
                  target="_blank"
                  class="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm"
                >
                  <svg class="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  {{ resource.title }}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ApiResponse, Course, Lesson, LessonProgress } from '../../../../types'
import { useAuthStore } from '../../../../stores/auth'

definePageMeta({ layout: 'dashboard' })

const route = useRoute()
const authStore = useAuthStore()
const courseId = route.params.id as string

if (!authStore.isLoggedIn) {
  await navigateTo('/login')
}

const { data: courseData } = await useAsyncData(`learn-course-${courseId}`, () =>
  $fetch<ApiResponse<Course>>(`/api/courses/${courseId}`, {
    headers: authStore.accessToken ? { Authorization: `Bearer ${authStore.accessToken}` } : {},
  }),
)

const course = computed(() => courseData.value?.data ?? null)

useHead(() => ({ title: `Learning: ${course.value?.title ?? 'Course'} — Open Brain Studio` }))

// Flatten all lessons
const allLessons = computed<Lesson[]>(() => {
  if (!course.value?.sections) return []
  return course.value.sections.flatMap((s) => s.lessons ?? [])
})

const totalLessons = computed(() => allLessons.value.length)

const currentLessonId = ref<string | null>(null)
const currentLesson = ref<Lesson | null>(null)
const loadingLesson = ref(false)
const progressMap = ref<Record<string, LessonProgress>>({})
const markingComplete = ref(false)

const completedCount = computed(() =>
  Object.values(progressMap.value).filter((p) => p.completed).length,
)

const progressPct = computed(() =>
  totalLessons.value > 0 ? Math.round((completedCount.value / totalLessons.value) * 100) : 0,
)

const isCurrentCompleted = computed(() => {
  if (!currentLessonId.value) return false
  return progressMap.value[currentLessonId.value]?.completed ?? false
})

const nextLesson = computed<Lesson | null>(() => {
  if (!currentLessonId.value) return allLessons.value[0] ?? null
  const idx = allLessons.value.findIndex((l) => l.id === currentLessonId.value)
  return allLessons.value[idx + 1] ?? null
})

const videoSrc = computed(() => {
  if (!currentLesson.value?.video) return null
  const config = useRuntimeConfig()
  // In a real app, build signed HLS URL
  return null
})

const lessonTypeBadge = computed(() => {
  const type = currentLesson.value?.lesson_type
  const map: Record<string, string> = {
    video: 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300',
    text: 'bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300',
    quiz: 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-300',
    assignment: 'bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300',
    live: 'bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300',
  }
  return map[type ?? 'video'] ?? ''
})

async function selectLesson(id: string) {
  if (id === currentLessonId.value) return
  loadingLesson.value = true
  currentLessonId.value = id

  try {
    const res = await $fetch<ApiResponse<Lesson>>(`/api/lessons/${id}`, {
      headers: { Authorization: `Bearer ${authStore.accessToken}` },
    })
    currentLesson.value = res.data
  } catch {
    currentLesson.value = null
  } finally {
    loadingLesson.value = false
  }
}

async function markLessonComplete() {
  if (!currentLessonId.value) return
  markingComplete.value = true

  try {
    const res = await $fetch<ApiResponse<LessonProgress>>(
      `/api/lessons/${currentLessonId.value}/progress`,
      {
        method: 'POST',
        headers: { Authorization: `Bearer ${authStore.accessToken}` },
        body: { last_position_sec: 0, watch_seconds: 0, completed: true },
      },
    )
    progressMap.value[currentLessonId.value] = res.data
  } finally {
    markingComplete.value = false
  }
}

function onVideoProgress(data: { currentTime: number; watchedSeconds: number }) {
  if (!currentLessonId.value) return
  // Debounced progress save would go here
}

function onVideoEnded() {
  markLessonComplete()
}

// Auto-select first lesson
onMounted(() => {
  const firstLesson = allLessons.value[0]
  if (firstLesson) selectLesson(firstLesson.id)
})
</script>
