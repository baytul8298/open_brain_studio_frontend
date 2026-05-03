<template>
  <div>

      <!-- TOPBAR -->
      <header class="topbar">
        <div class="tb-left">
          <div class="tb-date">{{ formattedDate }}</div>
          <div class="tb-greeting">Good {{ timeOfDay }}, <em>{{ firstName }}</em> 👋</div>
        </div>
        <button class="btn-sm-primary">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="width:14px;height:14px"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          New Course
        </button>
        <div class="tb-icon tb-notif">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
        </div>
        <div class="tb-av">{{ avatarInitials }}</div>
      </header>

      <!-- KPI ROW -->
      <div class="kpi-row">
        <div class="kpi kpi-gold" style="animation-delay:.04s">
          <div class="kpi-top">
            <div class="kpi-icon ki-gold"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg></div>
            <span class="kpi-trend kt-up">↑ 12%</span>
          </div>
          <div class="kpi-val">324</div>
          <div class="kpi-label">Total Students</div>
          <div class="kpi-sub">+12 enrolled this week</div>
        </div>
        <div class="kpi kpi-blue" style="animation-delay:.07s">
          <div class="kpi-top">
            <div class="kpi-icon ki-blue"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg></div>
            <span class="kpi-trend kt-up">↑ 2</span>
          </div>
          <div class="kpi-val">6</div>
          <div class="kpi-label">Active Courses</div>
          <div class="kpi-sub">2 new this month</div>
        </div>
        <div class="kpi kpi-green" style="animation-delay:.1s">
          <div class="kpi-top">
            <div class="kpi-icon ki-green"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="8" y1="12" x2="16" y2="12"/></svg></div>
            <span class="kpi-trend kt-down">8 pending</span>
          </div>
          <div class="kpi-val">38</div>
          <div class="kpi-label">Assignments</div>
          <div class="kpi-sub">8 need grading</div>
        </div>
        <div class="kpi kpi-purple" style="animation-delay:.13s">
          <div class="kpi-top">
            <div class="kpi-icon ki-purple"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg></div>
            <span class="kpi-trend kt-up">↑ 18%</span>
          </div>
          <div class="kpi-val">$8,400</div>
          <div class="kpi-label">This Month</div>
          <div class="kpi-sub">$1,280 more than last</div>
        </div>
      </div>

      <!-- DASHBOARD BODY -->
      <div class="dash-body">

        <!-- Today's Classes (full width) -->
        <div class="card full" style="animation-delay:.15s">
          <div class="card-head">
            <div class="card-title"><div class="ci ci-red"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg></div>Today's Classes</div>
            <button class="btn-sm-ghost">Full Schedule →</button>
          </div>
          <div class="card-body">
            <div class="sched-item">
              <div class="sched-time"><div class="sched-time-main">4:00</div><div class="sched-time-ampm">PM</div></div>
              <div class="sched-bar" style="background:#3a6b9e"></div>
              <div class="sched-content">
                <div class="sched-title">Complete Math Mastery — Class 9 <span class="sched-live">● LIVE NOW</span></div>
                <div class="sched-meta"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:10px;height:10px"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>22 students · Chapter 5: Algebraic Identities · 45 min</div>
              </div>
              <button class="btn-sm-primary">Join Class</button>
            </div>
            <div class="sched-item">
              <div class="sched-time"><div class="sched-time-main">6:00</div><div class="sched-time-ampm">PM</div></div>
              <div class="sched-bar" style="background:#c9893c"></div>
              <div class="sched-content">
                <div class="sched-title">Geometry &amp; Trigonometry — Class 10</div>
                <div class="sched-meta"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:10px;height:10px"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>18 students · Chapter 8: Sine Rule · 50 min</div>
              </div>
              <button class="btn-sm-ghost">Prepare</button>
            </div>
            <div class="sched-item" style="border-bottom:none;padding-bottom:0">
              <div class="sched-time"><div class="sched-time-main">8:00</div><div class="sched-time-ampm">PM</div></div>
              <div class="sched-bar" style="background:#7a5cbf"></div>
              <div class="sched-content">
                <div class="sched-title">Higher Mathematics — HSC</div>
                <div class="sched-meta"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:10px;height:10px"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>14 students · Calculus: Differentiation Review · 60 min</div>
              </div>
              <button class="btn-sm-ghost">Prepare</button>
            </div>
          </div>
        </div>

        <!-- Needs Grading -->
        <div class="card" style="animation-delay:.18s">
          <div class="card-head">
            <div class="card-title"><div class="ci ci-orange"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg></div>Needs Grading</div>
            <a class="card-link">View all →</a>
          </div>
          <div class="card-body">
            <div class="asgn-row">
              <div class="ar-icon" style="background:rgba(58,107,158,.1)"><svg viewBox="0 0 24 24" fill="none" stroke="#3a6b9e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:15px;height:15px"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/></svg></div>
              <div class="ar-info"><div class="ar-title">Algebra Practice Set — Chapter 3</div><div class="ar-meta">Class 9 · 18 submitted</div></div>
              <span class="ar-status ar-pending">18 pending</span>
            </div>
            <div class="asgn-row">
              <div class="ar-icon" style="background:rgba(201,137,60,.1)"><svg viewBox="0 0 24 24" fill="none" stroke="#c9893c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:15px;height:15px"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg></div>
              <div class="ar-info"><div class="ar-title">Trigonometry Worksheet — Q1–10</div><div class="ar-meta">Class 10 · 14 submitted</div></div>
              <span class="ar-status ar-pending">14 pending</span>
            </div>
            <div class="asgn-row" style="border-bottom:none">
              <div class="ar-icon" style="background:rgba(122,92,191,.1)"><svg viewBox="0 0 24 24" fill="none" stroke="#7a5cbf" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:15px;height:15px"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/></svg></div>
              <div class="ar-info"><div class="ar-title">Calculus: Limits — Short Problems</div><div class="ar-meta">HSC · 6 submitted</div></div>
              <span class="ar-status ar-pending">6 pending</span>
            </div>
            <div style="margin-top:12px"><button class="btn-sm-primary" style="width:100%;justify-content:center">Start Grading →</button></div>
          </div>
        </div>

        <!-- Recent Activity -->
        <div class="card" style="animation-delay:.2s">
          <div class="card-head">
            <div class="card-title"><div class="ci ci-gold"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg></div>Recent Activity</div>
            <a class="card-link">All Students →</a>
          </div>
          <div class="card-body">
            <div v-for="s in recentStudents" :key="s.initials" class="student-row">
              <div class="sr-av" :style="{ background: s.bg }">{{ s.initials }}</div>
              <div class="sr-info"><div class="sr-name">{{ s.name }}</div><div class="sr-meta">{{ s.meta }}</div></div>
              <span class="sr-badge" :class="s.badgeClass">{{ s.badge }}</span>
            </div>
          </div>
        </div>

        <!-- Course Completion -->
        <div class="card" style="animation-delay:.22s">
          <div class="card-head">
            <div class="card-title"><div class="ci ci-green"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg></div>Course Completion</div>
            <a class="card-link">Analytics →</a>
          </div>
          <div class="card-body">
            <div class="donut-section">
              <div class="donut-wrap">
                <svg width="80" height="80" viewBox="0 0 80 80">
                  <circle fill="none" stroke="#e8ddc8" stroke-width="10" cx="40" cy="40" r="30"/>
                  <circle fill="none" stroke="#3a9e6f" stroke-width="10" style="stroke-dasharray:168;stroke-dashoffset:34;transform:rotate(-90deg);transform-origin:50% 50%" cx="40" cy="40" r="30"/>
                </svg>
                <div class="donut-center"><div class="donut-val">94%</div><div class="donut-sub">avg</div></div>
              </div>
              <div style="flex:1">
                <div style="font-size:.78rem;color:#8a7f72;margin-bottom:8px">By course</div>
                <div v-for="c in courses" :key="c.name" style="margin-bottom:6px">
                  <div style="display:flex;justify-content:space-between;font-size:.74rem;margin-bottom:3px">
                    <span>{{ c.name }}</span><strong :style="{ color: c.color }">{{ c.pct }}%</strong>
                  </div>
                  <div style="height:5px;background:#e8ddc8;border-radius:20px;overflow:hidden">
                    <div :style="{ width: c.pct + '%', height: '100%', background: c.color, borderRadius: '20px' }"></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="stat-mini-grid">
              <div class="stat-mini"><div class="stat-mini-val" style="color:#3a9e6f">87%</div><div class="stat-mini-label">A/A+ Rate</div></div>
              <div class="stat-mini"><div class="stat-mini-val" style="color:#c9893c">4.9★</div><div class="stat-mini-label">Avg Rating</div></div>
              <div class="stat-mini"><div class="stat-mini-val" style="color:#3a6b9e">2.1h</div><div class="stat-mini-label">Avg Watch</div></div>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="card" style="animation-delay:.24s">
          <div class="card-head">
            <div class="card-title"><div class="ci ci-purple"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg></div>Quick Actions</div>
          </div>
          <div class="card-body">
            <div class="quick-actions">
              <div v-for="qa in quickActions" :key="qa.label" class="qa-btn">
                <div class="qa-icon" :style="{ background: qa.bg }">
                  <svg viewBox="0 0 24 24" fill="none" :stroke="qa.color" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:16px;height:16px" v-html="qa.icon"></svg>
                </div>
                <div class="qa-label">{{ qa.label }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Notifications -->
        <div class="card" style="animation-delay:.26s">
          <div class="card-head">
            <div class="card-title"><div class="ci ci-blue"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg></div>Notifications</div>
            <span class="card-link" style="cursor:pointer">Mark all read</span>
          </div>
          <div class="card-body">
            <div v-for="n in notifications" :key="n.time + n.text" class="notif-item">
              <div class="notif-dot" :style="{ background: n.color }"></div>
              <div class="notif-content">
                <div class="notif-text" v-html="n.text"></div>
                <div class="notif-time">{{ n.time }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Earnings -->
        <div class="card" style="animation-delay:.28s">
          <div class="card-head">
            <div class="card-title"><div class="ci ci-gold"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg></div>Earnings — This Month</div>
            <a class="card-link">Details →</a>
          </div>
          <div class="card-body">
            <div style="display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:14px">
              <div>
                <div style="font-family:'Playfair Display',serif;font-size:2rem;color:#0e0b07;line-height:1">$8,400</div>
                <div style="font-size:.76rem;color:#3a9e6f;margin-top:4px">↑ $1,280 from last month</div>
              </div>
              <div style="text-align:right">
                <div style="font-size:.76rem;color:#8a7f72">Target</div>
                <div style="font-family:'Playfair Display',serif;font-size:1.1rem;color:#8a7f72">$10,000</div>
              </div>
            </div>
            <div style="height:8px;background:#e8ddc8;border-radius:20px;overflow:hidden;margin-bottom:6px">
              <div style="width:84%;height:100%;background:linear-gradient(90deg,#c9893c,#e8b96a);border-radius:20px"></div>
            </div>
            <div style="font-size:.72rem;color:#8a7f72;margin-bottom:12px">84% of monthly target · $1,600 remaining</div>
            <div class="stat-mini-grid">
              <div class="stat-mini"><div class="stat-mini-val" style="font-size:1rem">$4,200</div><div class="stat-mini-label">Class 9</div></div>
              <div class="stat-mini"><div class="stat-mini-val" style="font-size:1rem">$2,800</div><div class="stat-mini-label">Class 10</div></div>
              <div class="stat-mini"><div class="stat-mini-val" style="font-size:1rem">$1,400</div><div class="stat-mini-label">HSC</div></div>
            </div>
          </div>
        </div>

      </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '../../stores/auth'

definePageMeta({ layout: 'teacher' })
useHead({ title: 'Teacher Dashboard — Open Brain Studio' })

const authStore = useAuthStore()

if (!authStore.isLoggedIn || !authStore.isVerified) {
  await navigateTo('/teacher/login')
}
if (authStore.user?.role !== 'teacher') {
  await navigateTo('/student/dashboard')
}

const user = authStore.user as any
const firstName = computed(() => user?.first_name ?? user?.email?.split('@')[0] ?? 'Teacher')
const avatarInitials = computed(() => {
  const fn = user?.first_name ?? ''
  const ln = user?.last_name ?? ''
  if (fn && ln) return (fn[0] + ln[0]).toUpperCase()
  return (fn || user?.email || 'T').slice(0, 2).toUpperCase()
})

const now = new Date()
const formattedDate = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
const h = now.getHours()
const timeOfDay = h < 12 ? 'morning' : h < 17 ? 'afternoon' : 'evening'

const courses = [
  { name: 'Math Class 9',    pct: 96, color: '#3a9e6f' },
  { name: 'Geometry Class 10', pct: 91, color: '#c9893c' },
  { name: 'HSC Higher Math', pct: 88, color: '#3a6b9e' },
]

const recentStudents = [
  { initials: 'RU', name: 'Rahim Uddin',  meta: 'Class 9 Math · Submitted assignment 2h ago', badge: '⭐ Top',   badgeClass: 'srb-top',     bg: 'linear-gradient(135deg,#1a3a5c,#2d5a87)' },
  { initials: 'SJ', name: 'Sadia Jannat', meta: 'Class 10 Geo · Enrolled 1 day ago',           badge: 'New',      badgeClass: 'srb-new',     bg: 'linear-gradient(135deg,#1a3a1a,#2a5a2a)' },
  { initials: 'KA', name: 'Karim Ahmed',  meta: 'HSC Higher Math · Missed 2 classes',           badge: 'At Risk',  badgeClass: 'srb-at-risk', bg: 'linear-gradient(135deg,#2a1040,#5a2a80)' },
  { initials: 'NA', name: 'Nadia Ahmed',  meta: 'Class 9 Math · Sent a message',                badge: 'New',      badgeClass: 'srb-new',     bg: 'linear-gradient(135deg,#2a1a0a,#5a3a1a)' },
  { initials: 'TI', name: 'Tarek Islam',  meta: 'Class 10 · Completed all modules',             badge: '⭐ Top',   badgeClass: 'srb-top',     bg: 'linear-gradient(135deg,#0a2a1a,#1a5a3a)' },
]

const quickActions = [
  { label: 'New Course',  icon: '<rect x="3" y="3" width="18" height="18" rx="2"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="12" y1="8" x2="12" y2="16"/>',   color: '#c9893c', bg: 'rgba(201,137,60,.12)' },
  { label: 'Grade Work',  icon: '<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>',                               color: '#d97706', bg: 'rgba(217,119,6,.12)' },
  { label: 'Message',     icon: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',                                                      color: '#3a6b9e', bg: 'rgba(58,107,158,.12)' },
  { label: 'Add Lesson',  icon: '<path d="M22 10v6M2 10l10-5 10 5-10 5z"/>',                                                                                        color: '#3a9e6f', bg: 'rgba(58,158,111,.12)' },
  { label: 'Schedule',    icon: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',                                               color: '#7a5cbf', bg: 'rgba(122,92,191,.12)' },
  { label: 'Analytics',   icon: '<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>',              color: '#2a8a8a', bg: 'rgba(42,138,138,.12)' },
]

const notifications = [
  { color: '#d97706', text: '<strong>Rahim Uddin</strong> submitted "Algebra Practice Set" — needs your review', time: '2 hours ago' },
  { color: '#3a9e6f', text: '<strong>Sadia Jannat</strong> enrolled in Geometry &amp; Trigonometry Class 10',   time: '5 hours ago' },
  { color: '#3a6b9e', text: '<strong>Karim Ahmed</strong> sent you a message about Chapter 8 Q5',               time: 'Yesterday'   },
  { color: '#c9893c', text: 'New review posted: <strong>4.9★</strong> on "Complete Math Mastery Class 9"',      time: 'Yesterday'   },
  { color: '#8a7f72', text: '<strong>Nadia Ahmed</strong> completed Module 3 — Quadratic Equations',            time: '2 days ago'  },
]
</script>

<style scoped>
.topbar {
  position: sticky; top: 0; z-index: 50;
  background: rgba(250,246,239,.95); backdrop-filter: blur(16px);
  border-bottom: 1px solid #e0d8cc;
  padding: 0 32px; height: 64px;
  display: flex; align-items: center; gap: 12px;
}

.tb-left { flex: 1; }
.tb-date { font-size: .78rem; color: #8a7f72; }
.tb-greeting { font-family: 'Playfair Display', serif; font-size: 1.1rem; color: #0e0b07; }
.tb-greeting em { font-style: italic; color: #c9893c; }

.btn-sm-primary {
  display: inline-flex; align-items: center; gap: 5px;
  padding: 8px 14px;
  font-family: 'DM Sans', sans-serif; font-size: .8rem; font-weight: 600;
  color: #fff; background: linear-gradient(135deg, #c9893c, #b84b2f);
  border: none; border-radius: 8px; cursor: pointer; transition: all .18s;
}
.btn-sm-primary:hover { box-shadow: 0 4px 12px rgba(184,75,47,.3); transform: translateY(-1px); }

.btn-sm-ghost {
  display: inline-flex; align-items: center; gap: 5px;
  padding: 6px 13px;
  font-family: 'DM Sans', sans-serif; font-size: .76rem; font-weight: 600;
  color: #8a7f72; background: #fff;
  border: 1.5px solid #e0d8cc; border-radius: 7px; cursor: pointer; transition: all .18s;
}
.btn-sm-ghost:hover { border-color: #e8b96a; color: #c9893c; }

.tb-icon {
  width: 38px; height: 38px; border-radius: 10px;
  background: #f0e8d6; border: 1px solid #e0d8cc;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; transition: all .2s; position: relative; flex-shrink: 0;
}
.tb-icon:hover { background: #e8ddc8; border-color: #e8b96a; }
.tb-icon svg { width: 16px; height: 16px; color: #8a7f72; }

.tb-notif::after {
  content: '5'; position: absolute; top: -4px; right: -4px;
  background: #b84b2f; color: #fff; font-size: .58rem; font-weight: 700;
  border-radius: 20px; padding: 1px 5px; border: 2px solid #faf6ef;
}

.tb-av {
  width: 38px; height: 38px; border-radius: 9px;
  background: linear-gradient(135deg, #1a3a5c, #2d5a87);
  display: flex; align-items: center; justify-content: center;
  font-family: 'Playfair Display', serif; font-size: .95rem; color: #fff;
  cursor: pointer; border: 2px solid #e0d8cc; flex-shrink: 0;
}

/* ── KPI ─────────────────────────────────── */
.kpi-row {
  display: grid; grid-template-columns: repeat(4,1fr);
  gap: 14px; padding: 24px 32px 0;
}

.kpi {
  background: #fff; border: 1px solid #e0d8cc; border-radius: 14px;
  padding: 18px 20px; animation: fadeUp .4s ease both;
  transition: all .2s; cursor: default; position: relative; overflow: hidden;
}
.kpi:hover { box-shadow: 0 6px 20px rgba(14,11,7,.08); border-color: rgba(201,137,60,.2); }
.kpi::after { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; border-radius: 3px 3px 0 0; }
.kpi-gold::after { background: linear-gradient(90deg, #c9893c, #e8b96a); }
.kpi-blue::after { background: linear-gradient(90deg, #3a6b9e, #5a8bbf); }
.kpi-green::after { background: linear-gradient(90deg, #3a9e6f, #5abf8a); }
.kpi-purple::after { background: linear-gradient(90deg, #7a5cbf, #a07ad0); }

.kpi-top { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 10px; }
.kpi-icon { width: 36px; height: 36px; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.kpi-icon svg { width: 16px; height: 16px; }
.ki-gold  { background: rgba(201,137,60,.12); color: #c9893c; }
.ki-blue  { background: rgba(58,107,158,.12);  color: #3a6b9e; }
.ki-green { background: rgba(58,158,111,.12);  color: #3a9e6f; }
.ki-purple{ background: rgba(122,92,191,.12);  color: #7a5cbf; }
.kpi-trend{ font-size: .7rem; font-weight: 700; border-radius: 20px; padding: 2px 8px; }
.kt-up  { background: rgba(58,158,111,.1);  color: #3a9e6f; }
.kt-down{ background: rgba(197,48,48,.1);   color: #c53030; }
.kpi-val  { font-family: 'Playfair Display', serif; font-size: 2rem; color: #0e0b07; line-height: 1; margin-bottom: 4px; }
.kpi-label{ font-size: .74rem; color: #8a7f72; font-weight: 500; }
.kpi-sub  { font-size: .7rem; color: #8a7f72; margin-top: 3px; opacity: .7; }

/* ── BODY GRID ───────────────────────────── */
.dash-body { padding: 22px 32px; display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
.full { grid-column: 1 / -1; }

.card { background: #fff; border: 1px solid #e0d8cc; border-radius: 16px; overflow: hidden; animation: fadeUp .4s ease both; }
.card-head { padding: 14px 20px 12px; border-bottom: 1px solid #e0d8cc; display: flex; align-items: center; justify-content: space-between; gap: 10px; }
.card-title { display: flex; align-items: center; gap: 8px; font-family: 'Playfair Display', serif; font-size: .95rem; color: #0e0b07; }
.card-link { font-size: .78rem; color: #c9893c; text-decoration: none; font-weight: 600; cursor: pointer; }
.card-body { padding: 16px 20px; }

.ci { width: 28px; height: 28px; border-radius: 8px; display: flex; align-items: center; justify-content: center; }
.ci svg { width: 13px; height: 13px; }
.ci-gold   { background: rgba(201,137,60,.12); color: #c9893c; }
.ci-blue   { background: rgba(58,107,158,.12);  color: #3a6b9e; }
.ci-green  { background: rgba(58,158,111,.12);  color: #3a9e6f; }
.ci-red    { background: rgba(197,48,48,.12);   color: #c53030; }
.ci-orange { background: rgba(217,119,6,.12);   color: #d97706; }
.ci-purple { background: rgba(122,92,191,.12);  color: #7a5cbf; }

/* Schedule */
.sched-item { display: flex; align-items: center; gap: 12px; padding: 10px 0; border-bottom: 1px solid #e0d8cc; }
.sched-time { width: 48px; flex-shrink: 0; text-align: center; }
.sched-time-main { font-family: 'Playfair Display', serif; font-size: .9rem; color: #0e0b07; font-weight: 600; }
.sched-time-ampm { font-size: .64rem; color: #8a7f72; text-transform: uppercase; }
.sched-bar { width: 4px; height: 36px; border-radius: 4px; flex-shrink: 0; }
.sched-content { flex: 1; }
.sched-title { font-size: .82rem; font-weight: 600; color: #0e0b07; margin-bottom: 2px; }
.sched-meta { font-size: .7rem; color: #8a7f72; display: flex; align-items: center; gap: 8px; }
.sched-live { font-size: .65rem; font-weight: 700; background: rgba(197,48,48,.1); border: 1px solid rgba(197,48,48,.25); color: #c53030; border-radius: 20px; padding: 2px 8px; animation: pulse 2s infinite; }

/* Assignments */
.asgn-row { display: flex; align-items: center; gap: 10px; padding: 9px 6px; border-bottom: 1px solid #e0d8cc; cursor: pointer; border-radius: 8px; transition: all .18s; }
.asgn-row:hover { background: rgba(240,232,214,.3); }
.ar-icon { width: 34px; height: 34px; border-radius: 9px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.ar-info { flex: 1; min-width: 0; }
.ar-title { font-size: .82rem; font-weight: 600; color: #0e0b07; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.ar-meta  { font-size: .7rem; color: #8a7f72; margin-top: 1px; }
.ar-status{ font-size: .68rem; font-weight: 700; border-radius: 20px; padding: 3px 9px; border: 1px solid; white-space: nowrap; }
.ar-pending { background: rgba(217,119,6,.1); border-color: rgba(217,119,6,.3); color: #d97706; }

/* Students */
.student-row { display: flex; align-items: center; gap: 10px; padding: 9px 0; border-bottom: 1px solid #e0d8cc; cursor: pointer; transition: all .18s; }
.student-row:last-child { border-bottom: none; padding-bottom: 0; }
.student-row:hover .sr-name { color: #c9893c; }
.sr-av   { width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-family: 'Playfair Display', serif; font-size: .74rem; color: #fff; flex-shrink: 0; }
.sr-info { flex: 1; min-width: 0; }
.sr-name { font-size: .82rem; font-weight: 700; color: #0e0b07; transition: color .18s; }
.sr-meta { font-size: .7rem; color: #8a7f72; }
.sr-badge { font-size: .65rem; font-weight: 700; border-radius: 20px; padding: 2px 8px; border: 1px solid; }
.srb-new     { background: rgba(58,158,111,.1);  border-color: rgba(58,158,111,.25);  color: #3a9e6f; }
.srb-at-risk { background: rgba(197,48,48,.1);   border-color: rgba(197,48,48,.25);   color: #c53030; }
.srb-top     { background: rgba(201,137,60,.1);  border-color: rgba(201,137,60,.25);  color: #c9893c; }

/* Donut */
.donut-section { display: flex; gap: 16px; align-items: center; margin-bottom: 14px; }
.donut-wrap { position: relative; width: 80px; height: 80px; flex-shrink: 0; }
.donut-center { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; }
.donut-val { font-family: 'Playfair Display', serif; font-size: 1rem; color: #0e0b07; line-height: 1; }
.donut-sub { font-size: .58rem; color: #8a7f72; text-transform: uppercase; letter-spacing: .06em; }

/* Stat mini */
.stat-mini-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; }
.stat-mini { padding: 10px; background: #f0e8d6; border-radius: 9px; text-align: center; border: 1px solid #e0d8cc; }
.stat-mini-val   { font-family: 'Playfair Display', serif; font-size: 1.2rem; color: #0e0b07; line-height: 1; }
.stat-mini-label { font-size: .66rem; color: #8a7f72; margin-top: 3px; }

/* Quick Actions */
.quick-actions { display: grid; grid-template-columns: repeat(3,1fr); gap: 10px; }
.qa-btn { display: flex; flex-direction: column; align-items: center; gap: 7px; padding: 14px 10px; background: #f0e8d6; border: 1.5px solid #e0d8cc; border-radius: 12px; cursor: pointer; transition: all .2s; text-align: center; }
.qa-btn:hover { border-color: #e8b96a; background: #e8ddc8; transform: translateY(-2px); }
.qa-icon { width: 36px; height: 36px; border-radius: 9px; display: flex; align-items: center; justify-content: center; }
.qa-label { font-size: .76rem; font-weight: 600; color: #0e0b07; }

/* Notifications */
.notif-item { display: flex; align-items: flex-start; gap: 10px; padding: 10px 0; border-bottom: 1px solid #e0d8cc; }
.notif-item:last-child { border-bottom: none; padding-bottom: 0; }
.notif-dot { width: 8px; height: 8px; border-radius: 50%; margin-top: 5px; flex-shrink: 0; }
.notif-content { flex: 1; }
.notif-text { font-size: .8rem; color: #0e0b07; line-height: 1.5; }
.notif-time { font-size: .7rem; color: #8a7f72; margin-top: 2px; }

@keyframes fadeUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
@keyframes pulse  { 0%, 100% { opacity: 1; } 50% { opacity: .5; } }
</style>
