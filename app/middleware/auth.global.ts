import { useAuthStore } from '~/stores/auth'

function roleDashboard(role: string) {
  if (role === 'teacher') return '/teacher/dashboard'
  if (role === 'student') return '/student/dashboard'
  return '/student/dashboard' // default fallback
}

export default defineNuxtRouteMiddleware((to) => {
  if (import.meta.server) return

  const authStore = useAuthStore()

  // Public auth pages — redirect logged-in users to their dashboard
  const publicAuthPages = ['/', '/login', '/register', '/teacher/login', '/teacher/register']
  if (authStore.isLoggedIn && authStore.isVerified && publicAuthPages.includes(to.path)) {
    return navigateTo(roleDashboard(authStore.user?.role ?? ''))
  }

  // Teacher auth pages are public (unauthenticated access allowed)
  if (to.path === '/teacher/login' || to.path === '/teacher/register') return

  // Protected routes — redirect to login if not authenticated
  const protectedPrefixes = ['/student', '/teacher', '/admin']
  if (protectedPrefixes.some(prefix => to.path.startsWith(prefix)) && !authStore.isLoggedIn) {
    return navigateTo(to.path.startsWith('/teacher') ? '/teacher/login' : '/login')
  }

  // Role-based access: students can't access teacher pages and vice versa
  if (authStore.isLoggedIn) {
    if (to.path.startsWith('/teacher') && !authStore.isTeacher && !authStore.isAdmin) {
      return navigateTo(roleDashboard(authStore.user?.role ?? ''))
    }
    if (to.path.startsWith('/student') && authStore.isTeacher && !authStore.isAdmin) {
      return navigateTo(roleDashboard(authStore.user?.role ?? ''))
    }
    if (to.path.startsWith('/admin') && !authStore.isAdmin) {
      return navigateTo(roleDashboard(authStore.user?.role ?? ''))
    }
  }
})
