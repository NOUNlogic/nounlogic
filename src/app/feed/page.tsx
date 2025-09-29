import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import Link from 'next/link';
import FeedClient from './FeedClient';

export const metadata = {
  title: 'Feed | NounLogic',
  description: 'Your social feed of updates from peers and groups',
};

export default function FeedPage() {
  return (
    <MainLayout>
      <FeedClient />
    </MainLayout>
  );
}
