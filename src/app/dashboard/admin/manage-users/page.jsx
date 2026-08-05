import ManageUsersClient from '@/Components/dashboard/admin/ManageUsersClient';
import { getAllUsers } from '@/lib/api/users';
import { getUser } from '@/lib/core/session';
import { redirect } from 'next/navigation';
import React from 'react';

export const dynamic = 'force-dynamic';

const ManageUsersPage = async () => {
  const currentUser = await getUser();
  if (!currentUser) {
    redirect('/auth/signin');
  }
  if (currentUser.role !== 'admin') {
    redirect('/unauthorized');
  }
  const users = await getAllUsers('/api/users');
  return (
    <div>
      <ManageUsersClient users={users || []} currentAdminId={currentUser.id} />
    </div>
  );
};

export default ManageUsersPage;