import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Login | NounLogic',
  description: 'Sign in to your account',
};

export default function LoginPage() {
  redirect('/feed');
}