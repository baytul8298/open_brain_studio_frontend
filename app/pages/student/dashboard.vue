<template>
  <div class="obs-dash">

    <!-- ── PROMO BANNER ──────────────────────────────────── -->
    <section class="promo-banner">
      <div class="promo-bg"></div>
      <div class="promo-grid"></div>
      <div class="promo-left">
        <div class="promo-tag">{{ timeGreeting }}, {{ displayName }}</div>
        <h2 class="promo-title">Keep <em>learning</em> &amp;<br/>reach your goals.</h2>
        <p class="promo-sub">
          You have <strong>{{ inProgressCount }} course{{ inProgressCount === 1 ? '' : 's' }}</strong> in progress.
          <span v-if="completedCount > 0">You've completed <strong>{{ completedCount }}</strong> — great work!</span>
          <span v-else>Keep going to track your progress.</span>
        </p>
        <div class="promo-actions">
          <NuxtLink
            v-if="firstInProgress"
            :to="`/student/courses/${firstInProgress.course_id}/learn`"
            class="btn-promo-primary"
          >Continue Learning →</NuxtLink>
          <NuxtLink to="/courses" class="btn-promo-ghost">Browse Courses</NuxtLink>
        </div>
      </div>
      <div class="promo-right">
        <div class="promo-stat">
          <div class="promo-stat-num">{{ enrollments.length }}</div>
          <div class="promo-stat-label">Enrolled Courses</div>
        </div>
        <div class="promo-stat">
          <div class="promo-stat-num">{{ avgProgress }}%</div>
          <div class="promo-stat-label">Average Progress</div>
        </div>
      </div>
      <div class="promo-dots">
        <div class="pdot active"></div>
        <div class="pdot"></div>
        <div class="pdot"></div>
      </div>
    </section>

    <!-- ── STATS ROW ─────────────────────────────────────── -->
    <div class="stats-row">
      <div class="stat-card gold">
        <div class="stat-icon si-gold">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
        </div>
        <div class="stat-body">
          <div class="stat-num">{{ enrollments.length }}</div>
          <div class="stat-label">Active Courses</div>
          <div class="stat-change up">Enrolled</div>
        </div>
      </div>
      <div class="stat-card green">
        <div class="stat-icon si-green">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
        </div>
        <div class="stat-body">
          <div class="stat-num">{{ avgProgress }}%</div>
          <div class="stat-label">Avg. Progress</div>
          <div class="stat-change up">Overall</div>
        </div>
      </div>
      <div class="stat-card rust">
        <div class="stat-icon si-rust">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
        </div>
        <div class="stat-body">
          <div class="stat-num">{{ tasks.filter(t => !t.done).length }}</div>
          <div class="stat-label">Due Assignments</div>
          <div class="stat-change neutral">Due this week</div>
        </div>
      </div>
      <div class="stat-card blue">
        <div class="stat-icon si-blue">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
        </div>
        <div class="stat-body">
          <div class="stat-num">{{ completedCount }}</div>
          <div class="stat-label">Completed</div>
          <div class="stat-change up">Finished</div>
        </div>
      </div>
    </div>

    <!-- ── CONTINUE LEARNING ─────────────────────────────── -->
    <section class="continue-section">
      <div class="sec-header">
        <div class="sec-header-left">
          <span class="sec-tag">In Progress</span>
          <h2 class="sec-title">Continue Learning</h2>
        </div>
        <NuxtLink to="/courses" class="sec-link">View all →</NuxtLink>
      </div>

      <!-- Loading -->
      <div v-if="pending" class="continue-grid">
        <div v-for="i in 3" :key="i" class="continue-skeleton"></div>
      </div>

      <!-- Empty -->
      <div v-else-if="enrollments.length === 0" class="courses-empty">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
        <h3>No courses yet</h3>
        <p>Enrol in a course to start your learning journey.</p>
        <NuxtLink to="/courses" class="btn-empty">Browse Courses</NuxtLink>
      </div>

      <!-- Course cards -->
      <div v-else class="continue-grid">
        <NuxtLink
          v-for="(enrollment, i) in enrollments.slice(0, 3)"
          :key="enrollment.id"
          :to="`/student/courses/${enrollment.course_id}/learn`"
          class="continue-card"
        >
          <div class="cc-top" :style="{ background: courseColors[i % courseColors.length].bg }">
            <div class="cc-top-icon" :style="{ background: courseColors[i % courseColors.length].iconBg }">
              <svg viewBox="0 0 24 24" fill="none" :stroke="courseColors[i % courseColors.length].stroke" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="32" height="32">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
              </svg>
            </div>
            <div v-if="enrollment.progress_pct === 0" class="cc-new-badge">New</div>
          </div>
          <div class="cc-body">
            <div class="cc-subject">{{ enrollment.course?.subject ?? 'Course' }}</div>
            <div class="cc-title">{{ enrollment.course?.title ?? 'Untitled' }}</div>
            <div class="cc-info-row">
              <div class="cc-last-activity">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                {{ enrollment.progress_pct > 0 ? `${enrollment.progress_pct}% done` : 'Not started' }}
              </div>
              <div class="cc-lesson-position">{{ enrollment.progress_pct }}%</div>
            </div>
            <div class="progress-wrap">
              <div class="progress-meta"><span>Progress</span><span>{{ enrollment.progress_pct }}%</span></div>
              <div class="progress-bar"><div class="progress-fill" :style="{ width: enrollment.progress_pct + '%' }"></div></div>
            </div>
            <div class="cc-footer-continue">
              <div class="cc-tutor" v-if="enrollment.course?.teacher?.profile">
                <div class="cc-tutor-dot" :style="{ background: courseColors[i % courseColors.length].stroke }">
                  {{ teacherInitials(enrollment.course.teacher.profile) }}
                </div>
                {{ enrollment.course.teacher.profile.first_name }} {{ enrollment.course.teacher.profile.last_name }}
              </div>
              <div class="cc-tutor" v-else>
                <div class="cc-tutor-dot" :style="{ background: courseColors[i % courseColors.length].stroke }">T</div>
                Tutor
              </div>
              <button class="btn-resume">{{ enrollment.progress_pct === 100 ? 'Review →' : enrollment.progress_pct > 0 ? 'Resume →' : 'Start →' }}</button>
            </div>
          </div>
        </NuxtLink>
      </div>
    </section>

    <!-- ── FEATURED COURSES ──────────────────────────────── -->
    <section class="featured-section">
      <div class="sec-header-center">
        <span class="sec-tag">Most Popular</span>
        <h2 class="sec-title-center">Featured Courses to <em>Accelerate</em> Your Learning</h2>
        <p class="sec-subtitle-center">Handpicked courses trusted by thousands of students to ace their exams and build strong foundations.</p>
      </div>
      <div class="featured-grid">
        <NuxtLink
          v-for="(course, i) in featuredCourses"
          :key="course.id"
          :to="`/courses/${course.id}`"
          class="fc-card"
          :style="{ animationDelay: (i * 0.03) + 's' }"
        >
          <div class="fc-thumb">
            <img :src="course.image" :alt="course.title" />
            <div class="fc-thumb-overlay"></div>
            <div class="fc-subject-badge" :class="course.badgeClass">{{ course.subject }}</div>
            <div class="fc-play-btn"><div class="fc-play-circle"><svg viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg></div></div>
          </div>
          <div class="fc-body">
            <div class="fc-tutor-row">
              <div class="fc-tutor-av" :style="{ background: course.tutorGrad }">{{ course.tutorInitials }}</div>
              <div class="fc-tutor-name">{{ course.tutor }}</div>
              <div class="fc-tutor-type" :class="course.tutorTypeClass">{{ course.tutorType }}</div>
            </div>
            <div class="fc-title">{{ course.title }}</div>
            <div class="fc-meta">
              <div class="fc-meta-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>
                {{ course.lessons }} lessons
              </div>
              <div class="fc-meta-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                {{ course.hours }}h
              </div>
              <div class="fc-meta-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
                {{ course.students }}
              </div>
            </div>
            <div class="fc-rating">
              <div class="fc-stars">{{ course.stars }}</div>
              <div class="fc-rating-num">{{ course.rating }}</div>
              <div class="fc-rating-count">({{ course.students }})</div>
            </div>
            <div class="fc-footer">
              <div class="fc-pricing-options">
                <div class="fc-price-option">
                  <div class="fc-price-label">Monthly</div>
                  <div class="fc-price">{{ course.priceMonthly }}</div>
                  <div class="fc-price-note">× 4 months</div>
                </div>
                <div class="fc-price-option popular">
                  <div class="fc-price-label">One-Time</div>
                  <div class="fc-price">{{ course.priceOnetime }}</div>
                  <div class="fc-price-note">full access</div>
                </div>
              </div>
              <button class="btn-enroll-fc">Enroll →</button>
            </div>
          </div>
        </NuxtLink>
      </div>
      <div class="see-more-wrap">
        <NuxtLink to="/courses" class="btn-see-more">
          <span>See All Courses</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </NuxtLink>
      </div>
    </section>

    <!-- ── EXPERT TUTORS ──────────────────────────────────── -->
    <section class="expert-tutors-section">
      <div class="sec-header-center">
        <span class="sec-tag">Expert Tutors</span>
        <h2 class="sec-title-center">Learn from <em>Verified</em> Expert Tutors</h2>
        <p class="sec-subtitle-center">Choose from our highly qualified tutors with proven track records of student success.</p>
      </div>
      <div class="tutor-grid-landing">
        <div v-for="tutor in expertTutors" :key="tutor.name" class="tutor-card-landing">
          <div class="tc-cover" :style="{ backgroundImage: tutor.coverGrad }">
            <div class="tc-verified">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              Verified
            </div>
          </div>
          <div class="tc-header">
            <div class="tc-avatar-wrap">
              <div class="tc-avatar" :style="{ background: tutor.avatarGrad }">{{ tutor.initials }}</div>
              <div class="tc-online"></div>
            </div>
            <div class="tc-name">{{ tutor.name }}</div>
            <div class="tc-title-sub">{{ tutor.title }}</div>
            <div class="tc-rating-wrap">
              <div class="tc-stars">{{ tutor.stars }}</div>
              <span class="tc-rating-text"><strong>{{ tutor.rating }}</strong> ({{ tutor.reviews }} reviews)</span>
            </div>
          </div>
          <div class="tc-body">
            <div class="tc-subjects">
              <div class="tc-subjects-label">Teaches</div>
              <div class="tc-subject-tags">
                <span v-for="sub in tutor.subjects" :key="sub" class="tc-subject-tag">{{ sub }}</span>
              </div>
            </div>
            <div class="tc-stats">
              <div class="tc-stat"><div class="tc-stat-num">{{ tutor.students }}</div><div class="tc-stat-label">Students</div></div>
              <div class="tc-stat"><div class="tc-stat-num">{{ tutor.successRate }}</div><div class="tc-stat-label">Success Rate</div></div>
            </div>
            <div class="tc-footer">
              <div class="tc-price-row">
                <span class="tc-price-label">Starting from</span>
                <div><span class="tc-price">{{ tutor.price }}</span><span class="tc-price-per">/month</span></div>
              </div>
              <button class="btn-tc-book">Book This Tutor →</button>
              <div class="tc-availability" :class="{ limited: tutor.limited }">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                {{ tutor.limited ? 'Limited slots available' : 'Available for new students' }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="see-more-wrap">
        <NuxtLink to="/tutors" class="btn-see-more">
          <span>View All Tutors</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </NuxtLink>
      </div>
    </section>

    <!-- ── BROWSE BY SUBJECT ──────────────────────────────── -->
    <section class="categories-section">
      <div class="sec-header-center">
        <span class="sec-tag">Explore</span>
        <h2 class="sec-title-center">Learn Any Subject, <em>Anytime</em></h2>
        <p class="sec-subtitle-center">Browse courses across all major subjects aligned with the curriculum.</p>
      </div>
      <div class="cat-grid-landing">
        <NuxtLink
          v-for="cat in categories"
          :key="cat.name"
          :to="`/courses?subject=${cat.name}`"
          class="cat-item"
        >
          <div class="cat-icon" :style="{ background: cat.iconBg }">
            <svg viewBox="0 0 24 24" fill="none" :stroke="cat.iconColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" v-html="cat.icon"></svg>
          </div>
          <div class="cat-name">{{ cat.name }}</div>
          <div class="cat-count">{{ cat.count }} courses</div>
        </NuxtLink>
      </div>
      <div class="see-more-wrap">
        <NuxtLink to="/courses" class="btn-see-more">
          <span>Explore All Subjects</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </NuxtLink>
      </div>
    </section>

    <!-- ── MOST LOVED RANKING ────────────────────────────── -->
    <section class="ranking-section">
      <div class="sec-header">
        <div class="sec-header-left">
          <span class="sec-tag">Top Rated</span>
          <h2 class="sec-title">Most Loved <em>Courses</em></h2>
        </div>
        <NuxtLink to="/courses" class="sec-link">Full rankings →</NuxtLink>
      </div>
      <div class="ranking-grid">
        <div v-for="rank in rankingCourses" :key="rank.rank" class="rank-card">
          <div class="rank-num" :class="rank.numClass">{{ rank.rank }}</div>
          <div class="rank-icon" :style="{ background: rank.iconGrad }">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" v-html="rank.icon"></svg>
          </div>
          <div class="rank-body">
            <div class="rank-subject">{{ rank.subject }}</div>
            <div class="rank-title">{{ rank.title }}</div>
            <div class="rank-meta">
              <span class="rank-students">{{ rank.students }} students</span>
              <span class="rank-rating">★ {{ rank.rating }}</span>
            </div>
          </div>
          <div class="rank-trend">↑ {{ rank.trend }}</div>
        </div>
      </div>
    </section>

    <!-- ── MY COURSES ────────────────────────────────────── -->
    <section class="my-courses-section">
      <div class="sec-header">
        <div class="sec-header-left">
          <span class="sec-tag">Enrolled</span>
          <h2 class="sec-title">My <em>Courses</em></h2>
        </div>
        <NuxtLink to="/courses" class="sec-link">Manage all →</NuxtLink>
      </div>
      <div v-if="pending" class="my-courses-list">
        <div v-for="i in 3" :key="i" class="my-course-skeleton"></div>
      </div>
      <div v-else-if="enrollments.length === 0" class="courses-empty">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
        <h3>No courses yet</h3>
        <p>Enrol in a course to start your learning journey.</p>
        <NuxtLink to="/courses" class="btn-empty">Browse Courses</NuxtLink>
      </div>
      <div v-else class="my-courses-list">
        <NuxtLink
          v-for="(enrollment, i) in enrollments"
          :key="enrollment.id"
          :to="`/student/courses/${enrollment.course_id}/learn`"
          class="my-course-row"
        >
          <div class="mcr-icon" :style="{ background: courseColors[i % courseColors.length].dotGrad }">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
          </div>
          <div class="mcr-body">
            <div class="mcr-subject">{{ enrollment.course?.subject ?? 'Course' }}</div>
            <div class="mcr-title">{{ enrollment.course?.title ?? 'Untitled' }}</div>
            <div class="mcr-progress">
              <div class="mcr-bar"><div class="mcr-fill" :style="{ width: enrollment.progress_pct + '%' }"></div></div>
              <span class="mcr-pct">{{ enrollment.progress_pct }}%</span>
            </div>
          </div>
          <div class="mcr-right">
            <div class="mcr-lessons">{{ enrollment.progress_pct }}% done</div>
            <span class="mcr-status" :class="enrollment.progress_pct === 100 ? 'status-done' : enrollment.progress_pct > 0 ? 'status-active' : 'status-paused'">
              {{ enrollment.progress_pct === 100 ? 'Completed' : enrollment.progress_pct > 0 ? 'Active' : 'Not started' }}
            </span>
          </div>
        </NuxtLink>
      </div>
    </section>

    <!-- ── UPCOMING LIVE CLASSES ─────────────────────────── -->
    <section class="upcoming-section">
      <div class="sec-header">
        <div class="sec-header-left">
          <span class="sec-tag">This Week</span>
          <h2 class="sec-title">Upcoming <em>Live Classes</em></h2>
        </div>
        <a href="#" class="sec-link">Full schedule →</a>
      </div>
      <div class="upcoming-list">
        <div v-for="cls in upcomingClasses" :key="cls.id" class="upcoming-item" :class="{ 'live-now': cls.live }">
          <div class="up-date" :style="cls.live ? 'border-color:rgba(184,75,47,.3);background:rgba(184,75,47,.06)' : ''">
            <div class="up-day" :style="cls.live ? 'color:var(--rust)' : ''">{{ cls.day }}</div>
            <div class="up-mon">{{ cls.month }}</div>
          </div>
          <div class="up-body">
            <div class="up-title">{{ cls.title }}</div>
            <div class="up-meta">
              <span class="up-time">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                {{ cls.time }}
              </span>
              <span class="up-tutor-tag">{{ cls.tutor }}</span>
              <span v-if="cls.live" style="font-size:.69rem;font-weight:700;color:var(--rust)">● LIVE NOW</span>
            </div>
          </div>
          <div class="up-actions">
            <button v-if="cls.live" class="btn-join">Join Class →</button>
            <button v-else class="btn-remind">🔔 Remind me</button>
          </div>
        </div>
      </div>
    </section>

    <!-- ── BENTO BOTTOM: Assignments + Grades + Streak ────── -->
    <div class="bento-bottom">

      <!-- Assignments -->
      <div class="panel">
        <div class="ph">
          <div class="ph-left">
            <span class="ph-tag">Pending</span>
            <h2 class="ph-title"><em>Assignments</em></h2>
          </div>
          <a href="#" class="ph-link">All &rarr;</a>
        </div>
        <div class="task-list">
          <div class="task" v-for="task in tasks" :key="task.id" @click="task.done = !task.done">
            <div class="task-cb" :class="{ done: task.done }">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <div class="task-body" :style="task.done ? { opacity: '.55' } : {}">
              <div class="task-title">{{ task.title }}</div>
              <div class="task-sub">
                <span class="task-dot" :style="{ background: task.color }"></span>
                {{ task.subject }} · {{ task.detail }}
              </div>
            </div>
            <span class="task-due" :class="task.dueClass">{{ task.dueLabel }}</span>
          </div>
        </div>
      </div>

      <!-- Grades -->
      <div class="panel">
        <div class="ph">
          <div class="ph-left">
            <span class="ph-tag">Performance</span>
            <h2 class="ph-title">My <em>Grades</em></h2>
          </div>
          <a href="#" class="ph-link">Details &rarr;</a>
        </div>
        <div class="grade-list">
          <div v-for="grade in grades" :key="grade.subject" class="grade-row">
            <div class="grade-info">
              <div class="grade-name">{{ grade.subject }}</div>
              <div class="grade-tchr">{{ grade.teacher }}</div>
            </div>
            <div class="grade-right">
              <div class="grade-score">{{ grade.score }} / 100</div>
              <div class="grade-bar"><div class="grade-fill" :class="grade.fillClass" :style="{ width: grade.score + '%' }"></div></div>
            </div>
            <div class="grade-letter" :class="grade.letterClass">{{ grade.letter }}</div>
          </div>
        </div>
      </div>

      <!-- Streak + Notices -->
      <div class="streak-col">
        <div class="panel">
          <div class="ph" style="margin-bottom:14px">
            <div class="ph-left">
              <span class="ph-tag">Activity</span>
              <h2 class="ph-title">Streak &amp; <em>XP</em></h2>
            </div>
          </div>
          <div class="streak-block">
            <div class="streak-hero">
              <div class="streak-ico">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22c-4.97 0-9-3.582-9-8 0-3.868 2.618-7.122 6.245-7.84C9.082 5.756 9 5.386 9 5c0-1.657 1.343-3 3-3s3 1.343 3 3c0 .386-.082.756-.245 1.16C18.382 6.878 21 10.132 21 14c0 4.418-4.03 8-9 8z"/></svg>
              </div>
              <div class="streak-txt">
                <div class="streak-n">12 Days</div>
                <div class="streak-lbl">Current streak</div>
              </div>
              <div class="streak-best">Best: 21</div>
            </div>
            <div class="week-row">
              <div v-for="day in weekDays" :key="day.label" class="wd">
                <div class="wd-dot" :class="day.cls">
                  <svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="4"/></svg>
                </div>
                <div class="wd-lbl">{{ day.label }}</div>
              </div>
            </div>
            <div class="xp-wrap">
              <div class="xp-row">
                <span class="xp-name">Level 9 — Intermediate</span>
                <span class="xp-val">{{ studentPoints !== null ? studentPoints.toLocaleString() : '4,280' }} XP</span>
              </div>
              <div class="xp-bar">
                <div class="xp-fill" :style="{ width: xpPct + '%' }"></div>
              </div>
              <div class="xp-row" style="margin-top:2px">
                <span class="xp-name" style="font-size:.65rem">{{ 5000 - (studentPoints ?? 4280) }} XP to Level 10</span>
                <span class="xp-val" style="font-size:.65rem">{{ xpPct }}%</span>
              </div>
            </div>
          </div>
        </div>

        <div class="panel">
          <div class="ph" style="margin-bottom:14px">
            <div class="ph-left">
              <span class="ph-tag">Latest</span>
              <h2 class="ph-title"><em>Notices</em></h2>
            </div>
            <a href="#" class="ph-link">All &rarr;</a>
          </div>
          <div class="notice-list">
            <div class="notice pinned">
              <div class="n-ico n-exam">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
              </div>
              <div class="n-body">
                <div class="n-title">Mid-Term Exams — May 5</div>
                <div class="n-desc">Schedule released. Review all chapters covered so far.</div>
              </div>
              <div class="n-pin">Pinned</div>
            </div>
            <div class="notice">
              <div class="n-ico n-event">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              </div>
              <div class="n-body">
                <div class="n-title">Science Fair Registration</div>
                <div class="n-desc">Submit project proposals by Apr 30. Fair on May 15.</div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

  </div>
</template>

<script setup lang="ts">
import type { ApiResponse, Enrollment } from '../../types'
import { useAuthStore } from '../../stores/auth'

definePageMeta({ layout: 'dashboard' })
useHead({ title: 'Dashboard — Open Brain Studio' })

const authStore = useAuthStore()
if (!authStore.isLoggedIn) await navigateTo('/login')
if (!authStore.user) await authStore.fetchMe()

const displayName = computed(() => authStore.user?.profile?.first_name ?? authStore.user?.email ?? 'Student')
const userInitials = computed(() => {
  const p = authStore.user?.profile
  if (p) return `${p.first_name[0] ?? ''}${p.last_name[0] ?? ''}`.toUpperCase()
  return authStore.user?.email?.[0]?.toUpperCase() ?? 'S'
})
const studentPoints = computed(() => authStore.user?.student_profile?.points ?? null)
const timeGreeting  = computed(() => {
  const h = new Date().getHours()
  return h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening'
})

const { data, pending } = await useAsyncData('student-enrollments', async () => {
  if (!authStore.token) return null
  return $fetch<ApiResponse<Enrollment[]>>('/api/users/enrollments', {
    headers: { Authorization: `Bearer ${authStore.token}` },
  }).catch(() => null)
})

const enrollments    = computed(() => data.value?.data ?? [])
const completedCount = computed(() => enrollments.value.filter(e => e.progress_pct === 100).length)
const inProgressCount= computed(() => enrollments.value.filter(e => e.progress_pct > 0 && e.progress_pct < 100).length)
const avgProgress    = computed(() => {
  if (!enrollments.value.length) return 0
  return Math.round(enrollments.value.reduce((a, e) => a + e.progress_pct, 0) / enrollments.value.length)
})
const firstInProgress = computed(() => enrollments.value.find(e => e.progress_pct > 0 && e.progress_pct < 100))

const xpPct = computed(() => {
  const pts = studentPoints.value ?? 4280
  return Math.round((pts % 1000) / 10)
})

function teacherInitials(profile: { first_name: string; last_name: string }) {
  return `${profile.first_name[0] ?? ''}${profile.last_name[0] ?? ''}`.toUpperCase()
}

const courseColors = [
  { bg: '#1a2e4a', iconBg: 'rgba(58,107,158,.25)',  stroke: '#5a8cbf', dotGrad: 'linear-gradient(135deg,#1a3a5c,#2d5a87)' },
  { bg: '#1a2e1a', iconBg: 'rgba(58,158,111,.22)',  stroke: '#5dbf90', dotGrad: 'linear-gradient(135deg,#3a1a0e,#7a3520)' },
  { bg: '#2a1a3a', iconBg: 'rgba(122,92,191,.22)',  stroke: '#9e7ee0', dotGrad: 'linear-gradient(135deg,#2a1a40,#5a3a8a)' },
  { bg: '#2e1a12', iconBg: 'rgba(184,75,47,.22)',   stroke: '#e07050', dotGrad: 'linear-gradient(135deg,#3a1a0e,#7a3520)' },
  { bg: '#2e2212', iconBg: 'rgba(201,137,60,.22)',  stroke: '#e8b96a', dotGrad: 'linear-gradient(135deg,#c9893c,#e8b96a)' },
  { bg: '#0e2a2a', iconBg: 'rgba(42,138,138,.22)',  stroke: '#4ab4b4', dotGrad: 'linear-gradient(135deg,#0d2e15,#1a5e2e)' },
]

const tasks = ref([
  { id: 1, title: 'Integration Problems — Ch. 5', subject: 'Mathematics', detail: '10 problems', color: '#3a6b9e', dueClass: 'due-today', dueLabel: 'Today',    done: false },
  { id: 2, title: 'Essay — Rabindranath Tagore',  subject: 'Bengali',      detail: '500 words',  color: '#b84b2f', dueClass: 'due-soon',  dueLabel: 'Fri Apr 26', done: false },
  { id: 3, title: 'DNA Replication Diagram',       subject: 'Biology',      detail: 'Lab report', color: '#3a9e6f', dueClass: 'due-soon',  dueLabel: 'Sat Apr 27', done: false },
  { id: 4, title: 'Python Functions Exercise',     subject: 'ICT',          detail: 'Code submit',color: '#7a5cbf', dueClass: 'due-done',  dueLabel: 'Submitted',  done: true  },
])

const grades = [
  { subject: 'Mathematics', teacher: 'Mr. Hossain',    score: 88, letter: 'A',  letterClass: 'gl-A', fillClass: 'gf-A' },
  { subject: 'ICT / Python',teacher: 'Mr. Rafi',       score: 91, letter: 'A+', letterClass: 'gl-A', fillClass: 'gf-A' },
  { subject: 'Bengali',     teacher: 'Ms. Chowdhury',  score: 82, letter: 'A−', letterClass: 'gl-A', fillClass: 'gf-A' },
  { subject: 'Biology',     teacher: 'Ms. Akter',      score: 76, letter: 'B+', letterClass: 'gl-B', fillClass: 'gf-B' },
  { subject: 'Physics',     teacher: 'Mr. Islam',      score: 65, letter: 'B',  letterClass: 'gl-C', fillClass: 'gf-C' },
]

const weekDays = [
  { label: 'M',  cls: 'on'  },
  { label: 'T',  cls: 'on'  },
  { label: 'W',  cls: 'on'  },
  { label: 'Th', cls: 'now' },
  { label: 'F',  cls: ''    },
  { label: 'S',  cls: ''    },
  { label: 'Su', cls: ''    },
]

const featuredCourses = [
  {
    id: 'math-mastery',
    subject: 'Mathematics',
    badgeClass: 'badge-math',
    title: 'Complete Math Mastery — Algebra to Calculus',
    tutor: 'Abdul Rahman',
    tutorInitials: 'AR',
    tutorGrad: 'linear-gradient(135deg,#1a3a5c,#2d5a87)',
    tutorType: 'Teacher',
    tutorTypeClass: 't-teacher',
    lessons: 42,
    hours: 38,
    students: 312,
    stars: '★★★★★',
    rating: 4.9,
    priceMonthly: '৳ 250',
    priceOnetime: '৳ 850',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&h=400&fit=crop',
  },
  {
    id: 'physics-foundations',
    subject: 'Physics',
    badgeClass: 'badge-phy',
    title: 'Physics Foundations — Motion to Energy',
    tutor: 'Sir Karim',
    tutorInitials: 'SK',
    tutorGrad: 'linear-gradient(135deg,#c98937,#b84b2f)',
    tutorType: 'Professor',
    tutorTypeClass: 't-professor',
    lessons: 36,
    hours: 32,
    students: 248,
    stars: '★★★★★',
    rating: 4.8,
    priceMonthly: '৳ 220',
    priceOnetime: '৳ 750',
    image: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=600&h=400&fit=crop',
  },
  {
    id: 'chemistry-complete',
    subject: 'Chemistry',
    badgeClass: 'badge-sci',
    title: 'Chemistry Complete — Structure to Reactions',
    tutor: 'Dr. Rahman',
    tutorInitials: 'RH',
    tutorGrad: 'linear-gradient(135deg,#1a3a1a,#2a6a2a)',
    tutorType: 'Professor',
    tutorTypeClass: 't-professor',
    lessons: 30,
    hours: 28,
    students: 210,
    stars: '★★★★☆',
    rating: 4.7,
    priceMonthly: '৳ 200',
    priceOnetime: '৳ 680',
    image: 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?w=600&h=400&fit=crop',
  },
  {
    id: 'biology-essentials',
    subject: 'Biology',
    badgeClass: 'badge-sci',
    title: 'Biology Essentials — Cell to Ecosystem',
    tutor: 'Dr. Fatima Ahmed',
    tutorInitials: 'FA',
    tutorGrad: 'linear-gradient(135deg,#2a6a2a,#50aa80)',
    tutorType: 'Professor',
    tutorTypeClass: 't-professor',
    lessons: 28,
    hours: 26,
    students: 189,
    stars: '★★★★★',
    rating: 4.8,
    priceMonthly: '৳ 210',
    priceOnetime: '৳ 720',
    image: 'https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?w=600&h=400&fit=crop',
  },
]

const expertTutors = [
  {
    name: 'Abdul Rahman',
    initials: 'AR',
    title: 'M.Sc in Mathematics · 8 Years Experience',
    coverGrad: "linear-gradient(135deg,rgba(26,58,92,0.85),rgba(45,90,135,0.85))",
    avatarGrad: 'linear-gradient(135deg,#1a3a5c,#2d5a87)',
    stars: '★★★★★',
    rating: 4.9,
    reviews: 156,
    subjects: ['Mathematics', 'Algebra', 'Calculus'],
    students: '280+',
    successRate: '98%',
    price: '৳1,200',
    limited: false,
  },
  {
    name: 'Fatima Noor',
    initials: 'FN',
    title: 'M.Sc in Physics · 6 Years Experience',
    coverGrad: "linear-gradient(135deg,rgba(122,53,32,0.85),rgba(184,75,47,0.85))",
    avatarGrad: 'linear-gradient(135deg,#7a3520,#b84b2f)',
    stars: '★★★★★',
    rating: 4.8,
    reviews: 124,
    subjects: ['Physics', 'Chemistry', 'Science'],
    students: '195+',
    successRate: '96%',
    price: '৳1,500',
    limited: true,
  },
  {
    name: 'Karim Ahmed',
    initials: 'KA',
    title: 'B.A in English Literature · 5 Years Experience',
    coverGrad: "linear-gradient(135deg,rgba(122,92,191,0.85),rgba(160,122,208,0.85))",
    avatarGrad: 'linear-gradient(135deg,#7a5cbf,#a07ae0)',
    stars: '★★★★★',
    rating: 5.0,
    reviews: 89,
    subjects: ['English', 'Bangla'],
    students: '145+',
    successRate: '99%',
    price: '৳900',
    limited: false,
  },
  {
    name: 'Nasrin Sultana',
    initials: 'NS',
    title: 'M.Sc in Chemistry · 7 Years Experience',
    coverGrad: "linear-gradient(135deg,rgba(58,158,111,0.85),rgba(92,191,138,0.85))",
    avatarGrad: 'linear-gradient(135deg,#3a9e6f,#5dbf90)',
    stars: '★★★★★',
    rating: 4.9,
    reviews: 142,
    subjects: ['Chemistry', 'Biology', 'Science'],
    students: '220+',
    successRate: '97%',
    price: '৳1,100',
    limited: false,
  },
]

const categories = [
  { name: 'Mathematics', count: 24, iconBg: 'rgba(58,107,158,.12)',  iconColor: '#3a6b9e', icon: '<path d="M12 2v20M2 12h20"/>' },
  { name: 'Physics',     count: 18, iconBg: 'rgba(184,75,47,.1)',    iconColor: '#b84b2f', icon: '<circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83"/>' },
  { name: 'Chemistry',   count: 15, iconBg: 'rgba(58,158,111,.1)',   iconColor: '#3a9e6f', icon: '<path d="M9 3H7l-4 8 4 9h10l4-9-4-8h-2"/>' },
  { name: 'Biology',     count: 14, iconBg: 'rgba(220,100,150,.1)',  iconColor: '#dc6496', icon: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>' },
  { name: 'English',     count: 20, iconBg: 'rgba(122,92,191,.1)',   iconColor: '#7a5cbf', icon: '<path d="M4 7h16M4 12h16M4 17h10"/>' },
  { name: 'History',     count: 11, iconBg: 'rgba(201,137,60,.1)',   iconColor: '#c9893c', icon: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>' },
  { name: 'ICT',         count: 9,  iconBg: 'rgba(58,158,180,.1)',   iconColor: '#3a9eb4', icon: '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>' },
  { name: 'Geography',   count: 8,  iconBg: 'rgba(144,180,58,.1)',   iconColor: '#90b43a', icon: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10z"/>' },
]

const rankingCourses = [
  { rank: 1, numClass: 'gold-num',   subject: 'Mathematics · Class 9',  title: 'Complete Math Mastery',       students: 312, rating: 4.9, trend: '8%',  iconGrad: 'linear-gradient(135deg,#1a3a5c,#2d5a87)', icon: '<path d="M12 2v20M2 12h20"/>' },
  { rank: 2, numClass: 'silver-num', subject: 'Physics · Class 9–10',   title: 'Physics Foundations',         students: 248, rating: 4.8, trend: '5%',  iconGrad: 'linear-gradient(135deg,#3a1a0e,#7a3520)', icon: '<circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4"/>' },
  { rank: 3, numClass: 'bronze-num', subject: 'Chemistry · Class 9',    title: 'Chemistry Complete',          students: 195, rating: 4.7, trend: '3%',  iconGrad: 'linear-gradient(135deg,#0d2e15,#1a5e2e)', icon: '<path d="M9 3H7l-4 8 4 9h10l4-9-4-8h-2"/>' },
  { rank: 4, numClass: 'plain-num',  subject: 'English · All Classes',  title: 'English Grammar Starter',     students: 430, rating: 4.6, trend: '12%', iconGrad: 'linear-gradient(135deg,#2a1a40,#5a3a8a)', icon: '<path d="M4 7h16M4 12h16M4 17h10"/>' },
]

const upcomingClasses = [
  { id: 1, day: 25, month: 'APR', live: true,  title: 'Algebra — Quadratic Equations (Live Session)',   time: '4:00 PM – 5:30 PM', tutor: 'Mr. Rahman · Math'     },
  { id: 2, day: 26, month: 'APR', live: false, title: 'Laws of Motion — Newton\'s 3 Laws Explained',   time: '3:00 PM – 4:30 PM', tutor: 'Sir Karim · Physics'   },
  { id: 3, day: 28, month: 'APR', live: false, title: 'Chemical Bonding — Ionic vs Covalent Bonds',    time: '5:00 PM – 6:00 PM', tutor: 'Ms. Nasrin · Chemistry' },
]
</script>

<style scoped>
/* ── TOKENS ─────────────────────────────────────────────── */
.obs-dash {
  --ink:       #0e0b07;
  --cream:     #faf6ef;
  --warm:      #f0e8d6;
  --warm2:     #e8ddc8;
  --gold:      #c9893c;
  --gold-l:    #e8b96a;
  --gold-pale: rgba(201,137,60,.10);
  --rust:      #b84b2f;
  --muted:     #8a7f72;
  --border:    #e0d8cc;
  --card:      #ffffff;
  --green:     #3a9e6f;
  --blue:      #3a6b9e;
  --purple:    #7a5cbf;
  --teal:      #2a8a8a;

  display: flex;
  flex-direction: column;
  gap: 40px;
  font-family: 'DM Sans', sans-serif;
  color: var(--ink);
}

/* ── PROMO BANNER ───────────────────────────────────────── */
.promo-banner {
  position: relative;
  background: var(--ink);
  border-radius: 22px;
  padding: 40px 44px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 28px;
  animation: fadeUp .5s ease both;
}
.promo-bg {
  position: absolute; inset: 0; pointer-events: none;
  background:
    radial-gradient(ellipse 70% 80% at 105% 50%, rgba(201,137,60,.4) 0%, transparent 60%),
    radial-gradient(ellipse 50% 60% at -5% 0%,   rgba(184,75,47,.28) 0%, transparent 60%),
    radial-gradient(ellipse 40% 50% at 50% 100%, rgba(58,107,158,.15) 0%, transparent 60%);
}
.promo-grid {
  position: absolute; inset: 0; pointer-events: none;
  background-image: linear-gradient(rgba(255,255,255,.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.03) 1px, transparent 1px);
  background-size: 52px 52px;
}
.promo-left  { position: relative; z-index: 1; }
.promo-tag {
  display: inline-flex; align-items: center; gap: 7px;
  font-size: .67rem; font-weight: 700; letter-spacing: .15em; text-transform: uppercase;
  color: var(--gold-l); background: rgba(201,137,60,.18);
  border: 1px solid rgba(201,137,60,.38); border-radius: 20px;
  padding: 5px 13px; margin-bottom: 14px;
}
.promo-tag::before { content: ''; width: 5px; height: 5px; border-radius: 50%; background: var(--gold-l); animation: pulse 1.4s infinite; }
.promo-title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(1.5rem, 2vw, 2.1rem);
  color: var(--cream); line-height: 1.2; margin-bottom: 10px;
}
.promo-title em { font-style: italic; color: var(--gold-l); }
.promo-sub {
  font-size: .88rem; font-weight: 300;
  color: rgba(250,246,239,.6); max-width: 380px; margin-bottom: 22px; line-height: 1.55;
}
.promo-sub strong { color: rgba(250,246,239,.85); font-weight: 600; }
.promo-actions { display: flex; gap: 12px; align-items: center; }
.btn-promo-primary {
  padding: 11px 22px; font-size: .88rem; font-weight: 600;
  color: #fff; background: linear-gradient(135deg, var(--gold), var(--rust));
  border: none; border-radius: 10px; cursor: pointer;
  transition: transform .18s, box-shadow .18s;
  position: relative; overflow: hidden; text-decoration: none;
  display: inline-flex; align-items: center;
}
.btn-promo-primary::before { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, rgba(255,255,255,.2), transparent 60%); pointer-events: none; }
.btn-promo-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(184,75,47,.38); }
.btn-promo-ghost {
  padding: 11px 20px; font-size: .88rem; font-weight: 500;
  color: rgba(250,246,239,.75); background: transparent;
  border: 1.5px solid rgba(255,255,255,.22); border-radius: 10px; cursor: pointer;
  transition: all .2s; text-decoration: none; display: inline-flex; align-items: center;
}
.btn-promo-ghost:hover { border-color: rgba(255,255,255,.55); color: var(--cream); }
.promo-right {
  position: relative; z-index: 1;
  display: flex; flex-direction: column; gap: 10px; flex-shrink: 0;
}
.promo-stat {
  background: rgba(255,255,255,.07); border: 1px solid rgba(255,255,255,.12);
  border-radius: 14px; padding: 14px 22px; min-width: 148px; backdrop-filter: blur(8px);
}
.promo-stat-num {
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem; color: var(--cream); line-height: 1; margin-bottom: 3px;
}
.promo-stat-label { font-size: .7rem; color: rgba(250,246,239,.48); }
.promo-dots { position: absolute; bottom: 18px; left: 44px; z-index: 1; display: flex; gap: 6px; }
.pdot { width: 20px; height: 4px; border-radius: 2px; cursor: pointer; background: rgba(255,255,255,.22); transition: all .3s; }
.pdot.active { background: var(--gold); width: 32px; }

/* ── STATS ROW ──────────────────────────────────────────── */
.stats-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  animation: fadeUp .5s .07s ease both;
}
.stat-card {
  background: var(--card); border: 1px solid var(--border);
  border-radius: 18px; padding: 20px 22px;
  display: flex; align-items: flex-start; gap: 14px;
  transition: transform .22s, box-shadow .22s;
  position: relative; overflow: hidden;
}
.stat-card::after {
  content: ''; position: absolute; bottom: 0; left: 0; right: 0;
  height: 3px; border-radius: 0 0 18px 18px;
}
.stat-card.gold::after  { background: linear-gradient(90deg, var(--gold), var(--gold-l)); }
.stat-card.rust::after  { background: linear-gradient(90deg, var(--rust), #e07050); }
.stat-card.green::after { background: linear-gradient(90deg, var(--green), #5dbf90); }
.stat-card.blue::after  { background: linear-gradient(90deg, var(--blue), #5a8cbf); }
.stat-card:hover { transform: translateY(-3px); box-shadow: 0 10px 28px rgba(14,11,7,.09); }
.stat-icon { width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.stat-icon svg { width: 21px; height: 21px; }
.si-gold  { background: rgba(201,137,60,.12); color: var(--gold); }
.si-rust  { background: rgba(184,75,47,.12);  color: var(--rust); }
.si-green { background: rgba(58,158,111,.12); color: var(--green); }
.si-blue  { background: rgba(58,107,158,.12); color: var(--blue); }
.stat-body { flex: 1; }
.stat-num   { font-family: 'Playfair Display', serif; font-size: 1.7rem; color: var(--ink); line-height: 1; margin-bottom: 3px; }
.stat-label { font-size: .73rem; color: var(--muted); margin-bottom: 6px; }
.stat-change { font-size: .69rem; font-weight: 600; }
.stat-change.up      { color: var(--green); }
.stat-change.neutral { color: var(--muted); }

/* ── SECTION HEADER ─────────────────────────────────────── */
.sec-header      { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
.sec-header-left { display: flex; flex-direction: column; gap: 4px; }
.sec-tag {
  display: inline-block; font-size: .64rem; font-weight: 700; letter-spacing: .14em; text-transform: uppercase;
  color: var(--gold); background: var(--gold-pale); border: 1px solid rgba(201,137,60,.25);
  border-radius: 20px; padding: 3px 12px; margin-bottom: 6px; width: fit-content;
}
.sec-title {
  font-family: 'Playfair Display', serif; font-size: 1.3rem; color: var(--ink);
  display: flex; align-items: center; gap: 10px;
}
.sec-title::before { content: ''; width: 4px; height: 22px; border-radius: 2px; background: linear-gradient(180deg, var(--gold), var(--rust)); flex-shrink: 0; }
.sec-title em { font-style: italic; color: var(--gold); }
.sec-link {
  font-size: .8rem; font-weight: 500; color: var(--gold);
  text-decoration: none; border-bottom: 1px solid var(--gold-l); transition: color .2s; white-space: nowrap;
}
.sec-link:hover { color: var(--rust); }

/* Section header center */
.sec-header-center { text-align: center; margin-bottom: 40px; }
.sec-title-center {
  font-family: 'Playfair Display', serif;
  font-size: clamp(1.7rem, 2.8vw, 2.4rem); color: var(--ink); line-height: 1.2; margin-bottom: 12px;
}
.sec-title-center em { font-style: italic; color: var(--gold); }
.sec-subtitle-center { font-size: .97rem; font-weight: 300; line-height: 1.6; color: var(--muted); max-width: 620px; margin: 0 auto; }

/* ── CONTINUE LEARNING ──────────────────────────────────── */
.continue-section { animation: fadeUp .5s .14s ease both; }
.continue-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
}
.continue-skeleton { height: 280px; border-radius: 18px; background: var(--warm); animation: pulse-bg 1.5s ease infinite; }
.courses-empty {
  display: flex; flex-direction: column; align-items: center;
  padding: 48px 20px; text-align: center;
  background: var(--card); border: 1px solid var(--border); border-radius: 18px;
}
.courses-empty svg { width: 44px; height: 44px; color: var(--border); margin-bottom: 14px; }
.courses-empty h3 { font-size: .95rem; font-weight: 600; color: var(--ink); margin-bottom: 6px; }
.courses-empty p  { font-size: .8rem; color: var(--muted); margin-bottom: 18px; }
.btn-empty {
  padding: 9px 22px; font-size: .82rem; font-weight: 600; color: #fff;
  background: linear-gradient(135deg, var(--gold), var(--rust));
  border-radius: 10px; text-decoration: none;
  transition: transform .16s, box-shadow .16s;
}
.btn-empty:hover { transform: translateY(-2px); box-shadow: 0 6px 18px rgba(184,75,47,.35); }

.continue-card {
  background: var(--card); border: 1px solid var(--border);
  border-radius: 18px; overflow: hidden;
  transition: transform .22s, box-shadow .22s;
  cursor: pointer; text-decoration: none; display: block;
}
.continue-card:hover { transform: translateY(-5px); box-shadow: 0 14px 36px rgba(14,11,7,.11); }
.cc-top {
  height: 140px; display: flex; align-items: center; justify-content: center;
  position: relative; overflow: hidden;
}
.cc-top-icon {
  width: 72px; height: 72px; border-radius: 20px;
  display: flex; align-items: center; justify-content: center;
}
.cc-new-badge {
  position: absolute; top: 10px; right: 10px;
  background: var(--gold); color: #fff; font-size: .6rem; font-weight: 700;
  letter-spacing: .06em; text-transform: uppercase;
  border-radius: 20px; padding: 4px 10px;
}
.cc-body { padding: 18px; }
.cc-subject { font-size: .66rem; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; color: var(--muted); margin-bottom: 5px; }
.cc-title {
  font-family: 'Playfair Display', serif;
  font-size: .97rem; color: var(--ink); line-height: 1.3; margin-bottom: 12px;
}
.cc-info-row { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-bottom: 10px; }
.cc-last-activity { font-size: .68rem; color: var(--muted); display: flex; align-items: center; gap: 5px; }
.cc-last-activity svg { width: 11px; height: 11px; }
.cc-lesson-position {
  font-size: .68rem; font-weight: 600; color: var(--gold);
  background: var(--gold-pale); border: 1px solid rgba(201,137,60,.2); border-radius: 12px; padding: 3px 8px;
}
.progress-wrap  { margin-bottom: 12px; }
.progress-meta  { display: flex; justify-content: space-between; font-size: .69rem; color: var(--muted); margin-bottom: 5px; font-weight: 500; }
.progress-meta span:last-child { font-weight: 700; color: var(--gold); }
.progress-bar   { height: 5px; background: var(--warm); border-radius: 3px; overflow: hidden; }
.progress-fill  { height: 100%; border-radius: 3px; background: linear-gradient(90deg, var(--gold), var(--gold-l)); transition: width .7s ease; }
.cc-footer-continue {
  display: flex; align-items: center; justify-content: space-between;
  padding-top: 11px; border-top: 1px solid var(--border);
}
.cc-tutor { font-size: .74rem; color: var(--muted); display: flex; align-items: center; gap: 6px; }
.cc-tutor-dot {
  width: 20px; height: 20px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: .57rem; font-weight: 700; color: #fff; flex-shrink: 0;
}
.btn-resume {
  padding: 6px 15px; font-size: .75rem; font-weight: 600;
  color: #fff; background: linear-gradient(135deg, var(--gold), var(--rust));
  border: none; border-radius: 8px; cursor: pointer;
  transition: transform .15s, box-shadow .15s;
  position: relative; overflow: hidden;
}
.btn-resume::before { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, rgba(255,255,255,.18), transparent 60%); pointer-events: none; }
.btn-resume:hover { transform: translateY(-1px); box-shadow: 0 4px 14px rgba(184,75,47,.32); }

/* ── FEATURED COURSES ───────────────────────────────────── */
.featured-section { animation: fadeUp .5s .2s ease both; }
.featured-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; }

.fc-card {
  background: var(--card); border: 1px solid var(--border); border-radius: 16px; overflow: hidden;
  cursor: pointer; transition: all .25s; animation: fadeUp .4s ease both;
  text-decoration: none; display: block;
}
.fc-card:hover { transform: translateY(-4px); box-shadow: 0 16px 36px rgba(14,11,7,.1); border-color: rgba(201,137,60,.3); }
.fc-thumb { position: relative; height: 160px; overflow: hidden; flex-shrink: 0; }
.fc-thumb img { width: 100%; height: 100%; object-fit: cover; transition: transform .4s; }
.fc-card:hover .fc-thumb img { transform: scale(1.06); }
.fc-thumb-overlay { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(14,11,7,.05) 0%, rgba(14,11,7,.55) 100%); }
.fc-subject-badge {
  position: absolute; top: 12px; left: 12px;
  font-size: .62rem; font-weight: 700; letter-spacing: .08em; text-transform: uppercase;
  border-radius: 20px; padding: 3px 10px; border: 1px solid; z-index: 1;
}
.badge-math { background: rgba(58,107,158,.18);  color: #6090c0; border-color: rgba(58,107,158,.35); }
.badge-sci  { background: rgba(58,158,111,.18);  color: #50aa80; border-color: rgba(58,158,111,.35); }
.badge-phy  { background: rgba(201,137,60,.2);   color: var(--gold); border-color: rgba(201,137,60,.35); }
.badge-eng  { background: rgba(184,75,47,.18);   color: #c06848; border-color: rgba(184,75,47,.35); }
.fc-play-btn { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity .25s; z-index: 1; }
.fc-card:hover .fc-play-btn { opacity: 1; }
.fc-play-circle {
  width: 44px; height: 44px; border-radius: 50%; background: rgba(201,137,60,.9);
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 4px 14px rgba(201,137,60,.5);
}
.fc-play-circle svg { width: 16px; height: 16px; color: #fff; margin-left: 2px; }

.fc-body { padding: 15px 16px 16px; }
.fc-tutor-row { display: flex; align-items: center; gap: 7px; margin-bottom: 8px; }
.fc-tutor-av {
  width: 24px; height: 24px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: .6rem; color: #fff; flex-shrink: 0; border: 1.5px solid var(--border);
}
.fc-tutor-name { font-size: .74rem; color: var(--muted); font-weight: 500; }
.fc-tutor-type { font-size: .62rem; border-radius: 20px; padding: 1px 7px; font-weight: 600; margin-left: auto; }
.t-teacher   { background: rgba(58,107,158,.12);  color: var(--blue); }
.t-professor { background: rgba(201,137,60,.12);  color: var(--gold); }
.t-expert    { background: rgba(58,158,111,.12);  color: var(--green); }

.fc-title {
  font-family: 'Playfair Display', serif;
  font-size: .96rem; color: var(--ink); line-height: 1.3; margin-bottom: 7px;
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
}
.fc-meta { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; flex-wrap: wrap; }
.fc-meta-item { display: flex; align-items: center; gap: 4px; font-size: .72rem; color: var(--muted); }
.fc-meta-item svg { width: 11px; height: 11px; }
.fc-rating { display: flex; align-items: center; gap: 5px; margin-bottom: 11px; }
.fc-stars { color: var(--gold-l); font-size: .8rem; letter-spacing: .03em; }
.fc-rating-num  { font-size: .8rem; font-weight: 700; color: var(--ink); }
.fc-rating-count{ font-size: .72rem; color: var(--muted); }
.fc-footer { padding-top: 11px; border-top: 1px solid var(--border); }
.fc-pricing-options { display: flex; gap: 8px; margin-bottom: 10px; }
.fc-price-option {
  flex: 1; background: var(--warm); border: 1.5px solid var(--border);
  border-radius: 10px; padding: 8px; cursor: pointer; transition: all .2s; position: relative;
}
.fc-price-option:hover    { border-color: var(--gold); background: var(--gold-pale); transform: translateY(-1px); }
.fc-price-option.popular  { border-color: var(--gold); background: var(--gold-pale); }
.fc-price-option.popular::after {
  content: 'Save'; position: absolute; top: -6px; right: 6px;
  background: var(--green); color: #fff; font-size: .58rem; font-weight: 700;
  padding: 1px 6px; border-radius: 8px; letter-spacing: .02em; text-transform: uppercase;
}
.fc-price-label { font-size: .62rem; color: var(--muted); margin-bottom: 3px; text-transform: uppercase; letter-spacing: .04em; font-weight: 600; }
.fc-price       { font-family: 'Playfair Display', serif; font-size: .95rem; color: var(--ink); line-height: 1; margin-bottom: 2px; }
.fc-price-note  { font-size: .6rem; color: var(--muted); }
.btn-enroll-fc {
  width: 100%; padding: 7px 14px; font-size: .76rem; font-weight: 700;
  color: #fff; background: linear-gradient(135deg, var(--gold), var(--rust));
  border: none; border-radius: 8px; cursor: pointer;
  position: relative; overflow: hidden; transition: transform .18s, box-shadow .18s;
}
.btn-enroll-fc::before { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, rgba(255,255,255,.18), transparent 55%); pointer-events: none; }
.btn-enroll-fc:hover { transform: translateY(-1px); box-shadow: 0 5px 14px rgba(184,75,47,.35); }

/* See more button */
.see-more-wrap { display: flex; justify-content: center; margin-top: 32px; }
.btn-see-more {
  padding: 11px 28px; font-size: .84rem; font-weight: 600;
  color: var(--ink); background: var(--warm);
  border: 1.5px solid var(--border); border-radius: 10px; cursor: pointer;
  transition: all .25s ease; position: relative; overflow: hidden;
  display: inline-flex; align-items: center; gap: 8px; text-decoration: none;
}
.btn-see-more::before {
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(135deg, var(--gold-pale), transparent);
  opacity: 0; transition: opacity .25s ease;
}
.btn-see-more:hover { border-color: var(--gold); color: var(--gold); transform: translateY(-2px); box-shadow: 0 6px 20px rgba(201,137,60,.18); }
.btn-see-more:hover::before { opacity: 1; }
.btn-see-more svg { width: 16px; height: 16px; transition: transform .25s ease; position: relative; z-index: 1; }
.btn-see-more:hover svg { transform: translateX(3px); }

/* ── EXPERT TUTORS ──────────────────────────────────────── */
.expert-tutors-section { animation: fadeUp .5s .25s ease both; }
.tutor-grid-landing { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; }

.tutor-card-landing {
  background: var(--card); border: 1px solid var(--border); border-radius: 16px; overflow: hidden;
  transition: transform .3s, box-shadow .3s; cursor: pointer; display: flex; flex-direction: column;
}
.tutor-card-landing:hover { transform: translateY(-6px); box-shadow: 0 16px 40px rgba(14,11,7,.11); }
.tc-cover {
  height: 82px; background-size: cover; background-position: center; overflow: hidden; position: relative;
}
.tc-cover::after { content: ''; position: absolute; inset: 0; background: linear-gradient(180deg, transparent 0%, rgba(0,0,0,.28) 100%); }
.tc-verified {
  position: absolute; top: 10px; right: 10px; z-index: 10;
  background: var(--green); color: #fff; font-size: .56rem; font-weight: 700;
  letter-spacing: .05em; text-transform: uppercase; border-radius: 16px; padding: 4px 9px;
  display: flex; align-items: center; gap: 3px;
}
.tc-verified svg { width: 9px; height: 9px; }
.tc-header {
  position: relative; background: linear-gradient(135deg, var(--warm), var(--warm2));
  padding: 0 16px 16px; text-align: center;
}
.tc-avatar-wrap { position: relative; display: inline-block; margin-top: -34px; margin-bottom: 8px; }
.tc-avatar {
  width: 68px; height: 68px; border-radius: 50%;
  border: 3px solid #fff; box-shadow: 0 6px 18px rgba(14,11,7,.12);
  display: flex; align-items: center; justify-content: center;
  font-family: 'Playfair Display', serif; font-size: 1.2rem; color: #fff; font-weight: 700;
}
.tc-online { position: absolute; bottom: 3px; right: 3px; width: 14px; height: 14px; border-radius: 50%; background: var(--green); border: 2px solid #fff; }
.tc-name   { font-family: 'Playfair Display', serif; font-size: 1.02rem; color: var(--ink); margin-bottom: 2px; font-weight: 700; }
.tc-title-sub { font-size: .67rem; color: var(--muted); margin-bottom: 7px; font-weight: 500; }
.tc-rating-wrap { display: flex; align-items: center; justify-content: center; gap: 6px; }
.tc-stars { color: var(--gold); font-size: .75rem; }
.tc-rating-text { font-size: .67rem; color: var(--muted); }
.tc-rating-text strong { color: var(--ink); font-weight: 600; }
.tc-body { padding: 14px 16px; flex: 1; display: flex; flex-direction: column; }
.tc-subjects { margin-bottom: 11px; }
.tc-subjects-label { font-size: .6rem; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; color: var(--muted); margin-bottom: 5px; }
.tc-subject-tags { display: flex; flex-wrap: wrap; gap: 4px; }
.tc-subject-tag { font-size: .63rem; font-weight: 500; background: var(--gold-pale); border: 1px solid rgba(201,137,60,.25); color: var(--gold); border-radius: 14px; padding: 3px 8px; }
.tc-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 11px; padding-bottom: 11px; border-bottom: 1px solid var(--border); }
.tc-stat { text-align: center; }
.tc-stat-num { font-family: 'Playfair Display', serif; font-size: 1.1rem; color: var(--ink); line-height: 1; margin-bottom: 3px; font-weight: 700; }
.tc-stat-label { font-size: .58rem; color: var(--muted); text-transform: uppercase; letter-spacing: .05em; }
.tc-footer { margin-top: auto; padding-top: 11px; border-top: 1px solid var(--border); }
.tc-price-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; }
.tc-price-label { font-size: .65rem; color: var(--muted); }
.tc-price { font-family: 'Playfair Display', serif; font-size: 1.3rem; color: var(--ink); line-height: 1; font-weight: 700; }
.tc-price-per { font-size: .67rem; color: var(--muted); font-weight: 400; }
.btn-tc-book {
  width: 100%; padding: 9px 16px; font-size: .77rem; font-weight: 600;
  color: #fff; background: linear-gradient(135deg, var(--gold), var(--rust));
  border: none; border-radius: 9px; cursor: pointer; transition: transform .18s, box-shadow .18s;
  position: relative; overflow: hidden;
}
.btn-tc-book::before { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, rgba(255,255,255,.2), transparent 60%); pointer-events: none; }
.btn-tc-book:hover { transform: translateY(-2px); box-shadow: 0 6px 18px rgba(184,75,47,.35); }
.tc-availability { display: flex; align-items: center; gap: 5px; font-size: .65rem; color: var(--green); margin-top: 8px; justify-content: center; font-weight: 500; }
.tc-availability svg { width: 11px; height: 11px; }
.tc-availability.limited { color: var(--rust); }

/* ── CATEGORIES ─────────────────────────────────────────── */
.categories-section { animation: fadeUp .5s .3s ease both; }
.cat-grid-landing { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 18px; }
.cat-item {
  background: var(--card); border: 1.5px solid var(--border);
  border-radius: 15px; padding: 18px 10px 14px;
  display: flex; flex-direction: column; align-items: center; gap: 9px;
  cursor: pointer; transition: all .22s; text-align: center; text-decoration: none;
}
.cat-item:hover { border-color: var(--gold); background: var(--gold-pale); transform: translateY(-3px); box-shadow: 0 6px 20px rgba(201,137,60,.13); }
.cat-icon { width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; transition: transform .22s; }
.cat-item:hover .cat-icon { transform: scale(1.1); }
.cat-icon svg { width: 22px; height: 22px; }
.cat-name  { font-size: .74rem; font-weight: 600; color: var(--ink); }
.cat-count { font-size: .62rem; color: var(--muted); }

/* ── RANKING ────────────────────────────────────────────── */
.ranking-section { animation: fadeUp .5s .35s ease both; }
.ranking-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.rank-card {
  background: var(--card); border: 1px solid var(--border);
  border-radius: 14px; padding: 15px 18px;
  display: flex; align-items: center; gap: 14px; cursor: pointer; transition: all .2s;
}
.rank-card:hover { border-color: var(--gold-l); transform: translateX(3px); }
.rank-num { font-family: 'Playfair Display', serif; font-size: 1.3rem; min-width: 30px; text-align: center; }
.gold-num   { color: var(--gold); }
.silver-num { color: #9ba4b0; }
.bronze-num { color: #b8896a; }
.plain-num  { color: var(--muted); }
.rank-icon { width: 40px; height: 40px; border-radius: 10px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; }
.rank-icon svg { width: 20px; height: 20px; color: #fff; }
.rank-body { flex: 1; min-width: 0; }
.rank-subject { font-size: .64rem; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; color: var(--muted); margin-bottom: 3px; }
.rank-title { font-size: .87rem; font-weight: 500; color: var(--ink); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-bottom: 4px; }
.rank-meta { display: flex; align-items: center; gap: 9px; font-size: .69rem; color: var(--muted); }
.rank-students { display: flex; align-items: center; gap: 4px; }
.rank-rating { color: var(--gold); }
.rank-trend { flex-shrink: 0; font-size: .71rem; font-weight: 700; color: var(--green); display: flex; align-items: center; gap: 2px; }

/* ── MY COURSES ─────────────────────────────────────────── */
.my-courses-section { animation: fadeUp .5s .42s ease both; }
.my-courses-list { display: flex; flex-direction: column; gap: 11px; }
.my-course-skeleton { height: 80px; border-radius: 15px; background: var(--warm); animation: pulse-bg 1.5s ease infinite; }
.my-course-row {
  background: var(--card); border: 1px solid var(--border);
  border-radius: 15px; padding: 16px 20px;
  display: flex; align-items: center; gap: 16px; cursor: pointer; transition: all .2s;
  text-decoration: none;
}
.my-course-row:hover { border-color: var(--gold-l); box-shadow: 0 5px 18px rgba(14,11,7,.07); }
.mcr-icon { width: 46px; height: 46px; border-radius: 13px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; }
.mcr-icon svg { width: 22px; height: 22px; color: #fff; }
.mcr-body { flex: 1; min-width: 0; }
.mcr-subject { font-size: .64rem; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; color: var(--muted); margin-bottom: 3px; }
.mcr-title { font-size: .9rem; font-weight: 500; color: var(--ink); margin-bottom: 7px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.mcr-progress { display: flex; align-items: center; gap: 10px; }
.mcr-bar  { flex: 1; height: 5px; background: var(--warm); border-radius: 3px; overflow: hidden; }
.mcr-fill { height: 100%; border-radius: 3px; background: linear-gradient(90deg, var(--gold), var(--gold-l)); transition: width .7s ease; }
.mcr-pct  { font-size: .72rem; font-weight: 700; color: var(--gold); white-space: nowrap; }
.mcr-right { flex-shrink: 0; text-align: right; }
.mcr-lessons { font-size: .74rem; color: var(--muted); margin-bottom: 5px; }
.mcr-status { font-size: .69rem; font-weight: 700; border-radius: 20px; padding: 3px 10px; }
.status-active { background: rgba(58,158,111,.1);  color: var(--green); }
.status-paused { background: rgba(201,137,60,.1);  color: var(--gold); }
.status-done   { background: rgba(58,107,158,.1);  color: var(--blue); }

/* ── UPCOMING CLASSES ───────────────────────────────────── */
.upcoming-section { animation: fadeUp .5s .49s ease both; }
.upcoming-list { display: flex; flex-direction: column; gap: 11px; }
.upcoming-item {
  background: var(--card); border: 1px solid var(--border);
  border-radius: 15px; padding: 16px 20px;
  display: flex; align-items: center; gap: 16px; transition: all .2s;
}
.upcoming-item:hover { border-color: var(--gold-l); }
.upcoming-item.live-now { border-color: rgba(184,75,47,.4); background: rgba(184,75,47,.03); }
.up-date {
  text-align: center; min-width: 46px;
  background: var(--warm); border-radius: 11px; padding: 9px 7px; border: 1px solid var(--border);
}
.up-day { font-family: 'Playfair Display', serif; font-size: 1.25rem; color: var(--ink); line-height: 1; }
.up-mon { font-size: .6rem; color: var(--muted); text-transform: uppercase; letter-spacing: .06em; }
.up-body { flex: 1; }
.up-title { font-size: .9rem; font-weight: 500; color: var(--ink); margin-bottom: 4px; }
.up-meta { font-size: .73rem; color: var(--muted); display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
.up-time { display: flex; align-items: center; gap: 4px; }
.up-time svg { width: 12px; height: 12px; }
.up-tutor-tag { display: inline-flex; align-items: center; gap: 5px; background: var(--warm); border-radius: 20px; padding: 2px 9px; font-size: .69rem; border: 1px solid var(--border); }
.up-actions { display: flex; gap: 8px; }
.btn-join {
  padding: 8px 18px; font-size: .78rem; font-weight: 600;
  color: #fff; background: linear-gradient(135deg, var(--gold), var(--rust));
  border: none; border-radius: 9px; cursor: pointer; transition: transform .15s, box-shadow .15s;
  position: relative; overflow: hidden;
}
.btn-join::before { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, rgba(255,255,255,.18), transparent 60%); pointer-events: none; }
.btn-join:hover { transform: translateY(-1px); box-shadow: 0 4px 14px rgba(184,75,47,.32); }
.btn-remind {
  padding: 8px 14px; font-size: .78rem; font-weight: 500;
  color: var(--muted); background: var(--warm);
  border: 1px solid var(--border); border-radius: 9px; cursor: pointer; transition: all .2s;
}
.btn-remind:hover { border-color: var(--gold-l); color: var(--gold); }

/* ── BENTO BOTTOM ───────────────────────────────────────── */
.bento-bottom {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
}
.streak-col { display: flex; flex-direction: column; gap: 16px; }
.panel {
  background: var(--card); border: 1px solid var(--border);
  border-radius: 18px; padding: 22px;
}
.ph { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 18px; }
.ph-left { display: flex; flex-direction: column; gap: 3px; }
.ph-tag {
  font-size: .6rem; font-weight: 700; letter-spacing: .16em; text-transform: uppercase;
  color: var(--gold); background: var(--gold-pale); border: 1px solid rgba(201,137,60,.22);
  border-radius: 20px; padding: 3px 10px; margin-bottom: 4px; display: inline-block; width: fit-content;
}
.ph-title { font-size: 1.15rem; font-weight: 700; color: var(--ink); display: flex; align-items: center; gap: 9px; }
.ph-title::before { content: ''; width: 4px; height: 19px; border-radius: 2px; background: linear-gradient(180deg, var(--gold), var(--rust)); flex-shrink: 0; }
.ph-title em { font-style: italic; color: var(--gold); }
.ph-link {
  font-size: .76rem; font-weight: 500; color: var(--gold);
  text-decoration: none; border-bottom: 1px solid rgba(201,137,60,.35);
  transition: color .18s; padding-bottom: 1px; white-space: nowrap; margin-top: 4px;
}
.ph-link:hover { color: var(--rust); }

/* Tasks */
.task-list { display: flex; flex-direction: column; gap: 9px; }
.task {
  display: flex; align-items: center; gap: 12px;
  padding: 12px 14px; background: var(--cream); border: 1px solid var(--border);
  border-radius: 12px; cursor: pointer; transition: all .18s;
}
.task:hover { border-color: rgba(201,137,60,.3); background: var(--warm); }
.task-cb { width: 20px; height: 20px; border-radius: 6px; border: 2px solid var(--border); flex-shrink: 0; display: flex; align-items: center; justify-content: center; transition: all .18s; }
.task-cb:hover { border-color: var(--gold); }
.task-cb.done  { background: var(--green); border-color: var(--green); }
.task-cb svg   { display: none; width: 11px; height: 11px; color: #fff; }
.task-cb.done svg { display: block; }
.task-body  { flex: 1; min-width: 0; }
.task-title { font-size: .84rem; font-weight: 600; color: var(--ink); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-bottom: 3px; }
.task-sub   { display: flex; align-items: center; gap: 6px; font-size: .68rem; color: var(--muted); }
.task-dot   { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }
.task-due   { flex-shrink: 0; font-size: .65rem; font-weight: 700; border-radius: 20px; padding: 3px 9px; }
.due-today  { background: rgba(184,75,47,.12); color: var(--rust);  border: 1px solid rgba(184,75,47,.28); }
.due-soon   { background: rgba(201,137,60,.12); color: var(--gold);  border: 1px solid rgba(201,137,60,.28); }
.due-done   { background: rgba(58,158,111,.1);  color: var(--green); border: 1px solid rgba(58,158,111,.22); }

/* Grades */
.grade-list { display: flex; flex-direction: column; gap: 13px; }
.grade-row  { display: flex; align-items: center; gap: 12px; }
.grade-info { flex: 1; min-width: 0; }
.grade-name { font-size: .83rem; font-weight: 600; color: var(--ink); margin-bottom: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.grade-tchr { font-size: .67rem; color: var(--muted); }
.grade-right { flex-shrink: 0; text-align: right; min-width: 60px; }
.grade-score { font-size: .7rem; color: var(--muted); margin-bottom: 4px; }
.grade-bar   { height: 5px; background: var(--warm); border-radius: 3px; overflow: hidden; width: 80px; }
.grade-fill  { height: 100%; border-radius: 3px; transition: width .7s ease; }
.gf-A { background: linear-gradient(90deg, var(--green), #5dbf90); }
.gf-B { background: linear-gradient(90deg, var(--blue),  #5a8cbf); }
.gf-C { background: linear-gradient(90deg, var(--gold),  var(--gold-l)); }
.grade-letter {
  width: 36px; height: 36px; border-radius: 10px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center; font-size: .95rem; font-weight: 700;
}
.gl-A { background: rgba(58,158,111,.12); color: var(--green); }
.gl-B { background: rgba(58,107,158,.12); color: var(--blue);  }
.gl-C { background: rgba(201,137,60,.12); color: var(--gold);  }

/* Streak */
.streak-block { display: flex; flex-direction: column; gap: 16px; }
.streak-hero  { display: flex; align-items: center; gap: 14px; }
.streak-ico {
  width: 50px; height: 50px; border-radius: 14px; flex-shrink: 0;
  background: linear-gradient(135deg, #ff8c42, #e85d04);
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 5px 16px rgba(232,93,4,.28);
}
.streak-ico svg { width: 25px; height: 25px; color: #fff; }
.streak-txt { flex: 1; }
.streak-n   { font-size: 2rem; font-weight: 700; color: var(--ink); line-height: 1; margin-bottom: 3px; }
.streak-lbl { font-size: .72rem; color: var(--muted); }
.streak-best {
  font-size: .67rem; font-weight: 700; color: var(--gold);
  background: var(--gold-pale); border: 1px solid rgba(201,137,60,.25);
  border-radius: 20px; padding: 3px 10px; white-space: nowrap; align-self: flex-start;
}
.week-row { display: flex; gap: 5px; }
.wd { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 5px; }
.wd-lbl { font-size: .58rem; color: var(--muted); text-transform: uppercase; }
.wd-dot {
  width: 26px; height: 26px; border-radius: 8px;
  background: var(--warm); border: 1.5px solid var(--border);
  display: flex; align-items: center; justify-content: center;
}
.wd-dot svg { width: 12px; height: 12px; display: none; }
.wd-dot.on  { background: linear-gradient(135deg,#ff8c42,#e85d04); border-color: transparent; box-shadow: 0 3px 9px rgba(232,93,4,.28); }
.wd-dot.on svg  { display: block; color: #fff; }
.wd-dot.now { border-color: var(--gold); background: var(--gold-pale); }
.xp-wrap { display: flex; flex-direction: column; gap: 6px; }
.xp-row  { display: flex; justify-content: space-between; font-size: .7rem; }
.xp-name { color: var(--muted); font-weight: 500; }
.xp-val  { color: var(--gold);  font-weight: 700; }
.xp-bar  { height: 8px; background: var(--warm); border-radius: 4px; overflow: hidden; border: 1px solid var(--border); }
.xp-fill { height: 100%; border-radius: 4px; background: linear-gradient(90deg, var(--gold), var(--gold-l)); transition: width .8s ease; }

/* Notices */
.notice-list { display: flex; flex-direction: column; gap: 9px; }
.notice {
  display: flex; gap: 11px; padding: 12px 13px;
  background: var(--cream); border: 1px solid var(--border);
  border-radius: 12px; cursor: pointer; transition: all .18s;
}
.notice:hover  { border-color: rgba(201,137,60,.3); background: var(--warm); }
.notice.pinned { background: var(--gold-pale); border-color: rgba(201,137,60,.3); }
.n-ico { width: 34px; height: 34px; border-radius: 9px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; }
.n-ico svg { width: 15px; height: 15px; }
.n-exam  { background: rgba(184,75,47,.12); color: var(--rust);  }
.n-event { background: rgba(58,158,111,.12); color: var(--green); }
.n-body  { flex: 1; min-width: 0; }
.n-title { font-size: .83rem; font-weight: 600; color: var(--ink); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-bottom: 3px; }
.n-desc  { font-size: .73rem; color: var(--muted); line-height: 1.4; }
.n-pin   {
  flex-shrink: 0; align-self: flex-start;
  font-size: .58rem; font-weight: 700; text-transform: uppercase; letter-spacing: .04em;
  color: var(--gold); background: rgba(201,137,60,.16);
  border: 1px solid rgba(201,137,60,.28); border-radius: 20px; padding: 2px 7px;
}

/* ── ANIMATIONS ─────────────────────────────────────────── */
@keyframes fadeUp   { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
@keyframes pulse    { 0%,100% { opacity: 1; transform: scale(1); }  50% { opacity: .5; transform: scale(.8); } }
@keyframes pulse-bg { 0%,100% { opacity: 1; } 50% { opacity: .55; } }

/* ── RESPONSIVE ─────────────────────────────────────────── */
@media (max-width: 1400px) {
  .featured-grid      { grid-template-columns: repeat(3, 1fr); }
  .tutor-grid-landing { grid-template-columns: repeat(3, 1fr); }
}
@media (max-width: 1200px) {
  .stats-row          { grid-template-columns: repeat(2, 1fr); }
  .continue-grid      { grid-template-columns: 1fr 1fr; }
  .featured-grid      { grid-template-columns: repeat(2, 1fr); }
  .tutor-grid-landing { grid-template-columns: repeat(2, 1fr); }
  .bento-bottom       { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 960px) {
  .ranking-grid { grid-template-columns: 1fr; }
  .bento-bottom { grid-template-columns: 1fr; }
}
@media (max-width: 768px) {
  .promo-banner       { flex-direction: column; align-items: flex-start; padding: 28px 24px; }
  .promo-right        { flex-direction: row; }
  .continue-grid      { grid-template-columns: 1fr; }
  .featured-grid      { grid-template-columns: 1fr; }
  .tutor-grid-landing { grid-template-columns: 1fr; }
  .cat-grid-landing   { grid-template-columns: repeat(4, 1fr); }
  .stats-row          { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 480px) {
  .cat-grid-landing { grid-template-columns: repeat(2, 1fr); }
  .promo-right      { flex-direction: column; }
}
</style>
