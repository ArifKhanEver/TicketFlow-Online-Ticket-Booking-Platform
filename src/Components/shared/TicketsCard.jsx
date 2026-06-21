import { Button } from '@heroui/react';
import React from 'react';
import { FiArrowRight, FiBriefcase } from 'react-icons/fi';

const TicketsCard = () => {
    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {tickets.map((item) => (
                    <div key={item} className="group bg-white dark:bg-[#141416] border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-[#039855]/10 transition-all duration-300">

                        {/* Image Placeholder */}
                        <div className="h-56 bg-zinc-200 dark:bg-zinc-800 relative">
                            <span className="absolute inset-0 flex items-center justify-center text-zinc-400 dark:text-zinc-600">Ticket Image</span>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-xl font-bold text-zinc-900 dark:text-white">Dhaka to Cox's Bazar</h3>
                                <span className="bg-[#039855]/10 text-[#039855] text-xs font-bold px-3 py-1 rounded-full uppercase">Bus</span>
                            </div>

                            <div className="space-y-3 mb-6">
                                <p className="text-sm text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
                                    <FiBriefcase className="text-[#F05A28]" /> Perks: AC, Wi-Fi, Water
                                </p>
                                <div className="flex justify-between items-center text-lg font-bold">
                                    <span className="text-[#039855]">$45.00</span>
                                    <span className="text-sm font-normal text-zinc-500">12 Seats Left</span>
                                </div>
                            </div>

                            <Button
                                className="w-full h-12 bg-zinc-900 dark:bg-white text-white dark:text-black font-bold rounded-xl hover:bg-[#039855] dark:hover:bg-[#039855] hover:text-white transition-colors flex items-center gap-2"
                            >
                                See Details <FiArrowRight size={18} />
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TicketsCard;