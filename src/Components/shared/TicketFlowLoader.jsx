'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Multi-modal transit modes representing TicketFlow booking categories
const TRANSIT_MODES = [
    {
        id: 'flight',
        name: 'Flights',
        label: 'Aero Transit Grid',
        color: '#039855',
        accentColor: '#10B981',
        icon: (
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.3c.4-.2.6-.6.5-1.1z" />
            </svg>
        ),
    },
    {
        id: 'train',
        name: 'Express Rail',
        label: 'High-Speed Rail Line',
        color: '#0284C7',
        accentColor: '#38BDF8',
        icon: (
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="16" height="16" x="4" y="3" rx="2" />
                <path d="M4 11h16" />
                <path d="M12 3v8" />
                <path d="m8 19-2 3" />
                <path d="m18 22-2-3" />
                <circle cx="8" cy="15" r="1" fill="currentColor" />
                <circle cx="16" cy="15" r="1" fill="currentColor" />
            </svg>
        ),
    },
    {
        id: 'bus',
        name: 'Smart Bus',
        label: 'Intercity Highway Fleet',
        color: '#F05A28',
        accentColor: '#FB923C',
        icon: (
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 6v6" />
                <path d="M16 6v6" />
                <path d="M4 6v8a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4V6a3 3 0 0 0-3-3H7a3 3 0 0 0-3 3z" />
                <path d="M4 14h16" />
                <circle cx="7.5" cy="17.5" r="1" fill="currentColor" />
                <circle cx="16.5" cy="17.5" r="1" fill="currentColor" />
            </svg>
        ),
    },
    {
        id: 'ship',
        name: 'Cruise & Ferry',
        label: 'Maritime Voyage Network',
        color: '#0D9488',
        accentColor: '#2DD4BF',
        icon: (
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1 .6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
                <path d="M19.38 20A11.6 11.6 0 0 0 21 14l-9-4-9 4c0 2.9.94 5.34 2.81 7.76" />
                <path d="M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6" />
                <path d="M12 10V2" />
                <path d="M12 2l4 3" />
            </svg>
        ),
    },
    {
        id: 'ticket',
        name: 'Instant Pass',
        label: 'Verified Booking Token',
        color: '#7C3AED',
        accentColor: '#A78BFA',
        icon: (
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
                <path d="M13 5v2" />
                <path d="M13 17v2" />
                <path d="M13 11v2" />
            </svg>
        ),
    },
];

// Telemetry status messages that cycle dynamically
const TELEMETRY_MESSAGES = [
    { title: 'Connecting to Global Booking Grid', sub: 'Querying real-time travel providers...' },
    { title: 'Synchronizing Live Route Matrix', sub: 'Optimizing seat maps and departure schedules...' },
    { title: 'Securing Verified Fare Gateways', sub: 'Locking guaranteed best rates and seat blocks...' },
    { title: 'Calibrating Passenger Manifest', sub: 'Preparing dynamic boarding pass parameters...' },
    { title: 'Readying Live Ticket Stream', sub: 'Finalizing encrypted reservation payload...' },
];

export default function TicketFlowLoader({
    variant = 'fullscreen', // 'fullscreen' | 'card' | 'compact' | 'inline'
    title,
    subtext,
    themeColor = 'default', // 'default' | 'emerald' | 'coral' | 'violet' | 'sky'
    showTelemetry = true,
    showProgressBar = true,
    className = '',
}) {
    const [modeIndex, setModeIndex] = useState(0);
    const [telemetryIndex, setTelemetryIndex] = useState(0);

    // Cycle through transit icons and telemetry phases
    useEffect(() => {
        const modeInterval = setInterval(() => {
            setModeIndex((prev) => (prev + 1) % TRANSIT_MODES.length);
        }, 2200);

        const telemetryInterval = setInterval(() => {
            setTelemetryIndex((prev) => (prev + 1) % TELEMETRY_MESSAGES.length);
        }, 2800);

        return () => {
            clearInterval(modeInterval);
            clearInterval(telemetryInterval);
        };
    }, []);

    const currentMode = TRANSIT_MODES[modeIndex];
    const currentTelemetry = TELEMETRY_MESSAGES[telemetryIndex];

    // Theme color mappings
    const themeGlows = {
        default: 'from-[#039855]/20 via-[#F05A28]/15 to-teal-500/15',
        emerald: 'from-[#039855]/25 via-emerald-500/15 to-teal-600/10',
        coral: 'from-[#F05A28]/25 via-orange-500/15 to-amber-500/10',
        violet: 'from-[#7C3AED]/25 via-purple-500/15 to-indigo-500/10',
        sky: 'from-[#0284C7]/25 via-sky-500/15 to-cyan-500/10',
    };

    // Compact / Inline mode
    if (variant === 'compact' || variant === 'inline') {
        return (
            <div className={`flex items-center gap-3.5 p-2 ${className}`}>
                <div className="relative w-8 h-8 flex items-center justify-center">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
                        className="absolute inset-0 rounded-full border-2 border-dashed border-[#039855]/40 dark:border-[#039855]/60"
                    />
                    <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
                        className="absolute inset-1 rounded-full border border-zinc-300 dark:border-zinc-700"
                    />
                    <div className="relative z-10 text-[#039855]">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#039855] animate-pulse" />
                    </div>
                </div>
                {title && (
                    <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-300 tracking-wide">
                        {title}
                    </span>
                )}
            </div>
        );
    }

    // Card variant container styling
    const isFullscreen = variant === 'fullscreen';
    const containerClasses = isFullscreen
        ? 'fixed inset-0 z-[100] flex flex-col items-center justify-center bg-zinc-50/95 dark:bg-[#050505]/95 backdrop-blur-2xl transition-colors duration-500 overflow-hidden px-4'
        : `relative flex flex-col items-center justify-center p-8 md:p-12 w-full rounded-3xl bg-white/60 dark:bg-[#0f0f12]/80 backdrop-blur-xl border border-zinc-200/80 dark:border-zinc-800/80 overflow-hidden shadow-xl dark:shadow-2xl ${className}`;

    return (
        <div className={containerClasses} role="status" aria-label="Loading content">
            
            {/* Background Ambient Glows & Dynamic Light Mesh */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
                {/* Primary Pulsing Ambient Orb */}
                <motion.div
                    animate={{
                        scale: [1, 1.25, 1],
                        opacity: [0.35, 0.65, 0.35],
                        rotate: [0, 90, 0],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                    className={`w-[28rem] h-[28rem] md:w-[36rem] md:h-[36rem] rounded-full bg-gradient-to-tr ${themeGlows[themeColor] || themeGlows.default} blur-[110px]`}
                />

                {/* Secondary Accent Counter-Orb */}
                <motion.div
                    animate={{
                        scale: [1.2, 0.9, 1.2],
                        opacity: [0.25, 0.5, 0.25],
                        rotate: [0, -90, 0],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                    className="absolute w-[20rem] h-[20rem] rounded-full bg-gradient-to-br from-[#F05A28]/15 via-emerald-400/10 to-teal-600/15 blur-[90px]"
                />

                {/* Subtle Geometric Background Radar Grid Lines */}
                <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] bg-[radial-gradient(#039855_1px,transparent_1px)] [background-size:24px_24px]" />
            </div>

            {/* Core Visual: Quantum Holographic Transit Gyroscope */}
            <div className="relative flex items-center justify-center w-52 h-52 md:w-60 md:h-60 mb-6 z-10 select-none">
                
                {/* 1. Pulsing Sonar Echo Rings */}
                {[0, 1, 2].map((i) => (
                    <motion.div
                        key={`sonar-${i}`}
                        initial={{ scale: 0.8, opacity: 0.6 }}
                        animate={{ scale: 2.1, opacity: 0 }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            delay: i * 1,
                            ease: 'easeOut',
                        }}
                        className="absolute w-24 h-24 rounded-full border border-emerald-500/25 dark:border-emerald-400/20 pointer-events-none"
                    />
                ))}

                {/* 2. Outer Precision Trajectory Ring */}
                <div className="absolute w-48 h-48 md:w-56 md:h-56 rounded-full border border-zinc-200/90 dark:border-zinc-800/80 shadow-inner" />

                {/* 3. Outer Orbiting Satellite & Trailing Comet Light */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
                    className="absolute w-48 h-48 md:w-56 md:h-56 rounded-full pointer-events-none"
                >
                    {/* Orbiting Beacon */}
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 flex items-center justify-center">
                        <div className="w-4 h-4 rounded-full bg-emerald-400 dark:bg-emerald-300 shadow-[0_0_16px_4px_rgba(3,152,85,0.6)] flex items-center justify-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                        </div>
                    </div>
                </motion.div>

                {/* 4. Middle Counter-Rotating Dashed Navigation Ring */}
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ repeat: Infinity, duration: 12, ease: 'linear' }}
                    className="absolute w-36 h-36 md:w-44 md:h-44 rounded-full border-2 border-dashed border-emerald-600/30 dark:border-emerald-400/25"
                />

                {/* 5. Precision Cardinal Waypoint Markers */}
                <div className="absolute w-36 h-36 md:w-44 md:h-44 rounded-full flex items-center justify-center pointer-events-none">
                    <span className="absolute -top-1 w-2 h-0.5 bg-emerald-500/60 dark:bg-emerald-400/60" />
                    <span className="absolute -bottom-1 w-2 h-0.5 bg-emerald-500/60 dark:bg-emerald-400/60" />
                    <span className="absolute -left-1 w-0.5 h-2 bg-emerald-500/60 dark:bg-emerald-400/60" />
                    <span className="absolute -right-1 w-0.5 h-2 bg-emerald-500/60 dark:bg-emerald-400/60" />
                </div>

                {/* 6. High-Tech Glassmorphic Perforated Ticket Beacon (Center) */}
                <motion.div
                    animate={{
                        y: [-3, 3, -3],
                        boxShadow: [
                            '0 10px 30px -5px rgba(3, 152, 85, 0.2), 0 0 20px 0 rgba(240, 90, 40, 0.1)',
                            '0 20px 40px -5px rgba(3, 152, 85, 0.35), 0 0 30px 2px rgba(240, 90, 40, 0.2)',
                            '0 10px 30px -5px rgba(3, 152, 85, 0.2), 0 0 20px 0 rgba(240, 90, 40, 0.1)',
                        ],
                    }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="relative z-20 w-24 h-24 md:w-28 md:h-28 rounded-3xl bg-white/90 dark:bg-[#121216]/90 backdrop-blur-2xl border-2 border-emerald-500/30 dark:border-emerald-400/25 flex flex-col items-center justify-center shadow-2xl overflow-hidden group"
                >
                    {/* Left & Right Classic Ticket Notches */}
                    <div className="absolute -left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-zinc-50 dark:bg-[#050505] border border-zinc-300 dark:border-zinc-800" />
                    <div className="absolute -right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-zinc-50 dark:bg-[#050505] border border-zinc-300 dark:border-zinc-800" />

                    {/* Top Decorative Micro-Barcode Lines */}
                    <div className="absolute top-2 flex items-center gap-0.5 opacity-30 dark:opacity-40">
                        <span className="w-0.5 h-1.5 bg-zinc-700 dark:bg-zinc-300" />
                        <span className="w-1 h-1.5 bg-zinc-700 dark:bg-zinc-300" />
                        <span className="w-0.5 h-1.5 bg-zinc-700 dark:bg-zinc-300" />
                        <span className="w-1.5 h-1.5 bg-zinc-700 dark:bg-zinc-300" />
                        <span className="w-0.5 h-1.5 bg-zinc-700 dark:bg-zinc-300" />
                        <span className="w-1.5 h-1.5 bg-zinc-700 dark:bg-zinc-300" />
                    </div>

                    {/* Morphing Dynamic Transit Mode Icon */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentMode.id}
                            initial={{ scale: 0.5, opacity: 0, rotate: -20, y: 10 }}
                            animate={{ scale: 1, opacity: 1, rotate: 0, y: 0 }}
                            exit={{ scale: 0.5, opacity: 0, rotate: 20, y: -10 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                            style={{ color: currentMode.color }}
                            className="flex items-center justify-center drop-shadow-[0_2px_12px_rgba(3,152,85,0.4)]"
                        >
                            {currentMode.icon}
                        </motion.div>
                    </AnimatePresence>

                    {/* Bottom Active Mode Label */}
                    <AnimatePresence mode="wait">
                        <motion.span
                            key={currentMode.id}
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            transition={{ duration: 0.2 }}
                            className="text-[9px] font-black uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mt-1"
                        >
                            {currentMode.name}
                        </motion.span>
                    </AnimatePresence>

                    {/* Dynamic Specular Glass Reflection Sheen */}
                    <motion.div
                        animate={{ x: ['-100%', '200%'] }}
                        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1 }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 dark:via-white/10 to-transparent -skew-x-12 pointer-events-none"
                    />
                </motion.div>

                {/* 7. Secondary Orbiting Orange Flare Ring */}
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
                    className="absolute w-28 h-28 md:w-32 md:h-32 rounded-full pointer-events-none"
                >
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#F05A28] shadow-[0_0_12px_3px_#F05A28]" />
                </motion.div>

            </div>

            {/* Typography & Dynamic Telemetry Matrix */}
            <div className="text-center relative z-10 flex flex-col items-center max-w-md w-full px-2">
                
                {/* Glowing Live Radar Pill Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 dark:bg-emerald-950/40 border border-emerald-500/20 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-300 mb-3 backdrop-blur-md shadow-sm">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#039855]" />
                    </span>
                    <span className="text-[10px] md:text-[11px] font-black uppercase tracking-widest">
                        TicketFlow Live Matrix
                    </span>
                </div>

                {/* Main Headline */}
                <h2 className="text-2xl md:text-3xl font-black text-zinc-900 dark:text-white tracking-tight leading-snug mb-1">
                    {title ? (
                        title
                    ) : (
                        <>
                            Preparing Your <span className="bg-gradient-to-r from-[#039855] via-emerald-500 to-[#F05A28] bg-clip-text text-transparent">Journey</span>
                        </>
                    )}
                </h2>

                {/* Dynamic Telemetry Cycling Status Subtext */}
                {showTelemetry && (
                    <div className="h-10 flex flex-col items-center justify-center my-1">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={subtext || currentTelemetry.title}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                transition={{ duration: 0.25 }}
                                className="flex flex-col items-center"
                            >
                                <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 tracking-tight">
                                    {subtext || currentTelemetry.title}
                                </p>
                                <p className="text-xs font-medium text-zinc-400 dark:text-zinc-500">
                                    {currentTelemetry.sub}
                                </p>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                )}

                {/* Ultra-Modern Glowing Shimmer Progress Bar */}
                {showProgressBar && (
                    <div className="w-56 md:w-72 mt-3 flex flex-col items-center gap-1.5">
                        <div className="w-full h-1.5 rounded-full bg-zinc-200/80 dark:bg-zinc-800/90 overflow-hidden relative border border-zinc-300/40 dark:border-zinc-700/50 shadow-inner">
                            <motion.div
                                animate={{
                                    x: ['-100%', '100%'],
                                }}
                                transition={{
                                    duration: 1.6,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                }}
                                className="w-full h-full bg-gradient-to-r from-transparent via-[#039855] to-[#F05A28] rounded-full shadow-[0_0_10px_#039855]"
                            />
                        </div>

                        {/* Telemetry Footnote */}
                        <div className="flex items-center justify-between w-full text-[9px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest pt-0.5">
                            <span>SSL ENCRYPTED</span>
                            <span className="text-emerald-600 dark:text-emerald-400">99.9% SYNC READY</span>
                        </div>
                    </div>
                )}

            </div>

        </div>
    );
}
