<template>
  <aside
    class="fixed inset-y-0 left-0 z-40 flex flex-col sidebar-bg border-r border-white/10 transition-all duration-300 ease-in-out"
    :class="uiStore.sidebarOpen ? 'w-64' : 'w-16'"
  >
    <!-- ── Brand ─────────────────────────────────────────────── -->
    <div class="h-16 flex items-center gap-3 px-4 border-b border-white/10 flex-shrink-0">
      <div class="w-8 h-8 bg-gold rounded-[9px] flex items-center justify-center flex-shrink-0 shadow-lg">
        <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
        </svg>
      </div>
      <Transition name="fade-slide">
        <span v-if="uiStore.sidebarOpen" class="font-display text-cream text-sm leading-tight whitespace-nowrap overflow-hidden">
          Open Brain Studioo
        </span>
      </Transition>
    </div>

    <!-- ── User Profile ───────────────────────────────────────── -->
    <div class="flex-shrink-0 px-3 py-3 border-b border-white/10">
      <div class="flex items-center gap-3">
        <!-- Avatar -->
        <div class="w-9 h-9 rounded-full bg-gold flex items-center justify-center text-white text-xs font-semibold flex-shrink-0 shadow-md">
          {{ userInitials }}
        </div>
        <!-- Info -->
        <Transition name="fade-slide">
          <div v-if="uiStore.sidebarOpen" class="flex-1 min-w-0">
            <p class="text-cream text-[0.84rem] font-semibold truncate leading-tight">{{ displayName }}</p>
            <div class="flex items-center gap-1 mt-1 flex-wrap">
              <span
                class="inline-block px-1.5 py-0.5 rounded text-[0.6rem] font-medium uppercase tracking-wide"
                :class="roleBadgeClass"
              >
                {{ roleLabel }}
              </span>
            </div>
          </div>
        </Transition>
      </div>
    </div>

    <!-- ── Navigation ────────────────────────────────────────── -->
    <nav class="flex-1 overflow-y-auto overflow-x-hidden py-4 scrollbar-thin">
      <!-- Loading skeleton -->
      <div v-if="navStore.isLoading" class="px-3 space-y-2">
        <div v-for="i in 5" :key="i" class="h-9 rounded-lg bg-white/5 animate-pulse" />
      </div>

      <!-- Menu groups -->
      <div v-else v-for="group in navStore.resolvedMenus" :key="group.id" class="mb-4">
        <!-- Group label -->
        <Transition name="fade-slide">
          <p
            v-if="uiStore.sidebarOpen"
            class="px-4 mb-1 text-[0.65rem] font-medium uppercase tracking-[0.12em] text-cream/35 whitespace-nowrap"
          >
            {{ group.name }}
          </p>
        </Transition>
        <div v-if="!uiStore.sidebarOpen" class="mx-3 mb-2 border-t border-white/10" />

        <!-- Menu items -->
        <div v-for="menu in group.menus" :key="menu.id">
          <!-- Item with submenus -->
          <div v-if="menu.submenus && menu.submenus.length > 0">
            <button
              class="sidebar-item w-full"
              :class="isParentActive(menu) ? 'sidebar-item--active' : ''"
              :title="!uiStore.sidebarOpen ? menu.name : undefined"
              @click="toggleExpand(menu.key)"
            >
              <span class="sidebar-icon">
                <SidebarIcon :name="menu.icon_key" />
              </span>
              <Transition name="fade-slide">
                <span v-if="uiStore.sidebarOpen" class="flex-1 text-left text-[0.88rem] whitespace-nowrap overflow-hidden">
                  {{ menu.name }}
                </span>
              </Transition>
              <Transition name="fade-slide">
                <svg
                  v-if="uiStore.sidebarOpen"
                  class="w-3.5 h-3.5 text-cream/40 transition-transform duration-200"
                  :class="expandedKeys.has(menu.key) ? 'rotate-90' : ''"
                  fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Transition>
            </button>

            <!-- Submenus -->
            <Transition name="submenu">
              <div v-if="expandedKeys.has(menu.key) && uiStore.sidebarOpen" class="ml-8 mt-0.5 space-y-0.5">
                <NuxtLink
                  v-for="sub in menu.submenus"
                  :key="sub.id"
                  :to="sub.to || '#'"
                  class="block px-3 py-2 text-[0.82rem] rounded-lg text-cream/55 hover:text-cream hover:bg-white/5 transition-colors duration-150"
                  :class="isExactActive(sub.to) ? 'text-gold font-medium bg-white/5' : ''"
                >
                  {{ sub.name }}
                </NuxtLink>
              </div>
            </Transition>
          </div>

          <!-- Simple item (no submenus) -->
          <NuxtLink
            v-else
            :to="menu.to || '#'"
            class="sidebar-item"
            :class="isExactActive(menu.to) ? 'sidebar-item--active' : ''"
            :title="!uiStore.sidebarOpen ? menu.name : undefined"
          >
            <span class="sidebar-icon">
              <SidebarIcon :name="menu.icon_key" />
            </span>
            <Transition name="fade-slide">
              <span v-if="uiStore.sidebarOpen" class="flex-1 text-[0.88rem] whitespace-nowrap overflow-hidden">
                {{ menu.name }}
              </span>
            </Transition>
            <Transition name="fade-slide">
              <span
                v-if="uiStore.sidebarOpen && getBadgeCount(menu) > 0"
                class="min-w-[1.25rem] h-5 px-1 rounded-full bg-rust text-white text-[0.6rem] font-bold flex items-center justify-center flex-shrink-0"
              >
                {{ getBadgeCount(menu) > 99 ? '99+' : getBadgeCount(menu) }}
              </span>
            </Transition>
          </NuxtLink>
        </div>
      </div>
    </nav>

    <!-- ── Sign Out ───────────────────────────────────────────── -->
    <div class="flex-shrink-0 border-t border-white/10 p-3">
      <button
        class="sidebar-item w-full text-cream/50 hover:text-rust hover:bg-rust/10"
        @click="handleLogout"
      >
        <span class="sidebar-icon">
          <SidebarIcon name="logout" />
        </span>
        <Transition name="fade-slide">
          <span v-if="uiStore.sidebarOpen" class="flex-1 text-left text-[0.88rem] whitespace-nowrap overflow-hidden">
            Sign Out
          </span>
        </Transition>
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { useAuthStore } from '../stores/auth'
import type { NavMenuItem } from '../stores/nav'
import { useNavStore } from '../stores/nav'
import { useUiStore } from '../stores/ui'

const authStore = useAuthStore()
const uiStore   = useUiStore()
const navStore  = useNavStore()
const route     = useRoute()

const expandedKeys = reactive(new Set<string>())

// Fetch menus on mount
onMounted(() => navStore.fetchMenus())

// Auto-expand active parent menus
watch(() => route.path, () => {
  navStore.resolvedMenus.forEach(group => {
    group.menus.forEach(menu => {
      if (menu.submenus?.some(s => s.to === route.path)) {
        expandedKeys.add(menu.key)
      }
    })
  })
}, { immediate: true })

function toggleExpand(key: string) {
  expandedKeys.has(key) ? expandedKeys.delete(key) : expandedKeys.add(key)
}

function isExactActive(to: string | null) {
  if (!to) return false
  return route.path === to
}

function isParentActive(menu: { to: string | null; submenus: Array<{ to: string | null }> }) {
  if (isExactActive(menu.to)) return true
  return menu.submenus?.some(s => isExactActive(s.to)) ?? false
}

function getBadgeCount(menu: NavMenuItem): number {
  if (menu.key === 'notifications') return uiStore.unreadCount
  return menu.badge ?? 0
}

const displayName = computed(() => {
  const p = authStore.user?.profile
  if (p) return `${p.first_name} ${p.last_name}`
  return authStore.user?.email ?? 'User'
})

const userInitials = computed(() => {
  const p = authStore.user?.profile
  if (p) return `${p.first_name[0] ?? ''}${p.last_name[0] ?? ''}`.toUpperCase()
  return authStore.user?.email?.[0]?.toUpperCase() ?? 'U'
})

const roleLabel = computed(() => {
  const r = authStore.user?.role ?? ''
  const map: Record<string, string> = {
    student: 'Student', teacher: 'Teacher',
    admin: 'Admin', super_admin: 'Super Admin',
  }
  return map[r] ?? r
})

const roleBadgeClass = computed(() => {
  const r = authStore.user?.role ?? ''
  if (r === 'teacher') return 'bg-gold/20 text-gold-light'
  if (r === 'admin' || r === 'super_admin') return 'bg-rust/20 text-rust'
  return 'bg-white/10 text-cream/60'
})

async function handleLogout() {
  navStore.reset()
  await authStore.logout()
  await navigateTo('/login')
}
</script>


<style scoped>
/* Sidebar background — dark warm brown with subtle grid */
.sidebar-bg {
  background-color: #1a1208;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 40px 40px;
}

/* Sidebar nav item base */
.sidebar-item {
  @apply flex items-center gap-3 mx-2 px-3 py-2.5 rounded-xl
         text-cream/60 hover:text-cream hover:bg-white/5
         transition-all duration-150 cursor-pointer no-underline;
}

/* Active state */
.sidebar-item--active {
  @apply text-cream bg-gold/15 hover:bg-gold/20;
  border-left: 2px solid theme('colors.gold.DEFAULT');
  margin-left: calc(theme('spacing.2') - 2px);
}

.sidebar-item--active .sidebar-icon {
  @apply text-gold;
}

/* Icon wrapper */
.sidebar-icon {
  @apply w-5 h-5 flex items-center justify-center flex-shrink-0;
}

/* Transitions */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-6px);
}

.submenu-enter-active,
.submenu-leave-active {
  transition: opacity 0.2s ease, max-height 0.25s ease;
  overflow: hidden;
  max-height: 400px;
}
.submenu-enter-from,
.submenu-leave-to {
  opacity: 0;
  max-height: 0;
}

/* Thin scrollbar */
.scrollbar-thin {
  scrollbar-width: thin;
  scrollbar-color: rgba(255,255,255,0.1) transparent;
}
.scrollbar-thin::-webkit-scrollbar { width: 4px; }
.scrollbar-thin::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 2px; }
</style>
