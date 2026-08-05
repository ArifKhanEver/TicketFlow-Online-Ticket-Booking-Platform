'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Button, Pagination, Input } from "@heroui/react";
import { FiClock, FiSearch, FiSliders, FiChevronDown, FiFilter, FiMapPin } from 'react-icons/fi';
import TicketCard from './TicketCard';

export default function AllTicketsClient({ tickets = [], totalPages = 1, totalCount = 0 }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const itemsPerPage = 8;

    const currentFrom = searchParams.get('from') || '';
    const currentTo = searchParams.get('to') || '';
    const currentSort = searchParams.get('sort') || 'Recommended';
    const currentTransports = searchParams.get('transportType') ? searchParams.get('transportType').split(',') : [];
    const currentPage = Number(searchParams.get('page')) || 1;

    const [fromInput, setFromInput] = useState(currentFrom);
    const [toInput, setToInput] = useState(currentTo);
    const [selectedSort, setSelectedSort] = useState(currentSort);
    const [selectedTransports, setSelectedTransports] = useState(currentTransports);
    const [page, setPage] = useState(currentPage);
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    useEffect(() => {
        const params = new URLSearchParams();

        if (fromInput) params.set("from", fromInput);
        if (toInput) params.set("to", toInput);

        params.set("sort", selectedSort);
        params.set("page", page.toString());

        if (selectedTransports.length > 0) {
            params.set("transportType", selectedTransports.join(','));
        }

        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    }, [fromInput, toInput, selectedSort, selectedTransports, page, pathname, router]);

    const getPageNumbers = () => {
        const pages = [];
        if (totalPages <= 0) return pages;

        pages.push(1);
        if (page > 3 && totalPages > 4) {
            pages.push("ellipsis");
        }

        const start = Math.max(2, page - 1);
        const end = Math.min(totalPages - 1, page + 1);

        for (let i = start; i <= end; i++) {
            if (!pages.includes(i)) pages.push(i);
        }

        if (page < totalPages - 2 && totalPages > 4) {
            pages.push("ellipsis");
        }

        if (totalPages > 1 && !pages.includes(totalPages)) {
            pages.push(totalPages);
        }
        return pages;
    };

    const startItem = totalCount === 0 ? 0 : (page - 1) * itemsPerPage + 1;
    const endItem = Math.min(page * itemsPerPage, totalCount);

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
                                <span className="text-[#F05A28]">Live Fleet Stream</span>
                            </div>
                        </div>

                        <Button
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                            className="lg:hidden bg-gray-100 dark:bg-[#141416] !text-zinc-900 dark:!text-white font-bold border border-gray-200 dark:border-zinc-800 rounded-xl"
                            startContent={<FiFilter />}
                        >
                            {isFilterOpen ? "Hide Filters" : "Show Filters"}
                        </Button>
                    </div>

                    {/* DUAL INPUT FIELD GRAPHICS */}
                    <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4 w-full">
                        <div className="w-full md:col-span-9 grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <Input
                                type="text"
                                placeholder="From (e.g. Dhaka)..."
                                value={fromInput}
                                onChange={(e) => { setFromInput(e.target.value); setPage(1); }}
                                startContent={<FiMapPin className="text-zinc-400 mr-2 shrink-0" size={18} />}
                                classNames={{
                                    inputWrapper: "h-12 w-full bg-gray-50 hover:bg-gray-100 dark:bg-[#141416] border border-gray-200 dark:border-zinc-800 rounded-2xl transition-colors px-4",
                                    input: "text-zinc-900 dark:text-white font-medium text-sm placeholder:text-zinc-400"
                                }}
                            />
                            <Input
                                type="text"
                                placeholder="To (e.g. Cox's Bazar)..."
                                value={toInput}
                                onChange={(e) => { setToInput(e.target.value); setPage(1); }}
                                startContent={<FiSearch className="text-zinc-400 mr-2 shrink-0" size={18} />}
                                classNames={{
                                    inputWrapper: "h-12 w-full bg-gray-50 hover:bg-gray-100 dark:bg-[#141416] border border-gray-200 dark:border-zinc-800 rounded-2xl transition-colors px-4",
                                    input: "text-zinc-900 dark:text-white font-medium text-sm placeholder:text-zinc-400"
                                }}
                            />
                        </div>

                        {/* SORT SELECT SYSTEM */}
                        <div className="w-full md:col-span-3 flex items-center justify-end gap-3">
                            <div className="relative flex items-center w-full">
                                <select
                                    value={selectedSort}
                                    onChange={(e) => { setSelectedSort(e.target.value); setPage(1); }}
                                    className="w-full h-12 pl-4 pr-10 bg-gray-50 hover:bg-gray-100 dark:bg-[#141416] border border-gray-200 dark:border-zinc-800 !text-zinc-900 dark:!text-white font-bold rounded-2xl appearance-none outline-none cursor-pointer transition-colors text-sm"
                                >
                                    <option value="Recommended">Recommended</option>
                                    <option value="Price: Low to High">Price: Low to High</option>
                                    <option value="Price: High to Low">Price: High to Low</option>
                                    <option value="Earliest Departure">Earliest Departure</option>
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

                    {/* FILTER SIDEBAR */}
                    <aside className={`w-full lg:w-72 shrink-0 ${isFilterOpen ? 'block' : 'hidden lg:block'}`}>
                        <div className="bg-white dark:bg-[#111113] p-6 rounded-[28px] border border-gray-200 dark:border-zinc-800 shadow-sm sticky top-28">
                            <h3 className="text-base font-black mb-6 flex items-center gap-2 border-b border-gray-100 dark:border-zinc-800 pb-3 !text-zinc-900 dark:!text-white">
                                <FiSliders className="text-[#039855]" /> Filter Parameters
                            </h3>

                            <div>
                                <h4 className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-3">Vehicle Type</h4>
                                <div className="flex flex-col gap-3">
                                    {['Bus', 'Train', 'Launch', 'Flight'].map((type) => (
                                        <label key={type} className="flex items-center gap-3 cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                checked={selectedTransports.includes(type)}
                                                className="w-4 h-4 accent-[#039855] cursor-pointer"
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        setSelectedTransports([...selectedTransports, type]);
                                                    } else {
                                                        setSelectedTransports(selectedTransports.filter(t => t !== type));
                                                    }
                                                    setPage(1);
                                                }}
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

                    {/* TICKET CARD LIST AND PAGINATION */}
                    <div className="flex-1 space-y-6">
                        {tickets.length > 0 ? (
                            tickets.map((ticket, idx) => (
                                <TicketCard key={ticket._id?.toString() || idx} ticket={ticket} idx={idx} />
                            ))
                        ) : (
                            <div className="text-center py-20 bg-white dark:bg-[#111113] border border-gray-200 dark:border-zinc-800 rounded-[28px]">
                                <p className="text-zinc-500 dark:text-zinc-400 font-bold">No active tickets found matching your query criteria.</p>
                            </div>
                        )}

                        {tickets.length > 0 && (
                            <Pagination className="w-full">
                                <Pagination.Summary>
                                    Showing {startItem}-{endItem} of {totalCount} results
                                </Pagination.Summary>
                                <Pagination.Content>
                                    <Pagination.Item>
                                        <Pagination.Previous isDisabled={page === 1} onPress={() => setPage((p) => p - 1)}>
                                            <Pagination.PreviousIcon />
                                            <span>Previous</span>
                                        </Pagination.Previous>
                                    </Pagination.Item>
                                    {getPageNumbers().map((p, i) =>
                                        p === "ellipsis" ? (
                                            <Pagination.Item key={`ellipsis-${i}`}>
                                                <Pagination.Ellipsis />
                                            </Pagination.Item>
                                        ) : (
                                            <Pagination.Item key={p}>
                                                <Pagination.Link isActive={p === page} onPress={() => setPage(p)}>
                                                    {p}
                                                </Pagination.Link>
                                            </Pagination.Item>
                                        )
                                    )}
                                    <Pagination.Item>
                                        <Pagination.Next isDisabled={page === totalPages} onPress={() => setPage((p) => p + 1)}>
                                            <span>Next</span>
                                            <Pagination.NextIcon />
                                        </Pagination.Next>
                                    </Pagination.Item>
                                </Pagination.Content>
                            </Pagination>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}