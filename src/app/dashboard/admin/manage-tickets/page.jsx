import ManageTicketsClient from '@/Components/dashboard/admin/ManageTicketsCllient';
import { getTickets } from '@/lib/api/tickets';
import React from 'react';

const ManageTicketsPage = async() => {
  const tickets = await getTickets('/api/tickets')
  return (
    <div>
      <ManageTicketsClient tickets={tickets}/>
    </div>
  );
};

export default ManageTicketsPage;