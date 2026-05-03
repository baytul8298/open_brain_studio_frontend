<template>
  <!-- Overlay -->
  <Teleport to="body">
    <div class="modal-overlay" :class="{ active: modelValue }" @click.self="$emit('update:modelValue', false)">
      <div class="modal-container">

        <!-- ── OTP Entry View ── -->
        <div v-if="!verified">
          <div class="modal-header">
            <div class="modal-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
            </div>
            <h3 class="modal-title">Verify Your Number</h3>
            <p class="modal-subtitle">We've sent a 6-digit code to<br/><strong>{{ maskedPhone }}</strong></p>
          </div>

          <div class="modal-body">
            <label class="otp-label">Enter 6-digit verification code</label>

            <div class="otp-container">
              <input
                v-for="(_, i) in 6"
                :key="i"
                :ref="el => { if (el) inputRefs[i] = el as HTMLInputElement }"
                v-model="digits[i]"
                type="tel"
                class="otp-input"
                :class="{ filled: digits[i], error: hasError }"
                maxlength="1"
                autocomplete="one-time-code"
                @input="onInput(i, $event)"
                @keydown="onKeydown(i, $event)"
                @paste="onPaste($event)"
              />
            </div>

            <div class="otp-info">
              <div class="otp-timer">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
                <span>Code expires in
                  <span class="otp-timer-value" :class="{ expiring: timer <= 30 }">{{ formattedTimer }}</span>
                </span>
              </div>
              <button class="otp-resend" :disabled="timer > 0 || resendLoading" @click="handleResend">
                {{ resendLoading ? 'Sending…' : 'Resend Code' }}
              </button>
            </div>

            <!-- Error -->
            <div v-if="errorMessage" class="error-msg">{{ errorMessage }}</div>

            <button
              class="btn-verify"
              :disabled="digits.join('').length !== 6 || loading"
              @click="handleVerify"
            >
              <svg v-if="loading" class="spin-icon" fill="none" viewBox="0 0 24 24">
                <circle style="opacity:.25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                <path style="opacity:.75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
              <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              {{ loading ? 'Verifying…' : 'Verify & Create Account' }}
            </button>

            <p class="change-number">
              Wrong number?
              <a href="#" @click.prevent="$emit('update:modelValue', false)">Change it</a>
            </p>
          </div>
        </div>

        <!-- ── Success View ── -->
        <div v-else class="modal-success">
          <div class="success-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
          <h3 class="success-title">Account Created!</h3>
          <p class="success-text">{{ successText }}</p>
          <button class="btn-continue" @click="handleContinue">
            Continue to Dashboard
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </button>
        </div>

      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { useAuthStore } from '../../stores/auth'

const props = defineProps<{
  modelValue: boolean
  phone: string
  role?: 'student' | 'teacher'
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const authStore = useAuthStore()

// ── State ──────────────────────────────────────────────────────
const digits      = ref<string[]>(Array(6).fill(''))
const inputRefs   = ref<(HTMLInputElement | null)[]>([])
const loading     = ref(false)
const resendLoading = ref(false)
const errorMessage  = ref('')
const hasError    = ref(false)
const verified    = ref(false)
const timer       = ref(120)
let timerInterval: ReturnType<typeof setInterval>

// ── Computed ───────────────────────────────────────────────────
const maskedPhone = computed(() => {
  const p = props.phone
  if (!p) return 'your number'
  const digits = p.replace(/\D/g, '')
  if (digits.length < 4) return p
  return p.slice(0, -4).replace(/\d/g, '•') + digits.slice(-4)
})

const formattedTimer = computed(() => {
  const m = Math.floor(timer.value / 60)
  const s = timer.value % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
})

const successText = computed(() =>
  props.role === 'teacher'
    ? 'Your mobile number has been verified and your teaching account is ready. Let\'s set up your profile!'
    : 'Your mobile number has been verified and your account is ready. Let\'s start learning!'
)

// ── Timer ──────────────────────────────────────────────────────
function startTimer() {
  timer.value = 120
  clearInterval(timerInterval)
  timerInterval = setInterval(() => {
    if (timer.value > 0) timer.value--
    else clearInterval(timerInterval)
  }, 1000)
}

// ── Watch modal open ───────────────────────────────────────────
watch(() => props.modelValue, (open) => {
  if (open) {
    digits.value = Array(6).fill('')
    errorMessage.value = ''
    hasError.value = false
    verified.value = false
    startTimer()
    nextTick(() => inputRefs.value[0]?.focus())
  } else {
    clearInterval(timerInterval)
  }
})

onUnmounted(() => clearInterval(timerInterval))

// ── OTP input handling ─────────────────────────────────────────
function onInput(i: number, event: Event) {
  const val = (event.target as HTMLInputElement).value.replace(/\D/g, '')
  digits.value[i] = val.slice(-1)
  hasError.value = false
  errorMessage.value = ''
  if (val && i < 5) nextTick(() => inputRefs.value[i + 1]?.focus())
}

function onKeydown(i: number, event: KeyboardEvent) {
  if (event.key === 'Backspace' && !digits.value[i] && i > 0)
    nextTick(() => inputRefs.value[i - 1]?.focus())
  if (event.key === 'ArrowLeft' && i > 0)
    nextTick(() => inputRefs.value[i - 1]?.focus())
  if (event.key === 'ArrowRight' && i < 5)
    nextTick(() => inputRefs.value[i + 1]?.focus())
}

function onPaste(event: ClipboardEvent) {
  event.preventDefault()
  const pasted = event.clipboardData?.getData('text')?.replace(/\D/g, '') ?? ''
  for (let i = 0; i < Math.min(pasted.length, 6); i++) digits.value[i] = pasted[i]
  const nextEmpty = digits.value.findIndex(d => !d)
  const focus = nextEmpty === -1 ? 5 : Math.min(nextEmpty, 5)
  nextTick(() => inputRefs.value[focus]?.focus())
}

// ── Auto-submit ────────────────────────────────────────────────
watch(digits, (d) => {
  if (d.join('').length === 6 && d.every(Boolean)) handleVerify()
}, { deep: true })

// ── Verify ─────────────────────────────────────────────────────
async function handleVerify() {
  const otp = digits.value.join('')
  if (otp.length !== 6) return

  loading.value = true
  errorMessage.value = ''
  hasError.value = false

  try {
    await authStore.verifyOtp(props.phone, otp)
    clearInterval(timerInterval)
    verified.value = true
  } catch (err: unknown) {
    const e = err as { data?: { message?: string }; message?: string }
    errorMessage.value = e?.data?.message ?? e?.message ?? 'Invalid code. Please try again.'
    hasError.value = true
    digits.value = Array(6).fill('')
    nextTick(() => inputRefs.value[0]?.focus())
  } finally {
    loading.value = false
  }
}

// ── Resend ─────────────────────────────────────────────────────
async function handleResend() {
  resendLoading.value = true
  try {
    await authStore.resendOtp(props.phone)
    startTimer()
    digits.value = Array(6).fill('')
    errorMessage.value = ''
    hasError.value = false
    nextTick(() => inputRefs.value[0]?.focus())
  } catch (err: unknown) {
    const e = err as { data?: { message?: string }; message?: string }
    errorMessage.value = e?.data?.message ?? e?.message ?? 'Failed to resend code.'
  } finally {
    resendLoading.value = false
  }
}

// ── Continue to dashboard ──────────────────────────────────────
function handleContinue() {
  const role = authStore.user?.role
  navigateTo(role === 'teacher' ? '/teacher/dashboard' : '/student/dashboard')
}
</script>

<style scoped>
/* ── Overlay ──────────────────────────────────────────────────── */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(14,11,7,.65);
  backdrop-filter: blur(6px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  opacity: 0;
  visibility: hidden;
  transition: opacity .3s, visibility .3s;
}

.modal-overlay.active {
  opacity: 1;
  visibility: visible;
}

/* ── Container ────────────────────────────────────────────────── */
.modal-container {
  background: #fff;
  border-radius: 24px;
  width: 100%;
  max-width: 440px;
  overflow: hidden;
  box-shadow: 0 24px 64px rgba(14,11,7,.35);
  transform: scale(.9) translateY(20px);
  transition: transform .35s cubic-bezier(.175,.885,.32,1.275);
  border: 1px solid #e0d8cc;
}

.modal-overlay.active .modal-container {
  transform: scale(1) translateY(0);
}

/* ── Header ───────────────────────────────────────────────────── */
.modal-header {
  padding: 32px 32px 20px;
  text-align: center;
  background: linear-gradient(180deg, #f0e8d6 0%, #fff 100%);
}

.modal-icon {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(201,137,60,.15), rgba(184,75,47,.15));
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  position: relative;
  color: #c9893c;
}

.modal-icon::before {
  content: '';
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  border: 2px dashed #e8b96a;
  opacity: .4;
  animation: spinSlow 12s linear infinite;
}

.modal-icon svg { width: 32px; height: 32px; }

.modal-title {
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  color: #0e0b07;
  margin-bottom: 8px;
}

.modal-subtitle {
  font-size: .9rem;
  color: #8a7f72;
  line-height: 1.6;
}

.modal-subtitle strong {
  color: #0e0b07;
  font-weight: 600;
}

/* ── Body ─────────────────────────────────────────────────────── */
.modal-body { padding: 24px 32px 32px; }

.otp-label {
  display: block;
  text-align: center;
  font-size: .82rem;
  font-weight: 600;
  color: #8a7f72;
  margin-bottom: 12px;
  letter-spacing: .03em;
  text-transform: uppercase;
}

/* ── OTP inputs ───────────────────────────────────────────────── */
.otp-container {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 24px;
}

.otp-input {
  width: 50px;
  height: 58px;
  border: 2px solid #e0d8cc;
  border-radius: 12px;
  background: #fff;
  text-align: center;
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: #0e0b07;
  outline: none;
  transition: all .2s;
  caret-color: #c9893c;
}

.otp-input:hover { border-color: #e8b96a; }

.otp-input:focus {
  border-color: #c9893c;
  box-shadow: 0 0 0 4px rgba(201,137,60,.15);
}

.otp-input.filled {
  border-color: #3a9e6f;
  background: #f0faf5;
}

.otp-input.error {
  border-color: #c53030;
  background: #fef5f5;
  animation: shake .4s ease;
}

/* ── Info row ─────────────────────────────────────────────────── */
.otp-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 18px;
  background: linear-gradient(135deg, rgba(201,137,60,.06), rgba(184,75,47,.04));
  border: 1px solid rgba(201,137,60,.15);
  border-radius: 12px;
  margin-bottom: 24px;
}

.otp-timer {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: .85rem;
  color: #8a7f72;
}

.otp-timer svg { width: 18px; height: 18px; color: #c9893c; }

.otp-timer-value {
  font-weight: 700;
  color: #0e0b07;
  font-family: 'Playfair Display', serif;
  font-size: 1rem;
  background: #fff;
  padding: 2px 8px;
  border-radius: 6px;
  border: 1px solid #e0d8cc;
}

.otp-timer-value.expiring {
  color: #b84b2f;
  background: rgba(184,75,47,.08);
  border-color: rgba(184,75,47,.2);
}

.otp-resend {
  font-size: .85rem;
  font-weight: 600;
  color: #c9893c;
  background: #fff;
  border: 1.5px solid #c9893c;
  border-radius: 8px;
  padding: 8px 14px;
  cursor: pointer;
  transition: all .2s;
  font-family: 'DM Sans', sans-serif;
}

.otp-resend:hover:not(:disabled) { background: #c9893c; color: #fff; }

.otp-resend:disabled {
  color: #8a7f72;
  background: #f0e8d6;
  border-color: #e0d8cc;
  cursor: not-allowed;
}

/* ── Error ────────────────────────────────────────────────────── */
.error-msg {
  padding: 10px 14px;
  margin-bottom: 14px;
  background: rgba(197,48,48,.07);
  border: 1px solid rgba(197,48,48,.2);
  border-radius: 10px;
  font-size: .84rem;
  color: #c53030;
  text-align: center;
}

/* ── Verify button ────────────────────────────────────────────── */
.btn-verify {
  width: 100%;
  padding: 14px;
  font-family: 'DM Sans', sans-serif;
  font-size: .95rem;
  font-weight: 600;
  color: #fff;
  background: linear-gradient(135deg, #c9893c, #b84b2f);
  border: none;
  border-radius: 12px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: transform .18s, box-shadow .18s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.btn-verify::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(255,255,255,.18), transparent 60%);
  pointer-events: none;
}

.btn-verify:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(184,75,47,.35);
}

.btn-verify:disabled { opacity: .6; cursor: not-allowed; transform: none; box-shadow: none; }
.btn-verify svg { width: 18px; height: 18px; }

.spin-icon { animation: spin 1s linear infinite; }

/* ── Change number ────────────────────────────────────────────── */
.change-number {
  display: block;
  text-align: center;
  margin-top: 16px;
  font-size: .84rem;
  color: #8a7f72;
}

.change-number a {
  color: #c9893c;
  text-decoration: none;
  font-weight: 500;
  transition: color .2s;
}

.change-number a:hover { color: #b84b2f; }

/* ── Success ──────────────────────────────────────────────────── */
.modal-success {
  text-align: center;
  padding: 40px 28px;
}

.success-icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: rgba(58,158,111,.12);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
  animation: successPop .5s cubic-bezier(.175,.885,.32,1.275);
  color: #3a9e6f;
}

.success-icon svg { width: 40px; height: 40px; }

.success-title {
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  color: #0e0b07;
  margin-bottom: 8px;
}

.success-text {
  font-size: .9rem;
  color: #8a7f72;
  line-height: 1.6;
  margin-bottom: 24px;
}

.btn-continue {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 32px;
  font-family: 'DM Sans', sans-serif;
  font-size: .95rem;
  font-weight: 600;
  color: #fff;
  background: linear-gradient(135deg, #3a9e6f, #2a7a5a);
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: transform .18s, box-shadow .18s;
}

.btn-continue:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(58,158,111,.35);
}

.btn-continue svg { width: 18px; height: 18px; }

/* ── Animations ───────────────────────────────────────────────── */
@keyframes spinSlow {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20%, 60%  { transform: translateX(-6px); }
  40%, 80%  { transform: translateX(6px); }
}

@keyframes successPop {
  from { opacity: 0; transform: scale(.5); }
  to   { opacity: 1; transform: scale(1); }
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

/* ── Responsive ───────────────────────────────────────────────── */
@media (max-width: 480px) {
  .modal-container { border-radius: 20px; }
  .modal-header { padding: 24px 20px 16px; }
  .modal-body { padding: 16px 20px 24px; }
  .otp-label { font-size: .75rem; }
  .otp-container { gap: 8px; }
  .otp-input { width: 44px; height: 52px; font-size: 1.3rem; border-radius: 10px; }
  .otp-info { flex-direction: column; gap: 12px; padding: 14px; }
  .otp-resend { width: 100%; text-align: center; }
}
</style>
