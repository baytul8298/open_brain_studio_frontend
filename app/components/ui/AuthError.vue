<template>
  <div v-if="message" class="form-error mb-5">
    {{ message }}
  </div>
</template>

<script setup lang="ts">
defineProps<{ message: string }>()
</script>
