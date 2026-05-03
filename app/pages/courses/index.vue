<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="mb-10">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Browse Courses</h1>
      <p class="text-gray-500 dark:text-gray-400">
        Discover courses across all subjects and grade levels
      </p>
    </div>

    <!-- Filters -->
    <div class="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5 mb-8 flex flex-wrap gap-4 items-end">
      <div class="flex-1 min-w-48">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          Search
        </label>
        <input
          v-model="searchInput"
          type="search"
          placeholder="Search courses..."
          class="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition text-sm"
          @keyup.enter="applyFilters"
        />
      </div>

      <div class="min-w-36">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          Subject
        </label>
        <select
          v-model="subjectFilter"
          class="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition text-sm"
          @change="applyFilters"
        >
          <option value="">All Subjects</option>
          <option value="Mathematics">Mathematics</option>
          <option value="Science">Science</option>
          <option value="English">English</option>
          <option value="History">History</option>
          <option value="Geography">Geography</option>
          <option value="Physics">Physics</option>
          <option value="Chemistry">Chemistry</option>
          <option value="Biology">Biology</option>
          <option value="Computer Science">Computer Science</option>
        </select>
      </div>

      <div class="min-w-36">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          Grade Level
        </label>
        <select
          v-model="gradeFilter"
          class="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition text-sm"
          @change="applyFilters"
        >
          <option value="">All Grades</option>
          <option value="Grade 1">Grade 1</option>
          <option value="Grade 2">Grade 2</option>
          <option value="Grade 3">Grade 3</option>
          <option value="Grade 4">Grade 4</option>
          <option value="Grade 5">Grade 5</option>
          <option value="Grade 6">Grade 6</option>
          <option value="Grade 7">Grade 7</option>
          <option value="Grade 8">Grade 8</option>
          <option value="Grade 9">Grade 9</option>
          <option value="Grade 10">Grade 10</option>
          <option value="Grade 11">Grade 11</option>
          <option value="Grade 12">Grade 12</option>
        </select>
      </div>

      <div class="min-w-36">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          Sort by
        </label>
        <select
          v-model="sortFilter"
          class="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition text-sm"
          @change="applyFilters"
        >
          <option value="newest">Newest</option>
          <option value="popular">Most Popular</option>
          <option value="rating">Highest Rated</option>
        </select>
      </div>

      <button
        class="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-colors text-sm"
        @click="applyFilters"
      >
        Search
      </button>
    </div>

    <!-- Results -->
    <div v-if="pending" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <div v-for="i in 8" :key="i" class="rounded-2xl bg-gray-100 dark:bg-gray-800 animate-pulse h-72" />
    </div>

    <div v-else-if="courses.length === 0" class="text-center py-20">
      <div class="text-6xl mb-4">📚</div>
      <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No courses found</h3>
      <p class="text-gray-500 dark:text-gray-400">Try adjusting your filters or search terms</p>
    </div>

    <div v-else>
      <p class="text-sm text-gray-500 dark:text-gray-400 mb-5">
        Showing {{ courses.length }} courses
      </p>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <CourseCard v-for="course in courses" :key="course.id" :course="course" />
      </div>

      <!-- Load More -->
      <div v-if="meta?.hasMore" class="mt-10 text-center">
        <button
          :disabled="loadingMore"
          class="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold rounded-xl transition-colors flex items-center gap-2 mx-auto"
          @click="handleLoadMore"
        >
          <svg v-if="loadingMore" class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          {{ loadingMore ? 'Loading...' : 'Load More Courses' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCourses } from '../../composables/useCourses'

definePageMeta({ layout: 'default' })
useHead({ title: 'Browse Courses — Open Brain Studio' })

const { courses, pending, meta, filters, fetchCourses, loadMore } = useCourses()

const searchInput = ref('')
const subjectFilter = ref('')
const gradeFilter = ref('')
const sortFilter = ref<'newest' | 'popular' | 'rating'>('newest')
const loadingMore = ref(false)

// Initial fetch
await fetchCourses({ limit: 12 })

function applyFilters() {
  filters.search = searchInput.value || undefined
  filters.subject = subjectFilter.value || undefined
  filters.grade_level = gradeFilter.value || undefined
  filters.sort = sortFilter.value
  fetchCourses()
}

async function handleLoadMore() {
  loadingMore.value = true
  await loadMore()
  loadingMore.value = false
}
</script>
