'use client';

import React from 'react';
import { Button } from "@heroui/react";
import { FiBriefcase } from "react-icons/fi";
import Link from 'next/link';

const VendorCTA = () => {
    return (
        <section className="py-24 bg-white dark:bg-[#111113]">
            <div className="container mx-auto max-w-7xl px-6 md:px-10">
                <div className="relative bg-zinc-900 dark:bg-[#141416] rounded-[40px] p-10 md:p-16 overflow-hidden shadow-2xl">
                    
                    {/* Decorative Background Blob */}
                    <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-[#039855] to-[#F05A28] rounded-full blur-[100px] opacity-20"></div>
                    
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
                        <div className="max-w-2xl text-center md:text-left">
                            <h2 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4 tracking-tight">
                                Own a Transport Agency? <br />
                                <span className="text-[#039855]">Grow Your Business</span> With Us.
                            </h2>
                            <p className="text-zinc-400 text-lg">
                                Join our network of verified vendors. Manage tickets, track sales, and reach thousands of daily travelers seamlessly.
                            </p>
                        </div>

                        <div className="shrink-0">
                            <Button 
                                as={Link}
                                href="/auth/signup"
                                className="h-14 px-8 bg-white hover:bg-zinc-200 text-zinc-900 font-black rounded-2xl shadow-xl transition-all duration-300 flex items-center gap-2 text-lg"
                            >
                                <FiBriefcase size={20} /> Register as Vendor
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VendorCTA;