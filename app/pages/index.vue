<template>
  <div>
    <!-- ══ NAVIGATION ══════════════════════════════════ -->
    <nav class="nav" :class="{ scrolled: isScrolled }" id="navbar">
      <NuxtLink to="/" class="nav-brand">
        <div class="nav-brand-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
          </svg>
        </div>
        <span class="nav-brand-name">LearnForge</span>
      </NuxtLink>

      <div class="nav-links">
        <a href="#courses" class="nav-link">Most Popular</a>
        <a href="#tutors" class="nav-link">Expert Tutors</a>
        <a href="#categories" class="nav-link">Explore</a>
        <a href="#pricing" class="nav-link">Pricing</a>
        <a href="#testimonials" class="nav-link">Reviews</a>
      </div>

      <div class="nav-actions">
        <NuxtLink to="/login" class="btn-nav-ghost">Sign In</NuxtLink>
        <NuxtLink to="/register" class="btn-nav-primary">Join</NuxtLink>
      </div>
    </nav>

    <!-- ══ HERO SECTION ══════════════════════════════════ -->
    <section class="hero">
      <div class="hero-content">
        <div class="hero-tag">
          Limited Time Offer — Up to 40% Off on Courses
        </div>
        <h1 class="hero-title">
          Master Every Subject,<br/><em>Excel</em> in Every Exam
        </h1>
        <p class="hero-subtitle">
          Join thousands of students achieving academic excellence with expert tutors, live classes, and courses designed specifically for Class 9 &amp; 10 Bangladeshi curriculum.
        </p>
        <div class="hero-actions">
          <NuxtLink to="/courses" class="btn-hero-primary">
            Browse All Courses
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:18px;height:18px">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </NuxtLink>
          <button class="btn-hero-ghost">Watch Demo</button>
        </div>

        <div class="hero-stats">
          <div class="hero-stat">
            <div class="hero-stat-num">15,000+</div>
            <div class="hero-stat-label">Active Students</div>
          </div>
          <div class="hero-stat">
            <div class="hero-stat-num">120+</div>
            <div class="hero-stat-label">Expert Tutors</div>
          </div>
          <div class="hero-stat">
            <div class="hero-stat-num">98%</div>
            <div class="hero-stat-label">Pass Rate</div>
          </div>
          <div class="hero-stat">
            <div class="hero-stat-num">4.9/5</div>
            <div class="hero-stat-label">Student Rating</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ══ SOCIAL PROOF ══════════════════════════════════ -->
    <section class="social-proof">
      <div class="sp-content">
        <div class="sp-item">
          <div class="sp-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
          </div>
          <div class="sp-text"><span>4.9/5</span> Average Rating</div>
        </div>
        <div class="sp-item">
          <div class="sp-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
          </div>
          <div class="sp-text"><span>15,000+</span> Students Enrolled</div>
        </div>
        <div class="sp-item">
          <div class="sp-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
          </div>
          <div class="sp-text"><span>98%</span> Success Rate</div>
        </div>
        <div class="sp-item">
          <div class="sp-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 6v6l4 2"/>
            </svg>
          </div>
          <div class="sp-text"><span>24/7</span> Learning Support</div>
        </div>
      </div>
    </section>

    <!-- ══ MAIN CONTENT ══════════════════════════════════ -->
    <div class="container">

      <!-- ── FEATURED COURSES ── -->
      <section class="section" id="courses">
        <div class="sec-header">
          <div class="sec-tag">Most Popular</div>
          <h2 class="sec-title">Featured Courses to <em>Accelerate</em> Your Learning</h2>
          <p class="sec-subtitle">Handpicked courses trusted by thousands of students to ace their exams and build strong foundations.</p>
        </div>

        <div class="featured-grid">

          <div class="featured-card">
            <div class="fc-badge">Trending</div>
            <div class="fc-thumb" style="background-image:linear-gradient(135deg,rgba(26,58,92,0.7),rgba(45,90,135,0.7)),url('https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&h=400&fit=crop')">
              <div class="fc-thumb-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 2v20M2 12h20"/>
                </svg>
              </div>
            </div>
            <div class="fc-body">
              <div class="fc-subject">Mathematics · Class 9</div>
              <div class="fc-title">Complete Math Mastery — Algebra to Calculus</div>
              <div class="fc-desc">Master every Math concept with 42 lessons covering Algebra, Geometry, and Calculus fundamentals.</div>
              <div class="fc-meta">
                <span class="fc-tag">42 lessons</span>
                <span class="fc-tag">Live classes</span>
                <div class="fc-rating">
                  <span class="star">★</span>
                  <span>4.9 (312 reviews)</span>
                </div>
              </div>
              <div class="fc-footer">
                <div class="fc-students">👥 312 enrolled</div>
                <div class="fc-pricing-options">
                  <div class="fc-price-option">
                    <div class="fc-price-label">Monthly</div>
                    <div class="fc-price">৳ 250<span class="old">৳350</span></div>
                    <div class="fc-price-note">per month × 4</div>
                  </div>
                  <div class="fc-price-option popular">
                    <div class="fc-price-label">One-Time</div>
                    <div class="fc-price">৳ 850<span class="save">Save ৳150</span></div>
                    <div class="fc-price-note">full access</div>
                  </div>
                </div>
                <button class="btn-fc-enroll">Enroll Now →</button>
              </div>
            </div>
          </div>

          <div class="featured-card">
            <div class="fc-badge">Trending</div>
            <div class="fc-thumb" style="background-image:linear-gradient(135deg,rgba(58,26,14,0.7),rgba(122,53,32,0.7)),url('https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=600&h=400&fit=crop')">
              <div class="fc-thumb-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="3"/>
                  <path d="M12 1v4M12 19v4"/>
                </svg>
              </div>
            </div>
            <div class="fc-body">
              <div class="fc-subject">Physics · Class 9–10</div>
              <div class="fc-title">Physics Foundations — Motion to Energy</div>
              <div class="fc-desc">Understand complex Physics concepts with practical examples and interactive live sessions.</div>
              <div class="fc-meta">
                <span class="fc-tag">36 lessons</span>
                <span class="fc-tag">Experiments</span>
                <div class="fc-rating">
                  <span class="star">★</span>
                  <span>4.8 (248 reviews)</span>
                </div>
              </div>
              <div class="fc-footer">
                <div class="fc-students">👥 248 enrolled</div>
                <div class="fc-pricing-options">
                  <div class="fc-price-option">
                    <div class="fc-price-label">Monthly</div>
                    <div class="fc-price">৳ 220<span class="old">৳300</span></div>
                    <div class="fc-price-note">per month × 4</div>
                  </div>
                  <div class="fc-price-option popular">
                    <div class="fc-price-label">One-Time</div>
                    <div class="fc-price">৳ 750<span class="save">Save ৳130</span></div>
                    <div class="fc-price-note">full access</div>
                  </div>
                </div>
                <button class="btn-fc-enroll">Enroll Now →</button>
              </div>
            </div>
          </div>

          <div class="featured-card">
            <div class="fc-thumb" style="background-image:linear-gradient(135deg,rgba(14,42,54,0.7),rgba(26,106,122,0.7)),url('https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?w=600&h=400&fit=crop')">
              <div class="fc-thumb-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M9 3H7l-4 8 4 9h10l4-9-4-8h-2"/>
                </svg>
              </div>
            </div>
            <div class="fc-body">
              <div class="fc-subject">Chemistry · Class 9</div>
              <div class="fc-title">Chemistry Complete — Structure to Reactions</div>
              <div class="fc-desc">Explore atomic structure, chemical bonding, and reactions with visual demonstrations.</div>
              <div class="fc-meta">
                <span class="fc-tag">30 lessons</span>
                <span class="fc-tag">Lab demos</span>
                <div class="fc-rating">
                  <span class="star">★</span>
                  <span>4.7 (210 reviews)</span>
                </div>
              </div>
              <div class="fc-footer">
                <div class="fc-students">👥 210 enrolled</div>
                <div class="fc-pricing-options">
                  <div class="fc-price-option">
                    <div class="fc-price-label">Monthly</div>
                    <div class="fc-price">৳ 200<span class="old">৳270</span></div>
                    <div class="fc-price-note">per month × 4</div>
                  </div>
                  <div class="fc-price-option popular">
                    <div class="fc-price-label">One-Time</div>
                    <div class="fc-price">৳ 680<span class="save">Save ৳100</span></div>
                    <div class="fc-price-note">full access</div>
                  </div>
                </div>
                <button class="btn-fc-enroll">Enroll Now →</button>
              </div>
            </div>
          </div>

          <div class="featured-card">
            <div class="fc-badge">Trending</div>
            <div class="fc-thumb" style="background-image:linear-gradient(135deg,rgba(220,100,150,0.7),rgba(236,130,170,0.7)),url('https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?w=600&h=400&fit=crop')">
              <div class="fc-thumb-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
            </div>
            <div class="fc-body">
              <div class="fc-subject">Biology · Class 9–10</div>
              <div class="fc-title">Biology Essentials — Cell to Ecosystem</div>
              <div class="fc-desc">Discover life sciences with detailed lessons on cell biology, genetics, and ecology.</div>
              <div class="fc-meta">
                <span class="fc-tag">28 lessons</span>
                <span class="fc-tag">Diagrams</span>
                <div class="fc-rating">
                  <span class="star">★</span>
                  <span>4.8 (189 reviews)</span>
                </div>
              </div>
              <div class="fc-footer">
                <div class="fc-students">👥 189 enrolled</div>
                <div class="fc-pricing-options">
                  <div class="fc-price-option">
                    <div class="fc-price-label">Monthly</div>
                    <div class="fc-price">৳ 210<span class="old">৳280</span></div>
                    <div class="fc-price-note">per month × 4</div>
                  </div>
                  <div class="fc-price-option popular">
                    <div class="fc-price-label">One-Time</div>
                    <div class="fc-price">৳ 720<span class="save">Save ৳120</span></div>
                    <div class="fc-price-note">full access</div>
                  </div>
                </div>
                <button class="btn-fc-enroll">Enroll Now →</button>
              </div>
            </div>
          </div>

        </div>
      </section>

      <!-- ── FEATURED TUTORS ── -->
      <section class="section" id="tutors">
        <div class="sec-header">
          <div class="sec-tag">Expert Tutors</div>
          <h2 class="sec-title">Learn from <em>Verified</em> Expert Tutors</h2>
          <p class="sec-subtitle">Choose from our highly qualified tutors with proven track records of student success.</p>
        </div>

        <div class="tutor-grid">

          <!-- Tutor Card 1 -->
          <div class="tutor-card">
            <div class="tc-cover" style="background-image:linear-gradient(135deg,rgba(26,58,92,0.85),rgba(45,90,135,0.85)),url('https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?w=600&h=200&fit=crop')">
              <div class="tc-verified">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                Verified
              </div>
            </div>
            <div class="tc-header">
              <div class="tc-avatar-wrap">
                <img src="https://i.pravatar.cc/180?img=12" alt="Abdul Rahman" class="tc-avatar"/>
                <div class="tc-online"></div>
              </div>
              <div class="tc-name">Abdul Rahman</div>
              <div class="tc-title">M.Sc in Mathematics · 8 Years Experience</div>
              <div class="tc-rating-wrap">
                <div class="tc-stars">
                  <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                </div>
                <span class="tc-rating-text"><strong>4.9</strong> (156 reviews)</span>
              </div>
            </div>
            <div class="tc-body">
              <div class="tc-subjects">
                <div class="tc-subjects-label">Teaches</div>
                <div class="tc-subject-tags">
                  <span class="tc-subject-tag">Mathematics</span>
                  <span class="tc-subject-tag">Algebra</span>
                  <span class="tc-subject-tag">Calculus</span>
                </div>
              </div>
              <div class="tc-stats">
                <div class="tc-stat">
                  <div class="tc-stat-num">280+</div>
                  <div class="tc-stat-label">Students</div>
                </div>
                <div class="tc-stat">
                  <div class="tc-stat-num">98%</div>
                  <div class="tc-stat-label">Success Rate</div>
                </div>
              </div>
              <div class="tc-info-row">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                <span><strong>Class 9–10</strong> &amp; HSC</span>
              </div>
              <div class="tc-info-row">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
                <span>One-on-one &amp; Group sessions</span>
              </div>
              <div class="tc-info-row">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
                <span>Evening &amp; Weekend available</span>
              </div>
              <div class="tc-footer">
                <div class="tc-price-row">
                  <span class="tc-price-label">Starting from</span>
                  <div>
                    <span class="tc-price">৳1,200</span>
                    <span class="tc-price-per">/month</span>
                  </div>
                </div>
                <button class="btn-tc-book">Book This Tutor →</button>
                <div class="tc-availability">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  Available for new students
                </div>
              </div>
            </div>
          </div>

          <!-- Tutor Card 2 -->
          <div class="tutor-card">
            <div class="tc-cover" style="background-image:linear-gradient(135deg,rgba(122,53,32,0.85),rgba(184,75,47,0.85)),url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=200&fit=crop')">
              <div class="tc-verified">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                Verified
              </div>
            </div>
            <div class="tc-header">
              <div class="tc-avatar-wrap">
                <img src="https://i.pravatar.cc/180?img=47" alt="Fatima Noor" class="tc-avatar"/>
                <div class="tc-online"></div>
              </div>
              <div class="tc-name">Fatima Noor</div>
              <div class="tc-title">M.Sc in Physics · 6 Years Experience</div>
              <div class="tc-rating-wrap">
                <div class="tc-stars">
                  <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                </div>
                <span class="tc-rating-text"><strong>4.8</strong> (124 reviews)</span>
              </div>
            </div>
            <div class="tc-body">
              <div class="tc-subjects">
                <div class="tc-subjects-label">Teaches</div>
                <div class="tc-subject-tags">
                  <span class="tc-subject-tag">Physics</span>
                  <span class="tc-subject-tag">Chemistry</span>
                  <span class="tc-subject-tag">Science</span>
                </div>
              </div>
              <div class="tc-stats">
                <div class="tc-stat">
                  <div class="tc-stat-num">195+</div>
                  <div class="tc-stat-label">Students</div>
                </div>
                <div class="tc-stat">
                  <div class="tc-stat-num">96%</div>
                  <div class="tc-stat-label">Success Rate</div>
                </div>
              </div>
              <div class="tc-info-row">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                <span><strong>Class 8–10</strong> &amp; O-Level</span>
              </div>
              <div class="tc-info-row">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
                <span>One-on-one sessions only</span>
              </div>
              <div class="tc-info-row">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
                <span>Flexible timing</span>
              </div>
              <div class="tc-footer">
                <div class="tc-price-row">
                  <span class="tc-price-label">Starting from</span>
                  <div>
                    <span class="tc-price">৳1,500</span>
                    <span class="tc-price-per">/month</span>
                  </div>
                </div>
                <button class="btn-tc-book">Book This Tutor →</button>
                <div class="tc-availability limited">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                  Limited slots available
                </div>
              </div>
            </div>
          </div>

          <!-- Tutor Card 3 -->
          <div class="tutor-card">
            <div class="tc-cover" style="background-image:linear-gradient(135deg,rgba(122,92,191,0.85),rgba(160,122,208,0.85)),url('https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&h=200&fit=crop')">
              <div class="tc-verified">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                Verified
              </div>
            </div>
            <div class="tc-header">
              <div class="tc-avatar-wrap">
                <img src="https://i.pravatar.cc/180?img=33" alt="Karim Ahmed" class="tc-avatar"/>
                <div class="tc-online"></div>
              </div>
              <div class="tc-name">Karim Ahmed</div>
              <div class="tc-title">B.A in English Literature · 5 Years Experience</div>
              <div class="tc-rating-wrap">
                <div class="tc-stars">
                  <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                </div>
                <span class="tc-rating-text"><strong>5.0</strong> (89 reviews)</span>
              </div>
            </div>
            <div class="tc-body">
              <div class="tc-subjects">
                <div class="tc-subjects-label">Teaches</div>
                <div class="tc-subject-tags">
                  <span class="tc-subject-tag">English</span>
                  <span class="tc-subject-tag">Bangla</span>
                </div>
              </div>
              <div class="tc-stats">
                <div class="tc-stat">
                  <div class="tc-stat-num">145+</div>
                  <div class="tc-stat-label">Students</div>
                </div>
                <div class="tc-stat">
                  <div class="tc-stat-num">99%</div>
                  <div class="tc-stat-label">Success Rate</div>
                </div>
              </div>
              <div class="tc-info-row">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                <span><strong>Class 6–12</strong> All Boards</span>
              </div>
              <div class="tc-info-row">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
                <span>One-on-one &amp; Group sessions</span>
              </div>
              <div class="tc-info-row">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
                <span>Morning &amp; Evening slots</span>
              </div>
              <div class="tc-footer">
                <div class="tc-price-row">
                  <span class="tc-price-label">Starting from</span>
                  <div>
                    <span class="tc-price">৳900</span>
                    <span class="tc-price-per">/month</span>
                  </div>
                </div>
                <button class="btn-tc-book">Book This Tutor →</button>
                <div class="tc-availability">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  Available for new students
                </div>
              </div>
            </div>
          </div>

          <!-- Tutor Card 4 -->
          <div class="tutor-card">
            <div class="tc-cover" style="background-image:linear-gradient(135deg,rgba(58,158,111,0.85),rgba(92,191,138,0.85)),url('https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&h=200&fit=crop')">
              <div class="tc-verified">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                Verified
              </div>
            </div>
            <div class="tc-header">
              <div class="tc-avatar-wrap">
                <img src="https://i.pravatar.cc/180?img=28" alt="Nasrin Sultana" class="tc-avatar"/>
                <div class="tc-online"></div>
              </div>
              <div class="tc-name">Nasrin Sultana</div>
              <div class="tc-title">M.Sc in Chemistry · 7 Years Experience</div>
              <div class="tc-rating-wrap">
                <div class="tc-stars">
                  <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                </div>
                <span class="tc-rating-text"><strong>4.9</strong> (142 reviews)</span>
              </div>
            </div>
            <div class="tc-body">
              <div class="tc-subjects">
                <div class="tc-subjects-label">Teaches</div>
                <div class="tc-subject-tags">
                  <span class="tc-subject-tag">Chemistry</span>
                  <span class="tc-subject-tag">Biology</span>
                  <span class="tc-subject-tag">Science</span>
                </div>
              </div>
              <div class="tc-stats">
                <div class="tc-stat">
                  <div class="tc-stat-num">220+</div>
                  <div class="tc-stat-label">Students</div>
                </div>
                <div class="tc-stat">
                  <div class="tc-stat-num">97%</div>
                  <div class="tc-stat-label">Success Rate</div>
                </div>
              </div>
              <div class="tc-info-row">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                <span><strong>Class 9–10</strong> &amp; SSC</span>
              </div>
              <div class="tc-info-row">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
                <span>One-on-one &amp; Small groups</span>
              </div>
              <div class="tc-info-row">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
                <span>Afternoon &amp; Evening available</span>
              </div>
              <div class="tc-footer">
                <div class="tc-price-row">
                  <span class="tc-price-label">Starting from</span>
                  <div>
                    <span class="tc-price">৳1,100</span>
                    <span class="tc-price-per">/month</span>
                  </div>
                </div>
                <button class="btn-tc-book">Book This Tutor →</button>
                <div class="tc-availability">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  Available for new students
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      <!-- ── CATEGORIES ── -->
      <section class="section" id="categories">
        <div class="sec-header">
          <div class="sec-tag">Explore</div>
          <h2 class="sec-title">Learn Any Subject, <em>Anytime</em></h2>
          <p class="sec-subtitle">Browse courses across all major subjects aligned with the Bangladeshi curriculum.</p>
        </div>

        <div class="cat-grid">

          <div class="cat-item">
            <div class="cat-icon" style="background:rgba(58,107,158,.12)">
              <svg viewBox="0 0 24 24" fill="none" stroke="#3a6b9e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 2v20M2 12h20"/>
              </svg>
            </div>
            <div class="cat-name">Mathematics</div>
            <div class="cat-count">24 courses</div>
          </div>

          <div class="cat-item">
            <div class="cat-icon" style="background:rgba(184,75,47,.1)">
              <svg viewBox="0 0 24 24" fill="none" stroke="#b84b2f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="3"/>
                <path d="M12 1v4M12 19v4"/>
              </svg>
            </div>
            <div class="cat-name">Physics</div>
            <div class="cat-count">18 courses</div>
          </div>

          <div class="cat-item">
            <div class="cat-icon" style="background:rgba(58,158,111,.1)">
              <svg viewBox="0 0 24 24" fill="none" stroke="#3a9e6f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M9 3H7l-4 8 4 9h10l4-9-4-8h-2"/>
              </svg>
            </div>
            <div class="cat-name">Chemistry</div>
            <div class="cat-count">15 courses</div>
          </div>

          <div class="cat-item">
            <div class="cat-icon" style="background:rgba(220,100,150,.1)">
              <svg viewBox="0 0 24 24" fill="none" stroke="#dc6496" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <div class="cat-name">Biology</div>
            <div class="cat-count">14 courses</div>
          </div>

          <div class="cat-item">
            <div class="cat-icon" style="background:rgba(122,92,191,.1)">
              <svg viewBox="0 0 24 24" fill="none" stroke="#7a5cbf" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 7h16M4 12h16M4 17h10"/>
              </svg>
            </div>
            <div class="cat-name">English</div>
            <div class="cat-count">20 courses</div>
          </div>

          <div class="cat-item">
            <div class="cat-icon" style="background:rgba(201,137,60,.1)">
              <svg viewBox="0 0 24 24" fill="none" stroke="#c9893c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 6v6l4 2"/>
              </svg>
            </div>
            <div class="cat-name">History</div>
            <div class="cat-count">11 courses</div>
          </div>

          <div class="cat-item">
            <div class="cat-icon" style="background:rgba(58,158,180,.1)">
              <svg viewBox="0 0 24 24" fill="none" stroke="#3a9eb4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="16 18 22 12 16 6"/>
                <polyline points="8 6 2 12 8 18"/>
              </svg>
            </div>
            <div class="cat-name">ICT</div>
            <div class="cat-count">9 courses</div>
          </div>

          <div class="cat-item">
            <div class="cat-icon" style="background:rgba(144,180,58,.1)">
              <svg viewBox="0 0 24 24" fill="none" stroke="#90b43a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10z"/>
              </svg>
            </div>
            <div class="cat-name">Geography</div>
            <div class="cat-count">8 courses</div>
          </div>

        </div>
      </section>

    </div>

    <!-- ── TESTIMONIALS ── -->
    <section class="testimonials" id="testimonials">
      <div class="sec-header">
        <div class="sec-tag">Success Stories</div>
        <h2 class="sec-title">What Our <em>Students</em> Say</h2>
        <p class="sec-subtitle">Real results from real students who transformed their academic performance with LearnForge.</p>
      </div>

      <div class="testimonial-grid">

        <div class="test-card">
          <div class="test-rating">
            <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
          </div>
          <p class="test-text">
            "Mr. Rahman's Math course completely changed how I understand Algebra. I went from struggling with basics to scoring 95% in my final exam!"
          </p>
          <div class="test-author">
            <div class="test-avatar" style="background:linear-gradient(135deg,#3a6b9e,#5a8cbf)">S</div>
            <div class="test-info">
              <div class="test-name">Sadia Akter</div>
              <div class="test-role">Class 9 · Dhaka</div>
            </div>
          </div>
        </div>

        <div class="test-card">
          <div class="test-rating">
            <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
          </div>
          <p class="test-text">
            "The live classes are amazing! Sir Karim explains Physics so clearly with real-life examples. I actually enjoy studying now."
          </p>
          <div class="test-author">
            <div class="test-avatar" style="background:linear-gradient(135deg,#b84b2f,#e07050)">K</div>
            <div class="test-info">
              <div class="test-name">Kamal Hossain</div>
              <div class="test-role">Class 10 · Chittagong</div>
            </div>
          </div>
        </div>

        <div class="test-card">
          <div class="test-rating">
            <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
          </div>
          <p class="test-text">
            "Best investment in my education! The courses are well-structured, tutors are supportive, and I can learn at my own pace."
          </p>
          <div class="test-author">
            <div class="test-avatar" style="background:linear-gradient(135deg,#3a9e6f,#5dbf90)">F</div>
            <div class="test-info">
              <div class="test-name">Fatima Rahman</div>
              <div class="test-role">Class 9 · Sylhet</div>
            </div>
          </div>
        </div>

      </div>
    </section>

    <div class="container">

      <!-- ── PRICING BANNER ── -->
      <section class="pricing-banner" id="pricing">
        <div class="pb-content">
          <div class="pb-tag">Flexible Payment Options</div>
          <h2 class="pb-title">Choose <em>Your Payment</em> Plan for Any Course</h2>
          <p class="pb-subtitle">
            Select monthly installments or save more with one-time payment. Every course includes live tutor sessions, assignments, certificates, and lifetime access.
          </p>
          <div class="pb-features">
            <div class="pb-feature">Live interactive classes</div>
            <div class="pb-feature">Expert tutor support</div>
            <div class="pb-feature">Progress tracking</div>
            <div class="pb-feature">Assignments &amp; tests</div>
            <div class="pb-feature">Certificate on completion</div>
            <div class="pb-feature">Lifetime course access</div>
          </div>
        </div>
        <div class="pb-right">
          <div class="pb-price-sub" style="margin-bottom:16px;color:rgba(250,246,239,.7)">Example: Math Mastery Course</div>
          <div style="display:flex;flex-direction:column;gap:12px;width:100%;margin-bottom:20px">
            <div style="background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.15);border-radius:12px;padding:14px">
              <div style="font-size:.72rem;color:rgba(250,246,239,.5);margin-bottom:4px;text-transform:uppercase;letter-spacing:.06em">Monthly Plan</div>
              <div style="font-family:'Playfair Display',serif;font-size:1.6rem;color:var(--cream)">৳ 250 <span style="font-size:.9rem;color:rgba(250,246,239,.5)">× 4 months</span></div>
              <div style="font-size:.7rem;color:rgba(250,246,239,.5);margin-top:2px">Total: ৳1,000</div>
            </div>
            <div style="background:rgba(201,137,60,.2);border:2px solid rgba(201,137,60,.4);border-radius:12px;padding:14px;position:relative">
              <div style="position:absolute;top:-8px;right:10px;background:var(--green);color:#fff;font-size:.6rem;font-weight:700;padding:3px 8px;border-radius:10px">SAVE 15%</div>
              <div style="font-size:.72rem;color:var(--gold-light);margin-bottom:4px;text-transform:uppercase;letter-spacing:.06em">One-Time Payment</div>
              <div style="font-family:'Playfair Display',serif;font-size:1.8rem;color:var(--cream)">৳ 850</div>
              <div style="font-size:.7rem;color:var(--gold-light);margin-top:2px;font-weight:600">Save ৳150 · Lifetime access</div>
            </div>
          </div>
          <NuxtLink to="/courses" class="btn-pb-cta" style="text-decoration:none;display:block">Browse All Courses →</NuxtLink>
          <p style="font-size:.74rem;color:rgba(250,246,239,.45);margin-top:12px">No hidden fees · Secure payment</p>
        </div>
      </section>

      <!-- ── FINAL CTA ── -->
      <section class="cta-section">
        <h2 class="cta-title">Ready to Transform Your Academic Journey?</h2>
        <p class="cta-subtitle">
          Join 15,000+ students who are already excelling in their studies with LearnForge. Choose your course and payment plan that works for you.
        </p>
        <div class="cta-actions">
          <NuxtLink to="/courses" class="btn-hero-primary">
            Browse All Courses
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:18px;height:18px">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </NuxtLink>
          <a href="#pricing" class="btn-hero-ghost">View Pricing</a>
        </div>
      </section>

    </div>

    <!-- ══ FOOTER ══════════════════════════════════ -->
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-grid">

          <div class="footer-brand">
            <div class="footer-logo">
              <div class="footer-logo-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                </svg>
              </div>
              <span class="footer-logo-name">LearnForge</span>
            </div>
            <p class="footer-desc">
              Empowering Bangladeshi students to excel academically through expert-led online courses and personalized learning experiences.
            </p>
            <div class="footer-social">
              <div class="social-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </div>
              <div class="social-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </div>
              <div class="social-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </div>
              <div class="social-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </div>
            </div>
          </div>

          <div class="footer-col">
            <div class="footer-col-title">Learn</div>
            <div class="footer-links">
              <NuxtLink to="/courses" class="footer-link">All Courses</NuxtLink>
              <a href="#" class="footer-link">Free Courses</a>
              <a href="#" class="footer-link">Class 9</a>
              <a href="#" class="footer-link">Class 10</a>
              <a href="#" class="footer-link">Live Classes</a>
              <a href="#" class="footer-link">Tutors</a>
            </div>
          </div>

          <div class="footer-col">
            <div class="footer-col-title">Company</div>
            <div class="footer-links">
              <a href="#" class="footer-link">About Us</a>
              <a href="#" class="footer-link">Careers</a>
              <a href="#" class="footer-link">Blog</a>
              <a href="#" class="footer-link">Press</a>
              <a href="#" class="footer-link">Contact</a>
            </div>
          </div>

          <div class="footer-col">
            <div class="footer-col-title">Support</div>
            <div class="footer-links">
              <a href="#" class="footer-link">Help Center</a>
              <a href="#" class="footer-link">FAQs</a>
              <a href="#" class="footer-link">Terms of Service</a>
              <a href="#" class="footer-link">Privacy Policy</a>
              <a href="#" class="footer-link">Refund Policy</a>
            </div>
          </div>

        </div>

        <div class="footer-bottom">
          <div class="footer-copy">© 2024 LearnForge. All rights reserved.</div>
          <div class="footer-bottom-links">
            <a href="#" class="footer-bottom-link">Terms</a>
            <a href="#" class="footer-bottom-link">Privacy</a>
            <a href="#" class="footer-bottom-link">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false })

useHead({
  title: 'LearnForge — Transform Your Learning Journey',
  link: [
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=DM+Sans:wght@300;400;500;600;700&display=swap',
    },
  ],
})

const isScrolled = ref(false)

onMounted(() => {
  window.addEventListener('scroll', () => {
    isScrolled.value = window.scrollY > 50
  })
})
</script>

<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}

:root{
  --ink:#0e0b07;
  --cream:#faf6ef;
  --warm:#f0e8d6;
  --warm2:#e8ddc8;
  --gold:#c9893c;
  --gold-light:#e8b96a;
  --gold-pale:rgba(201,137,60,.10);
  --rust:#b84b2f;
  --muted:#8a7f72;
  --border:#e0d8cc;
  --card:#ffffff;
  --green:#3a9e6f;
  --blue:#3a6b9e;
  --purple:#7a5cbf;
}

html{scroll-behavior:smooth}
body{font-family:'DM Sans',sans-serif;background:var(--cream);color:var(--ink);overflow-x:hidden}

/* ══ NAVIGATION ══════════════════════════════════ */
.nav{
  position:fixed;top:0;left:0;right:0;z-index:1000;
  background:rgba(250,246,239,.95);
  backdrop-filter:blur(14px);
  border-bottom:1px solid var(--border);
  padding:0 48px;height:72px;
  display:flex;align-items:center;justify-content:space-between;
  transition:all .3s ease;
}

.nav.scrolled{
  height:64px;background:rgba(250,246,239,.98);
  box-shadow:0 2px 16px rgba(14,11,7,.06);
}

.nav-brand{
  display:flex;align-items:center;gap:10px;text-decoration:none;
}

.nav-brand-icon{
  width:38px;height:38px;background:var(--gold);
  border-radius:10px;display:flex;align-items:center;justify-content:center;
  transition:transform .2s;
}

.nav-brand:hover .nav-brand-icon{transform:scale(1.05)}

.nav-brand-icon svg{width:20px;height:20px}

.nav-brand-name{
  font-family:'Playfair Display',serif;
  font-size:1.3rem;color:var(--ink);letter-spacing:.02em;
}

.nav-links{
  display:flex;align-items:center;gap:32px;
}

.nav-link{
  font-size:.88rem;font-weight:500;color:var(--ink);
  text-decoration:none;transition:color .2s;position:relative;
}

.nav-link:hover{color:var(--gold)}

.nav-link::after{
  content:'';position:absolute;bottom:-6px;left:0;right:0;
  height:2px;background:var(--gold);
  transform:scaleX(0);transition:transform .2s;
}

.nav-link:hover::after{transform:scaleX(1)}

.nav-actions{display:flex;align-items:center;gap:12px}

.btn-nav-ghost{
  padding:9px 18px;font-family:'DM Sans',sans-serif;font-size:.88rem;font-weight:500;
  color:var(--ink);background:transparent;
  border:1.5px solid var(--border);border-radius:10px;cursor:pointer;
  transition:all .2s;text-decoration:none;
}

.btn-nav-ghost:hover{border-color:var(--gold);color:var(--gold)}

.btn-nav-primary{
  padding:10px 22px;font-family:'DM Sans',sans-serif;font-size:.88rem;font-weight:600;
  color:#fff;background:linear-gradient(135deg,var(--gold),var(--rust));
  border:none;border-radius:10px;cursor:pointer;
  transition:transform .18s,box-shadow .18s;
  position:relative;overflow:hidden;text-decoration:none;
  display:inline-block;
}

.btn-nav-primary::before{
  content:'';position:absolute;inset:0;
  background:linear-gradient(135deg,rgba(255,255,255,.18),transparent 60%);
  pointer-events:none;
}

.btn-nav-primary:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(184,75,47,.35)}

/* ══ HERO SECTION ══════════════════════════════════ */
.hero{
  position:relative;
  background:var(--ink);
  padding:140px 48px 100px;
  overflow:hidden;
  display:flex;flex-direction:column;align-items:center;
  text-align:center;
  min-height:90vh;
  justify-content:center;
}

.hero::before{
  content:'';position:absolute;inset:0;
  background:
    radial-gradient(ellipse 60% 50% at 50% 0%,rgba(201,137,60,.28) 0%,transparent 70%),
    radial-gradient(ellipse 50% 40% at 20% 80%,rgba(184,75,47,.22) 0%,transparent 60%),
    radial-gradient(ellipse 50% 40% at 80% 80%,rgba(58,107,158,.18) 0%,transparent 60%);
  pointer-events:none;
}

.hero::after{
  content:'';position:absolute;inset:0;
  background-image:
    linear-gradient(rgba(255,255,255,.03) 1px,transparent 1px),
    linear-gradient(90deg,rgba(255,255,255,.03) 1px,transparent 1px);
  background-size:60px 60px;
  pointer-events:none;
}

.hero-content{position:relative;z-index:1;max-width:900px}

.hero-tag{
  display:inline-flex;align-items:center;gap:8px;
  font-size:.72rem;font-weight:600;letter-spacing:.16em;text-transform:uppercase;
  color:var(--gold-light);background:rgba(201,137,60,.18);
  border:1px solid rgba(201,137,60,.35);border-radius:24px;
  padding:6px 16px;margin-bottom:24px;
  animation:fadeUp .6s ease both;
}

.hero-tag::before{
  content:'';width:6px;height:6px;border-radius:50%;
  background:var(--gold-light);animation:pulse 1.5s infinite;
}

@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.6;transform:scale(.85)}}

.hero-title{
  font-family:'Playfair Display',serif;
  font-size:clamp(2.5rem,5vw,4.2rem);
  color:var(--cream);line-height:1.15;
  margin-bottom:24px;
  animation:fadeUp .6s .1s ease both;
}

.hero-title em{font-style:italic;color:var(--gold-light)}

.hero-subtitle{
  font-size:1.15rem;font-weight:300;line-height:1.6;
  color:rgba(250,246,239,.7);max-width:680px;margin:0 auto 40px;
  animation:fadeUp .6s .2s ease both;
}

.hero-actions{
  display:flex;gap:16px;align-items:center;justify-content:center;
  flex-wrap:wrap;
  animation:fadeUp .6s .3s ease both;
}

.btn-hero-primary{
  padding:16px 36px;font-family:'DM Sans',sans-serif;font-size:1rem;font-weight:600;
  color:#fff;background:linear-gradient(135deg,var(--gold),var(--rust));
  border:none;border-radius:12px;cursor:pointer;
  transition:transform .2s,box-shadow .2s;
  position:relative;overflow:hidden;
  display:inline-flex;align-items:center;gap:8px;
  text-decoration:none;
}

.btn-hero-primary::before{
  content:'';position:absolute;inset:0;
  background:linear-gradient(135deg,rgba(255,255,255,.22),transparent 60%);
  pointer-events:none;
}

.btn-hero-primary:hover{transform:translateY(-3px);box-shadow:0 12px 32px rgba(184,75,47,.4)}

.btn-hero-ghost{
  padding:16px 32px;font-family:'DM Sans',sans-serif;font-size:1rem;font-weight:500;
  color:rgba(250,246,239,.8);background:transparent;
  border:2px solid rgba(255,255,255,.25);border-radius:12px;cursor:pointer;
  transition:all .2s;
  text-decoration:none;display:inline-flex;align-items:center;
}

.btn-hero-ghost:hover{border-color:rgba(255,255,255,.6);color:var(--cream);background:rgba(255,255,255,.05)}

.hero-stats{
  display:flex;gap:48px;align-items:center;justify-content:center;
  margin-top:64px;flex-wrap:wrap;
  animation:fadeUp .6s .4s ease both;
}

.hero-stat{text-align:center}

.hero-stat-num{
  font-family:'Playfair Display',serif;
  font-size:2.2rem;color:var(--cream);line-height:1;margin-bottom:6px;
}

.hero-stat-label{font-size:.82rem;color:rgba(250,246,239,.5)}

/* ══ SOCIAL PROOF ══════════════════════════════════ */
.social-proof{
  background:var(--warm);padding:32px 48px;
  border-bottom:1px solid var(--border);
}

.sp-content{
  max-width:1400px;margin:0 auto;
  display:flex;align-items:center;justify-content:center;
  gap:64px;flex-wrap:wrap;
}

.sp-item{display:flex;align-items:center;gap:12px}

.sp-icon{
  width:42px;height:42px;border-radius:10px;
  background:rgba(201,137,60,.15);
  display:flex;align-items:center;justify-content:center;
}

.sp-icon svg{width:20px;height:20px;color:var(--gold)}

.sp-text{font-size:.88rem;font-weight:500;color:var(--ink)}

.sp-text span{color:var(--gold);font-weight:700}

/* ══ MAIN CONTENT ══════════════════════════════════ */
.container{max-width:1400px;margin:0 auto;padding:80px 48px}

.section{margin-bottom:96px}

.sec-header{text-align:center;margin-bottom:48px}

.sec-tag{
  display:inline-block;
  font-size:.7rem;font-weight:600;letter-spacing:.14em;text-transform:uppercase;
  color:var(--gold);background:var(--gold-pale);
  border:1px solid rgba(201,137,60,.25);border-radius:20px;
  padding:5px 14px;margin-bottom:14px;
}

.sec-title{
  font-family:'Playfair Display',serif;
  font-size:clamp(1.8rem,3vw,2.8rem);
  color:var(--ink);line-height:1.2;margin-bottom:16px;
}

.sec-title em{font-style:italic;color:var(--gold)}

.sec-subtitle{
  font-size:1.05rem;font-weight:300;line-height:1.6;
  color:var(--muted);max-width:680px;margin:0 auto;
}

/* ── FEATURED COURSES ── */
.featured-grid{
  display:grid;grid-template-columns:repeat(4,1fr);
  gap:16px;
}

.featured-card{
  background:var(--card);border:1px solid var(--border);
  border-radius:14px;overflow:hidden;
  transition:transform .3s,box-shadow .3s;
  cursor:pointer;position:relative;
}

.featured-card:hover{
  transform:translateY(-6px);
  box-shadow:0 16px 40px rgba(14,11,7,.1);
}

.fc-badge{
  position:absolute;top:12px;left:12px;z-index:10;
  background:var(--rust);color:#fff;font-size:.6rem;font-weight:700;
  letter-spacing:.06em;text-transform:uppercase;
  border-radius:16px;padding:4px 9px;
  display:flex;align-items:center;gap:4px;
}

.fc-badge::before{
  content:'🔥';font-size:.75rem;
}

.fc-thumb{
  height:150px;display:flex;align-items:center;justify-content:center;
  position:relative;overflow:hidden;
  background-size:cover;background-position:center;
}

.fc-thumb-icon{
  width:50px;height:50px;border-radius:14px;
  background:rgba(255,255,255,.15);
  display:flex;align-items:center;justify-content:center;
  border:2px solid rgba(255,255,255,.25);
  backdrop-filter:blur(8px);
}

.fc-thumb-icon svg{width:26px;height:26px;color:#fff}

.fc-body{padding:16px}

.fc-subject{
  font-size:.64rem;font-weight:600;letter-spacing:.1em;text-transform:uppercase;
  color:var(--muted);margin-bottom:6px;
}

.fc-title{
  font-family:'Playfair Display',serif;font-size:.95rem;
  color:var(--ink);line-height:1.25;margin-bottom:8px;min-height:44px;
}

.fc-desc{
  font-size:.76rem;line-height:1.4;color:var(--muted);
  margin-bottom:12px;min-height:36px;
}

.fc-meta{
  display:flex;align-items:center;gap:8px;margin-bottom:12px;
  flex-wrap:wrap;
}

.fc-tag{
  font-size:.62rem;font-weight:500;
  border-radius:16px;padding:3px 8px;
  background:var(--warm);color:var(--muted);border:1px solid var(--border);
}

.fc-rating{
  font-size:.72rem;color:var(--muted);
  display:flex;align-items:center;gap:3px;
}

.fc-rating .star{color:var(--gold);font-size:.8rem}

.fc-footer{
  padding-top:12px;border-top:1px solid var(--border);
}

.fc-students{
  font-size:.68rem;color:var(--muted);
  display:flex;align-items:center;gap:3px;
  margin-bottom:8px;
}

.fc-pricing-options{
  display:flex;gap:8px;align-items:stretch;
}

.fc-price-option{
  flex:1;
  background:var(--warm);
  border:1.5px solid var(--border);
  border-radius:10px;
  padding:8px;
  cursor:pointer;
  transition:all .2s;
  position:relative;
}

.fc-price-option:hover{
  border-color:var(--gold);
  background:var(--gold-pale);
  transform:translateY(-1px);
}

.fc-price-option.popular{
  border-color:var(--gold);
  background:var(--gold-pale);
}

.fc-price-option.popular::after{
  content:'Popular';
  position:absolute;top:-6px;right:6px;
  background:var(--gold);color:#fff;
  font-size:.56rem;font-weight:700;
  padding:2px 6px;border-radius:8px;
  letter-spacing:.04em;text-transform:uppercase;
}

.fc-price-label{
  font-size:.6rem;
  color:var(--muted);
  margin-bottom:3px;
  text-transform:uppercase;
  letter-spacing:.05em;
  font-weight:600;
}

.fc-price{
  font-family:'Playfair Display',serif;
  font-size:1.05rem;
  color:var(--ink);
  line-height:1;
  margin-bottom:2px;
}

.fc-price-note{
  font-size:.58rem;
  color:var(--muted);
}

.fc-price .old{
  font-size:.72rem;
  color:var(--muted);
  text-decoration:line-through;
  margin-left:3px;
}

.fc-price .save{
  font-size:.6rem;
  color:var(--green);
  font-weight:600;
  margin-left:4px;
}

.btn-fc-enroll{
  width:100%;
  padding:8px 16px;
  font-size:.76rem;
  font-weight:600;
  color:#fff;
  background:linear-gradient(135deg,var(--gold),var(--rust));
  border:none;
  border-radius:8px;
  cursor:pointer;
  transition:transform .18s,box-shadow .18s;
  position:relative;
  overflow:hidden;
  margin-top:8px;
}

.btn-fc-enroll::before{
  content:'';position:absolute;inset:0;
  background:linear-gradient(135deg,rgba(255,255,255,.2),transparent 60%);
  pointer-events:none;
}

.btn-fc-enroll:hover{transform:translateY(-2px);box-shadow:0 6px 18px rgba(184,75,47,.35)}

/* ── CATEGORIES ── */
.cat-grid{
  display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));
  gap:16px;
}

.cat-item{
  background:var(--card);border:2px solid var(--border);
  border-radius:16px;padding:28px 20px;
  display:flex;flex-direction:column;align-items:center;gap:12px;
  cursor:pointer;transition:all .25s;text-align:center;
}

.cat-item:hover{
  border-color:var(--gold);background:var(--gold-pale);
  transform:translateY(-4px);box-shadow:0 8px 24px rgba(201,137,60,.15);
}

.cat-icon{
  width:52px;height:52px;border-radius:14px;
  display:flex;align-items:center;justify-content:center;
  transition:transform .25s;
}

.cat-item:hover .cat-icon{transform:scale(1.1)}

.cat-icon svg{width:26px;height:26px}

.cat-name{font-size:.88rem;font-weight:600;color:var(--ink)}

.cat-count{font-size:.72rem;color:var(--muted)}

/* ── TUTORS ── */
.tutor-grid{
  display:grid;grid-template-columns:repeat(4,1fr);
  gap:16px;
}

.tutor-card{
  background:var(--card);border:1px solid var(--border);
  border-radius:14px;overflow:hidden;
  transition:transform .3s,box-shadow .3s;
  cursor:pointer;position:relative;
  display:flex;flex-direction:column;
}

.tutor-card:hover{
  transform:translateY(-6px);
  box-shadow:0 16px 40px rgba(14,11,7,.1);
}

.tc-cover{
  position:relative;
  height:80px;
  background-size:cover;background-position:center;
  overflow:hidden;
}

.tc-cover::after{
  content:'';position:absolute;inset:0;
  background:linear-gradient(180deg,transparent 0%,rgba(0,0,0,.3) 100%);
}

.tc-header{
  position:relative;
  background:linear-gradient(135deg,var(--warm),var(--warm2));
  padding:0 16px 16px;
  text-align:center;
}

.tc-verified{
  position:absolute;top:-70px;right:10px;z-index:10;
  background:var(--green);color:#fff;
  font-size:.56rem;font-weight:700;letter-spacing:.05em;
  text-transform:uppercase;border-radius:16px;
  padding:4px 8px;display:flex;align-items:center;gap:3px;
}

.tc-verified svg{width:9px;height:9px}

.tc-avatar-wrap{
  position:relative;display:inline-block;margin-top:-35px;margin-bottom:8px;
}

.tc-avatar{
  width:70px;height:70px;border-radius:50%;
  border:3px solid #fff;
  object-fit:cover;
  box-shadow:0 6px 18px rgba(14,11,7,.12);
}

.tc-online{
  position:absolute;bottom:3px;right:3px;
  width:14px;height:14px;border-radius:50%;
  background:var(--green);border:2px solid #fff;
}

.tc-name{
  font-family:'Playfair Display',serif;
  font-size:1.05rem;color:var(--ink);
  margin-bottom:2px;font-weight:700;
}

.tc-title{
  font-size:.68rem;color:var(--muted);
  margin-bottom:6px;font-weight:500;
}

.tc-rating-wrap{
  display:flex;align-items:center;justify-content:center;
  gap:6px;margin-bottom:0;
}

.tc-stars{
  display:flex;gap:1px;color:var(--gold);font-size:.75rem;
}

.tc-rating-text{
  font-size:.68rem;color:var(--muted);
}

.tc-rating-text strong{color:var(--ink);font-weight:600}

.tc-body{
  padding:16px;flex:1;display:flex;flex-direction:column;
}

.tc-subjects{
  margin-bottom:12px;
}

.tc-subjects-label{
  font-size:.62rem;font-weight:600;
  letter-spacing:.06em;text-transform:uppercase;
  color:var(--muted);margin-bottom:6px;
}

.tc-subject-tags{
  display:flex;flex-wrap:wrap;gap:4px;
}

.tc-subject-tag{
  font-size:.64rem;font-weight:500;
  background:var(--gold-pale);
  border:1px solid rgba(201,137,60,.25);
  color:var(--gold);border-radius:14px;
  padding:3px 8px;
}

.tc-stats{
  display:grid;grid-template-columns:1fr 1fr;
  gap:8px;margin-bottom:12px;
  padding-bottom:12px;border-bottom:1px solid var(--border);
}

.tc-stat{text-align:center}

.tc-stat-num{
  font-family:'Playfair Display',serif;
  font-size:1.1rem;color:var(--ink);
  line-height:1;margin-bottom:3px;font-weight:600;
}

.tc-stat-label{
  font-size:.6rem;color:var(--muted);
  text-transform:uppercase;letter-spacing:.05em;
}

.tc-info-row{
  display:flex;align-items:center;gap:6px;
  margin-bottom:7px;font-size:.72rem;
  color:var(--ink);
}

.tc-info-row svg{
  width:13px;height:13px;color:var(--muted);flex-shrink:0;
}

.tc-info-row strong{font-weight:600}

.tc-footer{
  margin-top:auto;padding-top:12px;
  border-top:1px solid var(--border);
}

.tc-price-row{
  display:flex;align-items:center;justify-content:space-between;
  margin-bottom:10px;
}

.tc-price-label{
  font-size:.66rem;color:var(--muted);
}

.tc-price{
  font-family:'Playfair Display',serif;
  font-size:1.35rem;color:var(--ink);
  line-height:1;font-weight:700;
}

.tc-price-per{
  font-size:.68rem;color:var(--muted);
  font-weight:400;font-family:'DM Sans',sans-serif;
}

.btn-tc-book{
  width:100%;padding:9px 16px;
  font-size:.76rem;font-weight:600;
  color:#fff;
  background:linear-gradient(135deg,var(--gold),var(--rust));
  border:none;border-radius:8px;cursor:pointer;
  transition:transform .18s,box-shadow .18s;
  position:relative;overflow:hidden;
}

.btn-tc-book::before{
  content:'';position:absolute;inset:0;
  background:linear-gradient(135deg,rgba(255,255,255,.2),transparent 60%);
  pointer-events:none;
}

.btn-tc-book:hover{
  transform:translateY(-2px);
  box-shadow:0 6px 18px rgba(184,75,47,.35);
}

.tc-availability{
  display:flex;align-items:center;gap:4px;
  font-size:.66rem;color:var(--green);
  margin-top:8px;justify-content:center;
}

.tc-availability.limited{color:var(--rust)}

.tc-availability svg{width:10px;height:10px}

/* ── TESTIMONIALS ── */
.testimonials{background:var(--warm);padding:80px 48px;margin:0 -48px 96px}

.testimonial-grid{
  max-width:1400px;margin:0 auto;
  display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));
  gap:24px;
}

.test-card{
  background:var(--card);border:1px solid var(--border);
  border-radius:16px;padding:28px;
  transition:transform .2s,box-shadow .2s;
}

.test-card:hover{transform:translateY(-4px);box-shadow:0 12px 32px rgba(14,11,7,.08)}

.test-rating{
  display:flex;gap:3px;margin-bottom:14px;
}

.test-rating span{color:var(--gold);font-size:.9rem}

.test-text{
  font-size:.92rem;line-height:1.6;color:var(--ink);
  margin-bottom:20px;font-style:italic;
}

.test-author{display:flex;align-items:center;gap:12px}

.test-avatar{
  width:44px;height:44px;border-radius:50%;
  background:linear-gradient(135deg,var(--gold),var(--rust));
  display:flex;align-items:center;justify-content:center;
  font-family:'Playfair Display',serif;font-size:1rem;color:#fff;
  border:2px solid var(--border);flex-shrink:0;
}

.test-info{flex:1}

.test-name{font-size:.88rem;font-weight:600;color:var(--ink);margin-bottom:2px}

.test-role{font-size:.74rem;color:var(--muted)}

/* ── PRICING BANNER ── */
.pricing-banner{
  position:relative;
  background:var(--ink);
  border-radius:24px;
  padding:60px 48px;
  overflow:hidden;
  display:flex;align-items:center;justify-content:space-between;
  gap:40px;
  flex-wrap:wrap;
  margin-bottom:96px;
}

.pricing-banner::before{
  content:'';position:absolute;inset:0;
  background:
    radial-gradient(ellipse 70% 80% at 100% 50%,rgba(201,137,60,.38) 0%,transparent 60%),
    radial-gradient(ellipse 60% 70% at 0% 50%,rgba(184,75,47,.28) 0%,transparent 60%);
  pointer-events:none;
}

.pricing-banner::after{
  content:'';position:absolute;inset:0;
  background-image:
    linear-gradient(rgba(255,255,255,.04) 1px,transparent 1px),
    linear-gradient(90deg,rgba(255,255,255,.04) 1px,transparent 1px);
  background-size:50px 50px;
  pointer-events:none;
}

.pb-content{position:relative;z-index:1;flex:1;min-width:300px}

.pb-tag{
  display:inline-flex;align-items:center;gap:6px;
  font-size:.7rem;font-weight:600;letter-spacing:.14em;text-transform:uppercase;
  color:var(--gold-light);background:rgba(201,137,60,.2);
  border:1px solid rgba(201,137,60,.4);border-radius:20px;
  padding:5px 14px;margin-bottom:16px;
}

.pb-tag::before{content:'⚡';font-size:.95rem}

.pb-title{
  font-family:'Playfair Display',serif;
  font-size:clamp(1.6rem,3vw,2.4rem);
  color:var(--cream);line-height:1.2;margin-bottom:12px;
}

.pb-title em{font-style:italic;color:var(--gold-light)}

.pb-subtitle{
  font-size:.95rem;font-weight:300;line-height:1.5;
  color:rgba(250,246,239,.65);margin-bottom:28px;max-width:500px;
}

.pb-features{
  display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));
  gap:12px;margin-bottom:28px;
}

.pb-feature{
  display:flex;align-items:center;gap:8px;
  font-size:.84rem;color:rgba(250,246,239,.75);
}

.pb-feature::before{
  content:'✓';
  width:22px;height:22px;border-radius:50%;
  background:rgba(58,158,111,.25);color:var(--green);
  display:flex;align-items:center;justify-content:center;
  font-weight:700;font-size:.9rem;
  flex-shrink:0;
}

.pb-right{
  position:relative;z-index:1;
  display:flex;flex-direction:column;align-items:center;
  text-align:center;
  background:rgba(255,255,255,.08);
  border:1px solid rgba(255,255,255,.15);
  border-radius:20px;padding:32px;
  backdrop-filter:blur(12px);
  min-width:280px;
}

.pb-price{
  font-family:'Playfair Display',serif;
  font-size:3rem;color:var(--cream);line-height:1;margin-bottom:6px;
}

.pb-price-sub{font-size:.82rem;color:rgba(250,246,239,.5);margin-bottom:6px}

.pb-price-save{
  font-size:.76rem;font-weight:600;
  color:var(--green);background:rgba(58,158,111,.2);
  border-radius:20px;padding:4px 12px;margin-bottom:20px;
  display:inline-block;
}

.btn-pb-cta{
  width:100%;padding:14px 28px;
  font-family:'DM Sans',sans-serif;font-size:.95rem;font-weight:600;
  color:var(--ink);background:#fff;
  border:none;border-radius:12px;cursor:pointer;
  transition:transform .2s,box-shadow .2s;
  position:relative;overflow:hidden;
}

.btn-pb-cta:hover{
  transform:translateY(-2px);
  box-shadow:0 8px 24px rgba(255,255,255,.25);
}

/* ── CTA SECTION ── */
.cta-section{
  text-align:center;
  padding:60px 48px;
  background:linear-gradient(135deg,var(--gold-pale),rgba(184,75,47,.08));
  border:2px solid var(--border);
  border-radius:24px;
  margin-bottom:48px;
}

.cta-title{
  font-family:'Playfair Display',serif;
  font-size:clamp(1.6rem,3vw,2.2rem);
  color:var(--ink);line-height:1.2;margin-bottom:16px;
}

.cta-subtitle{
  font-size:1rem;font-weight:300;line-height:1.6;
  color:var(--muted);margin-bottom:32px;max-width:600px;margin-left:auto;margin-right:auto;
}

.cta-actions{display:flex;gap:16px;justify-content:center;flex-wrap:wrap}

/* ══ FOOTER ══════════════════════════════════ */
.footer{
  background:var(--ink);color:rgba(250,246,239,.65);
  padding:64px 48px 32px;
  position:relative;overflow:hidden;
}

.footer::before{
  content:'';position:absolute;inset:0;
  background:
    radial-gradient(ellipse 50% 40% at 30% 0%,rgba(201,137,60,.15) 0%,transparent 60%);
  pointer-events:none;
}

.footer-content{
  max-width:1400px;margin:0 auto;position:relative;z-index:1;
}

.footer-grid{
  display:grid;grid-template-columns:2fr 1fr 1fr 1fr;
  gap:48px;margin-bottom:48px;
}

.footer-brand{max-width:320px}

.footer-logo{
  display:flex;align-items:center;gap:10px;margin-bottom:16px;
}

.footer-logo-icon{
  width:42px;height:42px;background:var(--gold);
  border-radius:12px;display:flex;align-items:center;justify-content:center;
}

.footer-logo-icon svg{width:22px;height:22px}

.footer-logo-name{
  font-family:'Playfair Display',serif;
  font-size:1.4rem;color:var(--cream);
}

.footer-desc{font-size:.88rem;line-height:1.6;margin-bottom:20px}

.footer-social{display:flex;gap:10px}

.social-icon{
  width:38px;height:38px;border-radius:10px;
  background:rgba(255,255,255,.08);
  border:1px solid rgba(255,255,255,.12);
  display:flex;align-items:center;justify-content:center;
  cursor:pointer;transition:all .2s;
}

.social-icon:hover{
  background:var(--gold);border-color:var(--gold);
  transform:translateY(-2px);
}

.social-icon svg{width:18px;height:18px;color:rgba(250,246,239,.7)}

.social-icon:hover svg{color:#fff}

.footer-col-title{
  font-size:.88rem;font-weight:600;color:var(--cream);
  margin-bottom:16px;letter-spacing:.04em;
}

.footer-links{display:flex;flex-direction:column;gap:10px}

.footer-link{
  font-size:.84rem;color:rgba(250,246,239,.55);
  text-decoration:none;transition:color .2s;
}

.footer-link:hover{color:var(--gold-light)}

.footer-bottom{
  padding-top:32px;border-top:1px solid rgba(255,255,255,.08);
  display:flex;justify-content:space-between;align-items:center;
  flex-wrap:wrap;gap:16px;
}

.footer-copy{font-size:.82rem;color:rgba(250,246,239,.45)}

.footer-bottom-links{display:flex;gap:24px}

.footer-bottom-link{
  font-size:.82rem;color:rgba(250,246,239,.45);
  text-decoration:none;transition:color .2s;
}

.footer-bottom-link:hover{color:var(--gold-light)}

/* ══ ANIMATIONS ══════════════════════════════════ */
@keyframes fadeUp{
  from{opacity:0;transform:translateY(24px)}
  to{opacity:1;transform:translateY(0)}
}

/* ══ RESPONSIVE ══════════════════════════════════ */
@media(max-width:1400px){
  .featured-grid{grid-template-columns:repeat(3,1fr)}
  .tutor-grid{grid-template-columns:repeat(3,1fr)}
}

@media(max-width:1024px){
  .nav{padding:0 32px}
  .hero{padding:120px 32px 80px}
  .container{padding:60px 32px}
  .featured-grid{grid-template-columns:repeat(2,1fr)}
  .tutor-grid{grid-template-columns:repeat(2,1fr)}
  .testimonials{padding:60px 32px;margin:0 -32px 60px}
  .pricing-banner{padding:48px 32px}
  .footer{padding:48px 32px 24px}
  .footer-grid{grid-template-columns:1fr 1fr;gap:32px}
}

@media(max-width:768px){
  .nav{padding:0 24px;height:64px}
  .nav-links{display:none}
  .hero{padding:100px 24px 60px;min-height:auto}
  .hero-stats{gap:32px;margin-top:48px}
  .container{padding:48px 24px}
  .sp-content{gap:32px}
  .featured-grid{grid-template-columns:1fr}
  .tutor-grid{grid-template-columns:1fr}
  .cat-grid{grid-template-columns:repeat(2,1fr)}
  .testimonials{padding:48px 24px;margin:0 -24px 48px}
  .testimonial-grid{grid-template-columns:1fr}
  .pricing-banner{flex-direction:column;padding:40px 24px}
  .pb-right{width:100%}
  .footer{padding:40px 24px 20px}
  .footer-grid{grid-template-columns:1fr;gap:28px}
  .footer-bottom{flex-direction:column;text-align:center}
}
</style>
