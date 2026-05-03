<template>
  <div class="page-wrapper">

    <!-- LEFT PANEL -->
    <div class="left-panel">
      <div class="left-glow"></div>
      <div class="grid-overlay"></div>

      <!-- Brand -->
      <div class="relative z-10 flex items-center gap-3" style="animation: fadeUp .7s ease both">
        <div class="w-[38px] h-[38px] bg-gold rounded-[10px] flex items-center justify-center flex-shrink-0">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
          </svg>
        </div>
        <span class="font-display text-[1.3rem] text-cream tracking-[0.02em]">Open Brain Studio</span>
      </div>

      <!-- Hero -->
      <div class="relative z-10" style="animation: fadeUp .7s .15s ease both">
        <p class="lp-eyebrow">Welcome Back</p>
        <h1 class="font-display text-cream leading-[1.18] mb-[22px]" style="font-size:clamp(2.2rem,3.2vw,3.1rem)">
          Your classroom<br/><em class="not-italic italic text-gold-light">awaits you</em><br/>— let's pick up.
        </h1>
        <p class="text-[.95rem] font-light leading-[1.7] text-cream/60 max-w-[360px]">
          Return to your lessons, students, and earnings. Your teaching craft — ready where you left it.
        </p>
      </div>

      <!-- Stats -->
      <div class="relative z-10 flex gap-9 border-t border-white/10 pt-8" style="animation: fadeUp .7s .3s ease both">
        <div v-for="s in stats" :key="s.label" class="flex flex-col gap-1">
          <span class="font-display text-[1.65rem] text-cream leading-none">{{ s.num }}</span>
          <span class="text-[.72rem] text-cream/50 tracking-[.06em]">{{ s.label }}</span>
        </div>
      </div>

      <!-- Floating testimonial card -->
      <div class="float-card-login">
        <span class="fc-badge-login">Instructor Story</span>
        <p class="font-display italic text-[1rem] text-cream leading-[1.45] mb-[14px]">
          "Open Brain Studio turned my weekend workshops into a full-time practice."
        </p>
        <div class="flex items-center gap-[10px]">
          <div class="w-[34px] h-[34px] rounded-full flex items-center justify-center text-white text-[.85rem] font-display flex-shrink-0" style="background: linear-gradient(135deg, #c9893c 0%, #b84b2f 100%)">MR</div>
          <div class="flex flex-col gap-[2px]">
            <span class="text-[.78rem] text-cream font-medium">Maya Reeve</span>
            <span class="text-[.68rem] text-cream/55">Design mentor · 2.4k students</span>
          </div>
        </div>
      </div>
    </div>

    <!-- RIGHT PANEL -->
    <div class="right-panel">
      <div class="right-noise"></div>

      <div class="form-container">
        <!-- Header -->
        <div class="mb-[32px]" style="animation: fadeUp .7s .1s ease both">
          <div class="inline-flex items-center gap-[6px] text-[.7rem] font-medium uppercase tracking-[.12em] text-rust mb-[14px]">
            <span class="w-[6px] h-[6px] rounded-full bg-rust"></span>
            Teacher Sign In
          </div>
          <h2 class="font-display text-[2.1rem] text-ink leading-[1.2] mb-2">
            Welcome back,<br/>let's get teaching
          </h2>
          <p class="text-[.88rem] font-light text-muted">
            New here?
            <NuxtLink to="/teacher/register" class="text-gold font-medium border-b border-gold-light hover:text-rust transition-colors">
              Create an account
            </NuxtLink>
          </p>
        </div>

        <form @submit.prevent="handleLogin">
          <!-- Email -->
          <div class="field" style="animation-delay: .2s">
            <label>Email address</label>
            <div class="input-wrap">
              <span class="input-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              </span>
              <input v-model="form.email" type="email" placeholder="you@example.com" autocomplete="email" required />
            </div>
          </div>

          <!-- Password -->
          <div class="field" style="animation-delay: .26s">
            <div class="flex justify-between items-center mb-2">
              <label class="mb-0">Password</label>
              <a href="#" class="text-[.75rem] text-gold font-medium hover:text-rust transition-colors">Forgot password?</a>
            </div>
            <div class="input-wrap">
              <span class="input-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              </span>
              <input v-model="form.password" :type="showPw ? 'text' : 'password'" placeholder="Enter your password" autocomplete="current-password" required />
              <button type="button" class="toggle-pw" @click="showPw = !showPw">
                <svg v-if="!showPw" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg>
                <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
              </button>
            </div>
          </div>

          <!-- Remember -->
          <div class="flex items-center gap-[10px] my-[22px]" style="animation: fadeUp .7s .4s ease both">
            <input v-model="rememberMe" type="checkbox" id="remember" class="custom-check" />
            <label for="remember" class="text-[.82rem] text-muted cursor-pointer">Keep me signed in on this device</label>
          </div>

          <!-- Error -->
          <UiAuthError :message="errorMessage" />

          <!-- Submit -->
          <button type="submit" :disabled="loading" class="btn-primary" style="animation: fadeUp .7s .48s ease both">
            {{ loading ? 'Signing in…' : 'Sign in →' }}
          </button>

          <!-- Divider -->
          <div class="auth-divider" style="animation: fadeUp .7s .56s ease both">
            <span>or continue with</span>
          </div>

          <!-- Social -->
          <div class="socials" style="animation: fadeUp .7s .62s ease both">
            <button type="button" class="btn-social">
              <svg viewBox="0 0 24 24" class="w-[18px] h-[18px]"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              Google
            </button>
            <button type="button" class="btn-social">
              <svg viewBox="0 0 24 24" fill="currentColor" class="w-[18px] h-[18px]"><path d="M17.564 13.116c-.03-3.018 2.466-4.465 2.58-4.536-1.408-2.055-3.597-2.336-4.376-2.37-1.863-.188-3.637 1.097-4.583 1.097-.944 0-2.402-1.069-3.949-1.04-2.031.03-3.904 1.18-4.948 2.997-2.111 3.656-.54 9.065 1.513 12.033 1.005 1.453 2.201 3.083 3.77 3.025 1.513-.061 2.084-.98 3.912-.98 1.828 0 2.341.98 3.94.949 1.628-.03 2.658-1.481 3.654-2.941 1.152-1.685 1.627-3.317 1.654-3.401-.036-.016-3.173-1.218-3.207-4.833zM14.54 4.245c.836-1.012 1.4-2.418 1.246-3.821-1.206.048-2.666.802-3.53 1.814-.775.895-1.453 2.325-1.27 3.703 1.344.104 2.717-.683 3.554-1.696z"/></svg>
              Apple
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '../../stores/auth'

definePageMeta({ layout: false })
useHead({ title: 'Teacher Sign In — Open Brain Studio' })

const authStore = useAuthStore()

if (authStore.isLoggedIn && authStore.isVerified) {
  await navigateTo('/teacher/dashboard')
}

const form = reactive({ email: '', password: '' })
const showPw = ref(false)
const rememberMe = ref(false)
const loading = ref(false)
const errorMessage = ref('')

const stats = [
  { num: '12K+', label: 'Instructors' },
  { num: '$4.2M', label: 'Paid monthly' },
  { num: '4.9★', label: 'Avg. rating' },
]

async function handleLogin() {
  loading.value = true
  errorMessage.value = ''
  try {
    const data = await authStore.login(form.email, form.password, 'teacher')
    if (data.user.role !== 'teacher') {
      errorMessage.value = 'This account is not registered as a teacher.'
      authStore.token = null
      authStore.user = null
      return
    }
    await navigateTo('/teacher/dashboard')
  } catch (err: unknown) {
    const e = err as { data?: { message?: string }; message?: string }
    errorMessage.value = e?.data?.message ?? e?.message ?? 'Invalid credentials. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.page-wrapper {
  display: flex;
  height: 100vh;
  overflow: hidden;
  background-color: #faf6ef;
  font-family: 'DM Sans', sans-serif;
}

/* LEFT PANEL */
.left-panel {
  position: relative;
  width: 52%;
  background: #0e0b07;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 52px 56px;
  overflow: hidden;
  flex-shrink: 0;
}

.left-glow {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 80% 60% at 110% 0%, rgba(201,137,60,.35) 0%, transparent 60%),
    radial-gradient(ellipse 60% 50% at -20% 100%, rgba(184,75,47,.28) 0%, transparent 60%);
  pointer-events: none;
}

.grid-overlay {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px);
  background-size: 56px 56px;
  pointer-events: none;
}

.lp-eyebrow {
  font-size: .72rem;
  font-weight: 500;
  letter-spacing: .18em;
  text-transform: uppercase;
  color: #e8b96a;
  margin-bottom: 18px;
  display: flex;
  align-items: center;
  gap: 10px;
}
.lp-eyebrow::before {
  content: '';
  display: block;
  width: 28px; height: 1px;
  background: #e8b96a;
}

/* Floating card */
.float-card-login {
  position: absolute;
  right: -18px;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255,255,255,.07);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,.12);
  border-radius: 18px;
  padding: 20px 22px;
  width: 230px;
  z-index: 2;
  animation: floatCard 1s .4s ease both, bob 4s 1.4s ease-in-out infinite;
}

.fc-badge-login {
  font-size: .62rem;
  font-weight: 500;
  letter-spacing: .1em;
  text-transform: uppercase;
  color: #e8b96a;
  background: rgba(201,137,60,.18);
  border: 1px solid rgba(201,137,60,.35);
  border-radius: 20px;
  padding: 3px 9px;
  display: inline-block;
  margin-bottom: 12px;
}

/* RIGHT PANEL */
.right-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 52px 48px;
  background: #faf6ef;
  position: relative;
  overflow-y: auto;
}

.right-noise {
  position: absolute;
  inset: 0;
  opacity: .035;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 150px;
  pointer-events: none;
}

.form-container {
  width: 100%;
  max-width: 390px;
  position: relative;
  z-index: 1;
}

/* Fields */
.field {
  margin-bottom: 18px;
  animation: fadeUp .7s ease both;
}

.field label {
  display: block;
  font-size: .78rem;
  font-weight: 500;
  color: #0e0b07;
  margin-bottom: 8px;
  letter-spacing: .04em;
}

.input-wrap { position: relative; }

.input-icon {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #8a7f72;
  pointer-events: none;
  display: flex;
  align-items: center;
}

.input-icon svg { width: 16px; height: 16px; }

.field input {
  width: 100%;
  padding: 13px 14px 13px 42px;
  font-family: 'DM Sans', sans-serif;
  font-size: .9rem;
  color: #0e0b07;
  background: #f0e8d6;
  border: 1.5px solid transparent;
  border-radius: 12px;
  outline: none;
  transition: border-color .2s, background .2s, box-shadow .2s;
}

.field input::placeholder { color: #8a7f72; }

.field input:focus {
  border-color: #c9893c;
  background: #fff;
  box-shadow: 0 0 0 4px rgba(201,137,60,.1);
}

.toggle-pw {
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #8a7f72;
  padding: 0;
  display: flex;
  align-items: center;
  transition: color .2s;
}

.toggle-pw:hover { color: #c9893c; }
.toggle-pw svg { width: 16px; height: 16px; }

.custom-check {
  appearance: none;
  width: 18px; height: 18px;
  border: 1.5px solid #cfc5b5;
  border-radius: 5px;
  background: #f0e8d6;
  cursor: pointer;
  position: relative;
  flex-shrink: 0;
  transition: border-color .2s, background .2s;
}

.custom-check:checked { background: #c9893c; border-color: #c9893c; }

.custom-check:checked::after {
  content: '';
  position: absolute;
  left: 4px; top: 1px;
  width: 6px; height: 10px;
  border: 2px solid #fff;
  border-top: none; border-left: none;
  transform: rotate(45deg);
}

/* Buttons */
.btn-primary {
  width: 100%;
  padding: 14px;
  font-family: 'DM Sans', sans-serif;
  font-size: .95rem;
  font-weight: 500;
  letter-spacing: .03em;
  color: #fff;
  background: linear-gradient(135deg, #c9893c 0%, #b84b2f 100%);
  border: none;
  border-radius: 12px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: transform .18s, box-shadow .18s;
}

.btn-primary::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(255,255,255,.18) 0%, transparent 60%);
  pointer-events: none;
}

.btn-primary:hover { transform: translateY(-2px); box-shadow: 0 10px 30px rgba(184,75,47,.35); }
.btn-primary:active { transform: translateY(0); }
.btn-primary:disabled { opacity: .6; cursor: not-allowed; transform: none; box-shadow: none; }

.auth-divider {
  display: flex;
  align-items: center;
  gap: 14px;
  margin: 24px 0;
}

.auth-divider::before, .auth-divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: #e0d8cc;
}

.auth-divider span {
  font-size: .75rem;
  color: #8a7f72;
  letter-spacing: .06em;
  text-transform: uppercase;
}

.socials { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }

.btn-social {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  padding: 11px;
  font-family: 'DM Sans', sans-serif;
  font-size: .84rem;
  font-weight: 500;
  color: #0e0b07;
  background: #f0e8d6;
  border: 1.5px solid #e0d8cc;
  border-radius: 11px;
  cursor: pointer;
  transition: background .2s, border-color .2s, transform .15s;
}

.btn-social:hover { background: #fff; border-color: #e8b96a; transform: translateY(-1px); }

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(18px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes floatCard {
  from { opacity: 0; transform: translateY(-50%) translateX(30px); }
  to   { opacity: 1; transform: translateY(-50%) translateX(0); }
}

@keyframes bob {
  0%, 100% { transform: translateY(-50%) translateY(0); }
  50%       { transform: translateY(-50%) translateY(-10px); }
}

@media (max-width: 860px) {
  .left-panel { display: none; }
  .right-panel { padding: 40px 24px; }
}
</style>
