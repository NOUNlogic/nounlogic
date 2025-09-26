import { appwriteDatabases, DATABASE_IDS, COLLECTION_IDS, ID, Query, FEATURE_FLAGS } from './config';
import type {
  User,
  UserProfile,
  Course,
  Module,
  Lesson,
  Enrollment,
  Assessment,
  Submission,
  Institution,
  InstitutionIntegration,
  AIModel,
  AIRecommendation,
  AnalyticsEvent,
  Metric,
  ExternalIntegration,
  Wallet,
  Transaction,
  Certificate,
  NFTContract,
  Role,
  Setting,
  Cohort
} from '@/types/database';

// Core Database Services
export const coreService = {
  // Settings
  async getSettings() {
    return await appwriteDatabases.listDocuments(
      DATABASE_IDS.CORE,
      COLLECTION_IDS.SETTINGS
    );
  },

  async getSetting(key: string) {
    return await appwriteDatabases.listDocuments(
      DATABASE_IDS.CORE,
      COLLECTION_IDS.SETTINGS,
      [Query.equal('key', key)]
    );
  },

  async createSetting(key: string, value: any) {
    return await appwriteDatabases.createDocument(
      DATABASE_IDS.CORE,
      COLLECTION_IDS.SETTINGS,
      ID.unique(),
      {
        key,
        value: JSON.stringify(value)
      }
    );
  },

  // Roles
  async getRoles() {
    return await appwriteDatabases.listDocuments(
      DATABASE_IDS.CORE,
      COLLECTION_IDS.ROLES
    );
  },

  async createRole(name: string, permissions: string[]) {
    return await appwriteDatabases.createDocument(
      DATABASE_IDS.CORE,
      COLLECTION_IDS.ROLES,
      ID.unique(),
      {
        name,
        permissions: JSON.stringify(permissions)
      }
    );
  }
};

// Users Database Services
export const usersService = {
  // Users
  async getUsers() {
    return await appwriteDatabases.listDocuments(
      DATABASE_IDS.USERS,
      COLLECTION_IDS.USERS
    );
  },

  async getUserById(userId: string) {
    return await appwriteDatabases.getDocument(
      DATABASE_IDS.USERS,
      COLLECTION_IDS.USERS,
      userId
    );
  },

  async createUser(userData: Partial<User>) {
    return await appwriteDatabases.createDocument(
      DATABASE_IDS.USERS,
      COLLECTION_IDS.USERS,
      ID.unique(),
      {
        user_id: userData.user_id || ID.unique(),
        email: userData.email!,
        profile: JSON.stringify(userData.profile || {}),
        role_id: userData.role_id!,
        institution_id: userData.institution_id!,
        wallet_address: userData.wallet_address,
        roles: (userData as any).roles || []
      }
    );
  },

  async listUsers() {
    return await appwriteDatabases.listDocuments(
      DATABASE_IDS.USERS,
      COLLECTION_IDS.USERS
    );
  },

  async updateUser(userId: string, updates: any) {
    // Normalize roles if provided
    const payload = { ...updates };
    if (payload.roles && !Array.isArray(payload.roles)) {
      payload.roles = [payload.roles];
    }
    return await appwriteDatabases.updateDocument(
      DATABASE_IDS.USERS,
      COLLECTION_IDS.USERS,
      userId,
      payload
    );
  },

  async deleteUser(userId: string) {
    return await appwriteDatabases.deleteDocument(
      DATABASE_IDS.USERS,
      COLLECTION_IDS.USERS,
      userId
    );
  },

  // User Profiles
  async getUserProfile(userId: string) {
    return await appwriteDatabases.listDocuments(
      DATABASE_IDS.USERS,
      COLLECTION_IDS.USER_PROFILES,
      [Query.equal('user_id', userId)]
    );
  },

  async createUserProfile(profileData: Partial<UserProfile>) {
    return await appwriteDatabases.createDocument(
      DATABASE_IDS.USERS,
      COLLECTION_IDS.USER_PROFILES,
      ID.unique(),
      {
        user_id: profileData.user_id!,
        bio: profileData.bio || '',
        avatar_url: profileData.avatar_url || '',
        preferences: JSON.stringify(profileData.preferences || {})
      }
    );
  }
};

// Courses Database Services
export const coursesService = {
  // Courses
  async getCourses(limit = 50) {
    return await appwriteDatabases.listDocuments(
      DATABASE_IDS.COURSES,
      COLLECTION_IDS.COURSES,
      [Query.limit(limit)]
    );
  },

  async getCourseById(courseId: string) {
    return await appwriteDatabases.getDocument(
      DATABASE_IDS.COURSES,
      COLLECTION_IDS.COURSES,
      courseId
    );
  },

  async createCourse(courseData: Partial<Course>) {
    return await appwriteDatabases.createDocument(
      DATABASE_IDS.COURSES,
      COLLECTION_IDS.COURSES,
      ID.unique(),
      {
        course_id: courseData.course_id || ID.unique(),
        title: courseData.title!,
        description: courseData.description!,
        institution_id: courseData.institution_id!,
        creator_id: courseData.creator_id!,
        metadata: JSON.stringify(courseData.metadata || {}),
        nft_contract_address: courseData.nft_contract_address
      }
    );
  },

  // Modules
  async getModulesByCourse(courseId: string) {
    return await appwriteDatabases.listDocuments(
      DATABASE_IDS.COURSES,
      COLLECTION_IDS.MODULES,
      [Query.equal('course_id', courseId), Query.orderAsc('order')]
    );
  },

  async createModule(moduleData: Partial<Module>) {
    return await appwriteDatabases.createDocument(
      DATABASE_IDS.COURSES,
      COLLECTION_IDS.MODULES,
      ID.unique(),
      {
        module_id: moduleData.module_id || ID.unique(),
        course_id: moduleData.course_id!,
        title: moduleData.title!,
        order: moduleData.order || 0
      }
    );
  },

  // Lessons
  async getLessonsByModule(moduleId: string) {
    return await appwriteDatabases.listDocuments(
      DATABASE_IDS.COURSES,
      COLLECTION_IDS.LESSONS,
      [Query.equal('module_id', moduleId), Query.orderAsc('order')]
    );
  },

  async createLesson(lessonData: Partial<Lesson>) {
    return await appwriteDatabases.createDocument(
      DATABASE_IDS.COURSES,
      COLLECTION_IDS.LESSONS,
      ID.unique(),
      {
        lesson_id: lessonData.lesson_id || ID.unique(),
        module_id: lessonData.module_id!,
        title: lessonData.title!,
        content: JSON.stringify(lessonData.content || {}),
        order: lessonData.order || 0
      }
    );
  },

  // Enrollments
  async getUserEnrollments(userId: string) {
    return await appwriteDatabases.listDocuments(
      DATABASE_IDS.COURSES,
      COLLECTION_IDS.ENROLLMENTS,
      [Query.equal('user_id', userId)]
    );
  },

    async createEnrollment(enrollmentData: Partial<Enrollment>) {
    // Duplicate guard: check if user already enrolled in course
    const existing = await appwriteDatabases.listDocuments(
      DATABASE_IDS.COURSES,
      COLLECTION_IDS.ENROLLMENTS,
      [
        Query.equal('user_id', enrollmentData.user_id!),
        Query.equal('course_id', enrollmentData.course_id!)
      ]
    );
    if (existing.total > 0) {
      // Attach flag so API can convey duplication explicitly
      return { ...existing.documents[0], __existing: true } as any;
    }
    // Initialize progress scaffold
    const initialProgress = enrollmentData.progress || { completedLessons: [], lastAccessed: null };
    const created = await appwriteDatabases.createDocument(
      DATABASE_IDS.COURSES,
      COLLECTION_IDS.ENROLLMENTS,
      ID.unique(),
      {
        enrollment_id: enrollmentData.enrollment_id || ID.unique(),
        user_id: enrollmentData.user_id!,
        course_id: enrollmentData.course_id!,
        status: enrollmentData.status || 'active',
        progress: JSON.stringify(initialProgress),
        certificate_token_id: enrollmentData.certificate_token_id
      }
    );
    return { ...created, __existing: false } as any;
  }
};

// Institutions Database Services
export const institutionsService = {
  async getInstitutions() {
    return await appwriteDatabases.listDocuments(
      DATABASE_IDS.INSTITUTIONS,
      COLLECTION_IDS.INSTITUTIONS
    );
  },

  async getInstitutionById(institutionId: string) {
    return await appwriteDatabases.getDocument(
      DATABASE_IDS.INSTITUTIONS,
      COLLECTION_IDS.INSTITUTIONS,
      institutionId
    );
  },

  async updateInstitution(institutionId: string, institutionData: Partial<Institution>) {
    const { $id, $createdAt, $updatedAt, ...payload } = institutionData as any;
    return await appwriteDatabases.updateDocument(
      DATABASE_IDS.INSTITUTIONS,
      COLLECTION_IDS.INSTITUTIONS,
      institutionId,
      payload
    );
  },

  async deleteInstitution(institutionId: string) {
    return await appwriteDatabases.deleteDocument(
      DATABASE_IDS.INSTITUTIONS,
      COLLECTION_IDS.INSTITUTIONS,
      institutionId
    );
  },

  async createInstitution(institutionData: Partial<Institution>) {
    return await appwriteDatabases.createDocument(
      DATABASE_IDS.INSTITUTIONS,
      COLLECTION_IDS.INSTITUTIONS,
      ID.unique(),
      {
        institution_id: institutionData.institution_id || ID.unique(),
        name: institutionData.name!,
        type: institutionData.type!,
        metadata: JSON.stringify(institutionData.metadata || {})
      }
    );
  }
};

// Cohorts Database Services
export const cohortsService = {
  async listCohorts() {
    return await appwriteDatabases.listDocuments(
      DATABASE_IDS.INSTITUTIONS,
      COLLECTION_IDS.COHORTS
    );
  },

  async getCohortById(cohortId: string) {
    return await appwriteDatabases.getDocument(
      DATABASE_IDS.INSTITUTIONS,
      COLLECTION_IDS.COHORTS,
      cohortId
    );
  },

  async updateCohort(cohortId: string, cohortData: Partial<Cohort>) {
    const { $id, $createdAt, $updatedAt, ...payload } = cohortData as any;
    return await appwriteDatabases.updateDocument(
      DATABASE_IDS.INSTITUTIONS,
      COLLECTION_IDS.COHORTS,
      cohortId,
      payload
    );
  },

  async deleteCohort(cohortId: string) {
    return await appwriteDatabases.deleteDocument(
      DATABASE_IDS.INSTITUTIONS,
      COLLECTION_IDS.COHORTS,
      cohortId
    );
  },

  async createCohort(cohortData: Partial<Cohort>) {
    return await appwriteDatabases.createDocument(
      DATABASE_IDS.INSTITUTIONS,
      COLLECTION_IDS.COHORTS,
      ID.unique(),
      {
        name: cohortData.name!,
        institution_id: cohortData.institution_id!,
        user_ids: JSON.stringify(cohortData.user_ids || []),
        course_ids: JSON.stringify(cohortData.course_ids || [])
      }
    );
  }
};

// AI Database Services (if enabled)
export const aiService = {
  async getRecommendations(userId: string) {
    return await appwriteDatabases.listDocuments(
      DATABASE_IDS.AI,
      COLLECTION_IDS.AI_RECOMMENDATIONS,
      [Query.equal('user_id', userId)]
    );
  },

  async createRecommendation(recommendationData: Partial<AIRecommendation>) {
    return await appwriteDatabases.createDocument(
      DATABASE_IDS.AI,
      COLLECTION_IDS.AI_RECOMMENDATIONS,
      ID.unique(),
      {
        recommendation_id: recommendationData.recommendation_id || ID.unique(),
        user_id: recommendationData.user_id!,
        course_id: recommendationData.course_id!,
        data: JSON.stringify(recommendationData.data || {})
      }
    );
  }
};

// Analytics Database Services (if enabled)
export const analyticsService = {
  async createEvent(eventData: Partial<AnalyticsEvent>) {
    return await appwriteDatabases.createDocument(
      DATABASE_IDS.ANALYTICS,
      COLLECTION_IDS.EVENTS,
      ID.unique(),
      {
        event_id: eventData.event_id || ID.unique(),
        user_id: eventData.user_id!,
        type: eventData.type!,
        timestamp: eventData.timestamp || new Date().toISOString(),
        data: JSON.stringify(eventData.data || {})
      }
    );
  },

  async getMetrics() {
    return await appwriteDatabases.listDocuments(
      DATABASE_IDS.ANALYTICS,
      COLLECTION_IDS.METRICS,
      [Query.orderDesc('timestamp')]
    );
  }
};

// Web3 Database Services (if enabled)
export const web3Service = {
  // Wallets
  async getUserWallet(userId: string) {
    return await appwriteDatabases.listDocuments(
      DATABASE_IDS.WEB3,
      COLLECTION_IDS.WALLETS,
      [Query.equal('user_id', userId)]
    );
  },

  async createWallet(walletData: Partial<Wallet>) {
    return await appwriteDatabases.createDocument(
      DATABASE_IDS.WEB3,
      COLLECTION_IDS.WALLETS,
      ID.unique(),
      {
        wallet_address: walletData.wallet_address!,
        user_id: walletData.user_id!,
        network: walletData.network!,
        metadata: JSON.stringify(walletData.metadata || {})
      }
    );
  },

  // Certificates
  async getUserCertificates(userId: string) {
    return await appwriteDatabases.listDocuments(
      DATABASE_IDS.WEB3,
      COLLECTION_IDS.CERTIFICATES,
      [Query.equal('user_id', userId)]
    );
  },

  async createCertificate(certificateData: Partial<Certificate>) {
    return await appwriteDatabases.createDocument(
      DATABASE_IDS.WEB3,
      COLLECTION_IDS.CERTIFICATES,
      ID.unique(),
      {
        token_id: certificateData.token_id || ID.unique(),
        user_id: certificateData.user_id!,
        course_id: certificateData.course_id!,
        wallet_address: certificateData.wallet_address!,
        contract_address: certificateData.contract_address!,
        issued_at: certificateData.issued_at || new Date().toISOString(),
        metadata: JSON.stringify(certificateData.metadata || {})
      }
    );
  }
};

// Export feature flags for convenience
export { FEATURE_FLAGS };