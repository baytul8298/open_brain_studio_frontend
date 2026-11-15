import { defineStore } from 'pinia'
import { useAuthStore } from './auth'

export interface NavButton {
  id: number
  name: string
  key_value: string
  icon_key?: string | null
  to?: string | null
}

export interface NavSubmenu {
  id: number
  menu_id: number
  name: string
  icon_key?: string | null
  to: string | null
  search_key: string | null
  sort_order: number
  is_active: boolean
  buttons?: NavButton[]
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

export const useNavStore = defineStore('nav', {
  state: () => ({
    menuGroups: [] as NavGroup[],
    isLoaded: false,
    isLoading: false,
  }),

  actions: {
    async fetchMenus(force = false) {
      if (this.isLoaded && !force) return
      const authStore = useAuthStore()
      if (!authStore.token) {
        this.menuGroups = []
        this.isLoaded = false
        return
      }

      this.isLoading = true
      const config = useRuntimeConfig()
      try {
        let res: { success: boolean; data: NavGroup[] } | null = null
        try {
          res = await $fetch<{ success: boolean; data: NavGroup[] }>(
            '/api/auth/nav-menus',
            { headers: { Authorization: `Bearer ${authStore.token}` } },
          )
        } catch {
          res = await $fetch<{ success: boolean; data: NavGroup[] }>(
            `${config.public.laravelApiUrl}/api/auth/nav-menus`,
            { headers: { Authorization: `Bearer ${authStore.token}` } },
          )
        }
        if (res && res.success && Array.isArray(res.data)) {
          this.menuGroups = res.data
        } else {
          this.menuGroups = []
        }
        this.isLoaded = true
      } catch {
        this.menuGroups = []
        this.isLoaded = true
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
      return state.menuGroups
    },
  },
})
