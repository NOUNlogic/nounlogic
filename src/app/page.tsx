import SocialHomeClient from './socialHomeClient';
import { AppwriteAuthProvider } from '@/lib/appwrite/auth-context-new';

export default function Home() {
  return (
    <AppwriteAuthProvider>
      <SocialHomeClient />
    </AppwriteAuthProvider>
  );
}
