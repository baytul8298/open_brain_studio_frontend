<template>
  <div class="page-wrapper">

    <!-- ─────────────────── LEFT PANEL ─────────────────── -->
    <div class="left-panel">
      <div class="left-glow" />
      <div class="left-grid" />

      <!-- Brand -->
      <div class="brand">
        <div class="brand-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
          </svg>
        </div>
        <span class="brand-name">Open Brain Studio</span>
      </div>

      <!-- Subjects showcase -->
      <div class="subjects-showcase">
        <div class="eyebrow">Private Tutor Platform</div>
        <h1 class="hero-heading">
          Every subject,<br/>every class — <em>your</em><br/>pace, your way.
        </h1>
        <p class="hero-sub">
          Pick your subjects and class level. Get matched with expert tutors and structured courses built just for you.
        </p>

        <div class="subject-tags">
          <span class="stag stag--math">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M2 12h20"/></svg>
            Mathematics
          </span>
          <span class="stag stag--physics">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>
            Physics
          </span>
          <span class="stag stag--chem">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 3H7l-4 8 4 9h10l4-9-4-8h-2"/><path d="M9 3h6"/></svg>
            Chemistry
          </span>
          <span class="stag stag--bio">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            Biology
          </span>
          <span class="stag stag--eng">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7h16M4 12h16M4 17h10"/></svg>
            English
          </span>
          <span class="stag stag--hist">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
            History
          </span>
          <span class="stag stag--cs">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
            Computer Sc.
          </span>
          <span class="stag stag--geo">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
            Geography
          </span>
        </div>
      </div>

      <!-- Class strip -->
      <div class="class-strip">
        <div class="class-badge"><span class="cn">6</span><span class="cl">Class</span></div>
        <div class="class-badge"><span class="cn">7</span><span class="cl">Class</span></div>
        <div class="class-badge class-badge--active"><span class="cn">8</span><span class="cl">Class</span></div>
        <div class="class-badge class-badge--active"><span class="cn">9</span><span class="cl">Class</span></div>
        <div class="class-badge"><span class="cn">10</span><span class="cl">Class</span></div>
        <div class="class-badge"><span class="cn">11</span><span class="cl">Class</span></div>
        <div class="class-badge"><span class="cn">12</span><span class="cl">Class</span></div>
      </div>
    </div>

    <!-- ─────────────────── RIGHT PANEL ─────────────────── -->
    <div class="right-panel">
      <div class="right-noise" />

      <div class="form-container">

        <!-- Step indicator -->
        <div class="steps">
          <div class="step step--done">
            <div class="step-dot">✓</div>
            <span class="step-label">Account</span>
          </div>
          <div class="step-line step-line--done" />
          <div class="step step--active">
            <div class="step-dot">2</div>
            <span class="step-label">Preferences</span>
          </div>
          <div class="step-line" />
          <div class="step step--idle">
            <div class="step-dot">3</div>
            <span class="step-label">Confirm</span>
          </div>
        </div>

        <!-- Form header -->
        <div class="form-header">
          <div class="form-tag">Free Account</div>
          <h2>Create your<br/>student profile</h2>
          <p>Already have an account? <NuxtLink to="/login">Sign in here</NuxtLink></p>
        </div>

        <form @submit.prevent="handleRegister">

          <!-- Personal Info -->
          <div class="section-label">Personal Info</div>

          <div class="grid-2">
            <div class="field">
              <label for="fname">First Name</label>
              <div class="input-wrap">
                <span class="input-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </span>
                <input id="fname" v-model="form.first_name" type="text" placeholder="Rahim" required />
              </div>
            </div>
            <div class="field">
              <label for="lname">Last Name</label>
              <div class="input-wrap">
                <span class="input-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </span>
                <input id="lname" v-model="form.last_name" type="text" placeholder="Uddin" required />
              </div>
            </div>
          </div>

          <div class="field">
            <label for="email">Email Address</label>
            <div class="input-wrap">
              <span class="input-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              </span>
              <input id="email" v-model="form.email" type="email" placeholder="student@example.com" autocomplete="email" required />
            </div>
          </div>

          <div class="field">
            <label for="phone">Phone / WhatsApp</label>
            <div class="input-wrap">
              <span class="input-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.58 3.4 2 2 0 0 1 3.55 1.22h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9.16a16 16 0 0 0 6.35 6.35l1.02-.88a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </span>
              <input id="phone" v-model="phone" type="tel" placeholder="+880 1X XX-XXXXXX" required />
            </div>
          </div>

          <div class="field">
            <label for="password">Create Password</label>
            <div class="input-wrap">
              <span class="input-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              </span>
              <input
                id="password"
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Min. 8 characters"
                autocomplete="new-password"
                minlength="8"
                required
              />
              <button type="button" class="toggle-pw" :aria-label="showPassword ? 'Hide password' : 'Show password'" @click="showPassword = !showPassword">
                <svg v-if="!showPassword" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/>
                </svg>
                <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                  <line x1="1" y1="1" x2="23" y2="23"/>
                </svg>
              </button>
            </div>
            <div v-if="form.password" class="pw-strength">
              <div class="strength-bar">
                <div v-for="i in 4" :key="i" class="sb" :class="strengthBars[i - 1]" />
              </div>
              <span class="strength-text" :style="{ color: strengthColor }">{{ strengthLabel }}</span>
            </div>
          </div>

          <!-- Class Preference -->
          <div class="section-label">Your Class</div>
          <span class="chips-label">Select your current class</span>
          <div class="class-grid">
            <button
              v-for="cls in classes"
              :key="cls.value"
              type="button"
              class="class-btn"
              :class="selectedClass === cls.value ? 'class-btn--selected' : ''"
              @click="selectedClass = cls.value"
            >
              {{ cls.label }}<span>{{ cls.sub }}</span>
            </button>
          </div>
          <p class="hint">You can change this later in your profile.</p>

          <!-- Subject Preferences -->
          <div class="section-label">Preferred Subjects</div>
          <span class="chips-label">Choose subjects you want to study</span>
          <div class="chips-grid">
            <button
              v-for="subject in subjects"
              :key="subject.key"
              type="button"
              class="chip"
              :class="selectedSubjects.has(subject.key) ? 'chip--selected' : ''"
              @click="toggleSubject(subject.key)"
            >
              <!-- eslint-disable-next-line vue/no-v-html -->
              <svg class="chip-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" v-html="subject.icon" />
              {{ subject.label }}
            </button>
          </div>
          <p class="hint">Select one or more subjects. You can add more later.</p>

          <!-- Terms -->
          <div class="terms-row">
            <input id="terms" v-model="agreedToTerms" type="checkbox" class="custom-check" />
            <p>
              <label for="terms">
                I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
                I confirm I am a student or guardian registering on behalf of a student.
              </label>
            </p>
          </div>

          <!-- Error -->
          <div v-if="errorMessage" class="error-msg">{{ errorMessage }}</div>

          <!-- OTP Modal -->
          <UiOtpModal v-model="showOtpModal" :phone="registeredPhone" role="student" />

          <button type="submit" class="btn-register" :disabled="loading || !agreedToTerms">
            <svg v-if="loading" class="spin-icon" fill="none" viewBox="0 0 24 24">
              <circle style="opacity:.25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
              <path style="opacity:.75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
            {{ loading ? 'Creating account…' : 'Create My Free Account →' }}
          </button>

          <div class="divider"><span>or sign up with</span></div>

          <div class="socials">
            <button type="button" class="btn-social">
              <svg viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Google
            </button>
            <button type="button" class="btn-social">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
              GitHub
            </button>
          </div>

        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '../stores/auth'

definePageMeta({ layout: false })
useHead({
  title: 'Create Account — Open Brain Studio',
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap' },
  ],
})

const authStore = useAuthStore()

if (authStore.isLoggedIn) {
  await navigateTo(authStore.user?.role === 'teacher' ? '/teacher/dashboard' : '/student/dashboard')
}

// ── Form ────────────────────────────────────────────────────────
const form = reactive({
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  role: 'student' as 'student' | 'teacher',
})

const phone           = ref('')
const loading         = ref(false)
const errorMessage    = ref('')
const showOtpModal    = ref(false)
const registeredPhone = ref('')
const showPassword    = ref(false)
const agreedToTerms   = ref(false)
const selectedClass   = ref<string | null>(null)
const selectedSubjects = reactive(new Set<string>())

// ── Class options ────────────────────────────────────────────────
const classes = [
  { value: '6',  label: '6',  sub: 'Class' },
  { value: '7',  label: '7',  sub: 'Class' },
  { value: '8',  label: '8',  sub: 'Class' },
  { value: '9',  label: '9',  sub: 'Class' },
  { value: '10', label: '10', sub: 'Class' },
  { value: '11', label: '11', sub: 'Class' },
  { value: '12', label: '12', sub: 'Class' },
  { value: 'O',  label: 'O',  sub: 'Level' },
  { value: 'A',  label: 'A',  sub: 'Level' },
]

// ── Subject options ──────────────────────────────────────────────
const subjects = [
  { key: 'math',      label: 'Mathematics',  icon: '<path d="M12 2v20M2 12h20"/>' },
  { key: 'physics',   label: 'Physics',      icon: '<circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4"/>' },
  { key: 'chemistry', label: 'Chemistry',    icon: '<path d="M9 3H7l-4 8 4 9h10l4-9-4-8h-2"/>' },
  { key: 'biology',   label: 'Biology',      icon: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>' },
  { key: 'english',   label: 'English',      icon: '<path d="M4 7h16M4 12h16M4 17h10"/>' },
  { key: 'history',   label: 'History',      icon: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>' },
  { key: 'cs',        label: 'Computer Sc.', icon: '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>' },
  { key: 'geography', label: 'Geography',    icon: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10z"/>' },
  { key: 'bangla',    label: 'Bangla',       icon: '<path d="M4 6h16M4 12h16M4 18h7"/>' },
  { key: 'ict',       label: 'ICT',          icon: '<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>' },
]

function toggleSubject(key: string) {
  selectedSubjects.has(key) ? selectedSubjects.delete(key) : selectedSubjects.add(key)
}

// ── Password strength ────────────────────────────────────────────
const passwordStrength = computed(() => {
  const v = form.password
  if (!v) return 0
  let score = 0
  if (v.length >= 8)           score++
  if (/[A-Z]/.test(v))        score++
  if (/[0-9]/.test(v))        score++
  if (/[^A-Za-z0-9]/.test(v)) score++
  return score
})

const strengthBars = computed(() => {
  const score = passwordStrength.value
  const cls = score <= 1 ? 'sb--weak' : score <= 2 ? 'sb--medium' : 'sb--strong'
  return Array.from({ length: 4 }, (_, i) => (i < score ? cls : ''))
})

const strengthLabel = computed(() =>
  ['', 'Weak', 'Fair', 'Good', 'Strong'][passwordStrength.value] ?? ''
)

const strengthColor = computed(() => {
  const s = passwordStrength.value
  if (s <= 1) return '#e05c5c'
  if (s <= 2) return '#c9893c'
  return '#5cb85c'
})

// ── Submit ───────────────────────────────────────────────────────
async function handleRegister() {
  loading.value = true
  errorMessage.value = ''
  try {
    await authStore.register({
      first_name: form.first_name,
      last_name:  form.last_name,
      email:      form.email,
      phone:      phone.value,
      password:   form.password,
    })
    registeredPhone.value = phone.value
    showOtpModal.value = true
  } catch (err: unknown) {
    const e = err as { data?: { message?: string }; message?: string }
    errorMessage.value = e?.data?.message ?? e?.message ?? 'Registration failed. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
*, *::before, *::after { box-sizing: border-box; }

/* ── Page wrapper ─────────────────────────────────────────────── */
.page-wrapper {
  display: flex;
  height: 100vh;
  overflow: hidden;
  background-color: #faf6ef;
  font-family: 'DM Sans', sans-serif;
}

/* ── LEFT PANEL ───────────────────────────────────────────────── */
.left-panel {
  position: relative;
  width: 42%;
  background: #0e0b07;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 48px 52px;
  overflow: hidden;
  flex-shrink: 0;
}

.left-glow {
  position: absolute; inset: 0; pointer-events: none;
  background:
    radial-gradient(ellipse 80% 60% at 110% 0%,   rgba(201,137,60,.35) 0%, transparent 60%),
    radial-gradient(ellipse 60% 50% at -20% 100%, rgba(184,75,47,.28)  0%, transparent 60%);
}

.left-grid {
  position: absolute; inset: 0; pointer-events: none;
  background-image:
    linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px);
  background-size: 56px 56px;
}

/* Brand */
.brand {
  position: relative; z-index: 1;
  display: flex; align-items: center; gap: 12px;
  animation: fadeUp .7s ease both;
}

.brand-icon {
  width: 38px; height: 38px;
  background: #c9893c;
  border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.brand-icon svg { width: 20px; height: 20px; }

.brand-name {
  font-family: 'Playfair Display', serif;
  font-size: 1.3rem;
  color: #faf6ef;
  letter-spacing: .02em;
}

/* Subjects showcase */
.subjects-showcase {
  position: relative; z-index: 1;
  animation: fadeUp .7s .12s ease both;
}

.eyebrow {
  font-size: .72rem; font-weight: 500;
  letter-spacing: .18em; text-transform: uppercase;
  color: #e8b96a; margin-bottom: 18px;
  display: flex; align-items: center; gap: 10px;
}
.eyebrow::before {
  content: ''; display: block;
  width: 28px; height: 1px; background: #e8b96a;
}

.hero-heading {
  font-family: 'Playfair Display', serif;
  font-size: clamp(1.9rem, 2.8vw, 2.7rem);
  line-height: 1.18; color: #faf6ef; margin-bottom: 20px;
}
.hero-heading em { font-style: italic; color: #e8b96a; }

.hero-sub {
  font-size: .9rem; font-weight: 300;
  line-height: 1.7; color: rgba(250,246,239,.6);
  max-width: 320px; margin-bottom: 32px;
}

/* Subject tags */
.subject-tags { display: flex; flex-wrap: wrap; gap: 9px; }

.stag {
  display: inline-flex; align-items: center; gap: 7px;
  padding: 7px 14px;
  border-radius: 40px;
  font-size: .78rem; font-weight: 500;
  border: 1px solid;
  animation: fadeUp .7s ease both;
}
.stag svg { width: 13px; height: 13px; flex-shrink: 0; }

.stag--math    { color:#7ec8e3; border-color:rgba(126,200,227,.35); background:rgba(126,200,227,.08); animation-delay:.2s; }
.stag--physics { color:#f4a460; border-color:rgba(244,164,96,.35);  background:rgba(244,164,96,.08);  animation-delay:.28s; }
.stag--chem    { color:#90ee90; border-color:rgba(144,238,144,.35); background:rgba(144,238,144,.08); animation-delay:.35s; }
.stag--bio     { color:#ffb6c1; border-color:rgba(255,182,193,.35); background:rgba(255,182,193,.08); animation-delay:.42s; }
.stag--eng     { color:#dda0dd; border-color:rgba(221,160,221,.35); background:rgba(221,160,221,.08); animation-delay:.49s; }
.stag--hist    { color:#f0e68c; border-color:rgba(240,230,140,.35); background:rgba(240,230,140,.08); animation-delay:.56s; }
.stag--cs      { color:#87ceeb; border-color:rgba(135,206,235,.35); background:rgba(135,206,235,.08); animation-delay:.63s; }
.stag--geo     { color:#98fb98; border-color:rgba(152,251,152,.35); background:rgba(152,251,152,.08); animation-delay:.7s; }

/* Class strip */
.class-strip {
  position: relative; z-index: 1;
  display: flex; gap: 8px; flex-wrap: wrap;
  border-top: 1px solid rgba(255,255,255,.1);
  padding-top: 28px;
  animation: fadeUp .7s .6s ease both;
}

.class-badge {
  width: 40px; height: 40px;
  border-radius: 10px;
  background: rgba(255,255,255,.07);
  border: 1px solid rgba(255,255,255,.12);
  display: flex; align-items: center; justify-content: center;
  flex-direction: column;
}
.class-badge .cn {
  font-family: 'Playfair Display', serif;
  font-size: .85rem; color: #faf6ef; line-height: 1;
}
.class-badge .cl {
  font-size: .55rem; color: rgba(250,246,239,.45); letter-spacing: .04em;
}
.class-badge--active {
  background: rgba(201,137,60,.2);
  border-color: rgba(201,137,60,.5);
}
.class-badge--active .cn { color: #e8b96a; }

/* ── RIGHT PANEL ──────────────────────────────────────────────── */
.right-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 40px 48px;
  background: #faf6ef;
  position: relative;
  overflow-y: auto;
}

.right-noise {
  position: absolute; inset: 0; pointer-events: none;
  opacity: .035;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 150px;
}

.form-container {
  width: 100%; max-width: 440px;
  position: relative; z-index: 1;
  padding-bottom: 32px;
}

/* ── Steps ────────────────────────────────────────────────────── */
.steps {
  display: flex; align-items: center;
  margin-bottom: 36px;
  animation: fadeUp .6s ease both;
}

.step { display: flex; align-items: center; gap: 8px; }

.step-dot {
  width: 28px; height: 28px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: .72rem; font-weight: 600;
  flex-shrink: 0; transition: all .3s;
}
.step--done   .step-dot { background: #c9893c; color: #fff; }
.step--active .step-dot { background: #0e0b07; color: #fff; }
.step--idle   .step-dot { background: #f0e8d6; color: #8a7f72; border: 1.5px solid #e0d8cc; }

.step-label { font-size: .73rem; font-weight: 500; }
.step--done   .step-label { color: #c9893c; }
.step--active .step-label { color: #0e0b07; font-weight: 600; }
.step--idle   .step-label { color: #8a7f72; }

.step-line {
  flex: 1; height: 1.5px;
  background: #e0d8cc;
  margin: 0 10px;
  position: relative;
}
.step-line--done::after {
  content: ''; position: absolute;
  inset: 0; background: #c9893c;
  transform-origin: left;
  animation: lineGrow .4s ease both;
}

/* ── Form header ──────────────────────────────────────────────── */
.form-header {
  margin-bottom: 30px;
  animation: fadeUp .7s .1s ease both;
}
.form-tag {
  display: inline-flex; align-items: center; gap: 6px;
  font-size: .7rem; font-weight: 500;
  letter-spacing: .12em; text-transform: uppercase;
  color: #b84b2f; margin-bottom: 12px;
}
.form-tag::before {
  content: ''; width: 6px; height: 6px;
  border-radius: 50%; background: #b84b2f;
}
.form-header h2 {
  font-family: 'Playfair Display', serif;
  font-size: 1.9rem; color: #0e0b07;
  line-height: 1.2; margin-bottom: 7px;
}
.form-header p { font-size: .86rem; color: #8a7f72; font-weight: 300; }
.form-header p a {
  color: #c9893c; font-weight: 500; text-decoration: none;
  border-bottom: 1px solid #e8b96a; transition: color .2s;
}
.form-header p a:hover { color: #b84b2f; }

/* ── Section label ────────────────────────────────────────────── */
.section-label {
  font-size: .7rem; font-weight: 600;
  letter-spacing: .14em; text-transform: uppercase;
  color: #8a7f72; margin: 24px 0 14px;
  display: flex; align-items: center; gap: 10px;
}
.section-label::after {
  content: ''; flex: 1; height: 1px; background: #e0d8cc;
}

/* ── Two-col grid ─────────────────────────────────────────────── */
.grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }

/* ── Field ────────────────────────────────────────────────────── */
.field { margin-bottom: 16px; animation: fadeUp .6s ease both; }
.field:nth-child(1) { animation-delay: .15s; }
.field:nth-child(2) { animation-delay: .2s;  }
.field:nth-child(3) { animation-delay: .25s; }
.field:nth-child(4) { animation-delay: .3s;  }

.field label {
  display: block; font-size: .76rem; font-weight: 500;
  color: #0e0b07; margin-bottom: 7px; letter-spacing: .04em;
}

.input-wrap { position: relative; }

.input-icon {
  position: absolute; left: 13px; top: 50%;
  transform: translateY(-50%);
  color: #8a7f72; pointer-events: none;
  display: flex; align-items: center;
}
.input-icon svg { width: 15px; height: 15px; }

.field input {
  width: 100%;
  padding: 12px 13px 12px 38px;
  font-family: 'DM Sans', sans-serif;
  font-size: .88rem; color: #0e0b07;
  background: #f0e8d6;
  border: 1.5px solid transparent;
  border-radius: 11px; outline: none;
  transition: border-color .2s, background .2s, box-shadow .2s;
  appearance: none;
}
.field input::placeholder { color: #8a7f72; }
.field input:focus {
  border-color: #c9893c; background: #fff;
  box-shadow: 0 0 0 4px rgba(201,137,60,.1);
}

.toggle-pw {
  position: absolute; right: 12px; top: 50%; transform: translateY(-50%);
  background: none; border: none; cursor: pointer;
  color: #8a7f72; padding: 0; display: flex; align-items: center;
  transition: color .2s;
}
.toggle-pw:hover { color: #c9893c; }
.toggle-pw svg { width: 15px; height: 15px; }

/* ── Password strength ────────────────────────────────────────── */
.pw-strength { margin-top: 8px; }
.strength-bar { display: flex; gap: 4px; margin-bottom: 4px; }
.sb {
  flex: 1; height: 3px; border-radius: 2px;
  background: #e0d8cc; transition: background .3s;
}
.sb--weak   { background: #e05c5c; }
.sb--medium { background: #c9893c; }
.sb--strong { background: #5cb85c; }
.strength-text { font-size: .7rem; color: #8a7f72; }

/* ── Chips label ──────────────────────────────────────────────── */
.chips-label {
  font-size: .76rem; font-weight: 500;
  color: #0e0b07; margin-bottom: 10px;
  letter-spacing: .04em; display: block;
}

/* ── Subject chips ────────────────────────────────────────────── */
.chips-grid { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 4px; }

.chip {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 7px 13px;
  border-radius: 40px; cursor: pointer;
  font-size: .78rem; font-weight: 500;
  border: 1.5px solid #e0d8cc;
  color: #8a7f72; background: #f0e8d6;
  transition: all .2s; user-select: none;
  font-family: 'DM Sans', sans-serif;
}
.chip-icon { width: 12px; height: 12px; flex-shrink: 0; }
.chip:hover { border-color: #e8b96a; color: #c9893c; background: rgba(201,137,60,.06); }
.chip--selected {
  border-color: #c9893c; color: #0e0b07;
  background: rgba(201,137,60,.12); font-weight: 600;
}

/* ── Class grid ───────────────────────────────────────────────── */
.class-grid {
  display: grid; grid-template-columns: repeat(6, 1fr); gap: 8px;
  margin-bottom: 4px;
}
.class-btn {
  padding: 10px 6px;
  border-radius: 10px; cursor: pointer;
  font-family: 'DM Sans', sans-serif;
  font-size: .8rem; font-weight: 500;
  border: 1.5px solid #e0d8cc;
  color: #8a7f72; background: #f0e8d6;
  text-align: center; transition: all .2s;
}
.class-btn span { display: block; font-size: .6rem; color: #8a7f72; }
.class-btn:hover { border-color: #e8b96a; color: #c9893c; background: rgba(201,137,60,.06); }
.class-btn--selected {
  border-color: #c9893c; background: rgba(201,137,60,.12);
  color: #0e0b07; font-weight: 600;
}
.class-btn--selected span { color: #c9893c; }

/* ── Hint ─────────────────────────────────────────────────────── */
.hint { font-size: .73rem; color: #8a7f72; margin-top: 5px; }

/* ── Terms ────────────────────────────────────────────────────── */
.terms-row {
  display: flex; align-items: flex-start; gap: 10px;
  margin: 20px 0;
  animation: fadeUp .7s .45s ease both;
}
.terms-row p { font-size: .82rem; color: #8a7f72; line-height: 1.5; }
.terms-row p a { color: #c9893c; text-decoration: none; border-bottom: 1px solid #e8b96a; }

.custom-check {
  appearance: none; width: 18px; height: 18px; flex-shrink: 0;
  border: 1.5px solid #cfc5b5; border-radius: 5px;
  background: #f0e8d6; cursor: pointer;
  position: relative; margin-top: 1px;
  transition: border-color .2s, background .2s;
}
.custom-check:checked { background: #c9893c; border-color: #c9893c; }
.custom-check:checked::after {
  content: ''; position: absolute;
  left: 4px; top: 1px; width: 6px; height: 10px;
  border: 2px solid #fff; border-top: none; border-left: none;
  transform: rotate(45deg);
}

/* ── Error ────────────────────────────────────────────────────── */
.error-msg {
  padding: 10px 14px; margin-bottom: 14px;
  background: rgba(184,75,47,.08);
  border: 1px solid rgba(184,75,47,.25);
  border-radius: 10px;
  font-size: .84rem; color: #b84b2f;
}

/* ── Submit button ────────────────────────────────────────────── */
.btn-register {
  width: 100%; padding: 14px;
  display: flex; align-items: center; justify-content: center; gap: 8px;
  font-family: 'DM Sans', sans-serif;
  font-size: .95rem; font-weight: 500; letter-spacing: .03em; color: #fff;
  background: linear-gradient(135deg, #c9893c 0%, #b84b2f 100%);
  border: none; border-radius: 12px; cursor: pointer;
  position: relative; overflow: hidden;
  transition: transform .18s, box-shadow .18s;
  animation: fadeUp .7s .5s ease both;
}
.btn-register::before {
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(135deg, rgba(255,255,255,.18) 0%, transparent 60%);
  pointer-events: none;
}
.btn-register:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 10px 30px rgba(184,75,47,.35); }
.btn-register:active:not(:disabled) { transform: translateY(0); }
.btn-register:disabled { opacity: .55; cursor: not-allowed; }

.spin-icon { width: 16px; height: 16px; animation: spin 1s linear infinite; flex-shrink: 0; }

/* ── Divider ──────────────────────────────────────────────────── */
.divider {
  display: flex; align-items: center; gap: 14px; margin: 22px 0;
  animation: fadeUp .7s .56s ease both;
}
.divider::before,
.divider::after { content: ''; flex: 1; height: 1px; background: #e0d8cc; }
.divider span { font-size: .73rem; color: #8a7f72; letter-spacing: .06em; text-transform: uppercase; white-space: nowrap; }

/* ── Social buttons ───────────────────────────────────────────── */
.socials { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; animation: fadeUp .7s .62s ease both; }

.btn-social {
  display: flex; align-items: center; justify-content: center; gap: 9px;
  padding: 11px;
  font-family: 'DM Sans', sans-serif;
  font-size: .84rem; font-weight: 500;
  color: #0e0b07; background: #f0e8d6;
  border: 1.5px solid #e0d8cc; border-radius: 11px; cursor: pointer;
  transition: background .2s, border-color .2s, transform .15s;
}
.btn-social:hover { background: #fff; border-color: #e8b96a; transform: translateY(-1px); }
.btn-social svg { width: 18px; height: 18px; flex-shrink: 0; }

/* ── Animations ───────────────────────────────────────────────── */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes lineGrow {
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
}
@keyframes spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

/* ── Responsive ───────────────────────────────────────────────── */
@media (max-width: 900px) {
  .left-panel { display: none; }
  .right-panel { padding: 32px 20px; }
  .grid-2 { grid-template-columns: 1fr; }
  .class-grid { grid-template-columns: repeat(5, 1fr); }
}
</style>
