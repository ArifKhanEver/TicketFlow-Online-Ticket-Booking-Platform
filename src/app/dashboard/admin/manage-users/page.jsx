import ManageUsersClient from '@/Components/dashboard/admin/ManageUsersClient';
import { getAllUsers } from '@/lib/api/users';
import { getUser } from '@/lib/core/session';
import React from 'react';

const ManageUsersPage = async() => {
  const currentUser = await getUser();
  console.log(currentUser)
  const users = await getAllUsers('/api/users')
  return (
    <div>
      <ManageUsersClient users={users} currentAdminId={currentUser.id}/>
    </div>
  );
};

export default ManageUsersPage;