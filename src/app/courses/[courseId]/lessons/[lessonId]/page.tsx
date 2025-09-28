import React from 'react';
import LessonViewClient from './LessonViewClient';

export const metadata = {
  title: 'Lesson | NounLogic',
  description: 'View lesson content',
};

interface LessonViewPageProps {
  params: {
    courseId: string;
    lessonId: string;
  };
}

export default function LessonViewPage({ params }: LessonViewPageProps) {
  return <LessonViewClient courseId={params.courseId} lessonId={params.lessonId} />;
}