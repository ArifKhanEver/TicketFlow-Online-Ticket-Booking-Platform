import AllTicketsClient from '@/Components/tickets/AllTicketsClient';
import { getTickets } from '@/lib/api/tickets';
import React from 'react';

export default async function AllTicketsPage() {
    const initialTickets = await getTickets();

    return (
        <main className="min-h-screen bg-gray-50 dark:bg-[#050505] text-black dark:text-white transition-colors duration-300 pt-24 pb-16">
            <AllTicketsClient initialTickets={initialTickets.data} />
        </main>
    );
}