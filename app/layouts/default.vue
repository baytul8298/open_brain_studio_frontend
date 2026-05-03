<template>
  <div class="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
    <!-- navbar placeholder -->
    <main>
      <slot />
    </main>
    <footer class="bg-gray-900 text-gray-400 py-10 mt-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row justify-between items-center gap-4">
          <div class="text-lg font-bold text-white">Open Brain Studio</div>
          <p class="text-sm">
            &copy; {{ new Date().getFullYear() }} Open Brain Studio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
</script>
