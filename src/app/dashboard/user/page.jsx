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
    FiUser, 
    FiHeart, 
    FiZap
} from 'react-icons/fi';
import { motion } from 'framer-motion';
import { authClient } from '@/lib/auth-client';
import Image from 'next/image';

export default function UserProfile() {
    const { data: session, isPending } = authClient.useSession();
    
    // Using inline fallback approach for user data
    const user = session?.user;

    if (isPending) {
        return <div className='grid place-content-center min-h-[300px]'><Spinner color="success" /></div>;
    }

    // Common styles for the static info blocks (adapted for user theme)
    const infoBlockClass = "bg-zinc-50 dark:bg-[#18181b] p-5 rounded-2xl border border-zinc-100 dark:border-zinc-800 transition-colors hover:border-[#039855]/30";
    const infoTitleClass = "flex items-center gap-2 text-[11px] uppercase font-bold text-zinc-400 mb-2 tracking-wider";

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-5xl mx-auto p-4 md:p-0"
        >
            <Card className="bg-white dark:bg-[#111113] border-none shadow-2xl rounded-[32px] overflow-hidden relative">

                {/* Profile Banner / Cover Photo Area (Greenish Theme) */}
                <div className="w-full h-32 bg-gradient-to-r from-[#039855]/20 via-zinc-100 dark:via-zinc-800 to-transparent dark:from-[#039855]/15" />

                <div className="px-6 md:px-10 pb-10">
                    <div className="flex flex-col md:flex-row gap-8 md:gap-10">

                        {/* Left Side: User Identity (Pulled up over the banner) */}
                        <div className="flex flex-col items-center md:items-start flex-shrink-0 md:w-1/3 md:-mt-16 -mt-12 relative z-10 md:border-r border-zinc-100 dark:border-zinc-800 md:pr-8">
                            
                            {/* User Avatar */}
                            <div className="relative mb-5 group">
                                <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl border-4 border-white dark:border-[#111113] shadow-lg overflow-hidden bg-white dark:bg-zinc-900 transition-transform group-hover:scale-[1.02]">
                                    <Image
                                        src={user?.image || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=300&auto=format&fit=crop"}
                                        width={160}
                                        height={160}
                                        className="w-full h-full object-cover"
                                        alt={user?.name || "User Avatar"}
                                    />
                                </div>

                                {!user?.isBanned && (
                                    <Tooltip content="Update Profile Picture" placement="right">
                                        <motion.button 
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            className="absolute -bottom-2 -right-2 bg-white dark:bg-zinc-800 text-[#039855] p-3 rounded-xl shadow-xl border border-zinc-100 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors z-10"
                                        >
                                            <FiEdit3 size={18} />
                                        </motion.button>
                                    </Tooltip>
                                )}
                            </div>

                            <div className="text-center md:text-left space-y-4 w-full">
                                <div>
                                    <div className="flex items-center justify-center md:justify-start gap-2 mb-1.5">
                                        <FiUser className="text-[#039855] text-sm" />
                                        <p className="text-[11px] font-bold uppercase tracking-widest text-zinc-500">
                                            Travel Enthusiast
                                        </p>
                                    </div>
                                    <h1 className="text-3xl font-black text-black dark:text-white leading-tight">
                                        {user?.name || "Guest User"}
                                    </h1>
                                </div>

                                <div className="space-y-1.5">
                                    <p className="flex items-center justify-center md:justify-start gap-2 text-zinc-500 font-medium text-sm">
                                        <FiMail className="text-zinc-400" /> {user?.email || "guest@example.com"}
                                    </p>
                                    <p className="flex items-center justify-center md:justify-start gap-2 text-zinc-500 font-medium text-sm">
                                        <FiMapPin className="text-zinc-400" /> {user?.location || "Dhaka, Bangladesh"}
                                    </p>
                                </div>

                                <div className="flex justify-center md:justify-start pt-2">
                                    <Chip
                                        variant="flat"
                                        color={user?.isBanned ? "danger" : "success"}
                                        startContent={user?.isBanned ? <FiSlash /> : <FiCheckCircle />}
                                        className={`font-bold text-xs px-3 h-8 border ${user?.isBanned ? "bg-red-50 text-red-600 border-red-200 dark:bg-red-950/30 dark:border-red-900" : "bg-[#039855]/10 text-[#039855] border-[#039855]/20"}`}
                                    >
                                        {user?.isBanned ? "Account Banned" : "Active Traveler"}
                                    </Chip>
                                </div>

                                {user?.isBanned && (
                                    <p className="text-red-500 text-xs font-semibold p-3 bg-red-50 dark:bg-red-950/30 rounded-xl border border-red-200 dark:border-red-900 text-center md:text-left">
                                        * Access restricted due to account policy violation.
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Right Side: Detailed User Info & Stats */}
                        <div className="flex-1 space-y-6 pt-6 md:pt-2">

                            {/* Quick Stats Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                <div className={infoBlockClass}>
                                    <p className={infoTitleClass}><FiZap className="text-[#039855]" /> Total Trips</p>
                                    <p className="text-2xl font-black text-black dark:text-white">{user?.totalTrips || 0}</p>
                                </div>
                                <div className={infoBlockClass}>
                                    <p className={infoTitleClass}><FiMapPin className="text-[#039855]" /> Places Visited</p>
                                    <p className="text-2xl font-black text-black dark:text-white">{user?.placesVisited || 12}</p>
                                </div>
                                <div className={`${infoBlockClass} col-span-2 md:col-span-1`}>
                                    <p className={infoTitleClass}><FiCalendar className="text-[#039855]" /> Member Since</p>
                                    <p className="text-lg font-bold text-zinc-800 dark:text-zinc-100 mt-1">
                                        {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Jan 2024'}
                                    </p>
                                </div>
                            </div>

                            {/* About Me Section */}
                            <div className={infoBlockClass}>
                                <p className={infoTitleClass}><FiUser className="text-[#039855]" /> About Me</p>
                                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
                                    {user?.bio || "Adventure seeker and nature lover. Always looking for the next exciting destination to explore and new cultures to experience."}
                                </p>
                            </div>

                            {/* Travel Style (Static Chips) */}
                            <div className={infoBlockClass}>
                                <p className={infoTitleClass}><FiHeart className="text-[#039855]" /> Travel Style</p>
                                <div className="flex flex-wrap gap-2 pt-1">
                                    {['Mountain Hiking', 'Beach Lover', 'Solo Travel', 'Photography'].map(tag => (
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
                            {!user?.isBanned && (
                                <div className="flex justify-end pt-4">
                                    <Tooltip content="Edit profile details, location, and bio">
                                        <motion.button
                                            whileHover={{ y: -2 }}
                                            className="flex items-center gap-2.5 bg-[#039855] hover:bg-[#027a44] text-white font-bold rounded-2xl px-7 py-3.5 shadow-lg shadow-[#039855]/20 text-sm transition-all"
                                        >
                                            <FiEdit3 />
                                            Edit Full Profile
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