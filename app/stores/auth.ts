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
  first_name?: string
  last_name?: string
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
    async login(email: string, password: string, role: 'student' | 'teacher' = 'student') {
      this.isLoading = true
      try {
        const res = await $fetch<{ success: boolean; data: { token?: string; accessToken: string; user: any } }>(
          '/api/auth/login',
          { method: 'POST', body: { email, password, role } },
        )
        this.token = res.data.token || res.data.accessToken
        this.user = {
          id: res.data.user.id,
          email: res.data.user.email,
          phone: res.data.user.phone ?? null,
          role: res.data.user.role,
          status: res.data.user.status ?? 'active',
          phone_verified: res.data.user.phone_verified ?? true,
          email_verified: res.data.user.email_verified ?? true,
          profile: res.data.user.profile ?? null,
          first_name: res.data.user.profile?.first_name ?? '',
          last_name: res.data.user.profile?.last_name ?? '',
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
      this.pendingPhone = null
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
        const res = await $fetch<{ success: boolean; message: string; phone: string }>(
          '/api/auth/register',
          {
            method: 'POST',
            body: {
              first_name: payload.first_name,
              last_name: payload.last_name,
              email: payload.email,
              phone: payload.phone,
              password: payload.password,
              role: 'student',
            },
          },
        )
        this.pendingPhone = payload.phone
        return res
      } finally {
        this.isLoading = false
      }
    },

    async registerTeacher(payload: {
      full_name: string
      email: string
      phone: string
      password: string
    }) {
      this.isLoading = true
      try {
        const res = await $fetch<{ success: boolean; message: string; phone: string }>(
          '/api/auth/register',
          {
            method: 'POST',
            body: {
              full_name: payload.full_name,
              email: payload.email,
              phone: payload.phone,
              password: payload.password,
              role: 'teacher',
            },
          },
        )
        this.pendingPhone = payload.phone
        return res
      } finally {
        this.isLoading = false
      }
    },

    async verifyOtp(phone: string, otp: string) {
      this.isLoading = true
      try {
        const res = await $fetch<{
          success: boolean
          token: string
          accessToken?: string
          user: any
        }>('/api/auth/verify-otp', {
          method: 'POST',
          body: { phone, otp },
        })

        const activeToken = res.token || res.accessToken || null
        this.token = activeToken
        this.user = {
          id: res.user.id,
          email: res.user.email,
          phone: res.user.phone ?? phone,
          role: res.user.role ?? 'teacher',
          status: 'active',
          phone_verified: true,
          email_verified: res.user.email_verified ?? false,
          profile: res.user.profile ?? null,
          first_name: res.user.profile?.first_name ?? res.user.first_name ?? '',
          last_name: res.user.profile?.last_name ?? res.user.last_name ?? '',
        }
        this.pendingPhone = null
        return res
      } finally {
        this.isLoading = false
      }
    },

    async resendOtp(phone: string) {
      return await $fetch<{ success: boolean; message: string }>(
        '/api/auth/resend-otp',
        {
          method: 'POST',
          body: { phone },
        },
      )
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
          first_name: u.profile?.first_name ?? '',
          last_name: u.profile?.last_name ?? '',
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
