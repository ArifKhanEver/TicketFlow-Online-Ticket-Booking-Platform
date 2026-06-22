'use client';

import React from 'react';
import { Chip, Card, Tooltip, Spinner } from "@heroui/react";
import { 
    FiEdit3, 
    FiMapPin, 
    FiCalendar, 
    FiMail, 
    FiCheckCircle, 
    FiSlash, 
    FiBriefcase, 
    FiInfo, 
    FiShoppingBag,
    FiStar
} from 'react-icons/fi';
import { motion } from 'framer-motion';
import { authClient } from '@/lib/auth-client';
import Image from 'next/image';

export default function VendorProfile() {
    const { data: session, isPending } = authClient.useSession();
    const vendor = session?.user;

    if (isPending) {
        return <div className='grid place-content-center min-h-[300px]'><Spinner color="warning" /></div>;
    }

    // Common styles for the static info blocks (adapted for vendor theme)
    const infoBlockClass = "bg-zinc-50 dark:bg-[#18181b] p-5 rounded-2xl border border-zinc-100 dark:border-zinc-800 transition-colors hover:border-[#F05A28]/30";
    const infoTitleClass = "flex items-center gap-2 text-[11px] uppercase font-bold text-zinc-400 mb-2 tracking-wider";

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-5xl mx-auto p-4 md:p-0"
        >
            <Card className="bg-white dark:bg-[#111113] border-none shadow-2xl rounded-[32px] overflow-hidden relative">

                {/* Shop Banner / Cover Photo Area */}
                <div className="w-full h-32 bg-gradient-to-r from-[#F05A28]/20 via-zinc-100 dark:via-zinc-800 to-transparent dark:from-[#F05A28]/10" />

                <div className="px-6 md:px-10 pb-10">
                    <div className="flex flex-col md:flex-row gap-8 md:gap-10">

                        {/* Left Side: Store Identity (Pulled up over the banner) */}
                        <div className="flex flex-col items-center md:items-start flex-shrink-0 md:w-1/3 md:-mt-16 -mt-12 relative z-10 md:border-r border-zinc-100 dark:border-zinc-800 md:pr-8">
                            
                            {/* Vendor Avatar / Shop Logo */}
                            <div className="relative mb-5 group">
                                <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl border-4 border-white dark:border-[#111113] shadow-lg overflow-hidden bg-white dark:bg-zinc-900 transition-transform group-hover:scale-[1.02]">
                                    <Image
                                        src={vendor?.image || "https://i.ibb.co.com/Xk4nZxs8/pngtree-man-avatar-image-for-profile-png-image-13001877.png"}
                                        width={160}
                                        height={160}
                                        className="w-full h-full object-cover"
                                        alt={vendor?.name || "Vendor Store Logo"}
                                    />
                                </div>

                                {!vendor?.isBanned && (
                                    <Tooltip content="Update Store Logo" placement="right">
                                        <motion.button 
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            className="absolute -bottom-2 -right-2 bg-white dark:bg-zinc-800 text-[#F05A28] p-3 rounded-xl shadow-xl border border-zinc-100 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors z-10"
                                        >
                                            <FiEdit3 size={18} />
                                        </motion.button>
                                    </Tooltip>
                                )}
                            </div>

                            <div className="text-center md:text-left space-y-4 w-full">
                                <div>
                                    <div className="flex items-center justify-center md:justify-start gap-2 mb-1.5">
                                        <FiBriefcase className="text-[#F05A28] text-sm" />
                                        <p className="text-[11px] font-bold uppercase tracking-widest text-zinc-500">
                                            {vendor?.agency || "Green Line Enterprise"}
                                        </p>
                                    </div>
                                    <h1 className="text-3xl font-black text-black dark:text-white leading-tight">
                                        {vendor?.name || "Akash Ahmed"}
                                    </h1>
                                </div>

                                <div className="space-y-1.5">
                                    <p className="flex items-center justify-center md:justify-start gap-2 text-zinc-500 font-medium text-sm">
                                        <FiMail className="text-zinc-400" /> {vendor?.email || "akash@greenline.com"}
                                    </p>
                                    <p className="flex items-center justify-center md:justify-start gap-2 text-zinc-500 font-medium text-sm">
                                        <FiMapPin className="text-zinc-400" /> {vendor?.location || "Dhaka, Bangladesh"}
                                    </p>
                                </div>

                                <div className="flex justify-center md:justify-start pt-2">
                                    <Chip
                                        variant="flat"
                                        color={vendor?.isBanned ? "danger" : "warning"}
                                        startContent={vendor?.isBanned ? <FiSlash /> : <FiCheckCircle />}
                                        className={`font-bold text-xs px-3 h-8 border ${vendor?.isBanned ? "bg-red-50 text-red-600 border-red-200 dark:bg-red-950/30 dark:border-red-900" : "bg-[#F05A28]/10 text-[#F05A28] border-[#F05A28]/20"}`}
                                    >
                                        {vendor?.isBanned ? "Suspended Account" : "Verified Merchant"}
                                    </Chip>
                                </div>

                                {vendor?.isBanned && (
                                    <p className="text-red-500 text-xs font-semibold p-3 bg-red-50 dark:bg-red-950/30 rounded-xl border border-red-200 dark:border-red-900 text-center md:text-left">
                                        * Storefront restricted due to platform policy violation.
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Right Side: Detailed Store Info & Stats */}
                        <div className="flex-1 space-y-6 pt-6 md:pt-2">

                            {/* Quick Performance Stats */}
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                <div className={infoBlockClass}>
                                    <p className={infoTitleClass}><FiShoppingBag className="text-[#F05A28]" /> Listed Tickets</p>
                                    <p className="text-2xl font-black text-black dark:text-white">{vendor?.totalListedTickets || 0}</p>
                                </div>
                                <div className={infoBlockClass}>
                                    <p className={infoTitleClass}><FiStar className="text-[#F05A28]" /> Store Rating</p>
                                    <p className="text-2xl font-black text-black dark:text-white">{vendor?.rating || "4.9"}</p>
                                </div>
                                <div className={`${infoBlockClass} col-span-2 md:col-span-1`}>
                                    <p className={infoTitleClass}><FiCalendar className="text-[#F05A28]" /> Partner Since</p>
                                    <p className="text-lg font-bold text-zinc-800 dark:text-zinc-100 mt-1">
                                        {vendor?.createdAt ? new Date(vendor.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Jan 2024'}
                                    </p>
                                </div>
                            </div>

                            {/* About Agency Section */}
                            <div className={infoBlockClass}>
                                <p className={infoTitleClass}><FiInfo className="text-[#F05A28]" /> About Agency</p>
                                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
                                    {vendor?.bio || "We provide the best travel experiences and curated ticket packages. Our agency is committed to ensuring safe, reliable, and comfortable journeys for all our customers."}
                                </p>
                            </div>

                            {/* Store Specialties (Static Chips) */}
                            <div className={infoBlockClass}>
                                <p className={infoTitleClass}><FiBriefcase className="text-[#F05A28]" /> Store Specialties</p>
                                <div className="flex flex-wrap gap-2 pt-1">
                                    {['Corporate Deals', 'Group Tours', 'VIP Packages', 'Event Tickets'].map(tag => (
                                        <Chip
                                            key={tag}
                                            variant="flat"
                                            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 font-semibold text-xs"
                                        >
                                            {tag}
                                        </Chip>
                                    ))}
                                </div>
                            </div>

                            {/* Main Action Button */}
                            {!vendor?.isBanned && (
                                <div className="flex justify-end pt-4">
                                    <Tooltip content="Update business details, location, and settings">
                                        <motion.button
                                            whileHover={{ y: -2 }}
                                            className="flex items-center gap-2.5 bg-[#F05A28] hover:bg-[#d94a1d] text-white font-bold rounded-2xl px-7 py-3.5 shadow-lg shadow-[#F05A28]/20 text-sm transition-all"
                                        >
                                            <FiEdit3 />
                                            Manage Storefront
                                        </motion.button>
                                    </Tooltip>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </Card>
        </motion.div>
    );
}