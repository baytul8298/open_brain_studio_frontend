import { defineStore } from 'pinia'
import { useAuthStore } from './auth'

export interface NavSubmenu {
  id: number
  menu_id: number
  name: string
  to: string | null
  search_key: string | null
  sort_order: number
  is_active: boolean
}

export interface NavMenuItem {
  id: number
  parent_menu_id: number | null
  name: string
  type: string
  key: string
  icon_key: string | null
  to: string | null
  search_key: string | null
  sort_order: number
  is_active: boolean
  badge?: number | null
  submenus: NavSubmenu[]
}

export interface NavGroup {
  id: number
  name: string
  type: string
  sort_order: number
  is_active: boolean
  menus: NavMenuItem[]
}

// Fallback menus used when the backend has no nav menus configured yet
const STUDENT_FALLBACK: NavGroup[] = [
  {
    id: 0,
    name: 'Main',
    type: 'student',
    sort_order: 0,
    is_active: true,
    menus: [
      { id: 1, parent_menu_id: 0, name: 'Dashboard',  type: 'student', key: 'dashboard', icon_key: 'grid',      to: '/student/dashboard', search_key: null, sort_order: 0, is_active: true, badge: null, submenus: [] },
      { id: 2, parent_menu_id: 0, name: 'My Courses', type: 'student', key: 'courses',   icon_key: 'book-open', to: '/student/courses',   search_key: null, sort_order: 1, is_active: true, badge: null, submenus: [] },
      { id: 3, parent_menu_id: 0, name: 'Schedule',   type: 'student', key: 'schedule',  icon_key: 'calendar',  to: '/student/schedule',  search_key: null, sort_order: 2, is_active: true, badge: null, submenus: [] },
      { id: 4, parent_menu_id: 0, name: 'Tutors',     type: 'student', key: 'tutors',    icon_key: 'users',     to: '/student/tutors',    search_key: null, sort_order: 3, is_active: true, badge: null, submenus: [] },
    ],
  },
  {
    id: 1,
    name: 'Learn',
    type: 'student',
    sort_order: 1,
    is_active: true,
    menus: [
      { id: 5, parent_menu_id: 1, name: 'Browse Courses',    type: 'student', key: 'browse',       icon_key: 'search',    to: '/courses',              search_key: null, sort_order: 0, is_active: true, badge: null, submenus: [] },
      { id: 6, parent_menu_id: 1, name: 'Assignments',       type: 'student', key: 'assignments',  icon_key: 'clipboard', to: '/student/assignments',  search_key: null, sort_order: 1, is_active: true, badge: null, submenus: [] },
      { id: 7, parent_menu_id: 1, name: 'Notes & Resources', type: 'student', key: 'notes',        icon_key: 'file-text', to: '/student/notes',        search_key: null, sort_order: 2, is_active: true, badge: null, submenus: [] },
      { id: 8, parent_menu_id: 1, name: 'Progress & Grades', type: 'student', key: 'grades',       icon_key: 'star',      to: '/student/grades',       search_key: null, sort_order: 3, is_active: true, badge: null, submenus: [] },
    ],
  },
  {
    id: 2,
    name: 'Account',
    type: 'student',
    sort_order: 2,
    is_active: true,
    menus: [
      { id: 9,  parent_menu_id: 2, name: 'Profile',       type: 'student', key: 'profile',       icon_key: 'user', to: '/student/profile',       search_key: null, sort_order: 0, is_active: true, badge: null, submenus: [] },
      { id: 10, parent_menu_id: 2, name: 'Notifications', type: 'student', key: 'notifications', icon_key: 'bell', to: '/student/notifications', search_key: null, sort_order: 1, is_active: true, badge: null, submenus: [] },
    ],
  },
]

const TEACHER_FALLBACK: NavGroup[] = [
  {
    id: 0,
    name: 'Main',
    type: 'teacher',
    sort_order: 0,
    is_active: true,
    menus: [
      { id: 1, parent_menu_id: 0, name: 'Dashboard',   type: 'teacher', key: 'dashboard',   icon_key: 'fas fa-house',          to: '/teacher/dashboard',   search_key: null, sort_order: 0, is_active: true, submenus: [] },
      { id: 2, parent_menu_id: 0, name: 'My Courses',  type: 'teacher', key: 'courses',      icon_key: 'fas fa-book-open',      to: '/teacher/courses',     search_key: null, sort_order: 1, is_active: true, submenus: [] },
      { id: 3, parent_menu_id: 0, name: 'Students',    type: 'teacher', key: 'students',     icon_key: 'fas fa-users',          to: '/teacher/students',    search_key: null, sort_order: 2, is_active: true, submenus: [] },
      { id: 4, parent_menu_id: 0, name: 'Assignments', type: 'teacher', key: 'assignments',  icon_key: 'fas fa-clipboard',      to: '/teacher/assignments', search_key: null, sort_order: 3, is_active: true, submenus: [] },
    ],
  },
  {
    id: 1,
    name: 'Growth',
    type: 'teacher',
    sort_order: 1,
    is_active: true,
    menus: [
      { id: 5, parent_menu_id: 1, name: 'Analytics',    type: 'teacher', key: 'analytics',    icon_key: 'fas fa-chart-bar',     to: '/teacher/analytics',     search_key: null, sort_order: 0, is_active: true, submenus: [] },
      { id: 6, parent_menu_id: 1, name: 'Live Sessions', type: 'teacher', key: 'live',         icon_key: 'fas fa-video',         to: '/teacher/live-sessions', search_key: null, sort_order: 1, is_active: true, submenus: [] },
      { id: 7, parent_menu_id: 1, name: 'Messages',      type: 'teacher', key: 'messages',     icon_key: 'fas fa-message',       to: '/teacher/messages',      search_key: null, sort_order: 2, is_active: true, submenus: [] },
    ],
  },
  {
    id: 2,
    name: 'Account',
    type: 'teacher',
    sort_order: 2,
    is_active: true,
    menus: [
      { id: 8, parent_menu_id: 2, name: 'My Profile', type: 'teacher', key: 'profile',  icon_key: 'fas fa-user-circle', to: '/teacher/profile',  search_key: null, sort_order: 0, is_active: true, submenus: [] },
      { id: 9, parent_menu_id: 2, name: 'Settings',   type: 'teacher', key: 'settings', icon_key: 'fas fa-gear',        to: '/teacher/settings', search_key: null, sort_order: 1, is_active: true, submenus: [] },
    ],
  },
]

const ADMIN_FALLBACK: NavGroup[] = [
  {
    id: 0,
    name: 'Admin',
    type: 'admin',
    sort_order: 0,
    is_active: true,
    menus: [
      { id: 1, parent_menu_id: 0, name: 'Dashboard', type: 'admin', key: 'dashboard', icon_key: 'home',     to: '/dashboard',       search_key: null, sort_order: 0, is_active: true, submenus: [] },
      { id: 2, parent_menu_id: 0, name: 'Users',     type: 'admin', key: 'users',     icon_key: 'users',    to: '/admin/users',     search_key: null, sort_order: 1, is_active: true, submenus: [] },
      { id: 3, parent_menu_id: 0, name: 'Courses',   type: 'admin', key: 'courses',   icon_key: 'book-open',to: '/admin/courses',   search_key: null, sort_order: 2, is_active: true, submenus: [] },
      { id: 4, parent_menu_id: 0, name: 'Menus',     type: 'admin', key: 'menus',     icon_key: 'layers',   to: '/admin/menus',     search_key: null, sort_order: 3, is_active: true, submenus: [] },
      { id: 5, parent_menu_id: 0, name: 'Settings',  type: 'admin', key: 'settings',  icon_key: 'settings', to: '/admin/settings',  search_key: null, sort_order: 4, is_active: true, submenus: [] },
    ],
  },
]

export const useNavStore = defineStore('nav', {
  state: () => ({
    menuGroups: [] as NavGroup[],
    isLoaded: false,
    isLoading: false,
  }),

  actions: {
    async fetchMenus() {
      if (this.isLoaded) return
      const authStore = useAuthStore()
      if (!authStore.token) return

      this.isLoading = true
      const config = useRuntimeConfig()
      try {
        const res = await $fetch<{ success: boolean; data: NavGroup[] }>(
          `${config.public.laravelApiUrl}/api/auth/nav-menus`,
          { headers: { Authorization: `Bearer ${authStore.token}` } },
        )
        if (res.success && res.data.length > 0) {
          this.menuGroups = res.data
        }
        this.isLoaded = true
      } catch {
        this.isLoaded = true // mark loaded so we fall back to static
      } finally {
        this.isLoading = false
      }
    },

    reset() {
      this.menuGroups = []
      this.isLoaded = false
    },
  },

  getters: {
    resolvedMenus: (state): NavGroup[] => {
      if (state.menuGroups.length > 0) return state.menuGroups
      const authStore = useAuthStore()
      const role = authStore.user?.role
      if (role === 'teacher') return TEACHER_FALLBACK
      if (role === 'admin' || role === 'super_admin') return ADMIN_FALLBACK
      return STUDENT_FALLBACK
    },
  },
})
