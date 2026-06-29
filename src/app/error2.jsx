'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@heroui/react';
import { FiRefreshCw, FiHome, FiAlertCircle } from 'react-icons/fi';
import Link from 'next/link';

export default function Error({ error, reset }) {
    
    useEffect(() => {
        console.error("TicketFlow App Error:", error);
    }, [error]);

    return (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-zinc-50 dark:bg-[#050505] text-black dark:text-white transition-colors duration-300 px-6 overflow-hidden">
            
            {/* Background Luxury Red/Orange Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-500/10 rounded-full blur-[120px] pointer-events-none" />

            {/* Premium Animated Illustration Box */}
            <div className="relative flex items-center justify-center w-44 h-44 mb-8">
                
                {/* Pulsing Outer Radar Ring */}
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute w-40 h-40 rounded-full border border-red-500/20"
                />

                {/* Broken Compass/Route Map Custom SVG */}
                <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    className="text-red-500 dark:text-red-400 z-10"
                >
                    <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        {/* Broken Needle */}
                        <line x1="12" y1="12" x2="15" y2="9" strokeWidth="2" />
                        <line x1="12" y1="12" x2="8" y2="14" strokeWidth="2" />
                        {/* Detached path dots */}
                        <circle cx="12" cy="5" r="1" fill="currentColor" />
                        <circle cx="17" cy="12" r="1" fill="currentColor" />
                    </svg>
                </motion.div>

                {/* Floating Warning Tag */}
                <div className="absolute bottom-4 right-4 bg-red-500 text-white p-1.5 rounded-xl shadow-lg">
                    <FiAlertCircle size={16} />
                </div>
            </div>

            {/* Error Typography and Messages */}
            <div className="text-center max-w-md relative z-10 mb-8">
                <motion.h2 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-2xl md:text-3xl font-black tracking-tight mb-3"
                >
                    Route <span className="text-red-500">Interrupted</span>
                </motion.h2>
                
                <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-gray-500 dark:text-zinc-400 text-sm leading-relaxed mb-4"
                >
                    Something went wrong while processing this transit loop. The ticket sync or layout engine encountered an unexpected break.
                </motion.p>

                {/* Technical Error Snippet Box for Quick Debugging */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-gray-100 dark:bg-[#111113] border border-gray-200 dark:border-zinc-900 px-4 py-2.5 rounded-xl font-mono text-[11px] text-red-600 dark:text-red-400 truncate max-w-xs mx-auto"
                >
                    {error.message || "Unknown System Exception"}
                </motion.div>
            </div>

            {/* Action Control Buttons */}
            <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-xs sm:max-w-none justify-center"
            >
                {/* Retry Button (Calls next.js built-in reset handler) */}
                <Button 
                    onClick={() => reset()}
                    className="w-full sm:w-auto h-12 px-6 bg-black dark:bg-white text-white dark:text-black font-bold rounded-xl shadow-md flex items-center gap-2 text-xs uppercase tracking-wider"
                    startContent={<FiRefreshCw className="animate-spin-slow" size={14} />}
                >
                    Try Again
                </Button>

                {/* Back to Safety/Home Link */}
                <Button 
                    as={Link}
                    href="/"
                    variant="bordered"
                    className="w-full sm:w-auto h-12 px-6 border-gray-300 dark:border-zinc-800 text-black dark:text-white font-bold rounded-xl flex items-center gap-2 text-xs uppercase tracking-wider hover:bg-gray-100 dark:hover:bg-zinc-900"
                    startContent={<FiHome size={14} />}
                >
                    Go Back Home
                </Button>
            </motion.div>

        </div>
    );
}