'use client';

import React from 'react';

/**
 * TicketFlow Masterclass Loading Spinner
 * A pure, zero-dependency, ultra-aesthetic transit loader tailored for TicketFlow.
 * Uses hardware-accelerated CSS animations and crisp inline SVG vectors.
 */
export default function TicketFlowLoader({
    variant = 'fullscreen', // 'fullscreen' | 'card' | 'compact' | 'inline'
    title,
    subtext,
    themeColor = 'emerald', // 'emerald' | 'coral' | 'violet' | 'sky'
    showProgressBar = true,
    className = '',
}) {
    // Theme color gradients & glow definitions
    const themes = {
        emerald: {
            primary: '#039855',
            secondary: '#10B981',
            accent: '#F05A28',
            glow: 'rgba(3, 152, 85, 0.25)',
            border: 'border-emerald-500/30 dark:border-emerald-500/20',
            badgeBg: 'bg-emerald-500/10 dark:bg-emerald-950/40 border-emerald-500/20 text-emerald-700 dark:text-emerald-300',
            dotColor: 'bg-[#039855]',
        },
        coral: {
            primary: '#F05A28',
            secondary: '#FB923C',
            accent: '#039855',
            glow: 'rgba(240, 90, 40, 0.25)',
            border: 'border-orange-500/30 dark:border-orange-500/20',
            badgeBg: 'bg-orange-500/10 dark:bg-orange-950/40 border-orange-500/20 text-orange-700 dark:text-orange-300',
            dotColor: 'bg-[#F05A28]',
        },
        violet: {
            primary: '#7C3AED',
            secondary: '#A78BFA',
            accent: '#039855',
            glow: 'rgba(124, 58, 237, 0.25)',
            border: 'border-purple-500/30 dark:border-purple-500/20',
            badgeBg: 'bg-purple-500/10 dark:bg-purple-950/40 border-purple-500/20 text-purple-700 dark:text-purple-300',
            dotColor: 'bg-[#7C3AED]',
        },
    };

    const activeTheme = themes[themeColor] || themes.emerald;

    // Compact / Inline Variant (for buttons, small card loaders)
    if (variant === 'compact' || variant === 'inline') {
        return (
            <div className={`inline-flex items-center gap-3 ${className}`} role="status">
                <div className="relative w-7 h-7 flex items-center justify-center">
                    {/* Rotating outer orbit */}
                    <div
                        className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#039855] border-r-[#10B981]"
                        style={{ animation: 'tf-spin 1s linear infinite' }}
                    />
                    {/* Inner counter pulse */}
                    <div
                        className="w-2.5 h-2.5 rounded-full bg-[#039855]"
                        style={{ animation: 'tf-pulse-glow 1.5s ease-in-out infinite' }}
                    />
                </div>
                {title && (
                    <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 tracking-wide">
                        {title}
                    </span>
                )}
            </div>
        );
    }

    const isFullscreen = variant === 'fullscreen';
    const containerClasses = isFullscreen
        ? 'fixed inset-0 z-[100] flex flex-col items-center justify-center bg-zinc-50 dark:bg-[#050505] transition-colors duration-500 overflow-hidden px-4 select-none'
        : `relative flex flex-col items-center justify-center p-8 md:p-12 w-full rounded-3xl bg-white/70 dark:bg-[#0f0f12]/90 backdrop-blur-xl border border-zinc-200/80 dark:border-zinc-800/80 overflow-hidden shadow-xl select-none ${className}`;

    return (
        <div className={containerClasses} role="status" aria-label="Loading TicketFlow">
            
            {/* Ambient Bioluminescent Glows */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
                {/* Primary Emerald Glow Orb */}
                <div
                    className="w-80 h-80 md:w-96 md:h-96 rounded-full bg-[#039855]/15 dark:bg-[#039855]/20 blur-[100px]"
                    style={{ animation: 'tf-pulse-glow 6s ease-in-out infinite' }}
                />
                {/* Secondary Sunset Coral Glow Orb */}
                <div
                    className="absolute w-64 h-64 rounded-full bg-[#F05A28]/10 dark:bg-[#F05A28]/15 blur-[90px] translate-x-20 -translate-y-10"
                    style={{ animation: 'tf-pulse-glow 8s ease-in-out infinite reverse' }}
                />
                {/* Subtle Coordinate Grid Pattern */}
                <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] bg-[radial-gradient(#039855_1px,transparent_1px)] [background-size:24px_24px]" />
            </div>

            {/* Central Masterpiece: Quantum Holographic Ticket Portal */}
            <div className="relative flex items-center justify-center w-52 h-52 md:w-60 md:h-60 mb-6 z-10">
                
                {/* Sonar Ping Echo Wave */}
                <div
                    className="absolute w-28 h-28 rounded-full border border-emerald-500/30 dark:border-emerald-400/25 pointer-events-none"
                    style={{ animation: 'tf-sonar-ping 3s cubic-bezier(0, 0.2, 0.8, 1) infinite' }}
                />
                <div
                    className="absolute w-28 h-28 rounded-full border border-emerald-500/20 dark:border-emerald-400/15 pointer-events-none"
                    style={{ animation: 'tf-sonar-ping 3s cubic-bezier(0, 0.2, 0.8, 1) infinite 1.5s' }}
                />

                {/* Outer Orbit Track Base Ring */}
                <div className="absolute w-44 h-44 md:w-52 md:h-52 rounded-full border border-zinc-200/90 dark:border-zinc-800/80" />

                {/* Outer Clockwise Gradient Orbit Stream */}
                <div
                    className="absolute w-44 h-44 md:w-52 md:h-52 rounded-full pointer-events-none"
                    style={{ animation: 'tf-spin 3s linear infinite' }}
                >
                    {/* Glowing Satellite Beacon Node */}
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 flex items-center justify-center">
                        <div className="w-4 h-4 rounded-full bg-gradient-to-r from-[#039855] to-[#10B981] shadow-[0_0_16px_4px_rgba(3,152,85,0.7)] flex items-center justify-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        </div>
                    </div>
                </div>

                {/* Inner Counter-Clockwise Segmented Ring */}
                <div
                    className="absolute w-36 h-36 md:w-40 md:h-40 rounded-full border-2 border-dashed border-emerald-600/30 dark:border-emerald-400/20 pointer-events-none"
                    style={{ animation: 'tf-spin-reverse 7s linear infinite' }}
                />

                {/* Cardinal Waypoint Marks */}
                <div className="absolute w-36 h-36 md:w-40 md:h-40 rounded-full flex items-center justify-center pointer-events-none">
                    <span className="absolute -top-1 w-2.5 h-0.5 bg-emerald-500/60 dark:bg-emerald-400/60 rounded-full" />
                    <span className="absolute -bottom-1 w-2.5 h-0.5 bg-emerald-500/60 dark:bg-emerald-400/60 rounded-full" />
                    <span className="absolute -left-1 w-0.5 h-2.5 bg-emerald-500/60 dark:bg-emerald-400/60 rounded-full" />
                    <span className="absolute -right-1 w-0.5 h-2.5 bg-emerald-500/60 dark:bg-emerald-400/60 rounded-full" />
                </div>

                {/* Core Holographic Ticket Emblem */}
                <div className="relative z-20 flex items-center justify-center">
                    
                    {/* Ambient Ticket Shadow & Glow */}
                    <div
                        className="absolute inset-0 rounded-2xl bg-emerald-500/20 blur-xl scale-125 pointer-events-none"
                        style={{ animation: 'tf-pulse-glow 3s ease-in-out infinite' }}
                    />

                    {/* Pure Inline Vector Holographic Ticket */}
                    <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-3xl bg-white/95 dark:bg-[#111114]/95 backdrop-blur-2xl border-2 border-emerald-500/35 dark:border-emerald-400/25 shadow-2xl flex flex-col items-center justify-center overflow-hidden">
                        
                        {/* Left & Right Physical Perforation Cutouts */}
                        <div className="absolute -left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-zinc-50 dark:bg-[#050505] border border-zinc-300/80 dark:border-zinc-700/80 shadow-inner" />
                        <div className="absolute -right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-zinc-50 dark:bg-[#050505] border border-zinc-300/80 dark:border-zinc-700/80 shadow-inner" />

                        {/* Top Micro-Barcode Detail */}
                        <div className="absolute top-2.5 flex items-center gap-0.5 opacity-40 dark:opacity-50">
                            <span className="w-0.5 h-2 bg-zinc-800 dark:bg-zinc-200" />
                            <span className="w-1 h-2 bg-zinc-800 dark:bg-zinc-200" />
                            <span className="w-0.5 h-2 bg-zinc-800 dark:bg-zinc-200" />
                            <span className="w-1.5 h-2 bg-zinc-800 dark:bg-zinc-200" />
                            <span className="w-0.5 h-2 bg-zinc-800 dark:bg-zinc-200" />
                            <span className="w-1 h-2 bg-zinc-800 dark:bg-zinc-200" />
                        </div>

                        {/* Ticket Center SVG Icon (Crisp geometric TicketFlow Transit Crest) */}
                        <div className="relative flex flex-col items-center justify-center my-auto pt-2">
                            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" className="text-[#039855] drop-shadow-[0_0_12px_rgba(3,152,85,0.5)]">
                                {/* Ticket Outline */}
                                <path
                                    d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                {/* Center Dashed Perforation Route Line */}
                                <path d="M12 6v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                                <path d="M12 11v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                                <path d="M12 16v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                            </svg>
                        </div>

                        {/* Bottom Mini Brand Label */}
                        <span className="text-[8px] font-black tracking-widest text-[#039855] uppercase pb-2">
                            FLOW PASS
                        </span>

                        {/* Laser Scanner Sweep Beam */}
                        <div
                            className="absolute inset-y-0 w-8 bg-gradient-to-r from-transparent via-[#039855]/40 to-transparent pointer-events-none"
                            style={{ animation: 'tf-laser-sweep 2.4s ease-in-out infinite' }}
                        />

                        {/* Specular Diagonal Sheen Reflection */}
                        <div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-white/10 to-transparent -skew-x-12 pointer-events-none"
                            style={{ animation: 'tf-shimmer 3s ease-in-out infinite' }}
                        />
                    </div>
                </div>

                {/* Secondary Orbiting Amber Particle */}
                <div
                    className="absolute w-28 h-28 md:w-32 md:h-32 rounded-full pointer-events-none"
                    style={{ animation: 'tf-spin-reverse 4.5s linear infinite' }}
                >
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#F05A28] shadow-[0_0_12px_3px_#F05A28]" />
                </div>

            </div>

            {/* Status Information & Micro-Copy */}
            <div className="text-center relative z-10 flex flex-col items-center max-w-sm w-full px-2">
                
                {/* Glowing Live Radar Pill Badge */}
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-3 backdrop-blur-md shadow-sm ${activeTheme.badgeBg}`}>
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className={`relative inline-flex rounded-full h-2 w-2 ${activeTheme.dotColor}`} />
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-widest">
                        TicketFlow Live Matrix
                    </span>
                </div>

                {/* Main Headline */}
                <h2 className="text-xl md:text-2xl font-black text-zinc-900 dark:text-white tracking-tight leading-snug mb-1">
                    {title ? (
                        title
                    ) : (
                        <>
                            Preparing Your <span className="bg-gradient-to-r from-[#039855] via-emerald-500 to-[#F05A28] bg-clip-text text-transparent">Journey</span>
                        </>
                    )}
                </h2>

                {/* Subtext */}
                <p className="text-xs md:text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-3">
                    {subtext || 'Synchronizing live routes, schedules & verified seat availability...'}
                </p>

                {/* Dynamic 3-Bar Waveform Equalizer */}
                <div className="flex items-center gap-1.5 h-4 my-1">
                    <span
                        className="w-1 h-3.5 bg-[#039855] rounded-full"
                        style={{ animation: 'tf-wave-bar 0.9s ease-in-out infinite' }}
                    />
                    <span
                        className="w-1 h-3.5 bg-[#10B981] rounded-full"
                        style={{ animation: 'tf-wave-bar 0.9s ease-in-out infinite 0.3s' }}
                    />
                    <span
                        className="w-1 h-3.5 bg-[#F05A28] rounded-full"
                        style={{ animation: 'tf-wave-bar 0.9s ease-in-out infinite 0.6s' }}
                    />
                </div>

                {/* Sleek Infinite Gradient Progress Bar */}
                {showProgressBar && (
                    <div className="w-48 md:w-60 mt-3 flex flex-col items-center gap-1.5">
                        <div className="w-full h-1.5 rounded-full bg-zinc-200/80 dark:bg-zinc-800/90 overflow-hidden relative border border-zinc-300/40 dark:border-zinc-700/50 shadow-inner">
                            <div
                                className="w-full h-full bg-gradient-to-r from-transparent via-[#039855] to-[#F05A28] rounded-full shadow-[0_0_10px_#039855]"
                                style={{ animation: 'tf-shimmer 1.8s ease-in-out infinite' }}
                            />
                        </div>

                        {/* Micro-telemetry Footer */}
                        <div className="flex items-center justify-between w-full text-[8px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest pt-0.5">
                            <span>SSL ENCRYPTED</span>
                            <span className="text-emerald-600 dark:text-emerald-400">99.9% SYNC READY</span>
                        </div>
                    </div>
                )}

            </div>

        </div>
    );
}
