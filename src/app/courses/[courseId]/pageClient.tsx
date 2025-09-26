'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import MainLayout from '@/components/layout/MainLayout';
import Button from '@/components/ui/Button';

export default function CourseDetailClient() {
  const params = useParams();
  const courseId = params?.courseId as string;
  const [enrolling, setEnrolling] = useState(false);
  const [enrolled, setEnrolled] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // TODO: Replace with real fetch of course details
  const course = {
    id: courseId,
    title: `Course ${courseId}`,
    description: 'Placeholder course description. Replace with real data.'
  };

  const handleEnroll = async () => {
    setError(null);
    setEnrolling(true);
    try {
      // NOTE: Replace hardcoded user id with authenticated user context
      const userId = 'mock-user-id';
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
        <div>
          <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
          <p className="text-muted-foreground">{course.description}</p>
        </div>
        <div className="flex items-center gap-4">
          <Button onClick={handleEnroll} disabled={enrolling || enrolled}>
            {enrolled ? 'Enrolled' : enrolling ? 'Enrolling...' : 'Enroll'}
          </Button>
          {error && <span className="text-sm text-red-600">{error}</span>}
        </div>
        <p className="text-xs text-muted-foreground">This is a minimal placeholder implementation for enrollment. Integrate with auth + real course data next.</p>
      </div>
    </MainLayout>
  );
}
