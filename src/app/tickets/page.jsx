import AllTicketsClient from '@/Components/tickets/AllTicketsClient';
import { getTickets } from '@/lib/api/tickets';
import React from 'react';

export default async function AllTicketsPage({ searchParams }) {
    const params = await searchParams;

    const query = {
        from: params?.from || '',
        to: params?.to || '',
        sort: params?.sort || 'Recommended',
        transportType: params?.transportType || '',
        page: params?.page || '1'
    };

    const response = await getTickets(query);
    
    return (
        <main className="min-h-screen bg-gray-50 dark:bg-[#050505] text-black dark:text-white transition-colors duration-300 pt-24 pb-16">
            <AllTicketsClient 
                tickets={response?.tickets || []} 
                totalPages={response?.totalPages || 1}
                totalCount={response?.totalCount || 1}
            />
        </main>
    );
}