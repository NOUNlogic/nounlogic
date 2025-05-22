import React from 'react';
import { Inter } from 'next/font/google';
import './globals.css';
import AppProviders from './providers';

const inter = Inter({ subsets: ['latin'], variable: '--font-geist-sans' });

export const metadata = {
  title: 'NounLogic LMS',
  description: 'Global Learning Management System with Web3 Integration',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProviders>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
