'use client';

import React, { useState } from 'react';
import { ROLES } from '@/lib/roles';

interface CreateUserModalProps {
  onClose: () => void;
  onSave: (userData: any) => void;
}

const CreateUserModal = ({ onClose, onSave }: CreateUserModalProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

  const handleRoleChange = (role: string) => {
    setSelectedRoles(prevRoles =>
      prevRoles.includes(role)
        ? prevRoles.filter(r => r !== role)
        : [...prevRoles, role]
    );
  };

  const handleSave = () => {
    onSave({ email, password, roles: selectedRoles });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Create User</h2>
        <div className="mb-4">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
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

export default CreateUserModal;
