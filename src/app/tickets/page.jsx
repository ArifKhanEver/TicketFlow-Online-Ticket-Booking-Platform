'use client';

import React, { useState } from 'react';
import { Button, Pagination, Input, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
import { FiClock, FiMapPin, FiStar, FiSearch, FiSliders, FiChevronDown, FiFilter } from 'react-icons/fi';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function AllTicketsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedSort, setSelectedSort] = useState('Recommended');
    const [selectedTransports, setSelectedTransports] = useState([]);
    const [selectedAmenities, setSelectedAmenities] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [page, setPage] = useState(1);
    const totalPages = 3;

    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const tickets = [
        { id: "TK-9021", vendor: "Green Line Paribahan", type: "Bus - AC Sleeper", departureTime: "10:00 AM", arrivalTime: "06:30 PM", duration: "8h 30m", from: "Dhaka", to: "Cox's Bazar", price: 35, seats: 12, rating: 4.8, initialMinutesLeft: 165, img: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=600&auto=format&fit=crop" },
        { id: "TK-4412", vendor: "Shohagh Express", type: "Bus - Scania Multi-Axle", departureTime: "11:30 AM", arrivalTime: "08:00 PM", duration: "8h 30m", from: "Dhaka", to: "Cox's Bazar", price: 28, seats: 24, rating: 4.6, initialMinutesLeft: 45, img: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=600&auto=format&fit=crop" },
        { id: "TK-7781", vendor: "Subarna Express", type: "Train - Snigdha", departureTime: "07:00 AM", arrivalTime: "02:15 PM", duration: "7h 15m", from: "Dhaka", to: "Chattogram", price: 18, seats: 42, rating: 4.9, initialMinutesLeft: 12, img: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?q=80&w=600&auto=format&fit=crop" },
        { id: "TK-3290", vendor: "Green Line WaterBus", type: "Launch - Luxury Catamaran", departureTime: "09:00 PM", arrivalTime: "05:00 AM", duration: "8h 00m", from: "Dhaka", to: "Barishal", price: 22, seats: 8, rating: 4.4, initialMinutesLeft: 340, img: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=600&auto=format&fit=crop" },
    ];

    const formatCountdown = (totalMinutes) => {
        if (totalMinutes <= 0) return "Departed";
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours.toString().padStart(2, '0')}h ${minutes.toString().padStart(2, '0')}m left`;
    };

    const handleTransportChange = (value, isChecked) => {
        if (isChecked) setSelectedTransports([...selectedTransports, value]);
        else setSelectedTransports(selectedTransports.filter(item => item !== value));
    };

    const handleAmenityChange = (value, isChecked) => {
        if (isChecked) setSelectedAmenities([...selectedAmenities, value]);
        else setSelectedAmenities(selectedAmenities.filter(item => item !== value));
    };

    return (
        <main className="min-h-screen bg-gray-50 dark:bg-[#050505] text-black dark:text-white transition-colors duration-300 pt-24 pb-16">

            {/* UNIFIED HEADER: Title, Search, Sort & Mobile Toggle combined neatly */}
            <div className="bg-white dark:bg-[#111113] border-b border-gray-200 dark:border-zinc-900 shadow-sm pt-30 pb-6 mb-10">
                <div className="container mx-auto max-w-7xl px-6 md:px-10">

                    {/* Top Row: Title & Mobile Filter Toggle */}
                    <div className="flex flex-row items-center justify-between mb-6">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-black tracking-tight mb-1 !text-black dark:!text-white">Available Tickets</h1>
                            <div className="flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-zinc-400">
                                <span className="text-[#039855]">Dhaka</span>
                                <FiClock size={12} className="mx-1" />
                                <span className="text-[#F05A28]">All Destinations</span>
                            </div>
                        </div>

                        <Button
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                            className="lg:hidden bg-gray-100 dark:bg-[#141416] text-black dark:text-white font-bold border border-gray-200 dark:border-zinc-800 rounded-xl"
                            startContent={<FiFilter />}
                        >
                            <span className="hidden sm:inline">{isFilterOpen ? "Hide Filters" : "Show Filters"}</span>
                            <span className="sm:hidden">{isFilterOpen ? "Hide" : "Filter"}</span>
                        </Button>
                    </div>

                    {/* Bottom Row: Search Bar & HeroUI Dropdown */}
                    <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4 w-full">

                        {/* Search Bar  */}
                        <div className="!w-full md:!col-span-9">
                            <Input
                                type="text"
                                placeholder="Search by route or transport name..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                startContent={<FiSearch className="text-gray-500 dark:text-zinc-500 mr-2 shrink-0" size={20} />}
                                classNames={{
                                    inputWrapper: "h-12 !w-full bg-gray-50 hover:bg-gray-100 dark:bg-[#141416] border border-gray-200 dark:border-zinc-800 rounded-2xl transition-colors px-4",
                                    input: "text-black dark:text-white font-medium text-sm placeholder:text-gray-400"
                                }}
                            />
                        </div>

                        {/* Premium Sort Dropdown */}
                        <div className="w-full md:col-span-3 flex items-center justify-end gap-3">
                            <span className="text-xs font-bold text-gray-500 dark:text-zinc-500 uppercase tracking-widest hidden xl:block shrink-0">
                                Sort By
                            </span>
                            <div className="relative flex items-center w-full flex-1">
                                <select
                                    value={selectedSort}
                                    onChange={(e) => setSelectedSort(e.target.value)}
                                    className="w-full h-12 pl-4 pr-10 !bg-gray-50 hover:bg-gray-100 dark:!bg-[#141416] border border-gray-200 dark:border-zinc-800 !text-black dark:!text-white font-bold rounded-2xl appearance-none outline-none cursor-pointer transition-colors text-sm"
                                >
                                    <option value="Recommended">Recommended</option>
                                    <option value="Price: Low to High">Price: Low to High</option>
                                    <option value="Price: High to Low">Price: High to Low</option>
                                    <option value="Earliest Departure">Earliest Departure</option>
                                </select>
                                <FiChevronDown className="absolute right-4 text-gray-500 pointer-events-none" size={16} />
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div className="container mx-auto max-w-7xl px-6 md:px-10">
                <div className="flex flex-col lg:flex-row gap-8">

                    <aside className={`w-full lg:w-72 shrink-0 ${isFilterOpen ? 'block mb-4' : 'hidden lg:block'}`}>
                        <div className="bg-white dark:bg-[#111113] p-6 rounded-[28px] border border-gray-200 dark:border-zinc-800 shadow-sm sticky top-28">
                            <h3 className="text-base font-black mb-6 flex items-center gap-2 border-b border-gray-100 dark:border-zinc-800 pb-3 !text-black dark:!text-white">
                                <FiSliders className="text-[#039855]" /> Filter Parameters
                            </h3>

                            {/* Transport Type Filter Group */}
                            <div className="mb-6">
                                <h4 className="text-xs font-bold text-gray-500 dark:text-zinc-500 uppercase tracking-wider mb-3">Vehicle Type</h4>
                                <div className="flex flex-col gap-3">
                                    {['Bus', 'Train', 'Launch', 'Flight'].map((type) => (
                                        <label key={type} className="flex items-center gap-3 cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                className="w-4 h-4 accent-[#039855] cursor-pointer"
                                                onChange={(e) => handleTransportChange(type, e.target.checked)}
                                            />
                                            <span className="text-sm font-semibold text-gray-800 dark:text-zinc-300 group-hover:text-[#039855] transition-colors">
                                                {type}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Amenities Filter Group */}
                            <div>
                                <h4 className="text-xs font-bold text-gray-500 dark:text-zinc-500 uppercase tracking-wider mb-3">Amenities</h4>
                                <div className="flex flex-col gap-3">
                                    {['AC Sleeper', 'Wi-Fi Available', 'Meals Included', 'Water Bottle'].map((amenity) => (
                                        <label key={amenity} className="flex items-center gap-3 cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                className="w-4 h-4 accent-[#039855] cursor-pointer"
                                                onChange={(e) => handleAmenityChange(amenity, e.target.checked)}
                                            />
                                            <span className="text-sm font-semibold text-gray-800 dark:text-zinc-300 group-hover:text-[#039855] transition-colors">
                                                {amenity}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </aside>

                    {/* Right Content Area (Horizontal Ticket Lists) */}
                    <div className="flex-1 space-y-6">

                        {tickets.map((ticket, idx) => (
                            <motion.div
                                key={ticket.id}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className="group bg-white dark:bg-[#111113] border border-gray-200 dark:border-zinc-800 rounded-[28px] overflow-hidden hover:shadow-xl hover:shadow-[#039855]/5 hover:border-[#039855]/40 transition-all duration-300 flex flex-col md:flex-row items-stretch"
                            >
                                {/* Left Side: Beautiful Photo Container */}
                                <div className="w-full md:w-64 h-48 md:h-auto relative shrink-0 bg-gray-100 dark:bg-[#141416] overflow-hidden">
                                    <Image
                                        src={ticket.img}
                                        alt={ticket.vendor}
                                        fill
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    {/* Rating Floating Tag */}
                                    <span className="absolute top-3 left-3 bg-black/70 backdrop-blur-md text-amber-400 text-xs font-black px-2.5 py-1 rounded-xl flex items-center gap-1 shadow-sm">
                                        <FiStar className="fill-amber-400" size={12} /> {ticket.rating}
                                    </span>
                                </div>

                                {/* Right Side: Content & Action Elements */}
                                <div className="flex-1 p-6 flex flex-col justify-between gap-6">

                                    {/* Ticket Top Meta Info */}
                                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                                        <div>
                                            <h3 className="text-xl font-black !text-black dark:!text-white group-hover:text-[#039855] transition-colors mb-1">
                                                {ticket.vendor}
                                            </h3>
                                            <p className="text-xs font-bold text-gray-500 dark:text-zinc-500">{ticket.type}</p>
                                        </div>

                                        {/* LIVE COUNTDOWN TIMER BADGE */}
                                        <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider shadow-sm border ${ticket.initialMinutesLeft <= 30
                                            ? "bg-red-50 text-red-600 border-red-200 dark:bg-red-500/10 dark:text-red-500 dark:border-red-500/20 animate-pulse"
                                            : "bg-orange-50 text-[#F05A28] border-orange-200 dark:bg-[#F05A28]/10 dark:text-[#F05A28] dark:border-[#F05A28]/20"
                                            }`}>
                                            <FiClock size={13} />
                                            {formatCountdown(ticket.initialMinutesLeft)}
                                        </div>
                                    </div>

                                    {/* Journey Segment Timeline View */}
                                    <div className="flex items-center justify-between relative max-w-xl">
                                        <div className="text-left">
                                            <p className="text-xl font-black !text-black dark:!text-white">{ticket.departureTime}</p>
                                            <p className="text-xs font-bold text-gray-500 dark:text-zinc-500 mt-0.5 flex items-center gap-1">
                                                <FiMapPin size={11} className="text-[#039855]" /> {ticket.from}
                                            </p>
                                        </div>

                                        {/* Dashed Connecting Line */}
                                        <div className="flex-1 flex flex-col items-center justify-center px-4 md:px-8 relative">
                                            <p className="text-[10px] font-extrabold text-gray-400 dark:text-zinc-500 uppercase tracking-widest mb-1">{ticket.duration}</p>
                                            <div className="w-full flex items-center">
                                                <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-zinc-700 z-10" />
                                                <div className="flex-1 border-t-2 border-dashed border-gray-300 dark:border-zinc-700" />
                                                <div className="w-2 h-2 rounded-full border-2 border-[#039855] bg-white dark:bg-[#111113] z-10" />
                                            </div>
                                        </div>

                                        <div className="text-right">
                                            <p className="text-xl font-black !text-black dark:!text-white">{ticket.arrivalTime}</p>
                                            <p className="text-xs font-bold text-gray-500 dark:text-zinc-500 mt-0.5 flex items-center gap-1 justify-end">
                                                <FiMapPin size={11} className="text-[#F05A28]" /> {ticket.to}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Card Footer Element: Price and CTA */}
                                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-zinc-800/60">
                                        <div>
                                            <p className="text-2xl font-black text-[#039855]">${ticket.price}.00</p>
                                            <p className="text-[11px] font-bold text-gray-500 dark:text-zinc-500 uppercase mt-0.5">{ticket.seats} Seats Remaining</p>
                                        </div>

                                        <Button
                                            as={Link}
                                            href={`/tickets/${ticket.id}`}
                                            className="h-11 px-6 bg-black hover:bg-[#039855] dark:bg-zinc-100 dark:hover:bg-[#039855] text-white dark:text-black hover:text-white font-black rounded-xl transition-all shadow-md text-xs uppercase tracking-wider"
                                        >
                                            View Details
                                        </Button>
                                    </div>

                                </div>
                            </motion.div>
                        ))}

                        {/* Premium Pagination System with Range Stats & Ellipsis Handling */}
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-gray-200 dark:border-zinc-900 mt-12">
                            <span className="text-sm font-bold text-gray-600 dark:text-zinc-400">
                                Showing <span className="!text-black dark:!text-white">1-4</span> of <span className="!text-black dark:!text-white">235</span> tickets
                            </span>

                            <Pagination className="justify-center">
                                <Pagination.Content>
                                    <Pagination.Item>
                                        <Pagination.Previous isDisabled={page === 1} onPress={() => setPage((p) => p - 1)}>
                                            <Pagination.PreviousIcon />
                                            <span>Previous</span>
                                        </Pagination.Previous>
                                    </Pagination.Item>
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                                        <Pagination.Item key={p}>
                                            <Pagination.Link isActive={p === page} onPress={() => setPage(p)}>
                                                {p}
                                            </Pagination.Link>
                                        </Pagination.Item>
                                    ))}
                                    <Pagination.Item>
                                        <Pagination.Next isDisabled={page === totalPages} onPress={() => setPage((p) => p + 1)}>
                                            <span>Next</span>
                                            <Pagination.NextIcon />
                                        </Pagination.Next>
                                    </Pagination.Item>
                                </Pagination.Content>
                            </Pagination>
                        </div>

                    </div>
                </div>
            </div>
        </main>
    );
}