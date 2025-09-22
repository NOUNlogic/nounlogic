'use client';

import React, { useState } from 'react';
import { ROLES } from '@/lib/roles';
import type { User as DatabaseUser } from '@/types/database';

interface EditUserModalProps {
  user: DatabaseUser;
  onClose: () => void;
  onSave: (user: DatabaseUser, newRoles: string[]) => void;
}

const EditUserModal = ({ user, onClose, onSave }: EditUserModalProps) => {
  const [selectedRoles, setSelectedRoles] = useState(user.roles);

  const handleRoleChange = (role: string) => {
    setSelectedRoles(prevRoles =>
      prevRoles.includes(role)
        ? prevRoles.filter(r => r !== role)
        : [...prevRoles, role]
    );
  };

  const handleSave = () => {
    onSave(user, selectedRoles);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Edit User: {user.email}</h2>
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Roles</h3>
          {Object.values(ROLES).map(role => (
            <div key={role} className="flex items-center">
              <input
                type="checkbox"
                id={role}
                value={role}
                checked={selectedRoles.includes(role)}
                onChange={() => handleRoleChange(role)}
              />
              <label htmlFor={role} className="ml-2">{role}</label>
            </div>
          ))}
        </div>
        <div className="flex justify-end">
          <button onClick={onClose} className="mr-4">Cancel</button>
          <button onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;
