<template>
  <div>
    <!-- ── Welcome header ──────────────────────────────────────── -->
    <div class="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <div class="flex items-center gap-2 mb-1">
          <span
            class="inline-flex items-center gap-1.5 text-[0.68rem] font-medium uppercase tracking-[0.12em] px-2 py-1 rounded-md"
            :class="rolePillClass"
          >
            <span class="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
            {{ roleLabel }}
          </span>
        </div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
          Welcome back, {{ firstName }}!
        </h1>
        <p class="text-gray-500 dark:text-gray-400 mt-0.5 text-sm">{{ subheading }}</p>
      </div>

      <!-- Quick action CTA -->
      <NuxtLink
        :to="ctaLink"
        class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg"
        :class="ctaBgClass"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" :d="ctaIcon" />
        </svg>
        {{ ctaLabel }}
      </NuxtLink>
    </div>

    <!-- ── Stats row ────────────────────────────────────────────── -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div
        v-for="stat in stats"
        :key="stat.label"
        class="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5 hover:shadow-md transition-shadow"
      >
        <div class="flex items-start justify-between">
          <div>
            <p class="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">{{ stat.label }}</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ stat.value }}</p>
            <p v-if="stat.sub" class="text-[0.72rem] text-gray-400 dark:text-gray-500 mt-0.5">{{ stat.sub }}</p>
          </div>
          <div class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" :class="stat.iconBg">
            <svg class="w-5 h-5" :class="stat.iconColor" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" :d="stat.icon" />
            </svg>
          </div>
        </div>

        <!-- Progress bar (optional) -->
        <div v-if="stat.progress !== undefined" class="mt-3">
          <div class="h-1 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
            <div
              class="h-full rounded-full transition-all duration-700"
              :class="stat.iconColor.replace('text-', 'bg-')"
              :style="{ width: `${stat.progress}%` }"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- ── Main content ──────────────────────────────────────────── -->
    <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">

      <!-- Left panel: main list -->
      <div class="xl:col-span-2 space-y-6">

        <!-- ─ STUDENT: My courses ─ -->
        <section v-if="authStore.isStudent">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-base font-semibold text-gray-900 dark:text-white">Continue Learning</h2>
            <NuxtLink to="/student/courses" class="text-xs font-medium text-indigo-600 hover:text-indigo-700">
              View all →
            </NuxtLink>
          </div>

          <div v-if="enrollmentsPending" class="space-y-3">
            <div v-for="i in 3" :key="i" class="h-20 rounded-2xl bg-gray-100 dark:bg-gray-800 animate-pulse" />
          </div>

          <div
            v-else-if="enrollments.length === 0"
            class="text-center py-12 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800"
          >
            <div class="text-4xl mb-2">📚</div>
            <p class="font-medium text-gray-700 dark:text-gray-300 text-sm">No courses enrolled yet</p>
            <NuxtLink to="/courses" class="mt-3 inline-block text-xs text-indigo-600 font-medium">
              Browse courses →
            </NuxtLink>
          </div>

          <div v-else class="space-y-3">
            <div
              v-for="enr in enrollments.slice(0, 5)"
              :key="enr.id"
              class="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-4 flex items-center gap-4 hover:shadow-md transition-shadow"
            >
              <div class="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 flex-shrink-0 overflow-hidden">
                <img v-if="enr.course?.thumbnail_url" :src="enr.course.thumbnail_url" :alt="enr.course?.title" class="w-full h-full object-cover" />
                <div v-else class="w-full h-full flex items-center justify-center text-xl">🎓</div>
              </div>
              <div class="flex-1 min-w-0">
                <p class="font-semibold text-gray-900 dark:text-white text-sm truncate">{{ enr.course?.title ?? 'Course' }}</p>
                <div class="flex items-center gap-2 mt-1.5">
                  <div class="flex-1 h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div class="h-full bg-indigo-500 rounded-full" :style="{ width: `${enr.progress_pct}%` }" />
                  </div>
                  <span class="text-[0.7rem] text-gray-400 dark:text-gray-500 whitespace-nowrap">{{ enr.progress_pct }}%</span>
                </div>
              </div>
              <NuxtLink
                :to="`/student/courses/${enr.course_id}/learn`"
                class="flex-shrink-0 px-3 py-1.5 bg-indigo-50 dark:bg-indigo-900/30 hover:bg-indigo-100 text-indigo-700 dark:text-indigo-300 text-xs font-medium rounded-lg transition-colors"
              >
                Continue
              </NuxtLink>
            </div>
          </div>
        </section>

        <!-- ─ TEACHER: Recent courses ─ -->
        <section v-if="authStore.isTeacher">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-base font-semibold text-gray-900 dark:text-white">My Courses</h2>
            <NuxtLink to="/teacher/courses" class="text-xs font-medium text-indigo-600 hover:text-indigo-700">
              Manage all →
            </NuxtLink>
          </div>

          <div v-if="coursesPending" class="space-y-3">
            <div v-for="i in 3" :key="i" class="h-20 rounded-2xl bg-gray-100 dark:bg-gray-800 animate-pulse" />
          </div>

          <div
            v-else-if="courses.length === 0"
            class="text-center py-12 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800"
          >
            <div class="text-4xl mb-2">🎓</div>
            <p class="font-medium text-gray-700 dark:text-gray-300 text-sm">No courses created yet</p>
            <NuxtLink to="/teacher/courses/create" class="mt-3 inline-block text-xs text-indigo-600 font-medium">
              Create your first course →
            </NuxtLink>
          </div>

          <div v-else class="space-y-3">
            <div
              v-for="course in courses.slice(0, 5)"
              :key="course.id"
              class="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-4 flex items-center gap-4 hover:shadow-md transition-shadow"
            >
              <div class="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 flex-shrink-0 overflow-hidden">
                <img v-if="course.thumbnail_url" :src="course.thumbnail_url" :alt="course.title" class="w-full h-full object-cover" />
                <div v-else class="w-full h-full flex items-center justify-center text-xl">📘</div>
              </div>
              <div class="flex-1 min-w-0">
                <p class="font-semibold text-gray-900 dark:text-white text-sm truncate">{{ course.title }}</p>
                <p class="text-[0.72rem] text-gray-400 dark:text-gray-500 mt-0.5">
                  {{ course.enrolled_count }} students · {{ course.total_lessons }} lessons
                </p>
              </div>
              <div class="flex items-center gap-3 flex-shrink-0">
                <span
                  class="px-2 py-0.5 text-[0.68rem] font-medium rounded-full"
                  :class="courseStatusClass(course.status)"
                >
                  {{ course.status }}
                </span>
                <NuxtLink :to="`/teacher/courses/${course.id}/edit`" class="text-xs text-indigo-600 font-medium hover:underline">
                  Edit
                </NuxtLink>
              </div>
            </div>
          </div>
        </section>

        <!-- ─ Quick Actions ─ -->
        <section>
          <h2 class="text-base font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <NuxtLink
              v-for="action in quickActions"
              :key="action.label"
              :to="action.to"
              class="flex flex-col items-center gap-2 p-4 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 hover:shadow-md hover:border-indigo-200 dark:hover:border-indigo-800 transition-all group text-center"
            >
              <div class="w-10 h-10 rounded-xl flex items-center justify-center" :class="action.iconBg">
                <svg class="w-5 h-5" :class="action.iconColor" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" :d="action.icon" />
                </svg>
              </div>
              <span class="text-xs font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white">
                {{ action.label }}
              </span>
            </NuxtLink>
          </div>
        </section>
      </div>

      <!-- Right panel: sidebar info -->
      <div class="space-y-4">

        <!-- Profile card -->
        <div class="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5">
          <div class="flex items-center gap-3 mb-4">
            <div
              class="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
              :class="authStore.isTeacher ? 'bg-amber-500' : 'bg-indigo-600'"
            >
              {{ userInitials }}
            </div>
            <div>
              <p class="font-semibold text-gray-900 dark:text-white text-sm">{{ displayName }}</p>
              <p class="text-xs text-gray-500 dark:text-gray-400">{{ authStore.user?.email }}</p>
            </div>
          </div>
          <div class="border-t border-gray-100 dark:border-gray-800 pt-4 space-y-2">
            <div class="flex justify-between text-xs">
              <span class="text-gray-500 dark:text-gray-400">Role</span>
              <span class="font-medium text-gray-900 dark:text-white">{{ roleLabel }}</span>
            </div>
            <div class="flex justify-between text-xs">
              <span class="text-gray-500 dark:text-gray-400">Status</span>
              <span class="font-medium text-green-600">{{ authStore.user?.status ?? 'active' }}</span>
            </div>
          </div>
          <NuxtLink
            to="/settings"
            class="mt-4 block w-full text-center py-2 text-xs font-medium text-indigo-600 border border-indigo-200 dark:border-indigo-800 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors"
          >
            Edit Profile
          </NuxtLink>
        </div>

        <!-- Recent notifications -->
        <div class="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5">
          <div class="flex items-center justify-between mb-3">
            <h3 class="text-sm font-semibold text-gray-900 dark:text-white">Notifications</h3>
            <span
              v-if="uiStore.unreadCount > 0"
              class="w-5 h-5 bg-red-500 text-white text-[0.65rem] font-medium rounded-full flex items-center justify-center"
            >
              {{ uiStore.unreadCount }}
            </span>
          </div>
          <div v-if="uiStore.notifications.length === 0" class="py-4 text-center">
            <p class="text-xs text-gray-400 dark:text-gray-500">No notifications</p>
          </div>
          <div v-else class="space-y-2">
            <div
              v-for="n in uiStore.notifications.slice(0, 5)"
              :key="n.id"
              class="p-2.5 rounded-xl cursor-pointer transition-colors"
              :class="n.is_read ? 'hover:bg-gray-50 dark:hover:bg-gray-800' : 'bg-indigo-50 dark:bg-indigo-900/20 hover:bg-indigo-100'"
              @click="uiStore.markRead(n.id)"
            >
              <p class="text-xs font-medium text-gray-900 dark:text-white">{{ n.title }}</p>
              <p class="text-[0.68rem] text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1">{{ n.body }}</p>
            </div>
          </div>
        </div>

        <!-- Tips card -->
        <div class="bg-gradient-to-br rounded-2xl p-5 text-white"
             :class="authStore.isTeacher ? 'from-amber-500 to-orange-600' : 'from-indigo-500 to-violet-600'">
          <p class="text-xs font-medium uppercase tracking-wide opacity-80 mb-2">💡 Tip</p>
          <p class="text-sm font-medium leading-relaxed">{{ tipText }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ApiResponse, Course, Enrollment } from '../types'
import { useAuthStore } from '../stores/auth'
import { useUiStore } from '../stores/ui'

definePageMeta({ layout: 'dashboard' })
useHead({ title: 'Dashboard — Open Brain Studio' })

const authStore = useAuthStore()
const uiStore   = useUiStore()

// Guard
if (!authStore.isLoggedIn) await navigateTo('/login')
if (!authStore.user) await authStore.fetchMe()

// ── Identity ───────────────────────────────────────────────────
const displayName = computed(() => {
  const p = authStore.user?.profile
  if (p) return `${p.first_name} ${p.last_name}`
  return authStore.user?.email ?? 'User'
})

const firstName = computed(() => authStore.user?.profile?.first_name ?? displayName.value.split(' ')[0])

const userInitials = computed(() => {
  const p = authStore.user?.profile
  if (p) return `${p.first_name[0] ?? ''}${p.last_name[0] ?? ''}`.toUpperCase()
  return authStore.user?.email?.[0]?.toUpperCase() ?? 'U'
})

const roleLabel = computed(() => {
  const r = authStore.user?.role ?? ''
  return { student: 'Student', teacher: 'Teacher', admin: 'Admin', super_admin: 'Super Admin' }[r] ?? r
})

const rolePillClass = computed(() =>
  authStore.isTeacher
    ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
    : 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400',
)

const subheading = computed(() =>
  authStore.isTeacher
    ? 'Here\'s an overview of your teaching activity today.'
    : 'Here\'s your learning progress overview.',
)

// ── CTA ────────────────────────────────────────────────────────
const ctaLink  = computed(() => authStore.isTeacher ? '/teacher/courses/create' : '/courses')
const ctaLabel = computed(() => authStore.isTeacher ? 'Create Course' : 'Browse Courses')
const ctaBgClass = computed(() =>
  authStore.isTeacher
    ? 'bg-gradient-to-r from-amber-500 to-orange-600 hover:shadow-orange-300'
    : 'bg-gradient-to-r from-indigo-500 to-violet-600 hover:shadow-indigo-300',
)
const ctaIcon = computed(() =>
  authStore.isTeacher
    ? 'M12 5v14M5 12h14'
    : 'M21 21l-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0z',
)

// ── Tip ────────────────────────────────────────────────────────
const tipText = computed(() =>
  authStore.isTeacher
    ? 'Courses with video previews get 3× more enrollments. Add a free preview lesson to boost visibility.'
    : 'Learning for just 20 minutes a day consistently outperforms marathon study sessions.',
)

// ── Student data ───────────────────────────────────────────────
const { data: enrollmentData, pending: enrollmentsPending } = await useAsyncData(
  'dash-enrollments',
  async () => {
    if (!authStore.isStudent || !authStore.token) return null
    return $fetch<ApiResponse<Enrollment[]>>('/api/users/enrollments', {
      headers: { Authorization: `Bearer ${authStore.token}` },
    }).catch(() => null)
  },
)
const enrollments = computed(() => enrollmentData.value?.data ?? [])

// ── Teacher data ───────────────────────────────────────────────
const { data: coursesData, pending: coursesPending } = await useAsyncData(
  'dash-courses',
  async () => {
    if (!authStore.isTeacher || !authStore.token) return null
    return $fetch<ApiResponse<Course[]>>('/api/courses', {
      headers: { Authorization: `Bearer ${authStore.token}` },
      query: { teacher_id: authStore.user?.id, limit: 50 },
    }).catch(() => null)
  },
)
const courses = computed(() => coursesData.value?.data ?? [])

// ── Stats ──────────────────────────────────────────────────────
const stats = computed(() => {
  if (authStore.isTeacher) {
    const total    = courses.value.length
    const live     = courses.value.filter(c => c.status === 'live').length
    const students = courses.value.reduce((s, c) => s + c.enrolled_count, 0)
    const rated    = courses.value.filter(c => Number(c.rating_avg) > 0)
    const avgRating = rated.length
      ? (rated.reduce((s, c) => s + Number(c.rating_avg), 0) / rated.length).toFixed(1)
      : '—'

    return [
      { label: 'Total Courses', value: total, sub: `${live} live`, icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253', iconBg: 'bg-indigo-100 dark:bg-indigo-900/50', iconColor: 'text-indigo-600 dark:text-indigo-400' },
      { label: 'Total Students', value: students, icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z', iconBg: 'bg-green-100 dark:bg-green-900/50', iconColor: 'text-green-600 dark:text-green-400' },
      { label: 'Avg Rating', value: avgRating, icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z', iconBg: 'bg-yellow-100 dark:bg-yellow-900/50', iconColor: 'text-yellow-600 dark:text-yellow-400' },
      { label: 'Draft Courses', value: courses.value.filter(c => c.status === 'draft').length, icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z', iconBg: 'bg-gray-100 dark:bg-gray-800', iconColor: 'text-gray-600 dark:text-gray-400' },
    ]
  }

  const total     = enrollments.value.length
  const completed = enrollments.value.filter(e => e.progress_pct === 100).length
  const inProg    = enrollments.value.filter(e => e.progress_pct > 0 && e.progress_pct < 100).length
  const avgPct    = total ? Math.round(enrollments.value.reduce((s, e) => s + e.progress_pct, 0) / total) : 0

  return [
    { label: 'Enrolled Courses', value: total,     icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253', iconBg: 'bg-indigo-100 dark:bg-indigo-900/50', iconColor: 'text-indigo-600 dark:text-indigo-400' },
    { label: 'Completed',        value: completed,  icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z', iconBg: 'bg-green-100 dark:bg-green-900/50', iconColor: 'text-green-600 dark:text-green-400' },
    { label: 'In Progress',      value: inProg,     icon: 'M13 10V3L4 14h7v7l9-11h-7z', iconBg: 'bg-yellow-100 dark:bg-yellow-900/50', iconColor: 'text-yellow-600 dark:text-yellow-400' },
    { label: 'Avg Progress',     value: `${avgPct}%`, progress: avgPct, icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', iconBg: 'bg-violet-100 dark:bg-violet-900/50', iconColor: 'text-violet-600 dark:text-violet-400' },
  ]
})

// ── Quick actions ──────────────────────────────────────────────
const quickActions = computed(() => {
  if (authStore.isTeacher) {
    return [
      { label: 'New Course',   to: '/teacher/courses/create',  icon: 'M12 5v14M5 12h14', iconBg: 'bg-indigo-100 dark:bg-indigo-900/50', iconColor: 'text-indigo-600 dark:text-indigo-400' },
      { label: 'My Students',  to: '/teacher/students',         icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z', iconBg: 'bg-green-100 dark:bg-green-900/50', iconColor: 'text-green-600 dark:text-green-400' },
      { label: 'Analytics',    to: '/teacher/analytics',        icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', iconBg: 'bg-yellow-100 dark:bg-yellow-900/50', iconColor: 'text-yellow-600 dark:text-yellow-400' },
      { label: 'Live Session', to: '/teacher/live-sessions',    icon: 'M15 10l4.553-2.069A1 1 0 0121 8.82v6.36a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z', iconBg: 'bg-red-100 dark:bg-red-900/50', iconColor: 'text-red-600 dark:text-red-400' },
      { label: 'Assignments',  to: '/teacher/assignments',      icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M12 16h.01', iconBg: 'bg-purple-100 dark:bg-purple-900/50', iconColor: 'text-purple-600 dark:text-purple-400' },
      { label: 'Profile',      to: '/teacher/profile',          icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z', iconBg: 'bg-gray-100 dark:bg-gray-800', iconColor: 'text-gray-600 dark:text-gray-400' },
    ]
  }
  return [
    { label: 'Browse Courses', to: '/courses',            icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z', iconBg: 'bg-indigo-100 dark:bg-indigo-900/50', iconColor: 'text-indigo-600 dark:text-indigo-400' },
    { label: 'My Learning',    to: '/student/courses',    icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253', iconBg: 'bg-green-100 dark:bg-green-900/50', iconColor: 'text-green-600 dark:text-green-400' },
    { label: 'Assignments',    to: '/student/assignments',icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2', iconBg: 'bg-yellow-100 dark:bg-yellow-900/50', iconColor: 'text-yellow-600 dark:text-yellow-400' },
    { label: 'My Grades',      to: '/student/grades',     icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z', iconBg: 'bg-purple-100 dark:bg-purple-900/50', iconColor: 'text-purple-600 dark:text-purple-400' },
    { label: 'Schedule',       to: '/student/schedule',   icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', iconBg: 'bg-red-100 dark:bg-red-900/50', iconColor: 'text-red-600 dark:text-red-400' },
    { label: 'Messages',       to: '/student/messages',   icon: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z', iconBg: 'bg-teal-100 dark:bg-teal-900/50', iconColor: 'text-teal-600 dark:text-teal-400' },
  ]
})

function courseStatusClass(status: string) {
  const map: Record<string, string> = {
    live:           'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300',
    draft:          'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400',
    pending_review: 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-300',
    archived:       'bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400',
  }
  return map[status] ?? ''
}

// Fetch notifications on load
onMounted(() => uiStore.fetchNotifications())
</script>
