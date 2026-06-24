import React from 'react';
import { notFound } from 'next/navigation';
import { getSingleTicket } from '@/lib/api/tickets';
import TicketDetailsClient from '@/Components/tickets/TicketDetailsClient';

export default async function TicketDetailsPage({ params }) {
    const { id } = await params;
    const ticket = await getSingleTicket("/api/tickets",id);

    if (!ticket) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-zinc-50 dark:bg-[#050505] text-black dark:text-white pt-42 pb-20">
            <TicketDetailsClient ticket={ticket} />
        </main>
    );
}