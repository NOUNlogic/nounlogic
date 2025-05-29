import { useState, useEffect } from 'react';
import { 
  coursesService, 
  usersService, 
  institutionsService, 
  web3Service,
  aiService,
  analyticsService,
  FEATURE_FLAGS
} from '@/lib/appwrite/services';
import type { Course, Enrollment, Institution, Certificate, AIRecommendation } from '@/types/database';

// Courses hooks
export const useCourses = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await coursesService.getCourses();
        setCourses(response.documents || []);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch courses');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return { courses, loading, error, refetch: () => window.location.reload() };
};

export const useCourse = (courseId: string) => {
  const [course, setCourse] = useState<any>(null);
  const [modules, setModules] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!courseId) return;

    const fetchCourseData = async () => {
      try {
        setLoading(true);
        const [courseResponse, modulesResponse] = await Promise.all([
          coursesService.getCourseById(courseId),
          coursesService.getModulesByCourse(courseId)
        ]);
        
        setCourse(courseResponse);
        setModules(modulesResponse.documents || []);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch course data');
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [courseId]);

  return { course, modules, loading, error };
};

// User enrollments hook
export const useUserEnrollments = (userId: string) => {
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;

    const fetchEnrollments = async () => {
      try {
        setLoading(true);
        const response = await coursesService.getUserEnrollments(userId);
        setEnrollments(response.documents || []);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch enrollments');
      } finally {
        setLoading(false);
      }
    };

    fetchEnrollments();
  }, [userId]);

  return { enrollments, loading, error };
};

// Institutions hook
export const useInstitutions = () => {
  const [institutions, setInstitutions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInstitutions = async () => {
      try {
        setLoading(true);
        const response = await institutionsService.getInstitutions();
        setInstitutions(response.documents || []);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch institutions');
      } finally {
        setLoading(false);
      }
    };

    fetchInstitutions();
  }, []);

  return { institutions, loading, error };
};

// Web3 hooks (only if Web3 is enabled)
export const useUserWallet = (userId: string) => {
  const [wallet, setWallet] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId || !FEATURE_FLAGS.WEB3_ENABLED) {
      setLoading(false);
      return;
    }

    const fetchWallet = async () => {
      try {
        setLoading(true);
        const response = await web3Service.getUserWallet(userId);
        setWallet(response.documents?.[0] || null);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch wallet');
      } finally {
        setLoading(false);
      }
    };

    fetchWallet();
  }, [userId]);

  return { wallet, loading, error };
};

export const useUserCertificates = (userId: string) => {
  const [certificates, setCertificates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId || !FEATURE_FLAGS.WEB3_ENABLED) {
      setLoading(false);
      return;
    }

    const fetchCertificates = async () => {
      try {
        setLoading(true);
        const response = await web3Service.getUserCertificates(userId);
        setCertificates(response.documents || []);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch certificates');
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, [userId]);

  return { certificates, loading, error };
};

// AI recommendations hook (only if AI features are enabled)
export const useAIRecommendations = (userId: string) => {
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId || !FEATURE_FLAGS.AI_FEATURES_ENABLED) {
      setLoading(false);
      return;
    }

    const fetchRecommendations = async () => {
      try {
        setLoading(true);
        const response = await aiService.getRecommendations(userId);
        setRecommendations(response.documents || []);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch recommendations');
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [userId]);

  return { recommendations, loading, error };
};

// Analytics hook for tracking events
export const useAnalytics = () => {
  const trackEvent = async (type: string, data: any = {}) => {
    if (!FEATURE_FLAGS.ANALYTICS_ENABLED) return;

    try {
      await analyticsService.createEvent({
        user_id: 'anonymous', // This should be replaced with actual user ID when available
        type,
        data: JSON.stringify(data)
      });
    } catch (error) {
      console.log('Analytics tracking failed:', error);
    }
  };

  return { trackEvent };
};