import { Client, Account, ID, Databases, Query, Storage } from 'appwrite';

// Check if environment variables are defined
const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;

if (!endpoint || !projectId) {
  console.error('Appwrite environment variables are not properly set:',
    !endpoint ? 'Missing NEXT_PUBLIC_APPWRITE_ENDPOINT' : '',
    !projectId ? 'Missing NEXT_PUBLIC_APPWRITE_PROJECT_ID' : ''
  );
}

// Initialize Appwrite client
const client = new Client();

try {
  client
    .setEndpoint(endpoint || 'https://cloud.appwrite.io/v1')
    .setProject(projectId || '');
} catch (error) {
  console.error('Failed to initialize Appwrite client:', error);
}

// Initialize Appwrite services
export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export { ID, Query };

// Helper functions for authentication
export const appwriteAuth = {
  // Create a new account
  createAccount: async (email: string, password: string, name: string) => {
    try {
      // Make sure projectId and endpoint are set
      if (!endpoint || !projectId || projectId === 'your-project-id') {
        throw new Error('Appwrite endpoint or project ID is not set or is using a placeholder. Please update your .env.local file.');
      }
      const newAccount = await account.create(
        ID.unique(),
        email,
        password,
        name
      );
      // After account creation, create a session (login)
      await account.createEmailPasswordSession(email, password);
      // Refresh user state
      const user = await account.get();
      return { newAccount, user };
    } catch (error: any) {
      // Log the full error from Appwrite
      if (error && error.message) {
        console.error('Appwrite error:', error.message, error);
      } else {
        console.error('Error creating account:', error);
      }
      throw error;
    }
  },
  
  // Log in with email and password
  login: async (email: string, password: string) => {
    try {
      await account.createEmailPasswordSession(email, password);
      // Refresh user state
      const user = await account.get();
      return user;
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  },
  
  // Get current user
  getCurrentUser: async () => {
    try {
      return await account.get();
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  },
  
  // Log out
  logout: async () => {
    try {
      return await account.deleteSession('current');
    } catch (error) {
      console.error('Error logging out:', error);
      throw error;
    }
  }
};
