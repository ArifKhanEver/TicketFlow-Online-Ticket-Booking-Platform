import AdvertisedTicketsClient from '@/Components/dashboard/admin/AdvertisedTicketsClient';
import { getTickets } from '@/lib/api/tickets';
import React from 'react';

export const dynamic = "force-dynamic";

const AdvertisedTicketsPage = async () => {
  const response = await getTickets({ role: 'admin' });

  const ticketsData = response?.tickets || [];

  return (
    <div className="p-6">
      <AdvertisedTicketsClient initialTickets={ticketsData} />
    </div>
  );
};

export default AdvertisedTicketsPage;