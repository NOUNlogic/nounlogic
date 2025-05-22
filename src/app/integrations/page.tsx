import React from 'react';
import IntegrationsClient from './IntegrationsClient';

export const metadata = {
  title: 'Integrations | NounLogic LMS',
  description: 'Connect your institution to NounLogic or apply for a new integration.',
};

export default function IntegrationsPage() {
  return <IntegrationsClient />;
}