import ManageTicketsClient from '@/Components/dashboard/admin/ManageTicketsCllient';
import { getTickets } from '@/lib/api/tickets';
import React from 'react';
export const dynamic = "force-dynamic";

const ManageTicketsPage = async() => {

  const response = await getTickets({role:"admin"})
  const tickets = response?.tickets || [];
  return (
    <div>
      <ManageTicketsClient tickets={tickets}/>
    </div>
  );
};

export default ManageTicketsPage;