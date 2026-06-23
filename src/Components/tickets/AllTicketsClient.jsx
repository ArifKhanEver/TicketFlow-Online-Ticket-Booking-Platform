'use client';

import React, { useState, useMemo } from 'react';
import { Button, Pagination, Input } from "@heroui/react";
import { FiClock, FiSearch, FiSliders, FiChevronDown, FiFilter } from 'react-icons/fi';
import { motion } from 'framer-motion';
import TicketCard from './TicketCard';

export default function AllTicketsClient({ initialTickets }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedSort, setSelectedSort] = useState('Recommended');
    const [selectedTransports, setSelectedTransports] = useState([]);
    const [page, setPage] = useState(1);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    
    const itemsPerPage = 6; 

    const handleTransportChange = (value, isChecked) => {
        if (isChecked) setSelectedTransports([...selectedTransports, value]);
        else setSelectedTransports(selectedTransports.filter(item => item !== value));
    };

    const processedTickets = useMemo(() => {
        let result = [...initialTickets];

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(ticket => 
                ticket.title?.toLowerCase().includes(query) ||
                ticket.from?.toLowerCase().includes(query) ||
                ticket.to?.toLowerCase().includes(query)
            );
        }

        if (selectedTransports.length > 0) {
            result = result.filter(ticket => selectedTransports.includes(ticket.transportType));
        }

        if (selectedSort === 'Price: Low to High') {
            result.sort((a, b) => a.price - b.price);
        } else if (selectedSort === 'Price: High to Low') {
            result.sort((a, b) => b.price - a.price);
        } else if (selectedSort === 'Earliest Departure') {
            result.sort((a, b) => new Date(a.departureDateTime) - new Date(b.departureDateTime));
        }

        return result;
    }, [initialTickets, searchQuery, selectedTransports, selectedSort]);

    const totalPages = Math.ceil(processedTickets.length / itemsPerPage) || 1;
    
    const paginatedTickets = useMemo(() => {
        const start = (page - 1) * itemsPerPage;
        return processedTickets.slice(start, start + itemsPerPage);
    }, [processedTickets, page]);

    return (
        <div className="w-full">
            {/* UNIFIED HEADER */}
            <div className="bg-white dark:bg-[#111113] border-b border-gray-200 dark:border-zinc-900 shadow-sm pt-10 pb-6 mb-10">
                <div className="container mx-auto max-w-7xl px-6 md:px-10">
                    <div className="flex flex-row items-center justify-between mb-6">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-black tracking-tight mb-1 text-zinc-900 dark:text-white">Available Tickets</h1>
                            <div className="flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-zinc-400">
                                <span className="text-[#039855]">Bangladesh</span>
                                <FiClock size={12} className="mx-1" />
                                <span className="text-[#F05A28]">All Routes</span>
                            </div>
                        </div>

                        <Button
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                            className="lg:hidden bg-gray-100 dark:bg-[#141416] text-zinc-900 dark:text-white font-bold border border-gray-200 dark:border-zinc-800 rounded-xl"
                            startContent={<FiFilter />}
                        >
                            {isFilterOpen ? "Hide Filters" : "Show Filters"}
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4 w-full">
                        <div className="w-full md:col-span-9">
                            <Input
                                type="text"
                                placeholder="Search by route, destination or fleet name..."
                                value={searchQuery}
                                fullWidth
                                onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }}
                                startContent={<FiSearch className="text-zinc-500 dark:text-zinc-400 mr-2 shrink-0" size={20} />}
                                classNames={{
                                    inputWrapper: "h-12 w-full bg-gray-50 hover:bg-gray-100 dark:bg-[#141416] border border-gray-200 dark:border-zinc-800 rounded-2xl transition-colors px-4",
                                    input: "text-zinc-900 dark:text-white font-medium text-sm placeholder:text-zinc-400"
                                }}
                            />
                        </div>

                        <div className="w-full md:col-span-3 flex items-center justify-end gap-3">
                            <div className="relative flex items-center w-full">
                                <select
                                    value={selectedSort}
                                    onChange={(e) => setSelectedSort(e.target.value)}
                                    className="w-full h-12 pl-4 pr-10 bg-gray-50 hover:bg-gray-100 dark:bg-[#141416] border border-gray-200 dark:border-zinc-800 text-zinc-900 dark:text-white font-bold rounded-2xl appearance-none outline-none cursor-pointer transition-colors text-sm"
                                >
                                    <option value="Recommended" className="bg-white dark:bg-[#141416] text-zinc-900 dark:text-white">Recommended</option>
                                    <option value="Price: Low to High" className="bg-white dark:bg-[#141416] text-zinc-900 dark:text-white">Price: Low to High</option>
                                    <option value="Price: High to Low" className="bg-white dark:bg-[#141416] text-zinc-900 dark:text-white">Price: High to Low</option>
                                    <option value="Earliest Departure" className="bg-white dark:bg-[#141416] text-zinc-900 dark:text-white">Earliest Departure</option>
                                </select>
                                <FiChevronDown className="absolute right-4 text-zinc-500 dark:text-zinc-400 pointer-events-none" size={16} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* MAIN CONTENT AREA */}
            <div className="container mx-auto max-w-7xl px-6 md:px-10">
                <div className="flex flex-col lg:flex-row gap-8">
                    
                    {/* Filter Sidebar */}
                    <aside className={`w-full lg:w-72 shrink-0 ${isFilterOpen ? 'block' : 'hidden lg:block'}`}>
                        <div className="bg-white dark:bg-[#111113] p-6 rounded-[28px] border border-gray-200 dark:border-zinc-800 shadow-sm sticky top-28">
                            <h3 className="text-base font-black mb-6 flex items-center gap-2 border-b border-gray-100 dark:border-zinc-800 pb-3 text-zinc-900 dark:text-white">
                                <FiSliders className="text-[#039855]" /> Filter Parameters
                            </h3>

                            <div>
                                <h4 className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-3">Vehicle Type</h4>
                                <div className="flex flex-col gap-3">
                                    {['Bus', 'Train', 'Launch', 'Flight'].map((type) => (
                                        <label key={type} className="flex items-center gap-3 cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                className="w-4 h-4 accent-[#039855] cursor-pointer"
                                                onChange={(e) => { handleTransportChange(type, e.target.checked); setPage(1); }}
                                            />
                                            <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-300 group-hover:text-[#039855] transition-colors">
                                                {type}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Ticket Grid List */}
                    <div className="flex-1 space-y-6">
                        {paginatedTickets.length > 0 ? (
                            paginatedTickets.map((ticket, idx) => (
                                <TicketCard key={ticket._id?.toString() || idx} ticket={ticket} idx={idx} />
                            ))
                        ) : (
                            <div className="text-center py-20 bg-white dark:bg-[#111113] border border-gray-200 dark:border-zinc-800 rounded-[28px]">
                                <p className="text-zinc-500 dark:text-zinc-400 font-bold">No active tickets found matching your query.</p>
                            </div>
                        )}

                        {processedTickets.length > 0 && (
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-gray-200 dark:border-zinc-900 mt-12">
                                <span className="text-sm font-bold text-gray-600 dark:text-zinc-400">
                                    Showing <span className="!text-zinc-900 dark:!text-white">
                                        {processedTickets.length === 0 ? 0 : (page - 1) * itemsPerPage + 1}-
                                        {Math.min(processedTickets.length, page * itemsPerPage)}
                                    </span> of <span className="!text-zinc-900 dark:!text-white">{processedTickets.length}</span> tickets
                                </span>

                                {totalPages > 1 && (
                                    <Pagination
                                        total={totalPages}
                                        page={page}
                                        onChange={setPage}
                                        color="success"
                                        radius="xl"
                                        showControls
                                    />
                                )}
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}