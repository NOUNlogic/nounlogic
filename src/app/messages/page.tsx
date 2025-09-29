import MainLayout from '@/components/layout/MainLayout';
import MessagesClient from './MessagesClient';

export const metadata = {
  title: 'Messages | NounLogic',
  description: 'Direct messages with peers and groups',
};

export default function MessagesPage() {
  return (
    <MainLayout>
      <MessagesClient />
    </MainLayout>
  );
}
