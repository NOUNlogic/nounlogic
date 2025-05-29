import HomeClient from './pageClient';
import { AppwriteAuthProvider } from '@/lib/appwrite/auth-context';

export default function Home() {
  return (
    <AppwriteAuthProvider>
      <HomeClient />
    </AppwriteAuthProvider>
  );
}
