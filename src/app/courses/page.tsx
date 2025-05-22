import React from 'react';
import CoursesClient from './CoursesClient';

export const metadata = {
  title: 'Courses | NounLogic LMS',
  description: 'Browse and manage courses',
};

export default function CoursesPage() {
  return <CoursesClient />;
}