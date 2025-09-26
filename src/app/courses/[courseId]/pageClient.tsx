'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import MainLayout from '@/components/layout/MainLayout';
import Button from '@/components/ui/Button';
import { useAuth } from '@/app/providers';

export default function CourseDetailClient() {
  const params = useParams();
  const courseId = params?.courseId as string;
  const { user, isLoading: authLoading } = useAuth();
  const [enrolling, setEnrolling] = useState(false);
  const [enrolled, setEnrolled] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [course, setCourse] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      if (!courseId) return;
      setLoading(true);
      try {
        const res = await fetch(`/api/courses/${courseId}`);
        if (!res.ok) throw new Error('Failed to load course');
        const data = await res.json();
        setCourse(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
  }, [user, courseId]);
    fetchCourse();
  }, [courseId]);

  const handleEnroll = useCallback(async () => {
    setError(null);
    setEnrolling(true);
    try {
      if (!user?.$id) {
        throw new Error('You must be logged in to enroll');
      }
      const userId = user.$id;
      const res = await fetch('/api/enrollments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId, course_id: courseId })
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Enrollment failed');
      }
      setEnrolled(true);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setEnrolling(false);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto py-10 space-y-6">
        {loading && <p className="text-sm text-muted-foreground">Loading course...</p>}
        {!loading && error && !course && (
          <div className="space-y-2">
            <p className="text-sm text-red-600">{error}</p>
            <Button onClick={() => { setError(null); setCourse(null); }}>Retry</Button>
          </div>
        )}
        {!loading && course && (
          <>
            <div>
              <h1 className="text-3xl font-bold mb-2">{course.title || course.name || 'Untitled Course'}</h1>
              <p className="text-muted-foreground break-words">{course.description || 'No description provided.'}</p>
            </div>
            <div className="flex items-center gap-4">
              <Button onClick={handleEnroll} disabled={authLoading || enrolling || enrolled || !user}>
                {authLoading ? 'Checking auth...' : enrolled ? 'Enrolled' : enrolling ? 'Enrolling...' : user ? 'Enroll' : 'Login to Enroll'}
              </Button>
              {error && <span className="text-sm text-red-600">{error}</span>}
            </div>
            <p className="text-xs text-muted-foreground">Course ID: {courseId}</p>
          </>
        )}
        <p className="text-xs text-muted-foreground">This is a minimal placeholder implementation for enrollment. Auth integration pending.</p>
      </div>
    </MainLayout>
  );
}
