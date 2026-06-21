'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FiZap, FiCheckCircle, FiDollarSign, FiHeadphones } from "react-icons/fi";

const WhyChooseUs = () => {
    const features = [
        { icon: FiZap, title: "Instant Booking", desc: "No queues. Book your tickets in less than a minute." },
        { icon: FiCheckCircle, title: "Verified Vendors", desc: "All transport operators are strictly verified by admins." },
        { icon: FiDollarSign, title: "Zero Hidden Fees", desc: "Transparent pricing. What you see is what you pay." },
        { icon: FiHeadphones, title: "24/7 Support", desc: "Our dedicated team is here to assist you anytime." }
    ];

    return (
        <section className="py-24 bg-zinc-50 dark:bg-[#0A0A0C]">
            <div className="container mx-auto max-w-7xl px-6 md:px-10">
                <div className="flex flex-col md:flex-row items-center gap-16">
                    <div className="w-full md:w-1/2">
                        <h2 className="text-3xl md:text-5xl font-black text-zinc-900 dark:text-white leading-tight mb-6 tracking-tight">
                            Why Travelers <br /> <span className="text-[#039855]">Trust Us</span>
                        </h2>
                        <p className="text-zinc-500 dark:text-zinc-400 mb-8 text-lg">
                            We provide a seamless, secure, and lightning-fast ticketing experience. Say goodbye to the hassle of traditional bookings.
                        </p>
                    </div>

                    <div className="w-full md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {features.map((item, idx) => {
                            const Icon = item.icon;
                            return (
                                <motion.div 
                                    key={idx}
                                    whileHover={{ y: -5 }}
                                    className="bg-white dark:bg-[#141416] p-6 rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm hover:shadow-xl hover:shadow-[#039855]/10 transition-all duration-300"
                                >
                                    <div className="w-12 h-12 bg-[#039855]/10 rounded-2xl flex items-center justify-center mb-6">
                                        <Icon className="text-xl text-[#039855]" />
                                    </div>
                                    <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">{item.title}</h3>
                                    <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{item.desc}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;