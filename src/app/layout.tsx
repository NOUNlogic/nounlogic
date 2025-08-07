import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import AppProviders from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'NounLogic LMS',
  description: 'Web3 Learning Management System',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-200 transition-colors duration-300`}>
        <AppProviders>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
