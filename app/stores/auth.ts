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
    async login(email: string, password: string, role: 'student' | 'teacher' = 'student') {
      this.isLoading = true
      const config = useRuntimeConfig()
      const base = config.public.laravelApiUrl
      try {
        const res = await $fetch<{ token?: string; data?: { accessToken?: string; user?: any }; user?: any }>(
          `${base}/api/auth/${role}/login`,
          { method: 'POST', headers: { Accept: 'application/json' }, body: { email, password } },
        )
        const token = res.token ?? res.data?.accessToken ?? null
        const u = res.user ?? res.data?.user
        this.token = token
        this.user = {
          id: u.id,
          email: u.email,
          phone: u.phone ?? null,
          role: u.role,
          status: u.status ?? 'active',
          phone_verified: u.phone_verified ?? true,
          email_verified: u.email_verified ?? true,
          profile: u.profile ?? null,
        }
        if (!this.user.profile) {
          await this.fetchMe()
        }
        return { accessToken: token, token, user: this.user }
      } finally {
        this.isLoading = false
      }
    },

    async logout() {
      const config = useRuntimeConfig()
      const base = config.public.laravelApiUrl
      try {
        await $fetch(`${base}/api/auth/logout`, {
          method: 'POST',
          headers: { Accept: 'application/json', Authorization: `Bearer ${this.token}` },
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
      const config = useRuntimeConfig()
      const base = config.public.laravelApiUrl
      try {
        const res = await $fetch<{ success: boolean; message?: string; phone?: string }>(
          `${base}/api/auth/student/register`,
          {
            method: 'POST',
            headers: { Accept: 'application/json' },
            body: {
              first_name: payload.first_name,
              last_name: payload.last_name,
              email: payload.email,
              phone: payload.phone,
              password: payload.password,
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
      const config = useRuntimeConfig()
      const base = config.public.laravelApiUrl
      try {
        const res = await $fetch<{ success: boolean; token: string; user: any }>(
          `${base}/api/auth/verify-otp`,
          {
            method: 'POST',
            headers: { Accept: 'application/json' },
            body: { phone, otp },
          },
        )
        this.token = res.token
        this.pendingPhone = null
        this.user = {
          id: res.user.id,
          email: res.user.email,
          phone: res.user.phone ?? phone,
          role: res.user.role,
          status: res.user.status ?? 'active',
          phone_verified: res.user.phone_verified ?? true,
          email_verified: res.user.email_verified ?? false,
          profile: res.user.profile ?? null,
        }
        if (!this.user.profile) {
          await this.fetchMe()
        }
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
      const config = useRuntimeConfig()
      const base = config.public.laravelApiUrl
      try {
        const res = await $fetch<{ success: boolean; message?: string; phone?: string }>(
          `${base}/api/auth/teacher/register`,
          {
            method: 'POST',
            headers: { Accept: 'application/json' },
            body: {
              full_name: payload.full_name,
              email: payload.email,
              phone: payload.phone,
              password: payload.password,
            },
          },
        )
        this.pendingPhone = payload.phone
        return res
      } finally {
        this.isLoading = false
      }
    },

    async resendOtp(phone: string) {
      const config = useRuntimeConfig()
      const base = config.public.laravelApiUrl
      return $fetch<{ success: boolean; message: string }>(
        `${base}/api/auth/resend-otp`,
        {
          method: 'POST',
          headers: { Accept: 'application/json' },
          body: { phone },
        },
      )
    },

    async fetchMe() {
      if (!this.token) return
      const config = useRuntimeConfig()
      const base = config.public.laravelApiUrl
      try {
        const res = await $fetch<any>(
          `${base}/api/auth/me`,
          { headers: { Accept: 'application/json', Authorization: `Bearer ${this.token}` } },
        )
        const u = res.data ?? res
        this.user = {
          id: u.id,
          email: u.email,
          phone: u.phone ?? null,
          role: u.role,
          status: u.status ?? 'active',
          phone_verified: u.phone_verified ?? true,
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
