import InstitutionClient from './InstitutionClient';
import { AppwriteAuthProvider } from '@/lib/appwrite/auth-context';

const InstitutionPage = () => {
  return (
    <AppwriteAuthProvider>
      <InstitutionClient />
    </AppwriteAuthProvider>
  );
};

export default InstitutionPage;
