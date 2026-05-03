export interface User {
  id: string
  email: string
  role: 'student' | 'teacher' | 'parent' | 'admin' | 'super_admin'
  status: 'active' | 'inactive' | 'suspended' | 'pending_verification'
  email_verified: boolean
  created_at: string
  profile?: Profile | null
  student_profile?: StudentProfile | null
  teacher_profile?: TeacherProfile | null
}

export interface Profile {
  id: string
  first_name: string
  last_name: string
  avatar_url?: string | null
  cover_url?: string | null
  bio?: string | null
  location?: string | null
  created_at: string
  updated_at: string
}

export interface StudentProfile {
  id: string
  grade_level?: string | null
  board?: string | null
  school_name?: string | null
  interested_subjects: string[]
  points: number
  created_at: string
  updated_at: string
}

export interface TeacherProfile {
  id: string
  specializations: string[]
  qualifications: unknown[]
  rating_avg: number
  total_reviews: number
  verified: boolean
  is_featured: boolean
  experience_years?: number | null
  created_at: string
  updated_at: string
}

export interface Course {
  id: string
  teacher_id: string
  title: string
  slug: string
  short_description?: string | null
  description?: string | null
  thumbnail_url?: string | null
  status: 'draft' | 'pending_review' | 'live' | 'archived'
  is_free: boolean
  price?: number | null
  grade_level?: string | null
  subject?: string | null
  enrolled_count: number
  rating_avg: number
  total_lessons: number
  deleted_at?: string | null
  created_at: string
  updated_at: string
  teacher?: {
    id: string
    profile?: Pick<Profile, 'first_name' | 'last_name' | 'avatar_url'> | null
  }
  sections?: Section[]
  _count?: {
    enrollments: number
    reviews: number
  }
}

export interface Section {
  id: string
  course_id: string
  title: string
  order_num: number
  created_at: string
  updated_at: string
  lessons?: Lesson[]
}

export interface Lesson {
  id: string
  course_id: string
  section_id?: string | null
  title: string
  lesson_type: 'video' | 'text' | 'quiz' | 'assignment' | 'live'
  video_id?: string | null
  content?: string | null
  duration_sec?: number | null
  order_num: number
  is_free_preview: boolean
  created_at: string
  updated_at: string
  video?: Media | null
  resources?: LessonResource[]
}

export interface LessonResource {
  id: string
  lesson_id: string
  media_id: string
  title: string
  created_at: string
  media?: Media
}

export interface LessonProgress {
  id: string
  student_id: string
  lesson_id: string
  last_position_sec: number
  watch_seconds: number
  completed: boolean
  completed_at?: string | null
  updated_at: string
}

export interface Enrollment {
  id: string
  student_id: string
  course_id: string
  status: 'active' | 'expired' | 'cancelled'
  progress_pct: number
  enrolled_at: string
  expires_at?: string | null
  course?: Course
}

export interface Notification {
  id: string
  user_id: string
  title: string
  body: string
  type: string
  data: Record<string, unknown>
  is_read: boolean
  read_at?: string | null
  sent_at: string
}

export interface Media {
  id: string
  uploader_id: string
  storage_key: string
  original_name: string
  mime_type: string
  file_size: number
  media_type: 'image' | 'video' | 'document' | 'audio'
  metadata: Record<string, unknown>
  created_at: string
}

export interface PaginationMeta {
  limit: number
  page: number
  cursor?: string
  nextCursor?: string
  hasMore: boolean
}

export interface ApiResponse<T> {
  success: boolean
  data: T
  meta?: PaginationMeta | Record<string, unknown>
}

// ── Teacher Profile ───────────────────────────────────────────────────────────

export interface TeacherEducationEntry {
  id: number
  user_id: string
  type: 'degree' | 'certificate'
  title: string
  institution: string | null
  start_year: number | null
  end_year: number | null
  is_current: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

export interface TeacherExperienceEntry {
  id: number
  user_id: string
  role_type: 'teacher' | 'tutor' | 'expert' | 'freelance' | 'student' | 'other'
  start_month: number | null
  start_year: number | null
  description: string | null
  expertise_tags: string[]
  is_current: boolean
  created_at: string
  updated_at: string
}

export interface TeacherSubjectEntry {
  id: number
  name: string
  color: string | null
  icon: string | null
}

export interface TeacherGradeLevelEntry {
  id: number
  name: string
}

export interface TeacherTeachingStyleEntry {
  id: number
  user_id: string
  name: string
  description: string | null
  color: string
  sort_order: number
  created_at: string
  updated_at: string
}

export interface TeacherAvailabilitySlot {
  id: number
  user_id: string
  day_of_week: number   // 0=Sun … 6=Sat
  time_slot: string     // "HH:mm:ss"
}

export interface TeacherVerificationEntry {
  id: number
  user_id: string
  doc_type: 'ssc' | 'hsc' | 'honors' | 'masters'
  doc_url: string
  status: 'pending' | 'under_review' | 'approved' | 'rejected'
  reviewed_by: string | null
  reviewer_notes: string | null
  reviewed_at: string | null
  submitted_at: string
}

export interface TeacherProfilePageData {
  profile: {
    bio: string
    first_name: string
    last_name: string
    avatar_url: string | null
    cover_url: string | null
  }
  teacher: {
    headline: string
    verified: boolean
    id_verified: boolean
    is_flexible_time: boolean
    session_types: string[]
    rating_avg: number
    rating_count: number
    total_students: number
    total_courses: number
  }
  educations: TeacherEducationEntry[]
  experience: TeacherExperienceEntry | null
  subjects: TeacherSubjectEntry[]
  grade_levels: TeacherGradeLevelEntry[]
  teaching_styles: TeacherTeachingStyleEntry[]
  availability: TeacherAvailabilitySlot[]
  latest_verification: TeacherVerificationEntry | null
  all_subjects: TeacherSubjectEntry[]
  all_grade_levels: TeacherGradeLevelEntry[]
}
