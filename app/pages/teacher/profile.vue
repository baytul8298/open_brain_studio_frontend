<template>
  <div>

    <!-- ═══ TOPBAR ═══ -->
    <header class="topbar">
      <div class="tb-breadcrumb">
        <NuxtLink to="/teacher/dashboard" class="tb-link">Dashboard</NuxtLink>
        <span class="tb-sep">›</span>
        <span>My Profile</span>
      </div>
      <div class="tb-icon tb-notif">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
      </div>
      <div class="tb-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
      </div>
      <div class="tb-avatar">{{ userInitials }}</div>
    </header>

    <!-- ═══ PAGE LOADING ═══ -->
    <div v-if="loading" class="page-loading">
      <div class="skeleton-hero"></div>
      <div class="skeleton-body">
        <div class="skeleton-col">
          <div class="skeleton-card" v-for="n in 4" :key="n"></div>
        </div>
        <div class="skeleton-side">
          <div class="skeleton-card" v-for="n in 3" :key="n"></div>
        </div>
      </div>
    </div>

    <template v-else>

      <!-- ═══ HERO ═══ -->
      <div class="profile-hero">
        <div class="hero-cover">
          <img v-if="profile.cover_url" :src="profile.cover_url" alt="cover"/>
          <div class="hero-cover-default" v-else></div>
          <div class="hero-cover-overlay"></div>
          <div class="cover-grid"></div>
        </div>

        <div class="hero-profile-row">
          <div class="hero-flex">
            <div class="hero-avatar-wrap">
              <div class="hero-avatar">
                <img v-if="profile.avatar_url" :src="profile.avatar_url" :alt="fullName" class="hero-avatar-img"/>
                <span v-else>{{ userInitials }}</span>
                <div class="hero-verified">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
              </div>
            </div>
            <div class="hero-info">
              <div class="hero-name-row">
                <div class="hero-name">{{ fullName }}</div>
                <div class="hero-type-badge">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                  School Teacher
                </div>
              </div>
              <div class="hero-title" v-if="teacher.headline">{{ teacher.headline }}</div>
              <div class="hero-tags">
                <span v-if="subjects.length" class="hero-tag ht-subject">
                  <i class="fas fa-list-ul" style="font-size:.7rem"></i>
                  {{ subjects[0]?.name }}{{ subjects.length > 1 ? ` +${subjects.length - 1}` : '' }}
                </span>
                <span v-if="teacher.verified" class="hero-tag ht-lang">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:11px;height:11px"><polyline points="20 6 9 17 4 12"/></svg>
                  Verified Educator
                </span>
              </div>
            </div>
            <div class="hero-actions">
              <button class="btn-hero-ghost">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
                Share Profile
              </button>
            </div>
          </div>
        </div>

        <div class="hero-stats-strip">
          <div class="hstat"><div class="hstat-val">{{ teacher.rating_avg }}</div><div class="hstat-label">Rating</div><div class="hstat-sub">★ from {{ teacher.rating_count }} reviews</div></div>
          <div class="hstat"><div class="hstat-val">{{ teacher.total_students }}</div><div class="hstat-label">Students</div><div class="hstat-sub">enrolled total</div></div>
          <div class="hstat"><div class="hstat-val">{{ teacher.total_courses }}</div><div class="hstat-label">Courses</div><div class="hstat-sub">active on platform</div></div>
          <div class="hstat"><div class="hstat-val">{{ subjects.length }}</div><div class="hstat-label">Subjects</div><div class="hstat-sub">being taught</div></div>
        </div>
      </div>

      <!-- ═══ BODY ═══ -->
      <div class="profile-body">

        <!-- LEFT COLUMN -->
        <div class="profile-left">

          <!-- ── TEACHER VERIFICATION ─────────────────────── -->
          <div class="pcard" style="animation-delay:.04s">
            <div class="pcard-body" style="padding:16px 20px">
              <div class="type-banner">
                <div class="tb-icon-wrap">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                </div>
                <div class="tb-content">
                  <div class="tb-type">Teacher Verification</div>
                  <div class="tb-name">
                    <span v-if="teacher.verified">Verified Educator</span>
                    <span v-else-if="latestVerification">Verification Pending Review</span>
                    <span v-else>Not Yet Verified</span>
                  </div>
                  <div class="tb-sub" v-if="latestVerification">Submitted · under review within 2–3 business days</div>
                  <div class="tb-sub" v-else-if="!teacher.verified">Complete verification to earn the Verified Educator badge</div>
                </div>
                <div v-if="teacher.verified" class="tb-verified-badge">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  <span>Verified</span>
                </div>
                <div v-else-if="latestVerification" class="tb-pending-badge">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                  <span>Pending</span>
                </div>
                <button v-else class="tb-verify-btn" @click="showVerifyModal = true">
                  <span class="tb-verify-dot"></span>
                  <span class="tb-verify-text">Get Verified</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="tb-verify-arrow"><polyline points="9 18 15 12 9 6"/></svg>
                </button>
              </div>
            </div>
          </div>

          <!-- ── ABOUT ME ──────────────────────────────────── -->
          <div class="pcard" style="animation-delay:.07s">
            <div class="pcard-head">
              <div class="pcard-title">
                <div class="pcard-title-icon pti-gold">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </div>
                About Me
              </div>
              <button class="pcard-edit-btn" :class="{ active: aboutEditMode }" @click="toggleAboutEdit">
                <svg v-if="!aboutEditMode" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                <span>{{ aboutEditMode ? 'Done' : 'Edit' }}</span>
              </button>
            </div>
            <div class="pcard-body">
              <div v-if="!aboutEditMode">
                <div v-if="profile.bio" class="about-text-view">
                  <p v-for="(para, i) in bioParagraphs" :key="i">{{ para }}</p>
                </div>
                <div v-else class="empty-state">No bio added yet. Click Edit to add one.</div>
              </div>
              <div v-else>
                <div class="form-group" style="margin-bottom:14px">
                  <label class="form-label">Headline</label>
                  <input type="text" class="form-input" v-model="aboutForm.headline" placeholder="e.g., Senior Mathematics Teacher · Dhaka College"/>
                </div>
                <div class="form-group" style="margin-bottom:0">
                  <label class="form-label">Bio</label>
                  <textarea class="about-textarea" v-model="aboutForm.bio" placeholder="Write about yourself, your teaching experience, qualifications..."></textarea>
                  <div class="about-edit-hint">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
                    Leave a blank line between paragraphs.
                    <span class="about-char-count">{{ aboutForm.bio.length }} characters</span>
                  </div>
                </div>
                <div class="section-actions">
                  <button class="btn-cancel" @click="aboutEditMode = false">Cancel</button>
                  <button class="btn-submit" :disabled="saving.about" @click="saveAbout">
                    <svg v-if="!saving.about" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    <span class="loading-dot" v-else></span>
                    {{ saving.about ? 'Saving…' : 'Save Changes' }}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- ── EDUCATION & CERTIFICATE ──────────────────── -->
          <div class="pcard" style="animation-delay:.1s">
            <div class="pcard-head">
              <div class="pcard-title">
                <div class="pcard-title-icon pti-blue">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
                </div>
                Education &amp; Certificate
              </div>
              <div style="display:flex;gap:8px">
                <button class="pcard-add-btn" @click="openAddEduModal()">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                  Add
                </button>
                <button class="pcard-edit-btn" :class="{ active: eduEditMode }" @click="eduEditMode = !eduEditMode">
                  <svg v-if="!eduEditMode" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                  <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  <span>{{ eduEditMode ? 'Done' : 'Edit' }}</span>
                </button>
              </div>
            </div>
            <div class="pcard-body">
              <div v-if="educations.length === 0" class="empty-state">No education entries yet. Click Add to get started.</div>
              <div v-else class="edu-timeline" :class="{ 'edit-mode': eduEditMode }">
                <div v-for="(item, idx) in educations" :key="item.id" class="edu-item">
                  <div class="edu-dot-col">
                    <div class="edu-dot" :style="item.type === 'certificate' ? 'border-color:var(--gold)' : ''"></div>
                    <div v-if="idx < educations.length - 1" class="edu-line"></div>
                  </div>
                  <div class="edu-content">
                    <div class="edu-degree">{{ item.title }}</div>
                    <div class="edu-inst">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
                      {{ item.institution }}
                    </div>
                    <span class="edu-year">{{ item.start_year }} – {{ item.end_year || 'Present' }}</span>
                  </div>
                  <div v-if="eduEditMode" class="edu-item-actions">
                    <button class="edu-action-btn edit" @click="openEditEduModal(item)">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                    </button>
                    <button class="edu-action-btn delete" @click="confirmDeleteEdu(item.id)">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- ── TEACHER EXPERIENCE ────────────────────────── -->
          <div class="pcard" style="animation-delay:.115s">
            <div class="pcard-head">
              <div class="pcard-title">
                <div class="pcard-title-icon pti-green">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="2" y1="13" x2="22" y2="13"/></svg>
                </div>
                Teacher Experience
              </div>
              <button class="pcard-edit-btn" :class="{ active: expEditMode }" @click="toggleExpEdit">
                <svg v-if="!expEditMode" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                <span>{{ expEditMode ? 'Done' : 'Edit' }}</span>
              </button>
            </div>
            <div class="pcard-body">
              <!-- VIEW -->
              <template v-if="!expEditMode">
                <div v-if="experience" class="curr-pos-card">
                  <div class="cp-header-row">
                    <div class="cp-role-badge" :data-role="experience.role">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
                      <span>{{ roleLabel(experience.role) }}</span>
                    </div>
                    <div class="cp-meta">
                      <span v-if="experience.started_month && experience.started_year" class="cp-chip">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                        Since <strong>{{ monthName(experience.started_month) }} {{ experience.started_year }}</strong>
                      </span>
                      <span class="cp-chip cp-chip-live"><span class="cp-live-dot"></span>Currently active</span>
                    </div>
                  </div>
                  <div class="cp-body">
                    <div class="cp-desc-view">
                      <p v-for="(para, i) in expParagraphs" :key="i">{{ para }}</p>
                    </div>
                    <div v-if="experience.expertise && experience.expertise.length" class="cp-expertise-wrap">
                      <div class="cp-expertise-label">Expertise</div>
                      <div class="cp-expertise">
                        <span v-for="tag in experience.expertise" :key="tag" class="cp-exp-tag">{{ tag }}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-else class="empty-state">No experience added yet. Click Edit to get started.</div>
              </template>
              <!-- EDIT -->
              <template v-else>
                <div class="form-group">
                  <label class="form-label">I am a<span class="required">*</span></label>
                  <div class="role-selector">
                    <button v-for="role in roles" :key="role.value" type="button" class="role-option" :class="{ selected: expForm.role === role.value }" @click="expForm.role = role.value">
                      <i :class="role.faIcon" style="font-size:.9rem;color:currentColor"></i>
                      <span>{{ role.label }}</span>
                    </button>
                  </div>
                </div>
                <div class="form-group">
                  <label class="form-label">Started<span class="required">*</span></label>
                  <div class="form-row">
                    <select class="form-select" v-model="expForm.started_month">
                      <option value="">Month</option>
                      <option v-for="(m, i) in months" :key="i" :value="String(i+1).padStart(2,'0')">{{ m }}</option>
                    </select>
                    <select class="form-select" v-model="expForm.started_year">
                      <option value="">Year</option>
                      <option v-for="y in yearRange" :key="y" :value="y">{{ y }}</option>
                    </select>
                  </div>
                </div>
                <div class="form-group">
                  <label class="form-label">Description<span class="required">*</span></label>
                  <textarea class="cp-desc-textarea" v-model="expForm.description" placeholder="Describe your teaching experience..."></textarea>
                  <div class="cp-desc-hint">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
                    Leave a blank line between paragraphs.
                    <span class="cp-desc-count">{{ expForm.description.length }} chars</span>
                  </div>
                </div>
                <div class="form-group">
                  <label class="form-label">Expertise<span class="form-hint">(Optional · comma-separated)</span></label>
                  <input type="text" class="form-input" v-model="expForm.expertiseRaw" placeholder="e.g., Mathematics, Board Curriculum, Exam Strategy"/>
                </div>
                <div class="section-actions">
                  <button class="btn-cancel" @click="expEditMode = false">Cancel</button>
                  <button class="btn-submit" :disabled="saving.experience" @click="saveExperience">
                    <span class="loading-dot" v-if="saving.experience"></span>
                    <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    {{ saving.experience ? 'Saving…' : 'Save Changes' }}
                  </button>
                </div>
              </template>
            </div>
          </div>

          <!-- ── SUBJECTS I TEACH ──────────────────────────── -->
          <div class="pcard" style="animation-delay:.13s">
            <div class="pcard-head">
              <div class="pcard-title">
                <div class="pcard-title-icon pti-teal">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
                </div>
                Subjects I Teach
              </div>
              <button class="pcard-edit-btn" :class="{ active: subjectsEditMode }" @click="subjectsEditMode = !subjectsEditMode">
                <svg v-if="!subjectsEditMode" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                <span>{{ subjectsEditMode ? 'Done' : 'Edit' }}</span>
              </button>
            </div>
            <div class="pcard-body">
              <!-- Session Types -->
              <div class="sess-wrap">
                <div class="sess-section-label">Session Types <span class="sess-hint">Select all that apply</span></div>
                <div class="sess-grid">
                  <button type="button" class="sess-card" :class="{ selected: sessionTypes.has('one-on-one') }" @click="toggleSession('one-on-one')">
                    <div class="sess-check"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div>
                    <div class="sess-icon sess-icon-blue"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></div>
                    <div class="sess-body"><div class="sess-name">One-on-One</div><div class="sess-desc">Private, personalised sessions with a single student.</div></div>
                  </button>
                  <button type="button" class="sess-card" :class="{ selected: sessionTypes.has('group') }" @click="toggleSession('group')">
                    <div class="sess-check"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div>
                    <div class="sess-icon sess-icon-teal"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg></div>
                    <div class="sess-body"><div class="sess-name">Group Sessions</div><div class="sess-desc">Teach multiple students together in a shared session.</div></div>
                  </button>
                </div>
                <div v-if="subjectsEditMode" class="section-actions" style="margin-top:10px">
                  <button class="btn-submit btn-sm" :disabled="saving.sessionTypes" @click="saveSessionTypes">
                    <span class="loading-dot" v-if="saving.sessionTypes"></span>
                    {{ saving.sessionTypes ? 'Saving…' : 'Save Session Types' }}
                  </button>
                </div>
              </div>
              <div class="sess-divider"></div>

              <!-- Subjects -->
              <div class="sess-section-label" style="margin-bottom:10px">
                Subjects
                <button v-if="subjectsEditMode" class="add-tag-btn" @click="showSubjectPickerModal = true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                  Manage Subjects
                </button>
              </div>
              <div class="subject-grid" :class="{ 'edit-mode': subjectsEditMode }">
                <div v-if="subjects.length === 0" class="empty-state" style="width:100%">No subjects added yet.</div>
                <div v-for="subj in subjects" :key="subj.id" class="subj-tag" :style="`background:${subj.color}18;border:1px solid ${subj.color}40;color:${subj.color}`">
                  <i v-if="subj.icon" :class="subj.icon" style="font-size:.75rem"></i>
                  <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/></svg>
                  <span class="tag-text">{{ subj.name }}</span>
                  <span v-if="subjectsEditMode" class="remove-tag" @click="removeSubject(subj.id)">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  </span>
                </div>
              </div>

              <!-- Grade Levels -->
              <div style="margin-top:16px;padding-top:16px;border-top:1px solid var(--border)">
                <div class="sess-section-label" style="margin-bottom:10px">
                  Grade Levels
                  <button v-if="subjectsEditMode" class="add-tag-btn" @click="showGradePickerModal = true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                    Manage Grades
                  </button>
                </div>
                <div style="display:flex;gap:8px;flex-wrap:wrap">
                  <div v-if="gradeLevels.length === 0" class="empty-state">No grade levels added yet.</div>
                  <span v-for="grade in gradeLevels" :key="grade.id" class="grade-pill">
                    Class {{ grade.name }}
                    <span v-if="subjectsEditMode" class="remove-tag" style="position:static;transform:none;margin-left:4px" @click="removeGrade(grade.id)">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="width:9px;height:9px"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- ── TEACHING STYLE ────────────────────────────── -->
          <div class="pcard" style="animation-delay:.16s">
            <div class="pcard-head">
              <div class="pcard-title">
                <div class="pcard-title-icon pti-purple">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                </div>
                Teaching Style
              </div>
              <button class="pcard-edit-btn" :class="{ active: styleEditMode }" @click="styleEditMode = !styleEditMode">
                <svg v-if="!styleEditMode" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                <span>{{ styleEditMode ? 'Done' : 'Edit' }}</span>
              </button>
            </div>
            <div class="pcard-body">
              <div v-if="teachingStyles.length === 0 && !styleEditMode" class="empty-state">No teaching styles added yet. Click Edit to add one.</div>
              <div class="tstyle-grid" :class="{ 'edit-mode': styleEditMode }">
                <div v-for="style in teachingStyles" :key="style.id" class="tstyle-item" :data-color="style.color">
                  <div class="tsi-icon" :class="'tsii-' + (style.color || 'blue')">
                    <i v-if="style.icon" :class="style.icon" style="font-size:.75rem"></i>
                    <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
                  </div>
                  <div class="tsi-name">{{ style.name }}</div>
                  <div class="tsi-desc">{{ style.description }}</div>
                  <div v-if="styleEditMode" class="tstyle-item-actions">
                    <button class="tstyle-action-btn" @click="openEditStyleModal(style)" title="Edit">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                    </button>
                    <button class="tstyle-action-btn delete" @click="deleteTeachingStyle(style.id)" title="Delete">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                    </button>
                  </div>
                </div>
                <div v-if="styleEditMode" class="add-style-btn" @click="showAddStyleModal = true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                  <span>Add Style</span>
                </div>
              </div>
            </div>
          </div>

          <!-- ── WEEKLY AVAILABILITY ───────────────────────── -->
          <div class="pcard" style="animation-delay:.19s">
            <div class="pcard-head">
              <div class="pcard-title">
                <div class="pcard-title-icon pti-green">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
                </div>
                Weekly Availability
              </div>
              <button class="pcard-edit-btn" :class="{ active: availEditMode }" :disabled="saving.availability" @click="availEditMode ? saveAvailability() : (availEditMode = true)">
                <svg v-if="!availEditMode" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                <svg v-else-if="saving.availability" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                <span>{{ availEditMode ? (saving.availability ? 'Saving…' : 'Done') : 'Edit' }}</span>
              </button>
            </div>
            <div class="pcard-body">
              <div style="font-size:.72rem;color:var(--muted);margin-bottom:12px;display:flex;align-items:center;gap:5px">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:12px;height:12px"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                All times in Bangladesh Standard Time (BDT, UTC+6)
              </div>
              <div class="flex-time-toggle" :class="{ active: flexibleTime }" @click="toggleFlexibleTime">
                <div class="ftt-check">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <div class="ftt-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                </div>
                <div class="ftt-body">
                  <div class="ftt-name">Flexible Time <span class="ftt-badge">Any time</span></div>
                  <div class="ftt-desc">Available anytime — students can book whenever works for them.</div>
                </div>
              </div>
              <div class="avail-grid" :class="{ flexible: flexibleTime, 'edit-mode': availEditMode }">
                <div v-for="day in availabilityGrid" :key="day.day" class="avail-day">
                  <div class="avail-day-label">{{ day.day }}</div>
                  <div class="avail-slots">
                    <template v-if="day.slots.length > 0">
                      <span v-for="(slot, si) in day.slots" :key="si" class="avail-slot slot-on" @click="availEditMode && removeSlot(day.day, si)">{{ slot }}</span>
                    </template>
                    <span v-else class="avail-off-label" @click="availEditMode && openTimeModal(day.day)">
                      Unavailable
                    </span>
                    <button v-if="availEditMode" class="add-slot-btn" @click="openTimeModal(day.day)" title="Add time slot">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                    </button>
                  </div>
                </div>
              </div>
              <div v-if="availEditMode" class="avail-edit-hint">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:12px;height:12px;flex-shrink:0"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
                Click a slot to remove it. Click <strong>+</strong> or "Unavailable" to add a time.
              </div>
              <div v-if="availEditMode" class="section-actions">
                <button class="btn-cancel" @click="availEditMode = false; buildAvailabilityGrid(rawAvailability)">Cancel</button>
                <button class="btn-submit" :disabled="saving.availability" @click="saveAvailability">
                  <span class="loading-dot" v-if="saving.availability"></span>
                  <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  {{ saving.availability ? 'Saving…' : 'Save Availability' }}
                </button>
              </div>
            </div>
          </div>

        </div><!-- /profile-left -->

        <!-- RIGHT COLUMN -->
        <div class="profile-right">

          <!-- ── PROFILE STRENGTH ───────────────────────────── -->
          <div class="pcard" style="animation-delay:.06s">
            <div class="pcard-head">
              <div class="pcard-title">
                <div class="pcard-title-icon pti-gold">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                </div>
                Profile Strength
              </div>
            </div>
            <div class="pcard-body" style="text-align:center">
              <div class="pc-ring-wrap">
                <svg width="72" height="72" viewBox="0 0 72 72">
                  <circle class="pc-bg" cx="36" cy="36" r="30"/>
                  <circle class="pc-fill" cx="36" cy="36" r="30" :style="`stroke-dashoffset:${188 - (188 * profileStrength / 100)}`"/>
                </svg>
                <div class="pc-center"><div class="pc-pct">{{ profileStrength }}%</div></div>
              </div>
              <div style="font-size:.8rem;font-weight:700;color:var(--ink);margin-bottom:2px">
                {{ profileStrength >= 80 ? 'Good — Almost There!' : profileStrength >= 50 ? 'In Progress' : 'Just Getting Started' }}
              </div>
              <div style="font-size:.74rem;color:var(--muted);margin-bottom:14px">Complete your profile to attract more students</div>
              <div class="pc-steps">
                <div v-for="step in profileSteps" :key="step.label" class="pc-step">
                  <div class="pcs-check" :class="step.done ? 'pcs-done' : 'pcs-todo'">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" :stroke-width="step.done ? '2.5' : '2'" stroke-linecap="round" stroke-linejoin="round">
                      <polyline v-if="step.done" points="20 6 9 17 4 12"/>
                      <template v-else><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></template>
                    </svg>
                  </div>
                  <span class="pcs-label" :class="{ todo: !step.done }">{{ step.label }}</span>
                  <span v-if="!step.done" class="pcs-action">Add →</span>
                </div>
              </div>
            </div>
          </div>

          <!-- ── QUICK STATS ─────────────────────────────────── -->
          <div class="pcard" style="animation-delay:.1s">
            <div class="pcard-head">
              <div class="pcard-title">
                <div class="pcard-title-icon pti-blue">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
                </div>
                At a Glance
              </div>
            </div>
            <div class="pcard-body" style="padding:14px 18px">
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
                <div class="stat-mini"><div class="stat-mini-val">{{ teacher.total_students }}</div><div class="stat-mini-label">Total Students</div></div>
                <div class="stat-mini"><div class="stat-mini-val" style="color:var(--gold)">{{ teacher.total_courses }}</div><div class="stat-mini-label">Courses</div></div>
                <div class="stat-mini"><div class="stat-mini-val" style="color:var(--blue)">{{ teacher.rating_avg }}</div><div class="stat-mini-label">Avg Rating</div></div>
                <div class="stat-mini"><div class="stat-mini-val" style="color:var(--green)">{{ teacher.rating_count }}</div><div class="stat-mini-label">Reviews</div></div>
              </div>
            </div>
          </div>

        </div><!-- /profile-right -->
      </div><!-- /profile-body -->

    </template><!-- /v-else -->

    <!-- ═══ ADD / EDIT EDUCATION MODAL ═══ -->
    <div class="modal-overlay" :class="{ active: showEduModal }">
      <div class="modal-container">
        <div class="modal-header">
          <div class="modal-icon mi-blue">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
          </div>
          <div class="modal-title-wrap">
            <div class="modal-title">{{ editingEduId ? 'Edit' : 'Add' }} Education / Certificate</div>
            <div class="modal-subtitle">Add a degree, diploma, or certificate</div>
          </div>
          <button class="modal-close" @click="showEduModal = false">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div class="modal-body">
          <div v-if="eduFormError" class="form-error-msg">{{ eduFormError }}</div>
          <div class="form-group">
            <label class="form-label">Type<span class="required">*</span></label>
            <div class="type-selector">
              <div class="type-option" :class="{ selected: eduForm.type === 'degree' }" @click="eduForm.type = 'degree'">
                <div class="type-option-icon toi-degree"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg></div>
                <div class="type-option-name">Degree</div>
              </div>
              <div class="type-option" :class="{ selected: eduForm.type === 'certificate' }" @click="eduForm.type = 'certificate'">
                <div class="type-option-icon toi-cert"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><line x1="7" y1="8" x2="17" y2="8"/><line x1="7" y1="12" x2="13" y2="12"/><path d="M17 16l2 2 4-4"/></svg></div>
                <div class="type-option-name">Certificate</div>
              </div>
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Title / Degree Name<span class="required">*</span></label>
            <input type="text" class="form-input" v-model="eduForm.title" placeholder="e.g., M.Sc. in Pure Mathematics"/>
          </div>
          <div class="form-group">
            <label class="form-label">Institution<span class="required">*</span></label>
            <input type="text" class="form-input" v-model="eduForm.institution" placeholder="e.g., University of Dhaka"/>
          </div>
          <div class="form-group">
            <label class="form-label">Duration</label>
            <div class="form-row">
              <select class="form-select" v-model="eduForm.start_year">
                <option value="">Start Year</option>
                <option v-for="y in yearRange" :key="y" :value="y">{{ y }}</option>
              </select>
              <select class="form-select" v-model="eduForm.end_year">
                <option value="">End Year</option>
                <option v-for="y in yearRange" :key="y" :value="y">{{ y }}</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">CGPA / Grade <span class="form-hint">(Optional)</span></label>
            <input type="text" class="form-input" v-model="eduForm.cgpa" placeholder="e.g., 3.85 / 4.00"/>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn-cancel" @click="showEduModal = false">Cancel</button>
          <button class="btn-submit" :disabled="saving.education" @click="saveEducation">
            <span class="loading-dot" v-if="saving.education"></span>
            <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            {{ saving.education ? 'Saving…' : 'Save Entry' }}
          </button>
        </div>
      </div>
    </div>

    <!-- ═══ DELETE CONFIRM ═══ -->
    <div class="delete-confirm" :class="{ active: showDeleteConfirm }">
      <div class="delete-confirm-box">
        <div class="delete-confirm-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
        </div>
        <div class="delete-confirm-title">Delete Entry?</div>
        <div class="delete-confirm-text">This action cannot be undone.</div>
        <div class="delete-confirm-btns">
          <button class="btn-delete-cancel" @click="showDeleteConfirm = false">Cancel</button>
          <button class="btn-delete-confirm" :disabled="saving.deleting" @click="executeDelete">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
            {{ saving.deleting ? 'Deleting…' : 'Delete' }}
          </button>
        </div>
      </div>
    </div>

    <!-- ═══ SUBJECT PICKER MODAL ═══ -->
    <div class="modal-overlay" :class="{ active: showSubjectPickerModal }" style="z-index:1001">
      <div class="modal-container" style="max-width:480px">
        <div class="modal-header">
          <div class="modal-icon" style="background:rgba(42,138,138,.12);color:var(--teal)">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/></svg>
          </div>
          <div class="modal-title-wrap">
            <div class="modal-title">Manage Subjects</div>
            <div class="modal-subtitle">Select the subjects you teach</div>
          </div>
          <button class="modal-close" @click="showSubjectPickerModal = false">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div class="modal-body">
          <div class="subject-picker-grid">
            <button
              v-for="subj in allSubjects" :key="subj.id"
              type="button"
              class="subject-picker-item"
              :class="{ selected: isSubjectSelected(subj.id) }"
              :style="isSubjectSelected(subj.id) ? `border-color:${subj.color};background:${subj.color}15` : ''"
              @click="toggleSubjectPicker(subj)"
            >
              <i v-if="subj.icon" :class="subj.icon" :style="`color:${subj.color};font-size:.9rem`"></i>
              <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" :style="`width:16px;height:16px;color:${subj.color}`"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/></svg>
              <span class="spi-name" :style="isSubjectSelected(subj.id) ? `color:${subj.color}` : ''">{{ subj.name }}</span>
              <svg v-if="isSubjectSelected(subj.id)" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="spi-check" :style="`color:${subj.color}`"><polyline points="20 6 9 17 4 12"/></svg>
            </button>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn-cancel" @click="showSubjectPickerModal = false">Cancel</button>
          <button class="btn-submit" :disabled="saving.subjects" @click="saveSubjects">
            <span class="loading-dot" v-if="saving.subjects"></span>
            <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            {{ saving.subjects ? 'Saving…' : 'Save Subjects' }}
          </button>
        </div>
      </div>
    </div>

    <!-- ═══ GRADE PICKER MODAL ═══ -->
    <div class="modal-overlay" :class="{ active: showGradePickerModal }" style="z-index:1001">
      <div class="modal-container" style="max-width:420px">
        <div class="modal-header">
          <div class="modal-icon" style="background:rgba(58,107,158,.12);color:var(--blue)">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
          </div>
          <div class="modal-title-wrap">
            <div class="modal-title">Manage Grade Levels</div>
            <div class="modal-subtitle">Select the grades you teach</div>
          </div>
          <button class="modal-close" @click="showGradePickerModal = false">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div class="modal-body">
          <div class="grade-picker-grid">
            <button
              v-for="grade in allGradeLevels" :key="grade.id"
              type="button"
              class="grade-picker-item"
              :class="{ selected: isGradeSelected(grade.id) }"
              @click="toggleGradePicker(grade)"
            >
              Class {{ grade.name }}
              <svg v-if="isGradeSelected(grade.id)" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="width:12px;height:12px;margin-left:4px;color:var(--blue)"><polyline points="20 6 9 17 4 12"/></svg>
            </button>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn-cancel" @click="showGradePickerModal = false">Cancel</button>
          <button class="btn-submit" :disabled="saving.grades" @click="saveGrades">
            <span class="loading-dot" v-if="saving.grades"></span>
            <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            {{ saving.grades ? 'Saving…' : 'Save Grade Levels' }}
          </button>
        </div>
      </div>
    </div>

    <!-- ═══ ADD / EDIT TEACHING STYLE MODAL ═══ -->
    <div class="modal-overlay" :class="{ active: showAddStyleModal }" style="z-index:1001">
      <div class="modal-container" style="max-width:480px">
        <div class="modal-header">
          <div class="modal-icon" style="background:rgba(122,92,191,.12);color:var(--purple)">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          </div>
          <div class="modal-title-wrap">
            <div class="modal-title">{{ editingStyleId ? 'Edit Teaching Style' : 'Add Teaching Style' }}</div>
            <div class="modal-subtitle">Describe your teaching approach</div>
          </div>
          <button class="modal-close" @click="closeStyleModal">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div class="modal-body">
          <div v-if="styleFormError" class="form-error-msg">{{ styleFormError }}</div>
          <div class="form-group">
            <label class="form-label">Style Name<span class="required">*</span></label>
            <input type="text" class="form-input" v-model="styleForm.name" placeholder="e.g., Project-Based, Visual Learning"/>
          </div>
          <div class="form-group">
            <label class="form-label">Description<span class="required">*</span></label>
            <textarea class="form-textarea" v-model="styleForm.description" placeholder="Describe this teaching approach..." style="min-height:80px"></textarea>
          </div>
          <div class="form-group">
            <label class="form-label">Color Theme</label>
            <div style="display:flex;gap:10px;flex-wrap:wrap">
              <label v-for="c in styleColors" :key="c.value" class="color-option" :class="{ selected: styleForm.color === c.value }" @click="styleForm.color = c.value">
                <span class="color-swatch" :class="'swatch-' + c.value"></span>
                <span class="color-label">{{ c.label }}</span>
              </label>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn-cancel" @click="closeStyleModal">Cancel</button>
          <button class="btn-submit" :disabled="saving.style" @click="submitStyleForm">
            <span class="loading-dot" v-if="saving.style"></span>
            <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            {{ saving.style ? 'Saving…' : (editingStyleId ? 'Update Style' : 'Add Style') }}
          </button>
        </div>
      </div>
    </div>

    <!-- ═══ VERIFICATION MODAL ═══ -->
    <div class="modal-overlay" :class="{ active: showVerifyModal }">
      <div class="modal-container">
        <div class="modal-header">
          <div class="modal-icon mi-blue">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <div class="modal-title-wrap">
            <div class="modal-title">Educator Verification</div>
            <div class="modal-subtitle">Verify your identity to earn the Verified Educator badge</div>
          </div>
          <button class="modal-close" @click="showVerifyModal = false">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div class="modal-body">
          <div class="verify-steps">
            <div class="verify-step" :class="{ active: verifyStep === 1, done: verifyStep > 1 }">
              <div class="vs-circle"><span class="vs-num">1</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="width:14px;height:14px"><polyline points="20 6 9 17 4 12"/></svg></div>
              <span class="vs-label">Phone</span>
            </div>
            <div class="vs-connector"></div>
            <div class="verify-step" :class="{ active: verifyStep === 2, done: verifyStep > 2 }">
              <div class="vs-circle"><span class="vs-num">2</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="width:14px;height:14px"><polyline points="20 6 9 17 4 12"/></svg></div>
              <span class="vs-label">OTP</span>
            </div>
            <div class="vs-connector"></div>
            <div class="verify-step" :class="{ active: verifyStep === 3, done: verifyStep > 3 }">
              <div class="vs-circle"><span class="vs-num">3</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="width:14px;height:14px"><polyline points="20 6 9 17 4 12"/></svg></div>
              <span class="vs-label">Documents</span>
            </div>
          </div>
          <template v-if="verifyStep === 1">
            <div class="form-group">
              <label class="form-label">Mobile Number<span class="required">*</span></label>
              <div class="mobile-input-row">
                <div style="width:88px"><input type="text" class="form-input" value="+880" readonly style="text-align:center;font-weight:600"/></div>
                <div style="flex:1"><input type="text" class="form-input" v-model="verifyPhone" placeholder="01XXXXXXXXX"/></div>
              </div>
            </div>
          </template>
          <template v-else-if="verifyStep === 2">
            <p style="font-size:.86rem;color:var(--muted);margin-bottom:14px">Enter the 6-digit OTP sent to <strong>+880 {{ verifyPhone }}</strong></p>
            <div class="otp-wrap">
              <input v-for="n in 6" :key="n" type="text" class="otp-box" maxlength="1"/>
            </div>
          </template>
          <template v-else-if="verifyStep === 3">
            <div class="verify-note">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
              <div class="verify-note-text"><strong>Upload supporting documents</strong> such as a National ID, teaching certificate, or employment letter. Reviewed within 2–3 business days.</div>
            </div>
          </template>
          <template v-else>
            <div class="verify-success">
              <div class="vs-icon-big">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <div class="verify-success-title">Verification Submitted!</div>
              <div class="verify-success-text">Your documents have been submitted for review. We'll notify you within 2–3 business days.</div>
            </div>
          </template>
        </div>
        <div class="modal-footer">
          <button v-if="verifyStep < 4" class="btn-cancel" @click="showVerifyModal = false">Cancel</button>
          <button v-if="verifyStep < 4" class="btn-submit" :disabled="saving.verify" @click="nextVerifyStep">
            <span class="loading-dot" v-if="saving.verify"></span>
            {{ verifyStep === 3 ? (saving.verify ? 'Submitting…' : 'Submit') : 'Next →' }}
          </button>
          <button v-else class="btn-submit" @click="closeVerifyModal">Done</button>
        </div>
      </div>
    </div>

    <!-- ═══ ADD TIME SLOT MODAL ═══ -->
    <div v-if="showTimeModal" class="modal-overlay active" @click.self="showTimeModal = false">
      <div class="modal-container" style="max-width:380px">
        <div class="modal-header">
          <div class="modal-icon" style="background:rgba(58,158,111,.12);color:var(--green)">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
          </div>
          <div class="modal-title-wrap">
            <div class="modal-title">Add Time Slot</div>
            <div class="modal-subtitle">Add time for <strong>{{ timeModalDay }}</strong></div>
          </div>
          <button class="modal-close" @click="showTimeModal = false">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label class="form-label">Time <span class="required">*</span></label>
            <select class="form-select" v-model="newTimeSlot">
              <option value="">Select time</option>
              <option v-for="t in TIME_SLOTS" :key="t" :value="t">{{ t }}</option>
            </select>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn-cancel" @click="showTimeModal = false">Cancel</button>
          <button class="btn-submit" @click="confirmAddSlot">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            Add Time
          </button>
        </div>
      </div>
    </div>

  <!-- ═══ TOAST ═══ -->
  <Transition name="toast">
    <div v-if="toast.show" class="toast-notification" :class="{ 'toast-error': toast.isError }">
      <svg v-if="!toast.isError" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
      <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      {{ toast.message }}
    </div>
  </Transition>

  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

definePageMeta({ layout: 'teacher' })

useHead({
  link: [{ rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&display=swap' }],
})

const authStore = useAuthStore()
const config    = useRuntimeConfig()

const apiBase = ''
const authHeaders = computed(() => ({ Authorization: `Bearer ${authStore.token}` }))

// ── Profile data (from API) ───────────────────────────────
const loading = ref(true)

const profile  = reactive({ bio: '', first_name: '', last_name: '', avatar_url: '', cover_url: '' })
const teacher  = reactive({ headline: '', verified: false, id_verified: false, is_flexible_time: false, session_types: [] as string[], rating_avg: '0.00', rating_count: 0, total_students: 0, total_courses: 0 })

const educations     = ref<any[]>([])
const experience     = ref<any>(null)
const subjects       = ref<any[]>([])
const gradeLevels    = ref<any[]>([])
const teachingStyles = ref<any[]>([])
const rawAvailability = ref<any[]>([])
const latestVerification = ref<any>(null)
const allSubjects    = ref<any[]>([])
const allGradeLevels = ref<any[]>([])

// ── Computed ──────────────────────────────────────────────
const fullName     = computed(() => `${profile.first_name} ${profile.last_name}`.trim() || 'Teacher')
const userInitials = computed(() => {
  const parts = fullName.value.split(' ').filter(Boolean)
  return parts.length >= 2 ? (parts[0][0] + parts[1][0]).toUpperCase() : fullName.value.slice(0, 2).toUpperCase()
})

const bioParagraphs = computed(() =>
  (profile.bio || '').split(/\n\n+/).map(p => p.trim()).filter(Boolean)
)
const expParagraphs = computed(() =>
  (experience.value?.description || '').split(/\n\n+/).map((p: string) => p.trim()).filter(Boolean)
)

// ── Fetch profile ─────────────────────────────────────────
async function fetchProfile() {
  loading.value = true
  try {
    const data: any = await $fetch(`${apiBase}/api/teacher/profile/about`, { headers: authHeaders.value })
    Object.assign(profile, data.profile || {})
    Object.assign(teacher, data.teacher || {})
    educations.value     = data.educations    || []
    experience.value     = data.experience?.[0] ?? null
    subjects.value       = data.subjects      || []
    gradeLevels.value    = data.grade_levels  || []
    teachingStyles.value = data.teaching_styles || []
    rawAvailability.value = data.availability || []
    latestVerification.value = data.latest_verification ?? null
    allSubjects.value    = data.all_subjects    || []
    allGradeLevels.value = data.all_grade_levels || []
    // Sync derived state
    flexibleTime.value   = teacher.is_flexible_time
    sessionTypes.value   = new Set(teacher.session_types || [])
    // Build availability grid from raw API data
    buildAvailabilityGrid(data.availability || [])
  } catch (e) {
    console.error('Failed to load profile', e)
  } finally {
    loading.value = false
  }
}

onMounted(fetchProfile)

// ── Saving state ──────────────────────────────────────────
const saving = reactive({
  about: false, education: false, experience: false,
  subjects: false, grades: false, sessionTypes: false,
  style: false, availability: false, deleting: false, verify: false,
})

// ── Toast ──────────────────────────────────────────────────
const toast = reactive({ show: false, message: '', isError: false })
let toastTimer: ReturnType<typeof setTimeout> | null = null

function showToast(message: string, isError = false) {
  if (toastTimer) clearTimeout(toastTimer)
  toast.message = message
  toast.isError = isError
  toast.show = true
  toastTimer = setTimeout(() => { toast.show = false }, 3000)
}

// ─────────────────────────────────────────────────────────
// ABOUT
// ─────────────────────────────────────────────────────────
const aboutEditMode = ref(false)
const aboutForm     = reactive({ bio: '', headline: '' })

function toggleAboutEdit() {
  if (!aboutEditMode.value) {
    aboutForm.bio      = profile.bio || ''
    aboutForm.headline = teacher.headline || ''
  }
  aboutEditMode.value = !aboutEditMode.value
}

async function saveAbout() {
  saving.about = true
  try {
    const data: any = await $fetch(`${apiBase}/api/teacher/profile/about`, {
      method: 'PUT',
      headers: authHeaders.value,
      body: { bio: aboutForm.bio, headline: aboutForm.headline },
    })
    if (data.profile)  Object.assign(profile, data.profile)
    if (data.teacher)  Object.assign(teacher, data.teacher)
    aboutEditMode.value = false
    showToast(data.message || 'About section saved!')
  } catch (e: any) {
    showToast(e?.data?.message || e?.message || 'Failed to save about section.', true)
  }
  finally { saving.about = false }
}

// ─────────────────────────────────────────────────────────
// EDUCATION
// ─────────────────────────────────────────────────────────
const eduEditMode     = ref(false)
const showEduModal    = ref(false)
const editingEduId    = ref<number | null>(null)
const showDeleteConfirm = ref(false)
const deleteTargetId  = ref<number | null>(null)

const eduForm = reactive({ type: 'degree', title: '', institution: '', start_year: '', end_year: '', cgpa: '' })
const eduFormError = ref('')

function openAddEduModal() {
  editingEduId.value = null
  eduFormError.value = ''
  Object.assign(eduForm, { type: 'degree', title: '', institution: '', start_year: '', end_year: '', cgpa: '' })
  showEduModal.value = true
}

function openEditEduModal(item: any) {
  editingEduId.value = item.id
  eduFormError.value = ''
  Object.assign(eduForm, { type: item.type, title: item.title, institution: item.institution, start_year: item.start_year, end_year: item.end_year || '', cgpa: item.cgpa || '' })
  showEduModal.value = true
}

async function saveEducation() {
  if (!eduForm.title || !eduForm.institution) return
  eduFormError.value = ''
  saving.education = true
  try {
    const body = { type: eduForm.type, title: eduForm.title, institution: eduForm.institution, start_year: Number(eduForm.start_year) || null, end_year: Number(eduForm.end_year) || null, cgpa: eduForm.cgpa || null }
    let data: any
    if (editingEduId.value) {
      data = await $fetch(`${apiBase}/api/teacher/profile/educations/${editingEduId.value}`, { method: 'PUT', headers: authHeaders.value, body })
    } else {
      data = await $fetch(`${apiBase}/api/teacher/profile/educations`, { method: 'POST', headers: authHeaders.value, body })
    }
    if (data.educations) educations.value = data.educations
    else await fetchProfile()
    showEduModal.value = false
    showToast(data.message || (editingEduId.value ? 'Education updated!' : 'Education added!'))
  } catch (e: any) {
    eduFormError.value = e?.data?.message || e?.message || 'Failed to save education.'
  }
  finally { saving.education = false }
}

function confirmDeleteEdu(id: number) {
  deleteTargetId.value = id
  showDeleteConfirm.value = true
}

async function executeDelete() {
  if (!deleteTargetId.value) return
  saving.deleting = true
  try {
    await $fetch(`${apiBase}/api/teacher/profile/educations/${deleteTargetId.value}`, { method: 'DELETE', headers: authHeaders.value })
    educations.value = educations.value.filter(e => e.id !== deleteTargetId.value)
    showDeleteConfirm.value = false
  } catch (e) { console.error(e) }
  finally { saving.deleting = false }
}

// ─────────────────────────────────────────────────────────
// EXPERIENCE
// ─────────────────────────────────────────────────────────
const expEditMode = ref(false)
const expForm     = reactive({ role: 'teacher', started_month: '', started_year: '', description: '', expertiseRaw: '' })

const months = ['January','February','March','April','May','June','July','August','September','October','November','December']

function monthName(m: string | number): string {
  return months[Number(m) - 1] || ''
}

function toggleExpEdit() {
  if (!expEditMode.value && experience.value) {
    const e = experience.value
    expForm.role          = e.role || 'teacher'
    expForm.started_month = e.started_month || ''
    expForm.started_year  = e.started_year  || ''
    expForm.description   = e.description   || ''
    expForm.expertiseRaw  = Array.isArray(e.expertise) ? e.expertise.join(', ') : ''
  }
  expEditMode.value = !expEditMode.value
}

async function saveExperience() {
  saving.experience = true
  try {
    const body = {
      role: expForm.role,
      started_month: expForm.started_month,
      started_year: expForm.started_year,
      description: expForm.description,
      expertise: expForm.expertiseRaw.split(',').map((t: string) => t.trim()).filter(Boolean),
    }
    const data: any = await $fetch(`${apiBase}/api/teacher/profile/experience`, { method: 'PUT', headers: authHeaders.value, body })
    if (data.experience) experience.value = data.experience[0] ?? null
    else await fetchProfile()
    expEditMode.value = false
    showToast(data.message || 'Experience saved!')
  } catch (e: any) {
    showToast(e?.data?.message || e?.message || 'Failed to save experience.', true)
  }
  finally { saving.experience = false }
}

const roles = [
  { value: 'student',   label: 'Student',           faIcon: 'fas fa-user-graduate' },
  { value: 'teacher',   label: 'Teacher',            faIcon: 'fas fa-chalkboard-teacher' },
  { value: 'tutor',     label: 'Private Tutor',      faIcon: 'fas fa-user' },
  { value: 'expert',    label: 'Subject Expert',     faIcon: 'fas fa-star' },
  { value: 'freelance', label: 'Freelance Educator', faIcon: 'fas fa-briefcase' },
  { value: 'other',     label: 'Other',              faIcon: 'fas fa-ellipsis-h' },
]

function roleLabel(role: string): string {
  return roles.find(r => r.value === role)?.label || 'Teacher'
}

// ─────────────────────────────────────────────────────────
// SESSION TYPES
// ─────────────────────────────────────────────────────────
const subjectsEditMode = ref(false)
const sessionTypes     = ref(new Set<string>())

function toggleSession(type: string) {
  const s = new Set(sessionTypes.value)
  s.has(type) ? s.delete(type) : s.add(type)
  sessionTypes.value = s
}

async function saveSessionTypes() {
  saving.sessionTypes = true
  try {
    await $fetch(`${apiBase}/api/teacher/profile/session-types`, {
      method: 'PUT',
      headers: authHeaders.value,
      body: { session_types: [...sessionTypes.value] },
    })
    teacher.session_types = [...sessionTypes.value]
  } catch (e) { console.error(e) }
  finally { saving.sessionTypes = false }
}

// ─────────────────────────────────────────────────────────
// SUBJECTS
// ─────────────────────────────────────────────────────────
const showSubjectPickerModal = ref(false)
const selectedSubjectIds     = ref(new Set<number>())

function isSubjectSelected(id: number) { return selectedSubjectIds.value.has(id) }

function toggleSubjectPicker(subj: any) {
  const s = new Set(selectedSubjectIds.value)
  s.has(subj.id) ? s.delete(subj.id) : s.add(subj.id)
  selectedSubjectIds.value = s
}

function removeSubject(id: number) {
  subjects.value = subjects.value.filter(s => s.id !== id)
  const s = new Set(selectedSubjectIds.value)
  s.delete(id)
  selectedSubjectIds.value = s
  saveSubjectsQuiet([...selectedSubjectIds.value])
}

async function saveSubjects() {
  saving.subjects = true
  try {
    const ids = [...selectedSubjectIds.value]
    const data: any = await $fetch(`${apiBase}/api/teacher/profile/subjects`, {
      method: 'PUT',
      headers: authHeaders.value,
      body: { subject_ids: ids },
    })
    if (data.subjects) subjects.value = data.subjects
    else subjects.value = allSubjects.value.filter(s => ids.includes(s.id))
    showSubjectPickerModal.value = false
    showToast(data.message || 'Subjects saved!')
  } catch (e: any) {
    showToast(e?.data?.message || e?.message || 'Failed to save subjects.', true)
  }
  finally { saving.subjects = false }
}

async function saveSubjectsQuiet(ids: number[]) {
  try {
    const data: any = await $fetch(`${apiBase}/api/teacher/profile/subjects`, {
      method: 'PUT', headers: authHeaders.value, body: { subject_ids: ids },
    })
    if (data.subjects) subjects.value = data.subjects
  } catch (e) { console.error(e) }
}

// Open subject picker — sync current selection
function openSubjectPicker() {
  selectedSubjectIds.value = new Set(subjects.value.map((s: any) => s.id))
  showSubjectPickerModal.value = true
}

// ─────────────────────────────────────────────────────────
// GRADE LEVELS
// ─────────────────────────────────────────────────────────
const showGradePickerModal = ref(false)
const selectedGradeIds     = ref(new Set<number>())

function isGradeSelected(id: number) { return selectedGradeIds.value.has(id) }

function toggleGradePicker(grade: any) {
  const s = new Set(selectedGradeIds.value)
  s.has(grade.id) ? s.delete(grade.id) : s.add(grade.id)
  selectedGradeIds.value = s
}

function removeGrade(id: number) {
  gradeLevels.value = gradeLevels.value.filter(g => g.id !== id)
  const s = new Set(selectedGradeIds.value)
  s.delete(id)
  selectedGradeIds.value = s
  saveGradesQuiet([...selectedGradeIds.value])
}

async function saveGrades() {
  saving.grades = true
  try {
    const ids = [...selectedGradeIds.value]
    const data: any = await $fetch(`${apiBase}/api/teacher/profile/grade-levels`, {
      method: 'PUT', headers: authHeaders.value, body: { grade_level_ids: ids },
    })
    if (data.grade_levels) gradeLevels.value = data.grade_levels
    else gradeLevels.value = allGradeLevels.value.filter(g => ids.includes(g.id))
    showGradePickerModal.value = false
    showToast(data.message || 'Grade levels saved!')
  } catch (e: any) {
    showToast(e?.data?.message || e?.message || 'Failed to save grade levels.', true)
  }
  finally { saving.grades = false }
}

async function saveGradesQuiet(ids: number[]) {
  try {
    const data: any = await $fetch(`${apiBase}/api/teacher/profile/grade-levels`, {
      method: 'PUT', headers: authHeaders.value, body: { grade_level_ids: ids },
    })
    if (data.grade_levels) gradeLevels.value = data.grade_levels
  } catch (e) { console.error(e) }
}

// Sync pickers when modals open
watch(showSubjectPickerModal, (v) => {
  if (v) selectedSubjectIds.value = new Set(subjects.value.map((s: any) => s.id))
})
watch(showGradePickerModal, (v) => {
  if (v) selectedGradeIds.value = new Set(gradeLevels.value.map((g: any) => g.id))
})

// ─────────────────────────────────────────────────────────
// TEACHING STYLE
// ─────────────────────────────────────────────────────────
const styleEditMode     = ref(false)
const showAddStyleModal = ref(false)
const editingStyleId    = ref<number | null>(null)
const styleFormError    = ref('')
const styleColors = [
  { value: 'blue',   label: 'Blue'   },
  { value: 'green',  label: 'Green'  },
  { value: 'gold',   label: 'Gold'   },
  { value: 'purple', label: 'Purple' },
]
const styleForm = reactive({ name: '', description: '', color: 'blue' })

function closeStyleModal() {
  showAddStyleModal.value = false
  editingStyleId.value = null
  styleFormError.value = ''
  styleForm.name = ''; styleForm.description = ''; styleForm.color = 'blue'
}

function openEditStyleModal(style: any) {
  editingStyleId.value = style.id
  styleForm.name = style.name
  styleForm.description = style.description
  styleForm.color = style.color || 'blue'
  styleFormError.value = ''
  showAddStyleModal.value = true
}

async function submitStyleForm() {
  styleFormError.value = ''
  saving.style = true
  try {
    if (editingStyleId.value) {
      const data: any = await $fetch(`${apiBase}/api/teacher/profile/teaching-styles/${editingStyleId.value}`, {
        method: 'PUT', headers: authHeaders.value,
        body: { name: styleForm.name, description: styleForm.description, color: styleForm.color },
      })
      const updated = data.teaching_style ?? data.style
      if (updated) {
        const idx = teachingStyles.value.findIndex(s => s.id === editingStyleId.value)
        if (idx !== -1) teachingStyles.value[idx] = updated
      }
    } else {
      const data: any = await $fetch(`${apiBase}/api/teacher/profile/teaching-styles`, {
        method: 'POST', headers: authHeaders.value,
        body: { name: styleForm.name, description: styleForm.description, color: styleForm.color },
      })
      if (data.teaching_styles) teachingStyles.value = data.teaching_styles
      else {
        const newStyle = data.style ?? data.teaching_style
        if (newStyle) teachingStyles.value.push(newStyle)
      }
    }
    const successMsg = editingStyleId.value
      ? (data.message || 'Teaching style updated!')
      : (data.message || 'Teaching style added!')
    closeStyleModal()
    showToast(successMsg)
  } catch (e: any) {
    styleFormError.value = e?.data?.message || e?.message || 'Something went wrong.'
  }
  finally { saving.style = false }
}

async function deleteTeachingStyle(id: number) {
  try {
    await $fetch(`${apiBase}/api/teacher/profile/teaching-styles/${id}`, { method: 'DELETE', headers: authHeaders.value })
    teachingStyles.value = teachingStyles.value.filter(s => s.id !== id)
  } catch (e) { console.error(e) }
}

// ─────────────────────────────────────────────────────────
// AVAILABILITY
// ─────────────────────────────────────────────────────────
const availEditMode = ref(false)
const flexibleTime  = ref(false)

const DAYS = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri']

// DB stores day_of_week as int: 0=Sun 1=Mon 2=Tue 3=Wed 4=Thu 5=Fri 6=Sat
const DOW_TO_DAY: Record<number, string> = { 0: 'Sun', 1: 'Mon', 2: 'Tue', 3: 'Wed', 4: 'Thu', 5: 'Fri', 6: 'Sat' }

const TIME_SLOTS = [
  '8:00 AM','9:00 AM','10:00 AM','11:00 AM','12:00 PM',
  '1:00 PM','2:00 PM','3:00 PM','4:00 PM','5:00 PM',
  '6:00 PM','7:00 PM','8:00 PM','9:00 PM','10:00 PM',
]

function fmtTime(t: string): string {
  const [hStr, mStr] = t.split(':')
  const h = parseInt(hStr, 10), m = parseInt(mStr, 10)
  const period = h >= 12 ? 'PM' : 'AM'
  const h12 = h > 12 ? h - 12 : h === 0 ? 12 : h
  return `${h12}:${m.toString().padStart(2, '0')} ${period}`
}

const availabilityGrid = ref(DAYS.map(day => ({ day, slots: [] as string[] })))

function buildAvailabilityGrid(apiData: any[]) {
  const map: Record<string, string[]> = {}
  DAYS.forEach(d => { map[d] = [] })
  apiData.forEach((item: any) => {
    // Handle grouped { day, slots[] } format
    if (item.day && Array.isArray(item.slots)) {
      if (map[item.day] !== undefined) map[item.day].push(...item.slots)
      return
    }
    // Handle raw DB rows { day_of_week: int, time_slot: "HH:MM:SS" }
    const dayName = item.day ?? (item.day_of_week !== undefined ? DOW_TO_DAY[item.day_of_week] : null)
    if (!dayName || map[dayName] === undefined) return
    if (item.time_slot) {
      const formatted = /^\d{1,2}:\d{2}\s?(AM|PM)$/i.test(String(item.time_slot))
        ? item.time_slot
        : fmtTime(String(item.time_slot))
      map[dayName].push(formatted)
    }
  })
  availabilityGrid.value = DAYS.map(day => ({ day, slots: map[day] }))
}

function removeSlot(day: string, idx: number) {
  const d = availabilityGrid.value.find(a => a.day === day)
  if (d) d.slots.splice(idx, 1)
}

// Time picker modal
const showTimeModal = ref(false)
const timeModalDay  = ref('')
const newTimeSlot   = ref('')

function openTimeModal(day: string) {
  timeModalDay.value = day
  newTimeSlot.value  = ''
  showTimeModal.value = true
}

function confirmAddSlot() {
  if (!newTimeSlot.value || !timeModalDay.value) return
  const d = availabilityGrid.value.find(a => a.day === timeModalDay.value)
  if (d) {
    if (!d.slots.includes(newTimeSlot.value)) d.slots.push(newTimeSlot.value)
  }
  showTimeModal.value = false
}

async function toggleFlexibleTime() {
  flexibleTime.value = !flexibleTime.value
  try {
    await $fetch(`${apiBase}/api/teacher/profile/about`, {
      method: 'PUT', headers: authHeaders.value,
      body: { is_flexible_time: flexibleTime.value },
    })
    teacher.is_flexible_time = flexibleTime.value
  } catch (e) {
    flexibleTime.value = !flexibleTime.value
    console.error(e)
  }
}

async function saveAvailability() {
  saving.availability = true
  try {
    const payload = availabilityGrid.value
      .filter(d => d.slots.length > 0)
      .map(d => ({ day: d.day, slots: d.slots }))
    const data: any = await $fetch(`${apiBase}/api/teacher/profile/availability`, {
      method: 'PUT', headers: authHeaders.value,
      body: { availability: payload },
    })
    if (data.availability) {
      rawAvailability.value = data.availability
      buildAvailabilityGrid(data.availability)
    }
    availEditMode.value = false
    showToast(data.message || 'Availability saved!')
  } catch (e: any) {
    showToast(e?.data?.message || e?.message || 'Failed to save availability.', true)
  }
  finally { saving.availability = false }
}

// ─────────────────────────────────────────────────────────
// PROFILE STRENGTH
// ─────────────────────────────────────────────────────────
const profileStepsDef = [
  { label: 'Profile photo',           done: computed(() => !!profile.avatar_url) },
  { label: 'About / bio',             done: computed(() => !!profile.bio) },
  { label: 'Education & certificate', done: computed(() => educations.value.length > 0) },
  { label: 'Teacher experience',      done: computed(() => !!experience.value) },
  { label: 'Subjects added',          done: computed(() => subjects.value.length > 0) },
  { label: 'Availability set',        done: computed(() => flexibleTime.value || availabilityGrid.value.some(d => d.slots.length > 0)) },
  { label: 'Educator verified',       done: computed(() => teacher.verified) },
]

const profileSteps = computed(() =>
  profileStepsDef.map(s => ({ label: s.label, done: s.done.value }))
)

const profileStrength = computed(() => {
  const done = profileSteps.value.filter(s => s.done).length
  return Math.round((done / profileStepsDef.length) * 100)
})

// ─────────────────────────────────────────────────────────
// VERIFICATION MODAL
// ─────────────────────────────────────────────────────────
const showVerifyModal = ref(false)
const verifyStep      = ref(1)
const verifyPhone     = ref('')

async function nextVerifyStep() {
  if (verifyStep.value === 3) {
    saving.verify = true
    try {
      await $fetch(`${apiBase}/api/teacher/profile/verification`, {
        method: 'POST', headers: authHeaders.value,
        body: { phone: verifyPhone.value },
      })
      verifyStep.value = 4
      await fetchProfile()
    } catch (e) { console.error(e) }
    finally { saving.verify = false }
    return
  }
  verifyStep.value++
}

function closeVerifyModal() {
  showVerifyModal.value = false
  verifyStep.value = 1
  verifyPhone.value = ''
}

// ─────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────
const yearRange = computed(() => {
  const years = []
  for (let y = new Date().getFullYear(); y >= 1970; y--) years.push(y)
  return years
})
</script>

<style scoped>
/* ── Variables ─────────────────────────────────────────── */
:root{
  --ink:#0e0b07;--cream:#faf6ef;--warm:#f0e8d6;--warm2:#e8ddc8;
  --gold:#c9893c;--gold-light:#e8b96a;--gold-pale:rgba(201,137,60,.1);
  --rust:#b84b2f;--muted:#8a7f72;--border:#e0d8cc;--card:#fff;
  --green:#3a9e6f;--blue:#3a6b9e;--purple:#7a5cbf;--teal:#2a8a8a;
  --red:#c53030;
}

/* ── TOPBAR ─────────────────────────────────────────────── */
.topbar{position:sticky;top:0;z-index:50;background:rgba(250,246,239,.95);backdrop-filter:blur(16px);border-bottom:1px solid var(--border);padding:0 32px;height:64px;display:flex;align-items:center;gap:12px}
.tb-breadcrumb{flex:1;display:flex;align-items:center;gap:6px;font-size:.84rem;color:var(--muted)}
.tb-link{color:var(--muted);text-decoration:none;transition:color .2s}
.tb-link:hover{color:var(--gold)}
.tb-breadcrumb span{color:var(--ink);font-weight:600;font-family:'Playfair Display',serif;font-size:.92rem}
.tb-sep{color:var(--border);margin:0 2px}
.tb-icon{width:38px;height:38px;border-radius:10px;background:var(--warm);border:1px solid var(--border);display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .2s;position:relative;flex-shrink:0}
.tb-icon:hover{background:var(--warm2);border-color:var(--gold-light)}
.tb-icon svg{width:16px;height:16px;color:var(--muted)}
.tb-notif::after{content:'';position:absolute;top:-4px;right:-4px;width:8px;height:8px;background:var(--rust);border-radius:50%;border:2px solid var(--cream)}
.tb-avatar{width:38px;height:38px;border-radius:9px;background:linear-gradient(135deg,#1a3a5c,#2d5a87);display:flex;align-items:center;justify-content:center;font-family:'Playfair Display',serif;font-size:.95rem;color:#fff;cursor:pointer;border:2px solid var(--border);flex-shrink:0}

/* ── LOADING SKELETON ───────────────────────────────────── */
.page-loading{padding:0 0 40px}
.skeleton-hero{height:340px;background:linear-gradient(90deg,var(--warm) 25%,var(--warm2) 50%,var(--warm) 75%);background-size:200% 100%;animation:shimmer 1.5s infinite}
.skeleton-body{display:flex;gap:24px;padding:28px 32px}
.skeleton-col{flex:1;display:flex;flex-direction:column;gap:16px}
.skeleton-side{width:320px;flex-shrink:0;display:flex;flex-direction:column;gap:16px}
.skeleton-card{height:180px;border-radius:16px;background:linear-gradient(90deg,var(--warm) 25%,var(--warm2) 50%,var(--warm) 75%);background-size:200% 100%;animation:shimmer 1.5s infinite}
.skeleton-card:nth-child(2){animation-delay:.15s;height:120px}
.skeleton-card:nth-child(3){animation-delay:.3s}
@keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}

/* ── HERO ───────────────────────────────────────────────── */
.profile-hero{background:var(--ink);position:relative;overflow:hidden}
.hero-cover{height:200px;position:relative;overflow:hidden}
.hero-cover img{width:100%;height:100%;object-fit:cover;opacity:.35;filter:grayscale(20%)}
.hero-cover-default{width:100%;height:100%;background:linear-gradient(135deg,#0e1f35,#1a3a5c)}
.hero-cover::after{content:'';position:absolute;inset:0;background:linear-gradient(to bottom,rgba(14,11,7,.1) 0%,rgba(14,11,7,.7) 100%)}
.hero-cover-overlay{position:absolute;inset:0;background:radial-gradient(ellipse 80% 100% at 80% 50%,rgba(201,137,60,.18),transparent 60%)}
.cover-grid{position:absolute;inset:0;pointer-events:none;background-image:linear-gradient(rgba(255,255,255,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.025) 1px,transparent 1px);background-size:44px 44px}
.hero-profile-row{position:relative;padding:0 36px 28px;margin-top:-52px;z-index:2}
.hero-flex{display:flex;align-items:flex-end;gap:20px;flex-wrap:wrap}
.hero-avatar-wrap{position:relative;flex-shrink:0}
.hero-avatar{width:100px;height:100px;border-radius:18px;background:linear-gradient(135deg,#1a3a5c,#2d5a87);display:flex;align-items:center;justify-content:center;font-family:'Playfair Display',serif;font-size:2.2rem;color:#fff;border:4px solid var(--ink);box-shadow:0 8px 24px rgba(14,11,7,.35);position:relative;overflow:hidden}
.hero-avatar-img{width:100%;height:100%;object-fit:cover}
.hero-verified{position:absolute;bottom:-5px;right:-5px;width:24px;height:24px;background:var(--gold);border-radius:50%;border:3px solid var(--ink);display:flex;align-items:center;justify-content:center}
.hero-verified svg{width:10px;height:10px;color:#fff}
.hero-info{flex:1;min-width:0;padding-bottom:4px}
.hero-name-row{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:4px}
.hero-name{font-family:'Playfair Display',serif;font-size:1.7rem;color:var(--cream);line-height:1.1}
.hero-type-badge{display:inline-flex;align-items:center;gap:5px;font-size:.68rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;background:rgba(58,107,158,.2);border:1px solid rgba(58,107,158,.4);border-radius:20px;padding:4px 11px;color:#7fb3e0}
.hero-type-badge svg{width:10px;height:10px}
.hero-title{font-size:.9rem;color:rgba(250,246,239,.55);margin-bottom:10px;font-style:italic}
.hero-tags{display:flex;flex-wrap:wrap;gap:6px}
.hero-tag{display:inline-flex;align-items:center;gap:5px;font-size:.72rem;font-weight:500;padding:4px 11px;border-radius:20px;border:1px solid}
.ht-subject{background:rgba(201,137,60,.12);border-color:rgba(201,137,60,.3);color:var(--gold-light)}
.ht-lang{background:rgba(58,158,111,.1);border-color:rgba(58,158,111,.25);color:#5abf8a}
.hero-actions{display:flex;align-items:flex-end;gap:10px;flex-shrink:0;padding-bottom:4px;margin-left:auto}
.btn-hero-ghost{display:flex;align-items:center;gap:7px;padding:10px 16px;font-family:'DM Sans',sans-serif;font-size:.84rem;font-weight:500;color:rgba(250,246,239,.7);background:rgba(255,255,255,.07);border:1.5px solid rgba(255,255,255,.15);border-radius:10px;cursor:pointer;transition:all .2s}
.btn-hero-ghost:hover{background:rgba(255,255,255,.12);color:var(--cream)}
.btn-hero-ghost svg{width:14px;height:14px}
.hero-stats-strip{display:flex;border-top:1px solid rgba(255,255,255,.08);flex-wrap:wrap}
.hstat{flex:1;min-width:100px;padding:18px 24px;border-right:1px solid rgba(255,255,255,.08);text-align:center;cursor:default}
.hstat:last-child{border-right:none}
.hstat:hover{background:rgba(255,255,255,.04)}
.hstat-val{font-family:'Playfair Display',serif;font-size:1.5rem;color:var(--cream);line-height:1;margin-bottom:4px}
.hstat-label{font-size:.68rem;color:rgba(250,246,239,.4);text-transform:uppercase;letter-spacing:.1em;font-weight:600}
.hstat-sub{font-size:.7rem;color:rgba(250,246,239,.25);margin-top:2px}

/* ── BODY ───────────────────────────────────────────────── */
.profile-body{padding:28px 32px;display:flex;gap:24px;align-items:flex-start}
.profile-left{flex:1;min-width:0;display:flex;flex-direction:column;gap:20px}
.profile-right{width:320px;flex-shrink:0;display:flex;flex-direction:column;gap:18px;position:sticky;top:80px;align-self:start}

/* ── CARD ───────────────────────────────────────────────── */
.pcard{background:var(--card);border:1px solid var(--border);border-radius:16px;overflow:hidden;animation:fadeUp .4s ease both}
.pcard-head{padding:16px 20px 12px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between}
.pcard-title{display:flex;align-items:center;gap:8px;font-family:'Playfair Display',serif;font-size:1rem;color:var(--ink)}
.pcard-title-icon{width:30px;height:30px;border-radius:8px;display:flex;align-items:center;justify-content:center}
.pcard-title-icon svg,.pcard-title-icon i{width:14px;height:14px;font-size:.8rem}
.pti-gold{background:rgba(201,137,60,.12);color:var(--gold)}
.pti-blue{background:rgba(58,107,158,.12);color:var(--blue)}
.pti-green{background:rgba(58,158,111,.12);color:var(--green)}
.pti-purple{background:rgba(122,92,191,.12);color:var(--purple)}
.pti-teal{background:rgba(42,138,138,.12);color:var(--teal)}
.pcard-edit-btn{display:flex;align-items:center;gap:5px;font-size:.74rem;font-weight:600;color:var(--muted);background:none;border:1.5px solid var(--border);border-radius:7px;padding:4px 10px;cursor:pointer;transition:all .2s;font-family:'DM Sans',sans-serif}
.pcard-edit-btn svg{width:11px;height:11px}
.pcard-edit-btn:hover{color:var(--gold);border-color:var(--gold-light)}
.pcard-edit-btn.active{background:var(--gold);border-color:var(--gold);color:#fff}
.pcard-edit-btn.active:hover{background:var(--rust);border-color:var(--rust)}
.pcard-add-btn{display:flex;align-items:center;gap:5px;font-size:.74rem;font-weight:600;color:#fff;background:linear-gradient(135deg,var(--gold),var(--rust));border:none;border-radius:7px;padding:5px 12px;cursor:pointer;transition:all .2s;font-family:'DM Sans',sans-serif}
.pcard-add-btn:hover{transform:translateY(-1px);box-shadow:0 4px 12px rgba(184,75,47,.3)}
.pcard-add-btn svg{width:11px;height:11px}
.pcard-body{padding:18px 20px}

/* ── TYPE BANNER (Verification) ─────────────────────────── */
.type-banner{background:linear-gradient(135deg,#1a3a5c,#0e1f35);border-radius:12px;padding:14px 16px;display:flex;align-items:center;gap:12px;position:relative;overflow:hidden}
.type-banner::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 80% 100% at 110% 50%,rgba(58,107,158,.4),transparent 60%);pointer-events:none}
.tb-icon-wrap{width:42px;height:42px;border-radius:11px;background:rgba(58,107,158,.3);border:1px solid rgba(58,107,158,.5);display:flex;align-items:center;justify-content:center;flex-shrink:0}
.tb-icon-wrap svg{width:20px;height:20px;color:#7fb3e0}
.tb-content{flex:1;position:relative;z-index:1}
.tb-type{font-size:.68rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:rgba(127,179,224,.6);margin-bottom:2px}
.tb-name{font-family:'Playfair Display',serif;font-size:.96rem;color:#d4e8f8;line-height:1.2}
.tb-sub{font-size:.74rem;color:rgba(127,179,224,.5);margin-top:2px}
.tb-verified-badge,.tb-pending-badge{display:flex;align-items:center;gap:7px;background:rgba(58,107,158,.15);border:1px solid rgba(58,107,158,.3);border-radius:8px;padding:6px 12px;flex-shrink:0;position:relative;z-index:1}
.tb-verified-badge{background:rgba(58,158,111,.15);border-color:rgba(58,158,111,.3)}
.tb-verified-badge svg,.tb-pending-badge svg{width:12px;height:12px;color:#7fb3e0}
.tb-verified-badge{color:#5abf8a}
.tb-verified-badge svg{color:#5abf8a}
.tb-verified-badge span,.tb-pending-badge span{font-size:.72rem;font-weight:700;color:#7fb3e0}
.tb-verified-badge span{color:#5abf8a}
.tb-verify-btn{display:flex;align-items:center;gap:8px;background:linear-gradient(135deg,rgba(201,137,60,.22),rgba(184,75,47,.28));border:1px solid rgba(232,185,106,.45);border-radius:8px;padding:7px 12px;flex-shrink:0;cursor:pointer;font-family:'DM Sans',sans-serif;color:#f4d9a8;transition:transform .18s,box-shadow .18s;position:relative;z-index:1}
.tb-verify-btn:hover{transform:translateY(-1px);box-shadow:0 6px 16px rgba(184,75,47,.25)}
.tb-verify-dot{width:8px;height:8px;border-radius:50%;background:#e8b96a;animation:verifyPulse 1.8s infinite;flex-shrink:0}
.tb-verify-text{font-size:.72rem;font-weight:700}
.tb-verify-arrow{width:12px;height:12px;transition:transform .2s}
.tb-verify-btn:hover .tb-verify-arrow{transform:translateX(2px)}
@keyframes verifyPulse{0%{box-shadow:0 0 0 0 rgba(232,185,106,.7)}70%{box-shadow:0 0 0 8px rgba(232,185,106,0)}100%{box-shadow:0 0 0 0 rgba(232,185,106,0)}}

/* ── ABOUT ──────────────────────────────────────────────── */
.about-text-view{font-size:.87rem;color:var(--muted);line-height:1.75}
.about-text-view p{margin-bottom:10px}
.about-text-view p:last-child{margin-bottom:0}
.about-textarea{width:100%;min-height:200px;padding:14px 16px;font-family:'DM Sans',sans-serif;font-size:.87rem;color:var(--ink);line-height:1.75;background:var(--cream);border:1.5px solid var(--border);border-radius:12px;resize:vertical;outline:none;transition:all .2s}
.about-textarea:focus{border-color:var(--gold);background:var(--card);box-shadow:0 0 0 3px rgba(201,137,60,.12)}
.about-edit-hint{display:flex;font-size:.72rem;color:var(--muted);margin-top:12px;padding-top:12px;border-top:1px dashed var(--border);align-items:center;gap:6px}
.about-edit-hint svg{width:12px;height:12px;flex-shrink:0}
.about-char-count{margin-left:auto;font-size:.7rem;color:var(--muted)}
.empty-state{font-size:.84rem;color:var(--muted);padding:8px 0;font-style:italic}

/* ── SECTION ACTIONS ────────────────────────────────────── */
.section-actions{display:flex;justify-content:flex-end;gap:10px;margin-top:16px;padding-top:16px;border-top:1px dashed var(--border)}

/* ── EDUCATION ──────────────────────────────────────────── */
.edu-timeline{display:flex;flex-direction:column}
.edu-item{display:flex;gap:14px;padding:0 0 18px;position:relative}
.edu-item:last-child{padding-bottom:0}
.edu-dot-col{display:flex;flex-direction:column;align-items:center;width:12px;flex-shrink:0;margin-top:4px}
.edu-dot{width:12px;height:12px;border-radius:50%;border:2px solid var(--gold);background:var(--cream);flex-shrink:0}
.edu-line{flex:1;width:2px;background:var(--border);margin-top:4px}
.edu-content{flex:1;min-width:0}
.edu-degree{font-size:.88rem;font-weight:700;color:var(--ink);margin-bottom:2px}
.edu-inst{font-size:.82rem;color:var(--muted);display:flex;align-items:center;gap:5px}
.edu-inst svg{width:11px;height:11px;color:var(--gold);flex-shrink:0}
.edu-year{display:inline-block;font-size:.68rem;font-weight:700;color:var(--gold);background:var(--gold-pale);border:1px solid rgba(201,137,60,.2);border-radius:20px;padding:2px 8px;margin-top:5px}
.edu-item-actions{display:flex;gap:6px;align-items:center;margin-left:auto}
.edu-action-btn{width:32px;height:32px;border-radius:8px;border:1.5px solid var(--border);background:var(--card);display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .2s}
.edu-action-btn svg{width:14px;height:14px;color:var(--muted)}
.edu-action-btn:hover{border-color:var(--gold-light)}
.edu-action-btn:hover svg{color:var(--gold)}
.edu-action-btn.delete:hover{border-color:var(--rust);background:rgba(197,48,48,.06)}
.edu-action-btn.delete:hover svg{color:var(--rust)}

/* ── EXPERIENCE ─────────────────────────────────────────── */
.curr-pos-card{position:relative;background:linear-gradient(135deg,var(--warm),var(--cream));border:1px solid var(--border);border-radius:14px;padding:16px 18px 18px 22px;overflow:hidden}
.curr-pos-card::before{content:'';position:absolute;top:0;left:0;bottom:0;width:4px;background:linear-gradient(180deg,var(--green),var(--teal));border-radius:14px 0 0 14px}
.cp-header-row{display:flex;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:12px}
.cp-role-badge{display:inline-flex;align-items:center;gap:6px;padding:4px 11px;background:rgba(58,158,111,.12);border:1px solid rgba(58,158,111,.25);border-radius:20px;font-size:.7rem;font-weight:700;color:var(--green);text-transform:uppercase;letter-spacing:.06em}
.cp-role-badge svg{width:11px;height:11px}
.cp-role-badge[data-role="student"]{background:rgba(58,107,158,.12);border-color:rgba(58,107,158,.25);color:var(--blue)}
.cp-role-badge[data-role="tutor"]{background:rgba(42,138,138,.12);border-color:rgba(42,138,138,.25);color:var(--teal)}
.cp-role-badge[data-role="expert"]{background:rgba(201,137,60,.12);border-color:rgba(201,137,60,.25);color:var(--gold)}
.cp-role-badge[data-role="freelance"]{background:rgba(122,92,191,.12);border-color:rgba(122,92,191,.25);color:var(--purple)}
.cp-meta{display:flex;flex-wrap:wrap;gap:8px;margin-left:auto}
.cp-chip{display:inline-flex;align-items:center;gap:5px;padding:4px 10px;background:var(--card);border:1px solid var(--border);border-radius:20px;font-size:.72rem;font-weight:600;color:var(--muted)}
.cp-chip svg{width:11px;height:11px}
.cp-chip strong{color:var(--ink);font-weight:700;margin-left:2px}
.cp-chip-live{color:var(--green);border-color:rgba(58,158,111,.25);background:rgba(58,158,111,.08)}
.cp-live-dot{width:7px;height:7px;border-radius:50%;background:var(--green);animation:cpLivePulse 1.8s infinite}
@keyframes cpLivePulse{0%{box-shadow:0 0 0 0 rgba(58,158,111,.55)}70%{box-shadow:0 0 0 7px rgba(58,158,111,0)}100%{box-shadow:0 0 0 0 rgba(58,158,111,0)}}
.cp-body{}
.cp-desc-view{font-size:.87rem;color:var(--muted);line-height:1.75}
.cp-desc-view p{margin-bottom:10px}
.cp-desc-view p:last-child{margin-bottom:0}
.cp-desc-view strong{color:var(--ink);font-weight:700}
.cp-expertise-wrap{margin-top:12px;padding-top:12px;border-top:1px dashed var(--border)}
.cp-expertise-label{font-size:.68rem;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.1em;margin-bottom:6px}
.cp-expertise{display:flex;flex-wrap:wrap;gap:6px}
.cp-exp-tag{padding:3px 10px;background:rgba(58,158,111,.08);border:1px solid rgba(58,158,111,.18);border-radius:20px;font-size:.74rem;font-weight:600;color:var(--green)}
.cp-desc-textarea{width:100%;min-height:160px;padding:14px 16px;font-family:'DM Sans',sans-serif;font-size:.87rem;color:var(--ink);line-height:1.75;background:var(--cream);border:1.5px solid var(--border);border-radius:12px;resize:vertical;outline:none;transition:all .2s}
.cp-desc-textarea:focus{border-color:var(--gold);background:var(--card);box-shadow:0 0 0 3px rgba(201,137,60,.12)}
.cp-desc-hint{display:flex;font-size:.72rem;color:var(--muted);margin-top:10px;padding-top:10px;border-top:1px dashed var(--border);align-items:center;gap:6px}
.cp-desc-hint svg{width:12px;height:12px;flex-shrink:0}
.cp-desc-count{margin-left:auto;font-size:.7rem;color:var(--muted)}
.role-selector{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}
.role-option{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;padding:12px 8px;background:var(--cream);border:1.5px solid var(--border);border-radius:10px;cursor:pointer;transition:all .2s;font-family:'DM Sans',sans-serif;color:var(--muted)}
.role-option span{font-size:.76rem;font-weight:700;color:var(--ink)}
.role-option:hover{border-color:var(--gold-light);background:var(--warm)}
.role-option.selected{border-color:var(--gold);background:var(--gold-pale);color:var(--gold)}
.role-option.selected span{color:var(--gold)}

/* ── SESSION TYPES ──────────────────────────────────────── */
.sess-wrap{margin-bottom:16px}
.sess-section-label{font-size:.76rem;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.08em;margin-bottom:8px;display:flex;align-items:center;gap:10px}
.sess-hint{font-size:.68rem;font-weight:500;color:var(--muted);text-transform:none;letter-spacing:0}
.sess-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.sess-card{position:relative;display:flex;align-items:flex-start;gap:11px;padding:13px 14px;background:var(--cream);border:1.5px solid var(--border);border-radius:12px;cursor:pointer;transition:all .2s;font-family:'DM Sans',sans-serif;text-align:left;color:inherit}
.sess-card:hover{border-color:var(--gold-light);background:var(--warm);transform:translateY(-1px)}
.sess-card.selected{border-color:var(--gold);background:var(--gold-pale)}
.sess-icon{width:36px;height:36px;border-radius:9px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.sess-icon svg{width:18px;height:18px}
.sess-icon-blue{background:rgba(58,107,158,.12);color:var(--blue)}
.sess-icon-teal{background:rgba(42,138,138,.12);color:var(--teal)}
.sess-card.selected .sess-icon-blue{background:var(--blue);color:#fff}
.sess-card.selected .sess-icon-teal{background:var(--teal);color:#fff}
.sess-body{flex:1;min-width:0}
.sess-name{font-size:.9rem;font-weight:700;color:var(--ink);line-height:1.2;margin-bottom:3px}
.sess-desc{font-size:.74rem;color:var(--muted);line-height:1.4}
.sess-check{position:absolute;top:10px;right:10px;width:20px;height:20px;border-radius:50%;background:var(--card);border:1.5px solid var(--border);display:flex;align-items:center;justify-content:center;transition:all .2s}
.sess-check svg{width:11px;height:11px;color:transparent}
.sess-card.selected .sess-check{background:var(--gold);border-color:var(--gold)}
.sess-card.selected .sess-check svg{color:#fff}
.sess-divider{height:1px;background:var(--border);margin:4px 0 14px}

/* ── SUBJECTS ───────────────────────────────────────────── */
.subject-grid{display:flex;flex-wrap:wrap;gap:8px}
.subj-tag{display:inline-flex;align-items:center;gap:6px;padding:6px 12px;border-radius:9px;font-size:.78rem;font-weight:600;transition:transform .15s;position:relative}
.subj-tag:hover{transform:translateY(-1px)}
.subj-tag svg,.subj-tag i{width:13px;height:13px}
.tag-text{}
.subject-grid.edit-mode .subj-tag{padding-right:28px}
.remove-tag{position:absolute;right:6px;top:50%;transform:translateY(-50%);width:16px;height:16px;border-radius:50%;background:rgba(197,48,48,.15);display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .2s}
.remove-tag:hover{background:var(--rust)}
.remove-tag svg{width:10px;height:10px;color:var(--rust)}
.remove-tag:hover svg{color:#fff}
.add-tag-btn{display:inline-flex;align-items:center;gap:5px;padding:5px 10px;border-radius:8px;font-size:.76rem;font-weight:600;color:var(--gold);background:var(--gold-pale);border:1.5px dashed rgba(201,137,60,.4);cursor:pointer;transition:all .2s;font-family:'DM Sans',sans-serif}
.add-tag-btn:hover{background:rgba(201,137,60,.15);border-color:var(--gold)}
.add-tag-btn svg{width:12px;height:12px}
.grade-pill{display:inline-flex;align-items:center;padding:4px 12px;background:rgba(58,107,158,.08);border:1px solid rgba(58,107,158,.18);border-radius:20px;font-size:.76rem;font-weight:600;color:var(--blue)}

/* ── SUBJECT PICKER ─────────────────────────────────────── */
.subject-picker-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.subject-picker-item{display:flex;align-items:center;gap:10px;padding:12px 14px;background:var(--cream);border:1.5px solid var(--border);border-radius:10px;cursor:pointer;transition:all .2s;font-family:'DM Sans',sans-serif;text-align:left}
.subject-picker-item:hover{border-color:var(--gold-light);background:var(--warm)}
.subject-picker-item.selected{box-shadow:0 2px 8px rgba(201,137,60,.12)}
.spi-name{flex:1;font-size:.84rem;font-weight:600;color:var(--ink)}
.spi-check{flex-shrink:0}

/* ── GRADE PICKER ───────────────────────────────────────── */
.grade-picker-grid{display:flex;flex-wrap:wrap;gap:10px}
.grade-picker-item{display:inline-flex;align-items:center;padding:8px 16px;background:var(--cream);border:1.5px solid var(--border);border-radius:10px;cursor:pointer;transition:all .2s;font-family:'DM Sans',sans-serif;font-size:.84rem;font-weight:600;color:var(--ink)}
.grade-picker-item:hover{border-color:var(--blue);background:rgba(58,107,158,.06);color:var(--blue)}
.grade-picker-item.selected{border-color:var(--blue);background:rgba(58,107,158,.1);color:var(--blue)}

/* ── TEACHING STYLE ─────────────────────────────────────── */
.tstyle-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.tstyle-item{padding:12px 14px;background:var(--warm);border:1px solid var(--border);border-radius:11px;transition:border-color .2s;position:relative}
.tstyle-item:hover{border-color:var(--gold-light)}
.tsi-icon{width:28px;height:28px;border-radius:7px;display:flex;align-items:center;justify-content:center;margin-bottom:7px}
.tsi-icon svg,.tsi-icon i{width:13px;height:13px;font-size:.75rem}
.tsii-blue{background:rgba(58,107,158,.1);color:var(--blue)}
.tsii-green{background:rgba(58,158,111,.1);color:var(--green)}
.tsii-gold{background:rgba(201,137,60,.1);color:var(--gold)}
.tsii-purple{background:rgba(122,92,191,.1);color:var(--purple)}
.tsi-name{font-size:.8rem;font-weight:700;color:var(--ink);margin-bottom:2px}
.tsi-desc{font-size:.72rem;color:var(--muted);line-height:1.5}
.tstyle-item-actions{position:absolute;top:8px;right:8px;display:flex;gap:4px}
.tstyle-action-btn{width:26px;height:26px;border-radius:6px;border:1px solid var(--border);background:var(--card);display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .2s}
.tstyle-action-btn svg{width:12px;height:12px;color:var(--muted)}
.tstyle-action-btn:not(.delete):hover{border-color:var(--blue);background:rgba(58,107,158,.06)}
.tstyle-action-btn:not(.delete):hover svg{color:var(--blue)}
.tstyle-action-btn.delete:hover{border-color:var(--rust);background:rgba(197,48,48,.06)}
.tstyle-action-btn.delete:hover svg{color:var(--rust)}
.color-option{display:flex;align-items:center;gap:6px;cursor:pointer;padding:8px 12px;border:1.5px solid var(--border);border-radius:8px;transition:all .2s;user-select:none}
.color-option.selected{border-color:var(--gold);background:var(--gold-pale)}
.color-swatch{width:18px;height:18px;border-radius:50%;flex-shrink:0}
.swatch-blue{background:var(--blue)}
.swatch-green{background:var(--green)}
.swatch-gold{background:var(--gold)}
.swatch-purple{background:var(--purple)}
.color-label{font-size:.78rem;font-weight:500;color:var(--ink)}
.form-error-msg{background:rgba(197,48,48,.08);border:1px solid rgba(197,48,48,.25);color:var(--rust);font-size:.78rem;padding:8px 12px;border-radius:8px;margin-bottom:12px}

/* ── TOAST ──────────────────────────────────────────────── */
.toast-notification{position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:var(--ink);color:var(--cream);padding:12px 20px;border-radius:10px;font-size:.84rem;font-weight:600;display:flex;align-items:center;gap:8px;box-shadow:0 8px 24px rgba(14,11,7,.35);z-index:3000;pointer-events:none;white-space:nowrap}
.toast-notification svg{width:16px;height:16px;color:var(--green);flex-shrink:0}
.toast-notification.toast-error svg{color:#ff6b6b}
.toast-enter-active,.toast-leave-active{transition:opacity .3s,transform .3s}
.toast-enter-from,.toast-leave-to{opacity:0;transform:translateX(-50%) translateY(12px)}
.toast-enter-to,.toast-leave-from{opacity:1;transform:translateX(-50%) translateY(0)}
.add-style-btn{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;padding:20px;border:2px dashed var(--border);border-radius:11px;cursor:pointer;transition:all .2s;min-height:100px}
.add-style-btn:hover{border-color:var(--gold);background:var(--gold-pale)}
.add-style-btn svg{width:24px;height:24px;color:var(--muted)}
.add-style-btn:hover svg{color:var(--gold)}
.add-style-btn span{font-size:.78rem;font-weight:600;color:var(--muted)}
.add-style-btn:hover span{color:var(--gold)}

/* ── AVAILABILITY ───────────────────────────────────────── */
.avail-grid{display:flex;flex-direction:column;gap:6px}
.avail-day{display:flex;align-items:center;gap:10px}
.avail-day-label{font-size:.76rem;font-weight:600;color:var(--ink);width:34px;flex-shrink:0}
.avail-slots{display:flex;gap:5px;flex-wrap:wrap;flex:1}
.avail-slot{font-size:.7rem;padding:3px 10px;border-radius:20px;font-weight:500}
.slot-on{background:rgba(58,158,111,.1);border:1px solid rgba(58,158,111,.25);color:var(--green)}
.avail-grid.edit-mode .slot-on{cursor:pointer}
.avail-grid.edit-mode .slot-on:hover{background:rgba(197,48,48,.1);border-color:rgba(197,48,48,.3);color:var(--rust)}
.avail-off-label{font-size:.74rem;color:var(--muted);padding:3px 10px;background:var(--warm);border:1px solid var(--border);border-radius:20px}
.avail-grid.edit-mode .avail-off-label{cursor:pointer}
.avail-grid.edit-mode .avail-off-label:hover{background:rgba(58,158,111,.1);border-color:rgba(58,158,111,.3);color:var(--green)}
.avail-grid.flexible{opacity:.4;pointer-events:none;filter:grayscale(.3)}
.add-slot-btn{display:inline-flex;align-items:center;justify-content:center;width:26px;height:26px;border-radius:50%;border:1.5px dashed var(--border);background:transparent;cursor:pointer;transition:all .2s;flex-shrink:0;padding:0}
.add-slot-btn:hover{border-color:var(--gold);background:var(--gold-pale)}
.add-slot-btn svg{width:11px;height:11px;color:var(--muted)}
.add-slot-btn:hover svg{color:var(--gold)}
.flex-time-toggle{position:relative;display:flex;align-items:flex-start;gap:11px;padding:12px 14px;background:var(--cream);border:1.5px solid var(--border);border-radius:12px;cursor:pointer;transition:all .2s;margin-bottom:14px}
.flex-time-toggle:hover{border-color:var(--gold-light);background:var(--warm)}
.flex-time-toggle.active{border-color:var(--green);background:rgba(58,158,111,.06)}
.ftt-check{width:20px;height:20px;border-radius:50%;background:var(--card);border:1.5px solid var(--border);display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:all .2s;margin-top:2px}
.ftt-check svg{width:11px;height:11px;color:transparent}
.flex-time-toggle.active .ftt-check{background:var(--green);border-color:var(--green)}
.flex-time-toggle.active .ftt-check svg{color:#fff}
.ftt-icon{width:32px;height:32px;border-radius:9px;display:flex;align-items:center;justify-content:center;flex-shrink:0;background:rgba(58,158,111,.12);color:var(--green)}
.ftt-icon svg{width:16px;height:16px}
.flex-time-toggle.active .ftt-icon{background:var(--green);color:#fff}
.ftt-body{flex:1;min-width:0}
.ftt-name{font-size:.88rem;font-weight:700;color:var(--ink);line-height:1.2;margin-bottom:3px;display:flex;align-items:center;gap:7px;flex-wrap:wrap}
.ftt-badge{font-size:.62rem;font-weight:600;padding:2px 7px;background:rgba(58,158,111,.1);color:var(--green);border:1px solid rgba(58,158,111,.2);border-radius:20px;text-transform:uppercase}
.ftt-desc{font-size:.74rem;color:var(--muted);line-height:1.4}
.avail-edit-hint{display:flex;font-size:.72rem;color:var(--muted);margin-top:10px;padding-top:10px;border-top:1px dashed var(--border);align-items:center;gap:6px}
.avail-edit-hint svg{width:12px;height:12px;flex-shrink:0}

/* ── PROFILE STRENGTH ───────────────────────────────────── */
.pc-ring-wrap{position:relative;width:72px;height:72px;margin:0 auto 12px}
.pc-ring-wrap svg{transform:rotate(-90deg)}
.pc-bg{fill:none;stroke:var(--warm2);stroke-width:6}
.pc-fill{fill:none;stroke:var(--gold);stroke-width:6;stroke-linecap:round;stroke-dasharray:188;transition:stroke-dashoffset .5s ease}
.pc-center{position:absolute;inset:0;display:flex;align-items:center;justify-content:center}
.pc-pct{font-family:'Playfair Display',serif;font-size:1rem;color:var(--ink);line-height:1}
.pc-steps{display:flex;flex-direction:column;gap:7px;margin-top:4px}
.pc-step{display:flex;align-items:center;gap:9px;font-size:.78rem}
.pcs-check{width:18px;height:18px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.pcs-done{background:rgba(58,158,111,.12);color:var(--green)}
.pcs-todo{background:var(--warm2);border:1px solid var(--border);color:var(--muted)}
.pcs-check svg{width:10px;height:10px}
.pcs-label{color:var(--ink)}
.pcs-label.todo{color:var(--muted)}
.pcs-action{margin-left:auto;font-size:.68rem;font-weight:600;color:var(--gold);cursor:pointer}

/* ── STATS ──────────────────────────────────────────────── */
.stat-mini{padding:12px;background:var(--warm);border:1px solid var(--border);border-radius:10px;text-align:center}
.stat-mini-val{font-family:'Playfair Display',serif;font-size:1.5rem;color:var(--ink)}
.stat-mini-label{font-size:.7rem;color:var(--muted);text-transform:uppercase;letter-spacing:.07em;margin-top:2px}

/* ── MODALS ─────────────────────────────────────────────── */
.modal-overlay{position:fixed;inset:0;background:rgba(14,11,7,.65);backdrop-filter:blur(6px);z-index:1000;display:flex;align-items:center;justify-content:center;padding:20px;opacity:0;visibility:hidden;transition:opacity .25s,visibility .25s}
.modal-overlay.active{opacity:1;visibility:visible}
.modal-container{background:var(--card);border-radius:20px;width:100%;max-width:520px;max-height:90vh;overflow:hidden;box-shadow:0 24px 64px rgba(14,11,7,.35);animation:modalIn .35s cubic-bezier(.175,.885,.32,1.275)}
.modal-header{padding:20px 24px 16px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:12px}
.modal-icon{width:42px;height:42px;border-radius:12px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.modal-icon svg{width:20px;height:20px}
.mi-blue{background:rgba(58,107,158,.12);color:var(--blue)}
.modal-title-wrap{flex:1}
.modal-title{font-family:'Playfair Display',serif;font-size:1.2rem;color:var(--ink);margin-bottom:2px}
.modal-subtitle{font-size:.78rem;color:var(--muted)}
.modal-close{width:36px;height:36px;border-radius:10px;background:var(--warm);border:1px solid var(--border);display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .2s;flex-shrink:0}
.modal-close:hover{background:var(--warm2);border-color:var(--rust)}
.modal-close svg{width:16px;height:16px;color:var(--muted)}
.modal-close:hover svg{color:var(--rust)}
.modal-body{padding:20px 24px;overflow-y:auto;max-height:calc(90vh - 160px)}
.modal-footer{padding:16px 24px;border-top:1px solid var(--border);display:flex;justify-content:flex-end;gap:10px;background:var(--warm)}

/* ── DELETE CONFIRM ─────────────────────────────────────── */
.delete-confirm{position:fixed;inset:0;background:rgba(14,11,7,.65);backdrop-filter:blur(6px);z-index:1100;display:flex;align-items:center;justify-content:center;padding:20px;opacity:0;visibility:hidden;transition:opacity .25s,visibility .25s}
.delete-confirm.active{opacity:1;visibility:visible}
.delete-confirm-box{background:var(--card);border-radius:16px;padding:24px;max-width:380px;width:100%;text-align:center;box-shadow:0 24px 64px rgba(14,11,7,.35)}
.delete-confirm-icon{width:56px;height:56px;border-radius:50%;background:rgba(197,48,48,.1);display:flex;align-items:center;justify-content:center;margin:0 auto 16px}
.delete-confirm-icon svg{width:28px;height:28px;color:var(--rust)}
.delete-confirm-title{font-family:'Playfair Display',serif;font-size:1.15rem;color:var(--ink);margin-bottom:8px}
.delete-confirm-text{font-size:.84rem;color:var(--muted);margin-bottom:20px;line-height:1.6}
.delete-confirm-btns{display:flex;gap:10px;justify-content:center}
.btn-delete-cancel{padding:10px 20px;font-family:'DM Sans',sans-serif;font-size:.84rem;font-weight:600;color:var(--muted);background:var(--warm);border:1.5px solid var(--border);border-radius:10px;cursor:pointer;transition:all .2s}
.btn-delete-cancel:hover{background:var(--warm2);color:var(--ink)}
.btn-delete-confirm{padding:10px 20px;font-family:'DM Sans',sans-serif;font-size:.84rem;font-weight:700;color:#fff;background:var(--rust);border:none;border-radius:10px;cursor:pointer;transition:all .2s;display:flex;align-items:center;gap:6px}
.btn-delete-confirm:hover{background:#a03a2a;transform:translateY(-1px)}
.btn-delete-confirm svg{width:14px;height:14px}

/* ── FORM ───────────────────────────────────────────────── */
.form-group{margin-bottom:18px}
.form-group:last-child{margin-bottom:0}
.form-label{display:block;font-size:.78rem;font-weight:700;color:var(--ink);margin-bottom:6px;letter-spacing:.02em}
.required{color:var(--rust);margin-left:2px}
.form-hint{font-size:.72rem;color:var(--muted);font-weight:400;margin-left:4px}
.form-input,.form-select,.form-textarea{width:100%;padding:11px 14px;font-family:'DM Sans',sans-serif;font-size:.88rem;color:var(--ink);background:var(--cream);border:1.5px solid var(--border);border-radius:10px;transition:all .2s;outline:none}
.form-input:focus,.form-select:focus,.form-textarea:focus{border-color:var(--gold);background:var(--card);box-shadow:0 0 0 3px rgba(201,137,60,.12)}
.form-textarea{resize:vertical;min-height:80px;line-height:1.6}
.form-row{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.form-select{cursor:pointer;appearance:none}
.btn-cancel{padding:10px 20px;font-family:'DM Sans',sans-serif;font-size:.84rem;font-weight:600;color:var(--muted);background:var(--card);border:1.5px solid var(--border);border-radius:10px;cursor:pointer;transition:all .2s}
.btn-cancel:hover{color:var(--ink);background:var(--warm)}
.btn-submit{padding:10px 24px;font-family:'DM Sans',sans-serif;font-size:.84rem;font-weight:700;color:#fff;background:linear-gradient(135deg,var(--gold),var(--rust));border:none;border-radius:10px;cursor:pointer;position:relative;overflow:hidden;transition:transform .18s,box-shadow .18s;display:flex;align-items:center;gap:7px}
.btn-submit::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(255,255,255,.18),transparent 55%);pointer-events:none}
.btn-submit:hover:not(:disabled){transform:translateY(-1px);box-shadow:0 6px 18px rgba(184,75,47,.35)}
.btn-submit:disabled{opacity:.6;cursor:not-allowed}
.btn-submit svg{width:14px;height:14px}
.btn-sm{padding:7px 16px;font-size:.78rem}
.type-selector{display:flex;gap:8px}
.type-option{flex:1;min-width:100px;padding:12px 10px;border:1.5px solid var(--border);border-radius:10px;text-align:center;cursor:pointer;transition:all .2s;background:var(--cream)}
.type-option:hover{border-color:var(--gold-light);background:var(--warm)}
.type-option.selected{border-color:var(--gold);background:var(--gold-pale)}
.type-option-icon{width:32px;height:32px;margin:0 auto 6px;border-radius:8px;display:flex;align-items:center;justify-content:center}
.type-option-icon svg{width:16px;height:16px}
.toi-degree{background:rgba(58,107,158,.12);color:var(--blue)}
.toi-cert{background:rgba(201,137,60,.12);color:var(--gold)}
.type-option.selected .toi-degree{background:var(--blue);color:#fff}
.type-option.selected .toi-cert{background:var(--gold);color:#fff}
.type-option-name{font-size:.78rem;font-weight:700;color:var(--ink)}
.type-option.selected .type-option-name{color:var(--gold)}

/* ── LOADING DOT ────────────────────────────────────────── */
.loading-dot{width:14px;height:14px;border:2px solid rgba(255,255,255,.4);border-top-color:#fff;border-radius:50%;animation:spin .6s linear infinite;flex-shrink:0}
@keyframes spin{to{transform:rotate(360deg)}}

/* ── VERIFICATION ───────────────────────────────────────── */
.verify-steps{display:flex;align-items:center;gap:8px;margin-bottom:20px;padding:14px 16px;background:var(--warm);border:1px solid var(--border);border-radius:12px}
.verify-step{display:flex;align-items:center;gap:9px;flex:1;min-width:0}
.vs-circle{width:28px;height:28px;border-radius:50%;background:var(--card);border:2px solid var(--border);display:flex;align-items:center;justify-content:center;font-size:.78rem;font-weight:700;color:var(--muted);flex-shrink:0;transition:all .25s}
.vs-circle svg{display:none}
.vs-label{font-size:.76rem;font-weight:600;color:var(--muted)}
.verify-step.active .vs-circle{background:linear-gradient(135deg,var(--gold),var(--rust));border-color:var(--rust);color:#fff}
.verify-step.active .vs-label{color:var(--ink)}
.verify-step.done .vs-circle{background:var(--green);border-color:var(--green);color:#fff}
.verify-step.done .vs-circle .vs-num{display:none}
.verify-step.done .vs-circle svg{display:block}
.verify-step.done .vs-label{color:var(--ink)}
.vs-connector{flex:0 0 28px;height:2px;background:var(--border);border-radius:2px}
.verify-step.done + .vs-connector{background:var(--green)}
.mobile-input-row{display:flex;gap:8px}
.otp-wrap{display:flex;gap:10px;justify-content:center;margin:14px 0}
.otp-box{width:48px;height:56px;border:1.5px solid var(--border);border-radius:10px;background:var(--cream);text-align:center;font-family:'Playfair Display',serif;font-size:1.25rem;font-weight:700;color:var(--ink);outline:none;transition:all .2s}
.otp-box:focus{border-color:var(--gold);background:var(--card);box-shadow:0 0 0 3px rgba(201,137,60,.12)}
.verify-note{display:flex;gap:10px;padding:11px 13px;background:rgba(58,107,158,.08);border:1px solid rgba(58,107,158,.2);border-radius:10px;margin-top:8px}
.verify-note svg{width:16px;height:16px;color:var(--blue);flex-shrink:0;margin-top:2px}
.verify-note-text{font-size:.76rem;color:var(--muted);line-height:1.5}
.verify-note-text strong{color:var(--ink)}
.verify-success{text-align:center;padding:16px 8px 8px}
.vs-icon-big{width:72px;height:72px;border-radius:50%;background:rgba(58,158,111,.12);color:var(--green);display:flex;align-items:center;justify-content:center;margin:0 auto 16px}
.vs-icon-big svg{width:36px;height:36px}
.verify-success-title{font-family:'Playfair Display',serif;font-size:1.2rem;color:var(--ink);margin-bottom:6px}
.verify-success-text{font-size:.86rem;color:var(--muted);line-height:1.6}

/* ── ANIMATIONS ─────────────────────────────────────────── */
@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
@keyframes modalIn{from{opacity:0;transform:scale(.95) translateY(10px)}to{opacity:1;transform:scale(1) translateY(0)}}

/* ── RESPONSIVE ─────────────────────────────────────────── */
@media(max-width:1100px){.profile-right{width:280px}}
@media(max-width:900px){.profile-right{display:none}.profile-body{padding:20px}}
@media(max-width:680px){.hero-profile-row{padding:0 20px 20px}.form-row{grid-template-columns:1fr}.role-selector{grid-template-columns:repeat(2,1fr)}.sess-grid{grid-template-columns:1fr}.subject-picker-grid{grid-template-columns:1fr}}
</style>
