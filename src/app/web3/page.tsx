import React from 'react';
import Web3Client from './Web3Client';

export const metadata = {
  title: 'Web3 | NounLogic LMS',
  description: 'Manage your blockchain certificates and wallet',
};

export default function Web3Page() {
  return <Web3Client />;
}