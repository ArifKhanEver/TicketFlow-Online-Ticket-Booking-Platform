'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function Loading() {
    return (
        // Full screen overlay
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-zinc-50 dark:bg-[#050505] transition-colors duration-300 overflow-hidden">
            
            {/* Background Abstract Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#039855]/10 rounded-full blur-[100px] pointer-events-none" />

            {/* Animation Container */}
            <div className="relative flex items-center justify-center w-40 h-40 mb-8">
                
                {/* 1. Pulsing Center Globe */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0.5 }}
                    animate={{ scale: [0.8, 1, 0.8], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute z-10 text-[#039855]"
                >
                    {/* Custom Globe SVG */}
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="2" y1="12" x2="22" y2="12" />
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    </svg>
                </motion.div>

                {/* 2. Dashed Route Ring */}
                <div className="absolute w-32 h-32 rounded-full border-2 border-dashed border-zinc-300 dark:border-zinc-700/80" />

                {/* 3. Orbiting Plane Container */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
                    className="absolute w-32 h-32 rounded-full z-20"
                >
                    {/* The Plane Icon (Positioned at the top of the rotating ring) */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-zinc-50 dark:bg-[#050505] p-1 rounded-full text-[#F05A28]">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="rotate-45">
                            <path d="M2.003 5.884L10 9.882l5.5-5.5a1.5 1.5 0 0 1 2.121 2.121L12.12 12l3.998 7.997a1 1 0 0 1-1.782.905l-2.617-5.234-3.414 3.414.59 2.951a.5.5 0 0 1-.892.36l-2-2.5a.5.5 0 0 1 .046-.66l2.368-2.368-3.414-3.414-5.234-2.617a1 1 0 0 1 .905-1.782z" />
                        </svg>
                    </div>
                </motion.div>

            </div>

            {/* Text Content */}
            <div className="text-center relative z-10 flex flex-col items-center">
                <h2 className="text-xl md:text-2xl font-black text-zinc-900 dark:text-white tracking-tight mb-2">
                    Preparing Your <span className="text-[#039855]">Journey</span>
                </h2>
                
                {/* Bouncing Ellipsis Effect */}
                <div className="flex items-center gap-1 text-zinc-500 dark:text-zinc-400 text-sm font-bold uppercase tracking-widest">
                    <span>Searching Routes</span>
                    <motion.div
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
                    >.</motion.div>
                    <motion.div
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                    >.</motion.div>
                    <motion.div
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                    >.</motion.div>
                </div>
            </div>

        </div>
    );
}