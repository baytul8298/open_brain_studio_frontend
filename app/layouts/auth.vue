<template>
  <div class="flex min-h-screen overflow-x-hidden bg-cream font-sans">

    <!-- ─── LEFT PANEL ──────────────────────────────────────── -->
    <div class="hidden md:flex w-[52%] relative flex-col justify-between py-[52px] px-[56px] bg-ink overflow-hidden">

      <!-- Background radial glows (::before equivalent) -->
      <div class="left-glow absolute inset-0 pointer-events-none"></div>

      <!-- Decorative grid lines (::after equivalent) -->
      <div class="grid-overlay absolute inset-0 pointer-events-none"></div>

      <!-- Brand -->
      <div class="relative z-10 flex items-center gap-3 anim-fade-up">
        <div class="w-[38px] h-[38px] bg-gold rounded-[10px] flex items-center justify-center flex-shrink-0">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
          </svg>
        </div>
        <span class="font-display text-[1.3rem] text-cream tracking-[0.02em]">Open Brain Studio</span>
      </div>

      <!-- Hero content -->
      <div class="relative z-10 anim-fade-up" style="animation-delay:.15s">
        <p class="eyebrow">Premium Courses</p>
        <h1 class="font-display text-cream leading-[1.18] mb-[22px]"
            style="font-size:clamp(2.2rem,3.2vw,3.1rem)">
          Master skills that<br/><em class="not-italic italic text-gold-light">matter most</em><br/>in your career.
        </h1>
        <p class="text-[0.95rem] font-light leading-[1.7] text-cream/60 max-w-[360px]">
          Join thousands of learners growing with world-class instructors, hands-on projects, and lifetime access.
        </p>
      </div>

      <!-- Stats strip -->
      <div class="relative z-10 flex gap-9 border-t border-white/10 pt-8 anim-fade-up" style="animation-delay:.3s">
        <div v-for="s in stats" :key="s.label" class="flex flex-col gap-1">
          <span class="font-display text-[1.65rem] text-cream leading-none">{{ s.num }}</span>
          <span class="text-[0.72rem] text-cream/50 tracking-[0.06em]">{{ s.label }}</span>
        </div>
      </div>

      <!-- Floating course card -->
      <div class="float-card absolute z-10">
        <span class="fc-badge-card">Trending</span>
        <p class="font-display text-[0.95rem] text-cream leading-[1.3] mb-[14px]">UI Design Mastery 2025</p>
        <div class="flex items-center justify-between">
          <span class="text-[0.72rem] text-cream/65">
            <span class="text-gold-light">★ 4.9</span> · 2.1k
          </span>
          <div class="flex">
            <div v-for="a in avatars" :key="a.letter"
                 class="w-[22px] h-[22px] rounded-full border-2 border-ink -ml-[6px] first:ml-0 flex items-center justify-center text-white text-[0.6rem] font-medium"
                 :style="`background:${a.color}`">
              {{ a.letter }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ─── RIGHT PANEL ─────────────────────────────────────── -->
    <div class="flex-1 relative flex flex-col items-center justify-start py-[52px] px-[48px] bg-cream overflow-y-auto">
      <!-- Subtle noise overlay (::before equivalent) -->
      <div class="right-noise absolute inset-0 pointer-events-none opacity-[0.035]"></div>

      <div class="auth-form-container">
        <slot />
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
const stats = [
  { num: '42K+', label: 'Students'    },
  { num: '380',  label: 'Courses'     },
  { num: '98%',  label: 'Satisfaction'},
]

const avatars = [
  { letter: 'A', color: '#5c8de8' },
  { letter: 'R', color: '#e85ca0' },
  { letter: 'M', color: '#5ce8a0' },
]
</script>

<style scoped>
/* Background radial glows */
.left-glow {
  background:
    radial-gradient(ellipse 80% 60% at 110% 0%, rgba(201,137,60,.35) 0%, transparent 60%),
    radial-gradient(ellipse 60% 50% at -20% 100%, rgba(184,75,47,.28) 0%, transparent 60%);
}

/* Decorative grid lines */
.grid-overlay {
  background-image:
    linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px);
  background-size: 56px 56px;
}

/* Noise texture on right panel */
.right-noise {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 150px;
}

/* Eyebrow label with leading line */
.eyebrow {
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
.eyebrow::before {
  content: '';
  display: block;
  width: 28px;
  height: 1px;
  background: #e8b96a;
}

/* Floating course card — matches reference exactly */
.float-card {
  right: -18px;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255,255,255,.07);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,.12);
  border-radius: 18px;
  padding: 20px 22px;
  width: 196px;
  animation: floatCard 1s .4s ease both, bob 4s 1.4s ease-in-out infinite;
}

/* Trending badge */
.fc-badge-card {
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
</style>
