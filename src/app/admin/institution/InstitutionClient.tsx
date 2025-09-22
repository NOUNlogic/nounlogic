'use client';

import React, { useState, useEffect } from 'react';
import { withAuth } from '@/lib/appwrite/auth-context';
import { usePermissions } from '@/lib/appwrite/auth-context';
import { ROLES } from '@/lib/roles';
import { institutionsService } from '@/lib/appwrite/services';
import type { Institution } from '@/types/database';

const InstitutionClient = () => {
  const { hasRole } = usePermissions();
  const [institution, setInstitution] = useState<Institution | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInstitution = async () => {
      try {
        // Assuming the admin belongs to one institution, we fetch the first one
        // In a real-world scenario, you would have a way to identify the admin's institution
        const response = await institutionsService.listInstitutions();
        if (response.documents.length > 0) {
          setInstitution(response.documents[0]);
        }
      } catch (error) {
        console.error('Failed to fetch institution:', error);
      } finally {
        setLoading(false);
      }
    };

    if (hasRole(ROLES.ADMIN)) {
      fetchInstitution();
    }
  }, [hasRole]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!institution) return;

    try {
      await institutionsService.updateInstitution(institution.$id, {
        logo_url: institution.logo_url,
        primary_color: institution.primary_color,
      });
      alert('Institution updated successfully!');
    } catch (error) {
      console.error('Failed to update institution:', error);
      alert('Failed to update institution.');
    }
  };

  if (!hasRole(ROLES.ADMIN)) {
    return <div>You do not have permission to view this page.</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!institution) {
    return <div>No institution found.</div>;
  }

  return (
    <div>
      <h1>Institution Management</h1>
      <form onSubmit={handleSave}>
        <div>
          <label htmlFor="logo_url">Logo URL</label>
          <input
            type="text"
            id="logo_url"
            value={institution.logo_url || ''}
            onChange={e => setInstitution({ ...institution, logo_url: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="primary_color">Primary Color</label>
          <input
            type="color"
            id="primary_color"
            value={institution.primary_color || '#000000'}
            onChange={e => setInstitution({ ...institution, primary_color: e.target.value })}
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default withAuth(InstitutionClient);
