<template>
  <div class="teacher-layout">

    <!-- SIDEBAR -->
    <aside class="sidebar">
      <div class="sidebar-glow"></div>
      <div class="sidebar-grid"></div>

      <!-- Brand -->
      <div class="sb-brand">
        <div class="sb-brand-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
          </svg>
        </div>
        <span class="sb-brand-name">Open Brain Studio</span>
      </div>

      <!-- User -->
      <div class="sb-user">
        <NuxtLink to="/teacher/profile" class="sb-avatar">
          <div class="sb-online"></div>
          {{ userInitials }}
        </NuxtLink>
        <div>
          <div class="sb-uname">{{ userName }}</div>
          <span class="sb-role-badge">Teacher</span>
        </div>
      </div>

      <!-- Nav -->
      <nav class="sb-nav">
        <!-- Loading state -->
        <div v-if="navLoading" class="sb-loading">
          <div class="sb-skeleton" v-for="n in 5" :key="n"></div>
        </div>

        <!-- Dynamic nav from API -->
        <template v-else v-for="parentMenu in navMenus" :key="parentMenu.id">
          <template v-if="parentMenu.menus && parentMenu.menus.length > 0">
            <div class="sb-section">{{ parentMenu.name }}</div>

            <template v-for="menu in parentMenu.menus" :key="menu.id">
              <!-- Menu with a "to/route" value -> clicking takes action -->
              <NuxtLink
                v-if="hasRoute(menu.to)"
                :to="resolveHref(menu.to)"
                class="sb-link"
                :class="{ active: isActive(menu.to) }"
              >
                <i :class="[getIconClass(menu.icon_key), 'sb-icon']"></i>
                <span>{{ menu.name }}</span>
              </NuxtLink>

              <!-- Menu without a "to/route" value and with submenus -> clicking expands it -->
              <div v-else-if="menu.submenus && menu.submenus.length > 0">
                <button
                  type="button"
                  class="sb-link sb-link-btn"
                  :class="{ active: hasActiveSubmenu(menu) }"
                  @click="toggleMenu(menu.id)"
                >
                  <i :class="[getIconClass(menu.icon_key), 'sb-icon']"></i>
                  <span>{{ menu.name }}</span>
                  <svg class="sb-chevron" :class="{ rotated: expandedMenus.has(menu.id) }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </button>
                <div v-if="expandedMenus.has(menu.id)" class="sb-submenu">
                  <NuxtLink
                    v-for="sub in menu.submenus"
                    :key="sub.id"
                    :to="resolveHref(sub.to)"
                    class="sb-sublink"
                    :class="{ active: isActive(sub.to) }"
                  >
                    <i v-if="sub.icon_key && sub.icon_key.trim()" :class="[getIconClass(sub.icon_key), 'sb-subicon']"></i>
                    <span v-else class="sb-subdot"></span>
                    <span>{{ sub.name }}</span>
                  </NuxtLink>
                </div>
              </div>

              <!-- Menu without route and without submenus -->
              <div v-else class="sb-link">
                <i :class="[getIconClass(menu.icon_key), 'sb-icon']"></i>
                <span>{{ menu.name }}</span>
              </div>
            </template>
          </template>
        </template>
      </nav>

      <div class="sb-footer">
        <a @click.prevent="handleLogout" style="cursor:pointer">
          <i class="fas fa-right-from-bracket sb-icon"></i>
          <span>Sign Out</span>
        </a>
      </div>
    </aside>

    <!-- PAGE CONTENT -->
    <div class="main">
      <slot />
    </div>

  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

useHead({
  link: [
    {
      rel: 'stylesheet',
      href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css',
    },
    {
      rel: 'stylesheet',
      href: 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css',
    },
  ],
})

const authStore = useAuthStore()
const route = useRoute()
const config = useRuntimeConfig()

const user = computed(() => authStore.user as any)
const userName = computed(() => {
  const u = user.value
  return u ? `${u.first_name ?? ''} ${u.last_name ?? ''}`.trim() || u.email : 'Teacher'
})
const userInitials = computed(() => {
  const parts = userName.value.split(' ').filter(Boolean)
  return parts.length >= 2 ? (parts[0][0] + parts[1][0]).toUpperCase() : userName.value.slice(0, 2).toUpperCase()
})

// ── Nav menus from API ────────────────────────────────────────────────
interface NavButton  { id: number; name: string; key_value: string; icon_key?: string | null; to?: string | null }
interface NavSubmenu { id: number; name: string; icon_key?: string | null; to: string | null; buttons?: NavButton[] }
interface NavMenu    { id: number; name: string; icon_key: string | null; to: string | null; submenus?: NavSubmenu[] }
interface NavParent  { id: number; name: string; menus: NavMenu[] }

const navMenus   = ref<NavParent[]>([])
const navLoading = ref(true)

async function fetchNavMenus() {
  if (!authStore.token) {
    navMenus.value = []
    navLoading.value = false
    return
  }
  navLoading.value = true
  try {
    let res: { success: boolean; data: NavParent[] } | null = null
    try {
      res = await $fetch<{ success: boolean; data: NavParent[] }>(
        '/api/auth/nav-menus',
        { headers: { Authorization: `Bearer ${authStore.token}` } },
      )
    } catch {
      res = await $fetch<{ success: boolean; data: NavParent[] }>(
        `${config.public.laravelApiUrl}/api/auth/nav-menus`,
        { headers: { Authorization: `Bearer ${authStore.token}` } },
      )
    }
    if (res && res.success && Array.isArray(res.data)) {
      navMenus.value = res.data
    } else {
      navMenus.value = []
    }
  } catch {
    navMenus.value = []
  } finally {
    navLoading.value = false
  }
}

onMounted(() => {
  fetchNavMenus()
})

watch(
  () => [authStore.token, authStore.user?.id],
  () => {
    fetchNavMenus()
  },
)

// ── Icon & Route helpers ──────────────────────────────────────────────
function getIconClass(iconKey: string | null | undefined): string {
  if (!iconKey) return 'bi bi-circle'
  const trimmed = iconKey.trim()
  if (!trimmed) return 'bi bi-circle'
  if (/\bfa(-|s\b|r\b|b\b|l\b|d\b|\b)/.test(trimmed)) {
    return trimmed
  }
  const cleaned = trimmed.replace(/\bbi\b/g, '').trim()
  if (!cleaned) return 'bi bi-circle'
  return cleaned.startsWith('bi-') ? `bi ${cleaned}` : `bi bi-${cleaned}`
}

function hasRoute(to: string | null | undefined): boolean {
  if (!to) return false
  const trimmed = to.trim()
  return trimmed !== '' && trimmed !== '#'
}

// ── Submenu expand/collapse ───────────────────────────────────────────
const expandedMenus = ref<Set<number>>(new Set())

function toggleMenu(id: number) {
  if (expandedMenus.value.has(id)) expandedMenus.value.delete(id)
  else expandedMenus.value.add(id)
  // Trigger reactivity
  expandedMenus.value = new Set(expandedMenus.value)
}

function hasActiveSubmenu(menu: NavMenu): boolean {
  return menu.submenus?.some(s => hasRoute(s.to) && isActive(s.to)) ?? false
}

// Auto-expand menus that have an active child
watch([navMenus, () => route.path], () => {
  navMenus.value.forEach(parent => {
    parent.menus?.forEach(menu => {
      if (hasActiveSubmenu(menu)) expandedMenus.value.add(menu.id)
    })
  })
  expandedMenus.value = new Set(expandedMenus.value)
}, { immediate: true })

// ── Routing helpers ───────────────────────────────────────────────────
function resolveHref(to: string | null): string {
  if (!hasRoute(to)) return '#'
  const trimmed = to!.trim()
  if (trimmed.startsWith('http') || trimmed.startsWith('/')) return trimmed
  return '/teacher/' + trimmed.replace(/^\/+/, '')
}

function isActive(to: string | null): boolean {
  if (!hasRoute(to)) return false
  const resolved = resolveHref(to)
  return route.path === resolved || route.path.startsWith(resolved + '/')
}

// ── Sign out ──────────────────────────────────────────────────────────
async function handleLogout() {
  navMenus.value = []
  await authStore.logout()
  await navigateTo('/teacher/login')
}
</script>

<style scoped>
.teacher-layout {
  display: flex;
  min-height: 100vh;
  background: #faf6ef;
  font-family: 'DM Sans', sans-serif;
  color: #0e0b07;
}

/* ── SIDEBAR ─────────────────────────────── */
.sidebar {
  width: 236px;
  flex-shrink: 0;
  background: #1a1208;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0; left: 0; bottom: 0;
  z-index: 100;
  overflow-y: auto;
}

.sidebar-glow {
  position: absolute; inset: 0; pointer-events: none;
  background:
    radial-gradient(ellipse 100% 40% at 50% 0%, rgba(201,137,60,.22), transparent 70%),
    radial-gradient(ellipse 80% 30% at 50% 100%, rgba(184,75,47,.18), transparent 70%);
}

.sidebar-grid {
  position: absolute; inset: 0; pointer-events: none;
  background-image:
    linear-gradient(rgba(255,255,255,.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,.03) 1px, transparent 1px);
  background-size: 40px 40px;
}

.sb-brand {
  position: relative; z-index: 1;
  display: flex; align-items: center; gap: 10px;
  padding: 28px 22px 24px;
  border-bottom: 1px solid rgba(255,255,255,.08);
}

.sb-brand-icon {
  width: 34px; height: 34px;
  background: #c9893c; border-radius: 9px;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.sb-brand-icon svg { width: 18px; height: 18px; }

.sb-brand-name {
  font-family: 'Playfair Display', serif;
  font-size: 1.05rem; color: #faf6ef; letter-spacing: .02em;
}

.sb-user {
  position: relative; z-index: 1;
  padding: 16px 22px;
  border-bottom: 1px solid rgba(255,255,255,.08);
  display: flex; align-items: center; gap: 10px;
}

.sb-avatar {
  width: 36px; height: 36px; border-radius: 9px;
  background: linear-gradient(135deg, #1a3a5c, #2d5a87);
  display: flex; align-items: center; justify-content: center;
  font-family: 'Playfair Display', serif; font-size: .9rem; color: #fff;
  border: 2px solid rgba(255,255,255,.15); flex-shrink: 0; position: relative;
}

.sb-online {
  position: absolute; bottom: -2px; right: -2px;
  width: 9px; height: 9px;
  background: #3a9e6f; border-radius: 50%;
  border: 2px solid #1a1208;
}

.sb-uname { font-size: .84rem; font-weight: 600; color: #faf6ef; }

.sb-role-badge {
  background: rgba(58,107,158,.25);
  border: 1px solid rgba(58,107,158,.4);
  border-radius: 20px; padding: 1px 7px;
  font-size: .62rem; color: #7fb3e0; font-weight: 500;
  display: inline-block; margin-top: 2px;
}

.sb-nav { position: relative; z-index: 1; flex: 1; padding: 12px 0; }

.sb-section {
  font-size: .62rem; letter-spacing: .16em; text-transform: uppercase;
  color: rgba(250,246,239,.3); padding: 14px 22px 6px; font-weight: 600;
}

.sb-link,
.sb-link-btn {
  display: flex; align-items: center; gap: 11px;
  padding: 10px 22px;
  font-size: .84rem; font-weight: 500;
  color: rgba(250,246,239,.65);
  text-decoration: none; cursor: pointer;
  border-left: 3px solid transparent;
  transition: all .2s; position: relative; z-index: 1;
  width: 100%; text-align: left; background: none; border-top: none; border-right: none; border-bottom: none;
}
.sb-icon { width: 16px; text-align: center; flex-shrink: 0; font-size: .9rem; }
.sb-link:hover, .sb-link-btn:hover { color: #faf6ef; background: rgba(255,255,255,.05); }
.sb-link.active, .sb-link-btn.active { color: #e8b96a; border-left-color: #c9893c; background: rgba(201,137,60,.1); }

.sb-chevron {
  width: 14px; height: 14px; margin-left: auto; flex-shrink: 0;
  transition: transform .2s;
}
.sb-chevron.rotated { transform: rotate(180deg); }

.sb-submenu { padding-left: 0; }

.sb-sublink {
  display: flex; align-items: center; gap: 10px;
  padding: 8px 22px 8px 38px;
  font-size: .82rem; font-weight: 400;
  color: rgba(250,246,239,.5);
  text-decoration: none; cursor: pointer;
  border-left: 3px solid transparent;
  transition: all .2s;
}
.sb-sublink:hover { color: #faf6ef; background: rgba(255,255,255,.04); }
.sb-sublink.active { color: #e8b96a; border-left-color: #c9893c; }
.sb-subdot {
  width: 5px; height: 5px; border-radius: 50%;
  background: currentColor; flex-shrink: 0;
}
.sb-subicon {
  width: 14px; text-align: center; flex-shrink: 0; font-size: .8rem;
}

/* Loading skeleton */
.sb-loading { padding: 8px 22px; }
.sb-skeleton {
  height: 36px; border-radius: 7px;
  background: rgba(255,255,255,.06); margin-bottom: 4px;
  animation: pulse 1.5s ease-in-out infinite;
}
@keyframes pulse {
  0%, 100% { opacity: .6 }
  50% { opacity: .3 }
}

.sb-footer {
  position: relative; z-index: 1;
  padding: 10px 0;
  border-top: 1px solid rgba(255,255,255,.08);
}

.sb-footer a {
  display: flex; align-items: center; gap: 11px;
  padding: 10px 22px;
  font-size: .84rem; font-weight: 500;
  color: rgba(250,246,239,.45); text-decoration: none;
  transition: all .2s; border-left: 3px solid transparent;
}
.sb-footer a:hover { color: #faf6ef; background: rgba(255,255,255,.05); }

/* ── MAIN ────────────────────────────────── */
.main {
  margin-left: 236px;
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}
</style>
