
# NOUNLogic Project TODO

This document outlines the development roadmap for the NOUNLogic platform, based on the strategic blueprint. It is tailored to the existing Next.js architecture.

## Phase 1: Foundation & Partnership (Years 1-2)

The primary objective of this phase is to build the core platform and onboard the initial cohort of university partners.

### Core Platform Infrastructure
- [ ] **Authentication:**
  - [x] Implement email/password login (`/login`, `/register`).
  - [ ] Implement social login (Google).
  - [ ] Set up user roles and permissions (Student, Instructor, Admin).
- [ ] **Database Schema:**
  - [x] Define initial schema for Users and Profiles (`/src/types/database.ts`).
  - [ ] Define schema for Courses, Modules, and Lessons.
  - [ ] Define schema for Enrollments and User Progress.
- [ ] **Institutional Management (Admin Dashboard V1):**
  - [ ] Create a new route `/admin` for the admin dashboard.
  - [ ] Build UI for managing users (create, update, assign roles).
  - [ ] Develop functionality for creating and managing institutional portals (branding, user cohorts).
- [ ] **API Development:**
  - [ ] Develop API routes (`/src/app/api/...`) for all core functionalities.
  - [ ] Secure API routes based on user roles.

### Instructor/Creator Experience (The "Studio" V1)
- [ ] **Course Authoring Environment:**
  - [ ] Create a new route `/studio` for the instructor environment.
  - [ ] Design a modular, drag-and-drop interface for structuring courses (weeks, topics).
  - [ ] Implement a Rich Content Editor for creating lesson content (text, images, embeds).
- [ ] **Assessment Tools (Basic):**
  - [ ] Develop functionality to create and manage multiple-choice quizzes.
  - [ ] Implement a basic gradebook to track quiz scores.
- [ ] **Course Management:**
  - [ ] Build UI for instructors to create, update, and publish courses.

### Learner Experience (The "Student Portal" V1)
- [ ] **Course Enrollment & Access:**
  - [ ] Implement logic for students to enroll in courses.
  - [ ] Develop the course-taking interface (`/courses/[courseId]/lessons/[lessonId]`).
- [ ] **Learning Environment:**
  - [ ] Implement a clean, distraction-free UI for consuming lesson content.
  - [ ] Integrate a video player for lectures.
- [ ] **Dashboard V1:**
  - [ ] Enhance the existing dashboard (`/dashboard`) to show enrolled courses and progress.

## Phase 2: Marketplace Expansion & Brand Building (Years 3-4)

This phase focuses on launching the D2C marketplace and building the NOUNLogic brand.

### D2C Marketplace Features
- [ ] **Public Course Catalog:**
  - [ ] Create a public-facing, SEO-optimized course catalog page.
  - [ ] Implement robust search and filtering (by subject, institution, skill).
- [ ] **Monetization:**
  - [ ] Integrate a payment gateway (e.g., Stripe, Paystack).
  - [ ] Implement "Freemium" model (free audit, paid certificate).
  - [ ] Implement one-time payments for courses.
  - [ ] Develop a subscription model ("NOUNLogic Plus").
- [ ] **E-commerce Backend:**
  - [ ] Build admin tools for managing course prices, subscriptions, and revenue sharing.

### Learner Experience Enhancements
- [ ] **Advanced Assessments:**
  - [ ] Add support for peer-reviewed assignments.
  - [ ] Add support for long-form essays and file uploads.
- [ ] **Community & Collaboration:**
  - [ ] Implement discussion forums for each course.
  - [ ] Add direct messaging between learners and instructors.
- [ ] **Career Services:**
  - [ ] Develop user profiles into shareable ePortfolios.
  - [ ] Integrate a job board and skills-matching tools.
- [ ] **Mobile App:**
  - [ ] Plan and develop native iOS and Android applications with offline capabilities.

### Instructor/Creator Experience Enhancements
- [ ] **Advanced Grading:**
  - [ ] Build a "SpeedGrader"-style interface for efficient grading and feedback.
  - [ ] Enhance the gradebook with customizable weighting and data export.
- [ ] **Instructor Analytics:**
  - [ ] Develop a real-time analytics dashboard for instructors to track student engagement and performance.

## Phase 3: Accreditation & Global Scale (Year 5+)

This phase focuses on seeking accreditation and scaling the platform globally.

### AI & Web3 Integration
- [ ] **AI-Powered Pedagogy:**
  - [ ] Develop and integrate a personalized learning path recommendation engine.
  - [ ] Build the "NOUNLogic Coach" - an AI tutor trained on course content.
  - [ ] Implement AI-assisted grading and feedback tools.
  - [ ] Integrate an AI-powered academic integrity suite (plagiarism and AI-writing detection).
- [ ] **Web3 Infrastructure:**
  - [ ] Implement a system for minting verifiable digital credentials (NFTs/SBTs).
  - [ ] Develop a secure digital wallet for learners to store and manage their credentials (Decentralized Identity).
  - [ ] Create a token-based economy ("Logic Tokens") to gamify learning and reward engagement.

### Platform Scalability & Compliance
- [ ] **Accreditation Data Reporting:**
  - [ ] Build tools to generate comprehensive reports on student outcomes and program quality for NUC accreditation.
- [ ] **Global Expansion:**
  - [ ] Add support for multiple currencies and languages.
  - [ ] Ensure compliance with international data privacy regulations (e.g., GDPR).
- [ ] **System Optimization:**
  - [ ] Conduct performance audits and optimize database queries for large-scale usage.
  - [ ] Enhance security measures, including multi-factor authentication.
