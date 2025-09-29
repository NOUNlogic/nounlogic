import AdminClient from './AdminClient';
import { AppwriteAuthProvider } from '@/lib/appwrite/auth-context';

const AdminPage = () => {
  return (
    <AppwriteAuthProvider>
      <AdminClient />
    </AppwriteAuthProvider>
  );
};

export default AdminPage;
