import { defineStore } from 'pinia'
import type { Notification } from '../types'
import { useAuthStore } from './auth'

interface UiState {
  sidebarOpen: boolean
  notifications: Notification[]
  unreadCount: number
}

export const useUiStore = defineStore('ui', {
  state: (): UiState => ({
    sidebarOpen: true,
    notifications: [],
    unreadCount: 0,
  }),

  actions: {
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen
    },

    async fetchNotifications(unreadOnly = false) {
      const authStore = useAuthStore()
      if (!authStore.accessToken) return

      try {
        const params = new URLSearchParams({ limit: '10' })
        if (unreadOnly) params.set('unread_only', 'true')

        const res = await $fetch<{ success: boolean; data: Notification[] }>(
          `/api/users/notifications?${params.toString()}`,
          {
            headers: { Authorization: `Bearer ${authStore.accessToken}` },
          },
        )
        this.notifications = res.data
        this.unreadCount = res.data.filter((n) => !n.is_read).length
      } catch {
        // Silently fail
      }
    },

    async markRead(id: string) {
      const authStore = useAuthStore()
      if (!authStore.accessToken) return

      try {
        await $fetch(`/api/users/notifications/${id}/read`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${authStore.accessToken}` },
        })
        const notification = this.notifications.find((n) => n.id === id)
        if (notification) {
          notification.is_read = true
          notification.read_at = new Date().toISOString()
          this.unreadCount = Math.max(0, this.unreadCount - 1)
        }
      } catch {
        // Silently fail
      }
    },
  },
})
