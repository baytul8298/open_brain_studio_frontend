import { useAuthStore } from '../stores/auth'

export function useAuth() {
  const authStore = useAuthStore()

  const user = computed(() => authStore.user)
  const isLoggedIn = computed(() => authStore.isLoggedIn)
  const isTeacher = computed(() => authStore.isTeacher)
  const isAdmin = computed(() => authStore.isAdmin)
  const isStudent = computed(() => authStore.isStudent)
  const isLoading = computed(() => authStore.isLoading)

  async function login(email: string, password: string) {
    return authStore.login(email, password)
  }

  async function logout() {
    await authStore.logout()
    await navigateTo('/login')
  }

  async function register(payload: {
    email: string
    password: string
    first_name: string
    last_name: string
    role: 'student' | 'teacher'
  }) {
    return authStore.register(payload)
  }

  return {
    user,
    isLoggedIn,
    isTeacher,
    isAdmin,
    isStudent,
    isLoading,
    login,
    logout,
    register,
  }
}
