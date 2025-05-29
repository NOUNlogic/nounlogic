'use client';

import { useState, useEffect } from 'react';
import { appwriteDatabases } from '@/lib/appwrite/client';
import { DATABASE_IDS, COLLECTION_IDS } from '@/lib/appwrite/database';
import { Query } from 'appwrite';

export interface Course {
  $id: string;
  title: string;
  description: string;
  institution_id: string;
  creator_id: string;
  metadata: string; // JSON string
  nft_contract_address?: string;
  $createdAt: string;
  $updatedAt: string;
}

export interface Institution {
  $id: string;
  institution_id: string;
  name: string;
  type: string;
  metadata: string; // JSON string
  $createdAt: string;
  $updatedAt: string;
}

export interface Enrollment {
  $id: string;
  enrollment_id: string;
  user_id: string;
  course_id: string;
  status: string;
  progress: string; // JSON string
  certificate_token_id?: string;
  $createdAt: string;
  $updatedAt: string;
}

export function useCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await appwriteDatabases.listDocuments(
          DATABASE_IDS.COURSES,
          COLLECTION_IDS.COURSES,
          [Query.orderDesc('$createdAt')]
        );
        setCourses(response.documents as unknown as Course[]);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch courses');
        console.error('Error fetching courses:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return { courses, loading, error, refetch: () => setLoading(true) };
}

export function useInstitutions() {
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInstitutions = async () => {
      try {
        setLoading(true);
        const response = await appwriteDatabases.listDocuments(
          DATABASE_IDS.INSTITUTIONS,
          COLLECTION_IDS.INSTITUTIONS,
          [Query.orderDesc('$createdAt')]
        );
        setInstitutions(response.documents as unknown as Institution[]);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch institutions');
        console.error('Error fetching institutions:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchInstitutions();
  }, []);

  return { institutions, loading, error, refetch: () => setLoading(true) };
}

export function useEnrollments(userId?: string) {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEnrollments = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await appwriteDatabases.listDocuments(
          DATABASE_IDS.COURSES,
          COLLECTION_IDS.ENROLLMENTS,
          [
            Query.equal('user_id', userId),
            Query.orderDesc('$createdAt')
          ]
        );
        setEnrollments(response.documents as unknown as Enrollment[]);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch enrollments');
        console.error('Error fetching enrollments:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrollments();
  }, [userId]);

  return { enrollments, loading, error, refetch: () => setLoading(true) };
}

export function useAnalytics() {
  const trackEvent = async (eventType: string, data: any) => {
    try {
      await appwriteDatabases.createDocument(
        DATABASE_IDS.ANALYTICS,
        COLLECTION_IDS.EVENTS,
        'unique()',
        {
          event_id: `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          user_id: data.userId || 'anonymous',
          type: eventType,
          timestamp: new Date().toISOString(),
          data: JSON.stringify(data)
        }
      );
    } catch (err) {
      console.error('Error tracking event:', err);
    }
  };

  return { trackEvent };
}