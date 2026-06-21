'use client';

import React from 'react';
import { motion } from 'framer-motion';

const StatsCounter = () => {
    const stats = [
        { label: "Happy Travelers", value: "10K+" },
        { label: "Active Routes", value: "250+" },
        { label: "Verified Vendors", value: "50+" },
        { label: "Success Rate", value: "99%" },
    ];

    return (
        <section className="py-20 bg-zinc-50 dark:bg-[#0A0A0C] border-y border-zinc-200 dark:border-zinc-800">
            <div className="container mx-auto max-w-7xl px-6 md:px-10">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 text-center divide-x-0 lg:divide-x divide-zinc-200 dark:divide-zinc-800">
                    {stats.map((stat, idx) => (
                        <motion.div 
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex flex-col items-center justify-center"
                        >
                            <h4 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white mb-2 tracking-tighter">
                                {stat.value}
                            </h4>
                            <p className="text-sm font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsCounter;