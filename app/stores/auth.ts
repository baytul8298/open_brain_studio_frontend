import { defineStore } from 'pinia'

interface Profile {
  first_name: string
  last_name: string
  avatar_url: string | null
}

interface User {
  id: string
  email: string
  phone: string | null
  role: string
  status: string
  phone_verified: boolean
  email_verified: boolean
  profile: Profile | null
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    token: null as string | null,
    pendingPhone: null as string | null,
    isLoading: false,
  }),

  getters: {
    isLoggedIn:  (state) => !!state.token && !!state.user,
    isVerified:  (state) => state.user?.phone_verified === true,
    isTeacher:   (state) => state.user?.role === 'teacher',
    isAdmin:     (state) => state.user?.role === 'admin' || state.user?.role === 'super_admin',
    isStudent:   (state) => state.user?.role === 'student',
  },

  actions: {
    async login(email: string, password: string, _role: 'student' | 'teacher' = 'student') {
      this.isLoading = true
      try {
        const res = await $fetch<{ success: boolean; data: { accessToken: string; user: any } }>(
          '/api/auth/login',
          { method: 'POST', body: { email, password } },
        )
        this.token = res.data.accessToken
        this.user = {
          id: res.data.user.id,
          email: res.data.user.email,
          phone: null,
          role: res.data.user.role,
          status: 'active',
          phone_verified: true,
          email_verified: true,
          profile: res.data.user.profile ?? null,
        }
        return res.data
      } finally {
        this.isLoading = false
      }
    },

    async logout() {
      try {
        await $fetch('/api/auth/logout', {
          method: 'POST',
          headers: { Authorization: `Bearer ${this.token}` },
        })
      } catch {}
      this.token = null
      this.user  = null
    },

    async register(payload: {
      first_name: string
      last_name: string
      email: string
      phone: string
      password: string
    }) {
      this.isLoading = true
      try {
        const res = await $fetch<{ success: boolean; data: { accessToken: string; user: any } }>(
          '/api/auth/register',
          { method: 'POST', body: { first_name: payload.first_name, last_name: payload.last_name, email: payload.email, password: payload.password, role: 'student' } },
        )
        this.token = res.data.accessToken
        this.user = {
          id: res.data.user.id,
          email: res.data.user.email,
          phone: payload.phone ?? null,
          role: res.data.user.role,
          status: 'active',
          phone_verified: true,
          email_verified: true,
          profile: res.data.user.profile ?? null,
        }
        return res.data
      } finally {
        this.isLoading = false
      }
    },

    async verifyOtp(_phone: string, _otp: string) {
      // OTP flow is no longer used; user is already logged in after register
      return { success: true }
    },

    async registerTeacher(payload: {
      full_name: string
      email: string
      phone: string
      password: string
    }) {
      this.isLoading = true
      try {
        const [first_name, ...rest] = payload.full_name.trim().split(' ')
        const last_name = rest.join(' ') || first_name
        const res = await $fetch<{ success: boolean; data: { accessToken: string; user: any } }>(
          '/api/auth/register',
          { method: 'POST', body: { first_name, last_name, email: payload.email, password: payload.password, role: 'teacher' } },
        )
        this.token = res.data.accessToken
        this.user = {
          id: res.data.user.id,
          email: res.data.user.email,
          phone: payload.phone ?? null,
          role: res.data.user.role,
          status: 'active',
          phone_verified: true,
          email_verified: true,
          profile: res.data.user.profile ?? null,
        }
        return res.data
      } finally {
        this.isLoading = false
      }
    },

    async resendOtp(_phone: string) {
      return { success: true, message: 'OTP sent' }
    },

    async fetchMe() {
      if (!this.token) return
      try {
        const res = await $fetch<{ success: boolean; data: any }>(
          '/api/auth/me',
          { headers: { Authorization: `Bearer ${this.token}` } },
        )
        const u = res.data
        this.user = {
          id: u.id,
          email: u.email,
          phone: null,
          role: u.role,
          status: u.status ?? 'active',
          phone_verified: true,
          email_verified: u.email_verified ?? true,
          profile: u.profile ? { first_name: u.profile.first_name, last_name: u.profile.last_name, avatar_url: u.profile.avatar_url } : null,
        }
      } catch {
        this.token = null
        this.user  = null
      }
    },
  },

  persist: {
    key:     'obs-auth',
    storage: typeof window !== 'undefined' ? localStorage : undefined,
    paths:   ['token', 'user', 'pendingPhone'],
  },
})
