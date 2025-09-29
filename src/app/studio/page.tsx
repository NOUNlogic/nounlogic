import StudioClient from './StudioClient';
import { AppwriteAuthProvider } from '@/lib/appwrite/auth-context';

const StudioPage = () => {
  return (
    <AppwriteAuthProvider>
      <StudioClient />
    </AppwriteAuthProvider>
  );
};

export default StudioPage;
