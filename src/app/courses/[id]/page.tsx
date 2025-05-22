import React from 'react';
import CourseDetailsClient from './CourseDetailsClient';

export const metadata = {
  title: 'Course Details | NounLogic LMS',
  description: 'View course details and modules',
};

interface CourseDetailsPageProps {
  params: {
    id: string;
  };
}

export default function CourseDetailsPage({ params }: CourseDetailsPageProps) {
  return <CourseDetailsClient courseId={params.id} />;
}