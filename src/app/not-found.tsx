import React from 'react';
import NotFoundClient from './not-found-client';

export const metadata = {
  title: 'Page Not Found | NounLogic',
  description: 'The page you are looking for could not be found',
};

export default function NotFoundPage() {
  return <NotFoundClient />;
}