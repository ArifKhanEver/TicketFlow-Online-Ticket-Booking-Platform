import React from 'react';
import { getUser } from '@/lib/core/session';
import MyAddedTicketsClient from '@/Components/tickets/MyAddedTicketsClient';
import { getTickets } from '@/lib/api/tickets';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function MyAddedTicketsPage() {
    const user = await getUser();
    if (!user) {
        redirect('/auth/signin');
    }
    const vendorId = user.id;
    const allTickets = await getTickets({ vendorId });

    return (
        <div className="w-full min-h-screen bg-zinc-50 dark:bg-[#0A0A0C] p-4 md:p-8 pt-24">
            <MyAddedTicketsClient initialTickets={allTickets?.tickets || []} />
        </div>
    );
}