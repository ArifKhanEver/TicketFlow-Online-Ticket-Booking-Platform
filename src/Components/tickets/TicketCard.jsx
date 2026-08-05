'use client';

import React, { useState, useEffect } from 'react';
import { FiClock, FiMapPin, FiTag } from 'react-icons/fi';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function TicketCard({ ticket, idx }) {
    const [timeLeft, setTimeLeft] = useState("");
    const [isDeparted, setIsDeparted] = useState(false);

    useEffect(() => {
        const calculateTimeLeft = () => {
            if (!ticket?.departureDateTime || isNaN(new Date(ticket.departureDateTime).getTime())) {
                setTimeLeft("Schedule Pending");
                return;
            }

            const difference = +new Date(ticket.departureDateTime) - +new Date();
            
            if (difference <= 0) {
                setTimeLeft("Departed");
                setIsDeparted(true);
                return;
            }

            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((difference / 1000 / 60) % 60);
            const seconds = Math.floor((difference / 1000) % 60);

            const daysPart = days > 0 ? `${days}day ` : "";
            
            setTimeLeft(
                `${daysPart}${hours.toString().padStart(2, '0')}h ${minutes.toString().padStart(2, '0')}m ${seconds.toString().padStart(2, '0')}s left`
            );
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 1000);

        return () => clearInterval(timer);
    }, [ticket?.departureDateTime]);

    const getJourneyTimes = () => {
        if (!ticket.departureDateTime) return { departure: "--:--", arrival: "--:--" };
        
        const depDate = new Date(ticket.departureDateTime);
        const arrDate = new Date(depDate.getTime() + (ticket.journeyDuration || 0) * 60 * 60 * 1000);

        const options = { hour: '2-digit', minute: '2-digit', hour12: true };
        return {
            departure: depDate.toLocaleTimeString('en-US', options),
            arrival: arrDate.toLocaleTimeString('en-US', options)
        };
    };

    const { departure, arrival } = getJourneyTimes();

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="group bg-white dark:bg-[#111113] border border-gray-200 dark:border-zinc-800 rounded-[28px] overflow-hidden hover:shadow-xl hover:shadow-[#039855]/5 hover:border-[#039855]/40 transition-all duration-300 flex flex-col md:flex-row items-stretch"
        >
            {/* Left Side Cover Photo */}
            <div className="w-full md:w-64 h-48 md:h-auto relative shrink-0 bg-gray-100 dark:bg-[#141416] overflow-hidden">
                <Image
                    src={ticket.image || "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=600"}
                    alt={ticket.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 256px"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <span className="absolute top-3 left-3 bg-black/70 backdrop-blur-md text-white text-xs font-black px-2.5 py-1 rounded-xl flex items-center gap-1 shadow-sm">
                    <FiTag className="text-white" size={12} /> {ticket.transportType}
                </span>
            </div>

            {/* Right Side Content Areas */}
            <div className="flex-1 p-6 flex flex-col justify-between gap-6">
                
                {/* Fleet Name and Dynamic Countdown Tag */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                    <div>
                        <h3 className="text-xl font-black !text-black dark:!text-white group-hover:text-[#039855] transition-colors mb-1">
                            {ticket.title}
                        </h3>
                        <div className="flex flex-wrap gap-1.5 mt-2">
                            {ticket.perks?.map((perk, pIdx) => (
                                <span key={pIdx} className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-gray-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400">
                                    {perk}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* LIVE COUNTDOWN TIMER */}
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black capitalize tracking-wider shadow-sm border ${
                        isDeparted
                            ? "bg-gray-100 text-gray-500 border-gray-200 dark:bg-zinc-900 dark:text-zinc-600 dark:border-zinc-800"
                            : "bg-orange-50 text-[#F05A28] border-orange-200 dark:bg-[#F05A28]/10 dark:text-[#F05A28] dark:border-[#F05A28]/20 animate-pulse"
                    }`}>
                        <FiClock size={13} />
                        {timeLeft}
                    </div>
                </div>

                {/* Journey Timeline View (Departure -> Est Duration -> Arrival) */}
                <div className="flex items-center justify-between relative max-w-xl w-full">
                    <div className="text-left">
                        <p className="text-xl font-black !text-black dark:!text-white">{departure}</p>
                        <p className="text-xs font-bold text-gray-500 dark:text-zinc-400 mt-0.5 flex items-center gap-1">
                            <FiMapPin size={11} className="text-[#039855]" /> {ticket.from}
                        </p>
                    </div>

                    {/* Dashed Journey Vector Divider */}
                    <div className="flex-1 flex flex-col items-center justify-center px-4 md:px-8 relative">
                        <p className="text-[10px] font-extrabold text-gray-400 dark:text-zinc-500 uppercase tracking-widest mb-1">
                            {ticket.journeyDuration} Hours
                        </p>
                        <div className="w-full flex items-center">
                            <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-zinc-700 z-10" />
                            <div className="flex-1 border-t-2 border-dashed border-gray-300 dark:border-zinc-700" />
                            <div className="w-2 h-2 rounded-full border-2 border-[#039855] bg-white dark:bg-[#111113] z-10" />
                        </div>
                    </div>

                    <div className="text-right">
                        <p className="text-xl font-black !text-black dark:!text-white">{arrival}</p>
                        <p className="text-xs font-bold text-gray-500 dark:text-zinc-400 mt-0.5 flex items-center gap-1 justify-end">
                            <FiMapPin size={11} className="text-[#F05A28]" /> {ticket.to}
                        </p>
                    </div>
                </div>

                {/* Price Label and Action Button */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-zinc-800/60">
                    <div>
                        <p className="text-2xl font-black text-[#039855]">{ticket.price} BDT</p>
                        <p className="text-[11px] font-bold text-gray-500 dark:text-zinc-500 uppercase mt-0.5">
                            {ticket.quantity > 0 ? `${ticket.quantity} Tickets Left` : "Sold Out"}
                        </p>
                    </div>

                    <Link
                        href={isDeparted || ticket.quantity === 0 ? '#' : `/tickets/${ticket._id}`}
                        onClick={(e) => {
                            if (isDeparted || ticket.quantity === 0) e.preventDefault();
                        }}
                        className={`py-3 px-6 font-black rounded-xl transition-all shadow-md text-xs uppercase tracking-wider ${
                            isDeparted || ticket.quantity === 0
                                ? "bg-gray-200 text-gray-400 dark:bg-zinc-800 dark:text-zinc-600 cursor-not-allowed pointer-events-none"
                                : "bg-black hover:bg-[#039855] dark:bg-zinc-100 dark:hover:bg-[#039855] text-white dark:text-black hover:text-white"
                        }`}
                    >
                        {ticket.quantity === 0 ? "Sold Out" : "View Details"}
                    </Link>
                </div>

            </div>
        </motion.div>
    );
}