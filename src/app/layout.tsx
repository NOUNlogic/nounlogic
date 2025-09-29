import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import AppProviders from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'NounLogic',
  description: 'Connect with students worldwide — groups, messages, communities',
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
        <script src="https://chat-widget.sensay.io/3b1918af-8a5f-4088-b107-5aec870d9716/embed-script.js" defer />
      </body>
    </html>
  );
}
