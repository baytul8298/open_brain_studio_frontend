import { useAuthStore } from '~/stores/auth'

// Validate the persisted token on every client-side startup.
// If the token is missing or invalid (e.g. an old Laravel-issued JWT),
// fetchMe will catch the 401 and clear token + user from the store.
export default defineNuxtPlugin(async () => {
  if (!import.meta.client) return
  const authStore = useAuthStore()
  if (authStore.token) {
    await authStore.fetchMe()
  }
})
