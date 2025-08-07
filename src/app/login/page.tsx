import React from 'react';
import LoginClient from './LoginClient';

export const metadata = {
  title: 'Login | NounLogic LMS',
  description: 'Sign in to your account',
};

import { AuthProvider } from '@/app/providers';

export default function LoginPage() {
  return (
    <AuthProvider>
      <LoginClient />
    </AuthProvider>
  );
}