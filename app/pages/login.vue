<template>
  <!-- Form header -->
  <div class="mb-[38px] anim-fade-up-d1">
    <div class="inline-flex items-center gap-[6px] text-[0.7rem] font-medium uppercase tracking-[0.12em] text-rust mb-[14px]">
      <span class="w-[6px] h-[6px] rounded-full bg-rust"></span>
      Welcome back
    </div>
    <h2 class="font-display text-[2.1rem] text-ink leading-[1.2] mb-2">
      Sign in to your<br/>account
    </h2>
    <p class="text-[0.88rem] font-light text-muted">
      New here?
      <NuxtLink to="/register" class="text-gold font-medium border-b border-gold-light hover:text-rust transition-colors">
        Create a free account
      </NuxtLink>
    </p>
  </div>

  <form @submit.prevent="handleLogin">
    <!-- Email -->
    <UiAuthInput
      id="email"
      v-model="form.email"
      label="Email address"
      type="email"
      placeholder="you@example.com"
      autocomplete="email"
      required
      :delay="0.2"
    >
      <template #icon>
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect width="20" height="16" x="2" y="4" rx="2"/>
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
        </svg>
      </template>
    </UiAuthInput>

    <!-- Password -->
    <UiAuthInput
      id="password"
      v-model="form.password"
      label="Password"
      type="password"
      placeholder="Enter your password"
      autocomplete="current-password"
      required
      :delay="0.28"
    >
      <template #icon>
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        </svg>
      </template>
      <template #footer>
        <div class="flex justify-end mt-[6px]">
          <a href="#" class="text-[0.78rem] text-muted hover:text-gold transition-colors">Forgot password?</a>
        </div>
      </template>
    </UiAuthInput>

    <!-- Remember me -->
    <div class="flex items-center gap-[10px] mb-7 anim-fade-up-d5">
      <input
        id="remember"
        v-model="rememberMe"
        type="checkbox"
        class="custom-check"
      />
      <label for="remember" class="text-[0.84rem] text-muted cursor-pointer select-none">Keep me signed in</label>
    </div>

    <!-- Error -->
    <UiAuthError :message="errorMessage" />

    <!-- Submit -->
    <UiAuthButton :loading="loading">
      {{ loading ? 'Signing in…' : 'Continue to Dashboard →' }}
    </UiAuthButton>

    <!-- Social -->
    <UiAuthDivider>or sign in with</UiAuthDivider>
    <UiAuthSocialButtons />
  </form>
</template>

<script setup lang="ts">
import { useAuthStore } from '../stores/auth'

definePageMeta({ layout: 'auth' })
useHead({ title: 'Sign In — Open Brain Studio' })

const authStore = useAuthStore()

const form = reactive({ email: '', password: '' })
const rememberMe   = ref(false)
const loading      = ref(false)
const errorMessage = ref('')

if (authStore.isLoggedIn) {
  await navigateTo(authStore.user?.role === 'teacher' ? '/teacher/dashboard' : '/student/dashboard')
}

async function handleLogin() {
  loading.value = true
  errorMessage.value = ''
  try {
    const data = await authStore.login(form.email, form.password, 'student')
    await navigateTo(data.user.role === 'teacher' ? '/teacher/dashboard' : '/student/dashboard')
  } catch (err: unknown) {
    const e = err as { data?: { message?: string }; message?: string }
    errorMessage.value = e?.data?.message ?? e?.message ?? 'Invalid credentials. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* Custom checkbox */
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
.custom-check:checked {
  background: #c9893c;
  border-color: #c9893c;
}
.custom-check:checked::after {
  content: '';
  position: absolute;
  left: 4px; top: 1px;
  width: 6px; height: 10px;
  border: 2px solid #fff;
  border-top: none; border-left: none;
  transform: rotate(45deg);
}
</style>
