'use client';

import React, { useState, useEffect } from 'react';
import { withAuth } from '@/lib/appwrite/auth-context';
import { usePermissions } from '@/lib/appwrite/auth-context';
import { ROLES } from '@/lib/roles';
import { cohortsService } from '@/lib/appwrite/services';
import type { Cohort } from '@/types/database';

const CohortsClient = () => {
  const { hasRole } = usePermissions();
  const [cohorts, setCohorts] = useState<Cohort[]>([]);
  const [loading, setLoading] = useState(true);
  const [newCohortName, setNewCohortName] = useState('');

  const fetchCohorts = async () => {
    try {
      const response = await cohortsService.listCohorts();
      setCohorts(response.documents);
    } catch (error) {
      console.error('Failed to fetch cohorts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (hasRole(ROLES.ADMIN)) {
      fetchCohorts();
    }
  }, [hasRole]);

  const handleCreateCohort = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCohortName) return;

    try {
      await cohortsService.createCohort({ name: newCohortName });
      setNewCohortName('');
      await fetchCohorts();
    } catch (error) {
      console.error('Failed to create cohort:', error);
    }
  };

  if (!hasRole(ROLES.ADMIN)) {
    return <div>You do not have permission to view this page.</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Cohorts Management</h1>
      <form onSubmit={handleCreateCohort}>
        <input
          type="text"
          value={newCohortName}
          onChange={e => setNewCohortName(e.target.value)}
          placeholder="New cohort name"
        />
        <button type="submit">Create Cohort</button>
      </form>
      <h2>Existing Cohorts</h2>
      <ul>
        {cohorts.map(cohort => (
          <li key={cohort.$id}>{cohort.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default withAuth(CohortsClient);
