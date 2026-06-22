'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FiShield, FiTarget, FiAward, FiUsers, FiArrowRight } from 'react-icons/fi';
import { Button } from '@heroui/react';
import Link from 'next/link';

export default function AboutPage() {
    const coreValues = [
        { icon: FiShield, title: "Uncompromising Security", desc: "Every transaction is encrypted, and every vendor is thoroughly vetted by our administrators." },
        { icon: FiTarget, title: "Our Mission", desc: "To eliminate traditional ticketing hassles by providing a 100% digital, transparent, and seamless booking ecosystem." },
        { icon: FiAward, title: "Premium Excellence", desc: "We prioritize comfort and luxury, handpicking featured routes to ensure an exceptional travel experience." },
        { icon: FiUsers, title: "Community Driven", desc: "Empowering local transport operators (vendors) while providing top-tier convenience to everyday travelers." }
    ];

    return (
        <main className="bg-zinc-50 dark:bg-[#0A0A0C] text-zinc-900 dark:text-white transition-colors duration-300 min-h-screen overflow-hidden">
            
            {/* 1. Hero Section */}
            <section className="relative pt-50 pb-30 bg-zinc-950 text-white overflow-hidden">
                {/* Abstract Background Glow */}
                <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#039855]/20 rounded-full blur-[120px]" />
                <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#F05A28]/20 rounded-full blur-[120px]" />

                <div className="container mx-auto max-w-5xl px-6 md:px-10 text-center relative z-10">
                    <motion.span 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block text-xs font-black tracking-widest text-[#039855] uppercase mb-4"
                    >
                        Redefining Travel Arrangements
                    </motion.span>
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-black tracking-tight leading-tight mb-6"
                    >
                        The Story Behind <br />
                        <span className="bg-gradient-to-r from-[#039855] to-[#F05A28] bg-clip-text text-transparent">TicketFlow</span>
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-zinc-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
                    >
                        We are a specialized ticketing infrastructure built to bridge the gap between premium transport vendors and smart modern travelers.
                    </motion.p>
                </div>
            </section>

            {/* 2. Brand Vision & Narrative */}
            <section className="py-24 container mx-auto max-w-7xl px-6 md:px-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-6">
                            Bridging Convenience <br />
                            With <span className="text-[#039855]">Modern Logistics</span>
                        </h2>
                        <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed mb-6">
                            TicketFlow started with a simple yet ambitious vision: to eliminate standard ticketing friction. No more manual logs, endless phone calls, or long terminal lines. We built a synchronized gateway where transport agencies list premium fleets, and passengers secure seats instantly.
                        </p>
                        <blockquote className="border-l-4 border-[#F05A28] pl-4 italic text-zinc-600 dark:text-zinc-300 bg-zinc-100 dark:bg-[#141416] p-4 rounded-r-2xl font-medium">
                            "Our robust architecture ensures that whether you are an admin orchestrating the ecosystem, a vendor managing routes, or a traveler chasing a sunset, the workflow remains seamless."
                        </blockquote>
                    </div>

                    {/* Minimalist Grid Illustration Placeholder */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="h-64 bg-gradient-to-br from-zinc-200 to-zinc-300 dark:from-zinc-800 dark:to-zinc-900 rounded-[32px] flex items-center justify-center font-bold text-zinc-400 dark:text-zinc-600 shadow-sm">Fleets</div>
                        <div className="h-64 bg-gradient-to-tr from-[#039855]/10 to-[#039855]/20 rounded-[32px] mt-8 flex items-center justify-center font-bold text-[#039855] shadow-sm">Security</div>
                        <div className="h-64 bg-gradient-to-bl from-[#F05A28]/10 to-[#F05A28]/20 rounded-[32px] -mt-8 flex items-center justify-center font-bold text-[#F05A28] shadow-sm">Scale</div>
                        <div className="h-64 bg-gradient-to-tl from-zinc-200 to-zinc-300 dark:from-zinc-800 dark:to-zinc-900 rounded-[32px] flex items-center justify-center font-bold text-zinc-400 dark:text-zinc-600 shadow-sm">Integrity</div>
                    </div>
                </div>
            </section>

            <hr className="border-zinc-200 dark:border-zinc-900 max-w-7xl mx-auto" />

            {/* 3. Core Values Grid */}
            <section className="py-24 container mx-auto max-w-7xl px-6 md:px-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
                        The Principles That <span className="text-[#F05A28]">Drive Us</span>
                    </h2>
                    <p className="text-zinc-500 dark:text-zinc-400 max-w-md mx-auto text-sm">
                        Our entire framework is engineered around security, reliability, and continuous system optimization.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {coreValues.map((value, idx) => {
                        const Icon = value.icon;
                        return (
                            <motion.div 
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="flex gap-5 p-8 bg-white dark:bg-[#141416] border border-zinc-200/60 dark:border-zinc-800/60 rounded-3xl shadow-sm hover:shadow-xl hover:shadow-[#039855]/5 transition-all duration-300"
                            >
                                <div className="w-12 h-12 bg-zinc-50 dark:bg-[#0A0A0C] border border-zinc-200 dark:border-zinc-800 rounded-xl flex items-center justify-center shrink-0">
                                    <Icon className="text-xl text-[#039855]" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">{value.title}</h3>
                                    <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{value.desc}</p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </section>

            {/* 4. Mini Call To Action */}
            <section className="pb-24 container mx-auto max-w-7xl px-6 md:px-10">
                <div className="bg-gradient-to-r from-zinc-900 to-zinc-950 rounded-[40px] p-8 md:p-12 text-center relative overflow-hidden shadow-xl">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#039855]/10 rounded-full blur-[80px]" />
                    <div className="relative z-10 max-w-xl mx-auto">
                        <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-4">Ready to Explore the Platform?</h3>
                        <p className="text-zinc-400 text-sm mb-8">Whether you want to lock down a seat for your next destination or optimize your transit agency sales—we have a tailored solution.</p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <Button as={Link} href="/" className="bg-[#039855] text-white font-bold h-12 px-6 rounded-xl shadow-lg shadow-[#039855]/20">
                                Browse Routes
                            </Button>
                            <Button as={Link} href="/auth/signup" variant="bordered" className="border-zinc-700 text-white hover:bg-zinc-800 font-bold h-12 px-6 rounded-xl flex items-center gap-2">
                                Register Now <FiArrowRight />
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

        </main>
    );
}