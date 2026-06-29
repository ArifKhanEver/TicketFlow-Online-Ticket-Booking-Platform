import AdvertisedTicketsClient from '@/Components/dashboard/admin/AdvertisedTicketsClient';
import { getTickets } from '@/lib/api/tickets';
import React from 'react';

const AdvertisedTicketsPage = async() => {
  const tickets = await getTickets({role:"admin"})
  return (
    <div>
      <AdvertisedTicketsClient tickets={tickets.tickets}/>
    </div>
  );
};

export default AdvertisedTicketsPage;