<template>
  <!-- Form header -->
  <div class="mb-[38px] anim-fade-up-d1">
    <div class="inline-flex items-center gap-[6px] text-[0.7rem] font-medium uppercase tracking-[0.12em] text-rust mb-[14px]">
      <span class="w-[6px] h-[6px] rounded-full bg-rust"></span>
      Verify your number
    </div>
    <h2 class="font-display text-[2.1rem] text-ink leading-[1.2] mb-2">
      Enter verification<br/>code
    </h2>
    <p class="text-[0.88rem] font-light text-muted">
      We sent a 6-digit code to
      <span class="text-ink font-medium">{{ maskedPhone }}</span>
    </p>
  </div>

  <form @submit.prevent="handleVerify">
    <!-- OTP Inputs -->
    <div class="flex justify-center gap-[12px] mb-7 anim-fade-up-d3">
      <input
        v-for="(digit, index) in 6"
        :key="index"
        :ref="el => { if (el) otpRefs[index] = el }"
        v-model="otpDigits[index]"
        type="text"
        inputmode="numeric"
        maxlength="1"
        class="otp-input"
        @input="handleInput(index, $event)"
        @keydown="handleKeydown(index, $event)"
        @paste="handlePaste($event)"
      />
    </div>

    <!-- Timer / Resend -->
    <div class="text-center mb-7 anim-fade-up-d4">
      <p v-if="timer > 0" class="text-[0.84rem] text-muted">
        Resend code in <span class="text-ink font-medium">{{ formatTime }}</span>
      </p>
      <button
        v-else
        type="button"
        class="text-[0.84rem] text-gold font-medium hover:text-rust transition-colors border-b border-gold-light"
        @click="handleResend"
        :disabled="resendLoading"
      >
        {{ resendLoading ? 'Sending...' : 'Resend code' }}
      </button>
    </div>

    <!-- Error -->
    <UiAuthError :message="errorMessage" />

    <!-- Submit -->
    <UiAuthButton :loading="loading">
      {{ loading ? 'Verifying…' : 'Verify & Continue →' }}
    </UiAuthButton>

    <!-- Back to login -->
    <div class="text-center mt-6 anim-fade-up-d5">
      <NuxtLink
        to="/login"
        class="text-[0.84rem] text-muted hover:text-gold transition-colors inline-flex items-center gap-1"
      >
        <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="m15 18-6-6 6-6"/>
        </svg>
        Back to sign in
      </NuxtLink>
    </div>
  </form>
</template>

<script setup lang="ts">
import { useAuthStore } from '../stores/auth'

definePageMeta({ layout: 'auth' })
useHead({ title: 'Verify Number — Open Brain Studio' })

const authStore = useAuthStore()
const route = useRoute()

// Get phone from query param or auth store
const phone = computed(() => (route.query.phone as string) || authStore.pendingPhone || '')
const maskedPhone = computed(() => {
  if (!phone.value) return 'your number'
  const digits = phone.value.replace(/\D/g, '')
  if (digits.length < 4) return phone.value
  return phone.value.slice(0, -4).replace(/\d/g, '•') + digits.slice(-4)
})

// OTP state
const otpDigits = ref<string[]>(Array(6).fill(''))
const otpRefs = ref<(HTMLInputElement | null)[]>([])
const loading = ref(false)
const resendLoading = ref(false)
const errorMessage = ref('')
const timer = ref(60)
let timerInterval: ReturnType<typeof setInterval>

// Timer logic
onMounted(() => startTimer())
onUnmounted(() => clearInterval(timerInterval))

function startTimer() {
  timer.value = 60
  clearInterval(timerInterval)
  timerInterval = setInterval(() => {
    if (timer.value > 0) timer.value--
    else clearInterval(timerInterval)
  }, 1000)
}

const formatTime = computed(() => {
  const mins = Math.floor(timer.value / 60)
  const secs = timer.value % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
})

// OTP Input handling
function handleInput(index: number, event: Event) {
  const target = event.target as HTMLInputElement
  const value = target.value.replace(/\D/g, '') // Only digits
  
  if (value) {
    otpDigits.value[index] = value.slice(-1)
    // Auto-focus next
    if (index < 5) {
      otpRefs.value[index + 1]?.focus()
    }
  }
  
  // Clear error on input
  if (errorMessage.value) errorMessage.value = ''
}

function handleKeydown(index: number, event: KeyboardEvent) {
  // Backspace on empty → focus previous
  if (event.key === 'Backspace' && !otpDigits.value[index] && index > 0) {
    otpRefs.value[index - 1]?.focus()
  }
  // Left arrow → previous
  if (event.key === 'ArrowLeft' && index > 0) {
    otpRefs.value[index - 1]?.focus()
  }
  // Right arrow → next
  if (event.key === 'ArrowRight' && index < 5) {
    otpRefs.value[index + 1]?.focus()
  }
}

function handlePaste(event: ClipboardEvent) {
  event.preventDefault()
  const pasted = event.clipboardData?.getData('text')?.replace(/\D/g, '') || ''
  
  for (let i = 0; i < Math.min(pasted.length, 6); i++) {
    otpDigits.value[i] = pasted[i]
  }
  
  // Focus next empty or last
  const nextEmpty = otpDigits.value.findIndex(d => !d)
  const focusIndex = nextEmpty === -1 ? 5 : Math.min(nextEmpty, 5)
  otpRefs.value[focusIndex]?.focus()
}

// Resend code
async function handleResend() {
  if (!phone.value) {
    errorMessage.value = 'Phone number not found. Please go back and try again.'
    return
  }

  resendLoading.value = true
  try {
    await authStore.resendOtp(phone.value)
    startTimer()
    otpDigits.value = Array(6).fill('')
    otpRefs.value[0]?.focus()
  } catch (err: unknown) {
    const e = err as { data?: { message?: string }; message?: string }
    errorMessage.value = e?.data?.message ?? e?.message ?? 'Failed to resend code. Please try again.'
  } finally {
    resendLoading.value = false
  }
}

// Verify
async function handleVerify() {
  const otp = otpDigits.value.join('')

  if (otp.length !== 6) {
    errorMessage.value = 'Please enter all 6 digits.'
    return
  }

  loading.value = true
  errorMessage.value = ''

  try {
    await authStore.verifyOtp(phone.value, otp)
    const role = authStore.user?.role
    await navigateTo(role === 'teacher' ? '/teacher/dashboard' : '/student/dashboard')
  } catch (err: unknown) {
    const e = err as { data?: { message?: string }; message?: string }
    errorMessage.value = e?.data?.message ?? e?.message ?? 'Invalid code. Please try again.'
    // Clear inputs on error
    otpDigits.value = Array(6).fill('')
    otpRefs.value[0]?.focus()
  } finally {
    loading.value = false
  }
}

// Auto-submit when all digits filled
watch(otpDigits, (digits) => {
  if (digits.every(d => d) && digits.length === 6) {
    handleVerify()
  }
}, { deep: true })

// Redirect if already verified and logged in
if (authStore.isLoggedIn && authStore.isVerified) {
  const role = authStore.user?.role
  await navigateTo(role === 'teacher' ? '/teacher/dashboard' : '/student/dashboard')
}
</script>

<style scoped>
/* OTP Input styling */
.otp-input {
  width: 52px;
  height: 64px;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 600;
  font-family: inherit;
  color: #2c1810;
  background: #f0e8d6;
  border: 1.5px solid #cfc5b5;
  border-radius: 12px;
  outline: none;
  transition: all 0.2s ease;
}

.otp-input:focus {
  border-color: #c9893c;
  background: #fff;
  box-shadow: 0 0 0 3px rgba(201, 137, 60, 0.15);
}

.otp-input:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Animation delays matching login page */
.anim-fade-up-d1 { animation: fadeUp 0.6s ease-out 0.1s both; }
.anim-fade-up-d3 { animation: fadeUp 0.6s ease-out 0.3s both; }
.anim-fade-up-d4 { animation: fadeUp 0.6s ease-out 0.4s both; }
.anim-fade-up-d5 { animation: fadeUp 0.6s ease-out 0.5s both; }

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>