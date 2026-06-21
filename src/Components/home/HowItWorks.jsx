'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiShield, FiCreditCard, FiMail } from "react-icons/fi";

const HowItWorks = () => {
    const steps = [
        { icon: FiSearch, title: "Search Route", desc: "Choose your destination and date of travel." },
        { icon: FiShield, title: "Select Vendor", desc: "Pick from top-rated, verified transport providers." },
        { icon: FiCreditCard, title: "Secure Payment", desc: "Pay seamlessly with cards or mobile banking." },
        { icon: FiMail, title: "Get E-Ticket", desc: "Receive your instant e-ticket via email & dashboard." }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
    };

    return (
        <section className="py-24 bg-white dark:bg-[#111113] overflow-hidden">
            <div className="container mx-auto max-w-7xl px-6 md:px-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-black text-zinc-900 dark:text-white mb-4 tracking-tight">
                        How <span className="text-[#039855]">TicketFlow</span> Works
                    </h2>
                    <p className="text-zinc-500 dark:text-zinc-400">Book your next journey in 4 simple steps.</p>
                </div>

                <motion.div 
                    variants={containerVariants} 
                    initial="hidden" 
                    whileInView="visible" 
                    viewport={{ once: true, amount: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative"
                >
                    {/* Background Connecting Line (Visible on lg) */}
                    <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-[2px] bg-zinc-200 dark:bg-zinc-800 -z-10 border-t border-dashed border-zinc-300 dark:border-zinc-700"></div>

                    {steps.map((step, idx) => {
                        const Icon = step.icon;
                        return (
                            <motion.div key={idx} variants={itemVariants} className="flex flex-col items-center text-center relative group">
                                <div className="w-24 h-24 bg-zinc-50 dark:bg-[#141416] border border-zinc-200 dark:border-zinc-800 rounded-3xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 group-hover:border-[#039855]/50 group-hover:shadow-xl group-hover:shadow-[#039855]/20 transition-all duration-300 relative bg-white dark:bg-[#0A0A0C]">
                                    <Icon className="text-3xl text-zinc-700 dark:text-zinc-300 group-hover:text-[#039855] transition-colors" />
                                    {/* Number Badge */}
                                    <div className="absolute -top-3 -right-3 w-8 h-8 bg-[#F05A28] text-white rounded-full flex items-center justify-center font-black border-4 border-white dark:border-[#111113]">
                                        {idx + 1}
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">{step.title}</h3>
                                <p className="text-sm text-zinc-500 dark:text-zinc-400">{step.desc}</p>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
};

export default HowItWorks;