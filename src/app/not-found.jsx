'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FiMap, FiHome } from 'react-icons/fi';
import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-zinc-50 dark:bg-[#050505] text-black dark:text-white transition-colors duration-300 px-6 overflow-hidden">
            
            {/* Background Travel Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#F05A28]/10 rounded-full blur-[120px] pointer-events-none" />

            {/* Lost Route Animation */}
            <div className="relative flex items-center justify-center w-44 h-44 mb-8">
                <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                    className="text-[#F05A28] z-10"
                >
                    <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                    </svg>
                </motion.div>
                <div className="absolute font-black text-9xl text-zinc-200/50 dark:text-zinc-800/30 select-none -z-10">
                    404
                </div>
            </div>

            {/* Text Content */}
            <div className="text-center max-w-md relative z-10 mb-8">
                <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-3">
                    Route <span className="text-[#F05A28]">Not Found</span>
                </h2>
                <p className="text-gray-500 dark:text-zinc-400 text-sm leading-relaxed">
                    Oops! It looks like the destination or ticket link you are trying to reach does not exist in our current transit network.
                </p>
            </div>

            {/* Action Button */}
            <Link
                href="/"
                className="h-12 px-6 bg-[#039855] hover:bg-[#028046] text-white font-black rounded-xl shadow-lg shadow-[#039855]/20 flex items-center gap-2 text-xs uppercase tracking-wider"
                startContent={<FiHome size={14} />}
            >
                Back to Station (Home)
            </Link>

        </div>
    );
}