<template>
  <div class="mb-5 anim-fade-up" :style="delay ? `animation-delay: ${delay}s` : ''">
    <label :for="id" class="form-label">{{ label }}</label>
    <div class="relative">
      <!-- Left icon slot -->
      <span class="absolute left-[15px] top-1/2 -translate-y-1/2 text-muted pointer-events-none">
        <slot name="icon" />
      </span>

      <input
        :id="id"
        v-bind="$attrs"
        :type="inputType"
        :value="modelValue"
        :placeholder="placeholder"
        class="form-input"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      />

      <!-- Password toggle -->
      <button
        v-if="type === 'password'"
        type="button"
        class="absolute right-[14px] top-1/2 -translate-y-1/2 text-muted hover:text-gold transition-colors p-0 bg-transparent border-none cursor-pointer"
        @click="showPw = !showPw"
        aria-label="Toggle password visibility"
      >
        <!-- eye-off -->
        <svg v-if="showPw" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
          <line x1="1" y1="1" x2="23" y2="23"/>
        </svg>
        <!-- eye -->
        <svg v-else class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
      </button>
    </div>

    <!-- Slot for "Forgot password?" link etc. -->
    <slot name="footer" />
  </div>
</template>

<script setup lang="ts">
defineOptions({ inheritAttrs: false })

const props = defineProps<{
  id: string
  label: string
  type?: string
  modelValue: string
  placeholder?: string
  delay?: number
}>()

defineEmits<{ 'update:modelValue': [value: string] }>()

const showPw = ref(false)
const inputType = computed(() => {
  if (props.type === 'password') return showPw.value ? 'text' : 'password'
  return props.type ?? 'text'
})
</script>
