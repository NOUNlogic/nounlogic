'use client';

import React, { useState, useEffect } from 'react';
import { withAuth } from '@/lib/appwrite/auth-context';
import { usePermissions } from '@/lib/appwrite/auth-context';
import { ROLES } from '@/lib/roles';
import { usersService } from '@/lib/appwrite/services';
import type { User as DatabaseUser } from '@/types/database';
import EditUserModal from './EditUserModal';
import CreateUserModal from './CreateUserModal';

const AdminClient = () => {
  const { hasRole } = usePermissions();
  const [users, setUsers] = useState<DatabaseUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<DatabaseUser | null>(null);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);

  const fetchUsers = async () => {
    try {
      const response = await usersService.listUsers();
      setUsers(response.documents);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (hasRole(ROLES.ADMIN)) {
      fetchUsers();
    }
  }, [hasRole]);

  const handleEdit = (user: DatabaseUser) => {
    setSelectedUser(user);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
    setCreateModalOpen(false);
  };

  const handleSaveRoles = async (user: DatabaseUser, newRoles: string[]) => {
    try {
      await usersService.updateUser(user.$id, { roles: newRoles });
      await fetchUsers(); // Refresh the user list
      handleCloseModal();
    } catch (error) {
      console.error('Failed to update user roles:', error);
    }
  };

  const handleDelete = async (userId: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await usersService.deleteUser(userId);
        await fetchUsers(); // Refresh the user list
      } catch (error) {
        console.error('Failed to delete user:', error);
      }
    }
  };

  const handleCreateUser = async (userData: any) => {
    try {
      await usersService.createUser(userData.email, userData.password, userData.roles);
      await fetchUsers(); // Refresh the user list
      handleCloseModal();
    } catch (error) {
      console.error('Failed to create user:', error);
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
      <h1>Admin Dashboard</h1>
      <h2>Users</h2>
      <button onClick={() => setCreateModalOpen(true)}>Create User</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Roles</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.$id}>
              <td>{user.$id}</td>
              <td>{user.email}</td>
              <td>{user.roles.join(', ')}</td>
              <td>
                <button onClick={() => handleEdit(user)}>Edit</button>
                <button onClick={() => handleDelete(user.$id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedUser && (
        <EditUserModal
          user={selectedUser}
          onClose={handleCloseModal}
          onSave={handleSaveRoles}
        />
      )}
      {isCreateModalOpen && (
        <CreateUserModal
          onClose={handleCloseModal}
          onSave={handleCreateUser}
        />
      )}
    </div>
  );
};

export default withAuth(AdminClient);
