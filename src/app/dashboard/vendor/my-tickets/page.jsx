import React from 'react';
import { getUser } from '@/lib/core/session';
import MyAddedTicketsClient from '@/Components/tickets/MyAddedTicketsClient';
import { getVendorTickets } from '@/lib/api/tickets';


export default async function MyAddedTicketsPage() {
    const user = await getUser()
    const vendorId = user?.id
    const allTickets = await getVendorTickets("/api/tickets", vendorId);

    return (
        <div className="w-full min-h-screen bg-zinc-50 dark:bg-[#0A0A0C] p-4 md:p-8 pt-24">
            <MyAddedTicketsClient initialTickets={allTickets} />
        </div>
    );
}