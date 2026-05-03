<template>
  <div class="layout-root">
    <!-- Sidebar -->
    <AppSidebar />

    <!-- Main content area -->
    <div
      class="layout-main"
      :class="uiStore.sidebarOpen ? 'sidebar-open' : 'sidebar-collapsed'"
    >
      <!-- Top bar -->
      <header class="topbar">
        <!-- Hamburger -->
        <button class="tb-hamburger" @click="uiStore.toggleSidebar()" aria-label="Toggle sidebar">
          <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
            <path d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>

        <!-- Greeting -->
        <div class="topbar-greeting">
          {{ timeGreeting }}, <span>{{ firstName }}</span>
        </div>

        <!-- Search -->
        <div class="search-wrap">
          <span class="search-icon">
            <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
          </span>
          <input type="text" placeholder="Search courses, subjects…" />
        </div>

        <!-- Notifications -->
        <div
          class="tb-icon"
          :class="uiStore.unreadCount > 0 ? 'tb-notif' : ''"
          :data-count="uiStore.unreadCount > 9 ? '9+' : (uiStore.unreadCount > 0 ? String(uiStore.unreadCount) : '')"
          @click="toggleNotifications"
          title="Notifications"
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
          </svg>
        </div>

        <!-- Messages -->
        <div class="tb-icon" title="Messages">
          <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
        </div>

        <!-- Avatar -->
        <div class="tb-avatar" @click="userMenuOpen = !userMenuOpen" title="Profile">
          {{ userInitials }}
        </div>

        <!-- Notifications dropdown -->
        <div v-if="notificationsOpen" class="notif-dropdown">
          <div class="nd-header">
            <span class="nd-title">Notifications</span>
            <button class="nd-close" @click="notificationsOpen = false">
              <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
          <div class="nd-body">
            <div v-if="uiStore.notifications.length === 0" class="nd-empty">No notifications</div>
            <div
              v-for="n in uiStore.notifications"
              :key="n.id"
              class="nd-item"
              :class="{ unread: !n.is_read }"
              @click="uiStore.markRead(n.id)"
            >
              <p class="nd-item-title">{{ n.title }}</p>
              <p class="nd-item-body">{{ n.body }}</p>
            </div>
          </div>
        </div>

        <!-- User menu dropdown -->
        <div v-if="userMenuOpen" class="user-dropdown">
          <NuxtLink to="/student/dashboard" class="ud-item" @click="userMenuOpen = false">Dashboard</NuxtLink>
          <NuxtLink to="/settings" class="ud-item" @click="userMenuOpen = false">Settings</NuxtLink>
          <div class="ud-divider"></div>
          <button class="ud-item ud-signout" @click="handleLogout">Sign out</button>
        </div>
      </header>

      <!-- Page content -->
      <main class="page-content">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '../stores/auth'
import { useUiStore } from '../stores/ui'

const uiStore    = useUiStore()
const authStore  = useAuthStore()
const notificationsOpen = ref(false)
const userMenuOpen      = ref(false)

const displayName = computed(() => {
  const profile = authStore.user?.profile
  if (profile) return `${profile.first_name} ${profile.last_name}`
  return authStore.user?.email ?? 'User'
})

const firstName = computed(() => {
  return authStore.user?.profile?.first_name ?? authStore.user?.email?.split('@')[0] ?? 'there'
})

const userInitials = computed(() => {
  const profile = authStore.user?.profile
  if (profile) return `${profile.first_name[0] ?? ''}${profile.last_name[0] ?? ''}`.toUpperCase()
  return authStore.user?.email?.[0]?.toUpperCase() ?? 'U'
})

const timeGreeting = computed(() => {
  const h = new Date().getHours()
  return h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening'
})

function toggleNotifications() {
  notificationsOpen.value = !notificationsOpen.value
  userMenuOpen.value = false
  if (notificationsOpen.value) uiStore.fetchNotifications()
}

async function handleLogout() {
  userMenuOpen.value = false
  await authStore.logout()
  await navigateTo('/login')
}

onMounted(() => {
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement
    if (!target.closest('.tb-notif') && !target.closest('.notif-dropdown')) notificationsOpen.value = false
    if (!target.closest('.tb-avatar') && !target.closest('.user-dropdown'))   userMenuOpen.value = false
  })
})
</script>

<style scoped>
/* ── ROOT ────────────────────────────────────────────────── */
.layout-root {
  display: flex;
  min-height: 100vh;
  background: #faf6ef;
  font-family: 'DM Sans', sans-serif;
}

.layout-main {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  transition: margin-left .3s ease;
}

.layout-main.sidebar-open      { margin-left: 256px; }
.layout-main.sidebar-collapsed { margin-left: 64px;  }

/* ── TOPBAR ──────────────────────────────────────────────── */
.topbar {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(250,246,239,.94);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid #e0d8cc;
  padding: 0 36px;
  height: 66px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.tb-hamburger {
  width: 36px; height: 36px;
  display: flex; align-items: center; justify-content: center;
  border: none; background: transparent; cursor: pointer;
  border-radius: 9px; color: #8a7f72;
  transition: background .18s, color .18s;
  flex-shrink: 0;
}
.tb-hamburger:hover { background: #f0e8d6; color: #0e0b07; }

.topbar-greeting {
  font-family: 'Playfair Display', serif;
  font-size: 1rem; color: #0e0b07;
  margin-right: auto;
  white-space: nowrap;
}
.topbar-greeting span { color: #c9893c; font-style: italic; }

/* Search */
.search-wrap { position: relative; }
.search-wrap input {
  width: 240px;
  padding: 9px 14px 9px 36px;
  font-family: 'DM Sans', sans-serif;
  font-size: .83rem;
  background: #f0e8d6;
  border: 1.5px solid transparent;
  border-radius: 10px;
  outline: none;
  color: #0e0b07;
  transition: all .25s;
}
.search-wrap input:focus {
  border-color: #c9893c;
  background: #fff;
  box-shadow: 0 0 0 3px rgba(201,137,60,.1);
  width: 290px;
}
.search-wrap input::placeholder { color: #8a7f72; }
.search-icon {
  position: absolute; left: 11px; top: 50%; transform: translateY(-50%);
  color: #8a7f72; pointer-events: none;
  display: flex; align-items: center;
}

/* Icon buttons */
.tb-icon {
  width: 38px; height: 38px; border-radius: 10px;
  background: #f0e8d6; border: 1px solid #e0d8cc;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; transition: all .2s; position: relative;
  flex-shrink: 0; color: #8a7f72;
}
.tb-icon:hover { background: #e8ddc8; border-color: #e8b96a; }
.tb-icon svg { width: 16px; height: 16px; }

/* Notification badge */
.tb-notif::after {
  content: attr(data-count);
  position: absolute; top: -4px; right: -4px;
  background: #b84b2f; color: #fff;
  font-size: .55rem; font-weight: 700;
  border-radius: 20px; padding: 1px 5px;
  border: 2px solid #faf6ef;
  min-width: 16px; text-align: center;
  line-height: 1.4;
}

/* Avatar */
.tb-avatar {
  width: 38px; height: 38px; border-radius: 50%;
  background: linear-gradient(135deg, #c9893c, #b84b2f);
  display: flex; align-items: center; justify-content: center;
  font-family: 'Playfair Display', serif;
  font-size: .9rem; color: #fff;
  cursor: pointer;
  border: 2px solid #e0d8cc;
  transition: border-color .2s;
  flex-shrink: 0;
  user-select: none;
}
.tb-avatar:hover { border-color: #c9893c; }

/* Notifications dropdown */
.notif-dropdown {
  position: absolute; top: 70px; right: 36px;
  width: 340px;
  background: #fff; border: 1px solid #e0d8cc;
  border-radius: 16px; box-shadow: 0 12px 40px rgba(14,11,7,.13);
  z-index: 200; overflow: hidden;
}
.nd-header {
  padding: 14px 18px;
  border-bottom: 1px solid #e0d8cc;
  background: #f0e8d6;
  display: flex; align-items: center; justify-content: space-between;
}
.nd-title { font-family: 'Playfair Display', serif; font-size: 1.05rem; color: #0e0b07; }
.nd-close {
  width: 28px; height: 28px; border-radius: 7px;
  background: transparent; border: none; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  color: #8a7f72; transition: background .18s;
}
.nd-close:hover { background: #e8ddc8; }
.nd-body { max-height: 320px; overflow-y: auto; }
.nd-empty { padding: 20px; text-align: center; font-size: .82rem; color: #8a7f72; }
.nd-item {
  padding: 13px 18px;
  border-bottom: 1px solid #f0e8d6;
  cursor: pointer; transition: background .15s;
}
.nd-item:hover { background: #faf6ef; }
.nd-item.unread { background: rgba(201,137,60,.06); }
.nd-item-title { font-size: .84rem; font-weight: 600; color: #0e0b07; margin-bottom: 3px; }
.nd-item-body  { font-size: .76rem; color: #8a7f72; line-height: 1.4; }

/* User menu dropdown */
.user-dropdown {
  position: absolute; top: 70px; right: 36px;
  width: 180px;
  background: #fff; border: 1px solid #e0d8cc;
  border-radius: 14px; box-shadow: 0 10px 32px rgba(14,11,7,.12);
  z-index: 200; overflow: hidden;
}
.ud-item {
  display: block; width: 100%;
  padding: 11px 16px; font-size: .83rem;
  color: #0e0b07; text-decoration: none;
  background: transparent; border: none; text-align: left;
  cursor: pointer; transition: background .15s;
}
.ud-item:hover { background: #faf6ef; }
.ud-divider { height: 1px; background: #e0d8cc; margin: 2px 0; }
.ud-signout { color: #b84b2f; }
.ud-signout:hover { background: rgba(184,75,47,.06); }

/* ── PAGE CONTENT ────────────────────────────────────────── */
.page-content {
  flex: 1;
  padding: 32px 36px;
  overflow-y: auto;
  background: #faf6ef;
}

/* ── RESPONSIVE ──────────────────────────────────────────── */
@media (max-width: 1024px) {
  .layout-main.sidebar-open      { margin-left: 64px; }
  .layout-main.sidebar-collapsed { margin-left: 0; }
  .topbar { padding: 0 20px; }
  .page-content { padding: 20px; }
}
@media (max-width: 768px) {
  .layout-main.sidebar-open,
  .layout-main.sidebar-collapsed { margin-left: 0; }
  .topbar-greeting { display: none; }
  .search-wrap input { width: 160px; }
  .search-wrap input:focus { width: 200px; }
}
</style>
