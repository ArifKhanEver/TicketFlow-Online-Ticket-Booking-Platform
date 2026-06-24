'use client';

import React from 'react';
import { Chip, Card, Tooltip, Spinner } from "@heroui/react";
import { 
    FiSettings, 
    FiMail, 
    FiShield, 
    FiKey, 
    FiCommand, 
    FiServer, 
    FiUsers,
    FiCheckCircle,
    FiLock
} from 'react-icons/fi';
import { motion } from 'framer-motion';
import { authClient } from '@/lib/auth-client';
import Image from 'next/image';

export default function AdminProfile() {
    const { data: session, isPending } = authClient.useSession();
    
    const admin = session?.user;

    if (isPending) {
        return <div className='grid place-content-center min-h-[300px]'><Spinner color="secondary" /></div>;
    }

    // Common styles tailored for the Admin purplish theme
    const infoBlockClass = "bg-zinc-50 dark:bg-[#18181b] p-5 rounded-2xl border border-zinc-100 dark:border-zinc-800 transition-colors hover:border-[#7C3AED]/30 relative overflow-hidden";
    const infoTitleClass = "flex items-center gap-2 text-[11px] uppercase font-bold text-zinc-400 mb-2 tracking-wider relative z-10";

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-5xl mx-auto p-4 md:p-0 md:pb-4"
        >
            <Card className="bg-white dark:bg-[#111113] border-none shadow-2xl rounded-[32px] overflow-hidden relative">

                {/* Admin Banner / Authority Cover Area (Purplish Theme) */}
                <div className="w-full h-32 bg-gradient-to-r from-[#7C3AED]/20 via-zinc-100 dark:via-zinc-800 to-[#7C3AED]/5 dark:from-[#7C3AED]/20" />

                <div className="px-6 md:px-10 pb-10">
                    <div className="flex flex-col md:flex-row gap-8 md:gap-10">

                        {/* Left Side: Admin Identity & Security Clearance */}
                        <div className="flex flex-col items-center md:items-start flex-shrink-0 md:w-1/3 md:-mt-16 -mt-12 relative z-10 md:border-r border-zinc-100 dark:border-zinc-800 md:pr-8">
                            
                            {/* Admin Avatar */}
                            <div className="relative mb-5 group">
                                <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl border-4 border-white dark:border-[#111113] shadow-lg overflow-hidden bg-white dark:bg-zinc-900 transition-transform group-hover:scale-[1.02]">
                                    <Image
                                        src={admin?.image || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop"}
                                        width={160}
                                        height={160}
                                        className="w-full h-full object-cover"
                                        alt={admin?.name || "Admin Avatar"}
                                    />
                                </div>

                                {/* Security Shield Overlay Icon */}
                                <Tooltip content="Security Clearance: Level 5" placement="right">
                                    <div className="absolute -bottom-2 -right-2 bg-white dark:bg-zinc-800 text-[#7C3AED] p-3 rounded-xl shadow-xl border border-zinc-100 dark:border-zinc-700 z-10 cursor-help">
                                        <FiShield size={18} className="fill-[#7C3AED]/20" />
                                    </div>
                                </Tooltip>
                            </div>

                            <div className="text-center md:text-left space-y-4 w-full">
                                <div>
                                    <div className="flex items-center justify-center md:justify-start gap-2 mb-1.5">
                                        <FiCommand className="text-[#7C3AED] text-sm" />
                                        <p className="text-[11px] font-bold uppercase tracking-widest text-zinc-500">
                                            System Administrator
                                        </p>
                                    </div>
                                    <h1 className="text-3xl font-black text-black dark:text-white leading-tight">
                                        {admin?.name || "Super Admin"}
                                    </h1>
                                </div>

                                <div className="space-y-1.5">
                                    <p className="flex items-center justify-center md:justify-start gap-2 text-zinc-500 font-medium text-sm">
                                        <FiMail className="text-zinc-400" /> {admin?.email || "admin@platform.com"}
                                    </p>
                                    <p className="flex items-center justify-center md:justify-start gap-2 text-zinc-500 font-medium text-sm">
                                        <FiServer className="text-zinc-400" /> Main Data Center
                                    </p>
                                </div>

                                <div className="flex justify-center md:justify-start pt-2">
                                    <Chip
                                        variant="flat"
                                        startContent={<FiCheckCircle />}
                                        className="font-bold text-xs px-3 h-8 border bg-[#7C3AED]/10 text-[#7C3AED] border-[#7C3AED]/20"
                                    >
                                        Root Access Granted
                                    </Chip>
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Platform Statistics & Controls */}
                        <div className="flex-1 space-y-6 pt-6 md:pt-2">

                            {/* Platform Metrics Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                <div className={infoBlockClass}>
                                    <p className={infoTitleClass}><FiUsers className="text-[#7C3AED]" /> Total Users</p>
                                    <p className="text-2xl font-black text-black dark:text-white">{admin?.totalUsers || "12.4K"}</p>
                                </div>
                                <div className={infoBlockClass}>
                                    <p className={infoTitleClass}><FiCommand className="text-[#7C3AED]" /> Active Vendors</p>
                                    <p className="text-2xl font-black text-black dark:text-white">{admin?.activeVendors || "342"}</p>
                                </div>
                                <div className={`${infoBlockClass} col-span-2 md:col-span-1`}>
                                    <div className="absolute -right-4 -top-4 w-16 h-16 bg-[#7C3AED]/5 rounded-full blur-xl" />
                                    <p className={infoTitleClass}><FiServer className="text-[#7C3AED]" /> System Status</p>
                                    <p className="text-lg font-bold text-[#039855] mt-1 flex items-center gap-1.5">
                                        <span className="w-2 h-2 rounded-full bg-[#039855] animate-pulse" /> 99.9% Uptime
                                    </p>
                                </div>
                            </div>

                            {/* Administrative Role & Access */}
                            <div className={infoBlockClass}>
                                <p className={infoTitleClass}><FiShield className="text-[#7C3AED]" /> Authorization Profile</p>
                                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
                                    You have full administrative privileges. This account is authorized to manage user data, verify vendor applications, oversee platform security, and modify global settings.
                                </p>
                            </div>

                            {/* Permissions (Static Chips) */}
                            <div className={infoBlockClass}>
                                <p className={infoTitleClass}><FiKey className="text-[#7C3AED]" /> Granted Permissions</p>
                                <div className="flex flex-wrap gap-2 pt-1 relative z-10">
                                    {['User Management', 'Vendor Verification', 'Financial Records', 'System Logs', 'Security Bypass'].map(tag => (
                                        <Chip
                                            key={tag}
                                            variant="flat"
                                            startContent={tag === 'Security Bypass' ? <FiLock size={12} className="text-red-500" /> : undefined}
                                            className={`border border-zinc-200 dark:border-zinc-700 font-semibold text-xs ${tag === 'Security Bypass' ? 'bg-red-50 dark:bg-red-950/30 text-red-600' : 'bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300'}`}
                                        >
                                            {tag}
                                        </Chip>
                                    ))}
                                </div>
                            </div>

                            {/* Main Action Button - Platform Control */}
                            <div className="flex justify-end pt-4">
                                <Tooltip content="Access the main platform control panel">
                                    <motion.button
                                        whileHover={{ y: -2 }}
                                        className="flex items-center gap-2.5 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold rounded-2xl px-7 py-3.5 shadow-lg shadow-[#7C3AED]/25 text-sm transition-all"
                                    >
                                        <FiSettings className="animate-[spin_4s_linear_infinite] hover:animate-none" />
                                        Platform Settings
                                    </motion.button>
                                </Tooltip>
                            </div>

                        </div>
                    </div>
                </div>
            </Card>
        </motion.div>
    );
}