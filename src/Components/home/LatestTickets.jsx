import React from 'react';
import { FiZap } from "react-icons/fi";
import TicketsCard from '../shared/TicketsCard';
import { getTickets } from '@/lib/api/tickets';

const LatestTickets = async () => {
    const ticketsResponse = await getTickets({ limit: 8 });
    const latestTickets = ticketsResponse?.tickets || [];

    return (
        <section className="py-24 bg-zinc-100 dark:bg-[#050505] transition-colors duration-300">
            <div className="container mx-auto max-w-7xl px-6 md:px-10">

                <div className="mb-12 border-b border-zinc-200/60 dark:border-zinc-800/60 pb-6">
                    <div>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#039855]/10 text-[#039855] rounded-full text-xs font-bold tracking-wider uppercase mb-3">
                            <FiZap className="fill-[#039855]/20" /> Just Added
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-white tracking-tight">
                            Latest <span className="text-[#F05A28]">Available</span> Tickets
                        </h2>
                        <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium mt-2">
                            Discover the newest routes published by verified transport vendors.
                        </p>
                    </div>
                </div>

                {/* 4-Column Grid for compact layout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {latestTickets.map((ticket, index) => (
                        <TicketsCard key={ticket._id || ticket.id || index} ticket={ticket} />
                    ))}
                </div>

            </div>
        </section>
    );
};

export default LatestTickets;