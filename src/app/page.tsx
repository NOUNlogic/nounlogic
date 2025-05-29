import HomeClient from './pageClientNew';
import { AppwriteAuthProvider } from '@/lib/appwrite/auth-context-new';

export default function Home() {
  return (
    <AppwriteAuthProvider>
      <HomeClient />
    </AppwriteAuthProvider>
  );
}
