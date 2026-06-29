import ManageTicketsClient from '@/Components/dashboard/admin/ManageTicketsCllient';
import { getTickets } from '@/lib/api/tickets';
import React from 'react';

const ManageTicketsPage = async() => {
  const tickets = await getTickets({role:"admin"})
  return (
    <div>
      <ManageTicketsClient tickets={tickets.tickets}/>
    </div>
  );
};

export default ManageTicketsPage;