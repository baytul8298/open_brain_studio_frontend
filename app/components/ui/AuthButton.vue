<template>
  <button
    type="submit"
    :disabled="loading || disabled"
    class="btn-primary anim-fade-up-d6"
  >
    <!-- shimmer gloss -->
    <span class="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
    <span class="relative flex items-center justify-center gap-2">
      <svg v-if="loading" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
      </svg>
      <slot />
    </span>
  </button>
</template>

<script setup lang="ts">
defineProps<{
  loading?: boolean
  disabled?: boolean
}>()
</script>
