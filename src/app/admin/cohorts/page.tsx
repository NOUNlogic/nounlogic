import CohortsClient from './CohortsClient';
import { AppwriteAuthProvider } from '@/lib/appwrite/auth-context';

const CohortsPage = () => {
  return (
    <AppwriteAuthProvider>
      <CohortsClient />
    </AppwriteAuthProvider>
  );
};

export default CohortsPage;
