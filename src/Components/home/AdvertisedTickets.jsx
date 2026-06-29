import React from 'react';
import { Button } from "@heroui/react";
import { FiArrowRight, FiCheck, FiLayers, FiTrendingUp } from "react-icons/fi";
import Link from 'next/link';
import { getTickets } from '@/lib/api/tickets';
import Image from 'next/image';

const AdvertisedTickets = async () => {
    const ticketsResponse = await getTickets({ featured: "true", limit: 6 });
    const advertisedTickets = ticketsResponse.tickets || [];

    if (advertisedTickets.length === 0) return null;

    return (
        <section className="py-24 bg-zinc-50 dark:bg-[#0A0A0C] transition-colors duration-300">
            <div className="container mx-auto max-w-7xl px-6 md:px-10">

                {/* Section Header */}
                <div className="mb-16 text-center md:text-left gap-4">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F05A28]/10 text-[#F05A28] rounded-full text-xs font-bold tracking-wider uppercase mb-3">
                            <FiTrendingUp /> Sponsored Routes
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white tracking-tight">
                            Premium <span className="text-[#039855]">Featured</span> Deals
                        </h2>
                        <p className="text-zinc-500 dark:text-zinc-400 max-w-md text-sm md:text-base mt-2">
                            Top-rated intercity routes handpicked by administrators for exceptional luxury and comfort.
                        </p>
                    </div>
                </div>

                {/* Tickets Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {advertisedTickets.map((item) => (
                        <div key={item._id} className="group relative bg-white dark:bg-[#141416] border border-zinc-200/80 dark:border-zinc-800/80 rounded-[32px] p-4 shadow-md hover:shadow-2xl hover:shadow-[#039855]/10 dark:hover:shadow-[#039855]/5 transition-all duration-500 flex flex-col justify-between">

                            {/* Image Box Container */}
                            <div className="h-48 bg-zinc-100 dark:bg-[#1e1e22] rounded-[24px] relative overflow-hidden mb-6 flex items-center justify-center border border-zinc-200/40 dark:border-zinc-800/30">
                                <span className="text-zinc-400 dark:text-zinc-600 font-medium text-sm select-none">        
                                <Image src={item.image || ""} fill alt={item.title} />
                                </span>

                                {/* Transport Type Floating Tag */}
                                <span className="absolute top-4 left-4 bg-white/90 dark:bg-[#141416]/90 backdrop-blur-md text-zinc-900 dark:text-white text-xs font-black px-3 py-1.5 rounded-xl shadow-sm border border-zinc-200/50 dark:border-zinc-800/50 uppercase tracking-wider">
                                    {item.transportType}
                                </span>

                                {/* Premium Spark Tag */}
                                <span className="absolute top-4 right-4 bg-[#F05A28] text-white text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-widest shadow-md">
                                    Featured
                                </span>
                            </div>

                            {/* Content Section */}
                            <div className="px-2">
                                <h3 className="text-2xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-2 group-hover:text-[#039855] transition-colors line-clamp-1">
                                    {item.title}
                                </h3>

                                {/* Price and Seats Count */}
                                <div className="flex items-baseline justify-between border-b border-zinc-100 dark:border-zinc-800/60 pb-4 mb-4">
                                    <div className="flex items-center gap-1">
                                        <span className="text-3xl font-black text-[#039855]">৳ {item.price}</span>
                                        <span className="text-xs font-bold text-zinc-400 dark:text-zinc-500">/ seat</span>
                                    </div>
                                    <span className="inline-flex items-center gap-1.5 text-xs font-bold bg-zinc-100 dark:bg-zinc-800 px-2.5 py-1 rounded-lg text-zinc-600 dark:text-zinc-400">
                                        <FiLayers size={12} className="text-[#F05A28]" /> {item.quantity} Seats Left
                                    </span>
                                </div>

                                {/* Perks Rendered Dynamically from Array */}
                                <div className="mb-6">
                                    <p className="text-[11px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-2">Included Amenities</p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {item.perks?.map((perk, idx) => (
                                            <span key={idx} className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 bg-zinc-50 dark:bg-[#1a1a1e] border border-zinc-200/60 dark:border-zinc-800/60 text-zinc-700 dark:text-zinc-300 rounded-lg">
                                                <FiCheck className="text-[#039855]" size={12} /> {perk}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Action Button */}
                            <div className="px-2 pt-2">
                                <Link
                                    href={`/tickets/${item._id}`}
                                    className="w-full h-12 bg-zinc-900 hover:bg-[#039855] dark:bg-zinc-800 dark:hover:bg-[#039855] text-white font-bold rounded-2xl shadow-lg hover:shadow-[#039855]/20 transition-all duration-300 flex items-center justify-center gap-2 text-sm"
                                >
                                    See Details <FiArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>

                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default AdvertisedTickets;