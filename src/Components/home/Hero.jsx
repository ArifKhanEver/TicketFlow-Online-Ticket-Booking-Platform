'use client';

import React, { useState } from 'react';
import { Button, Input } from "@heroui/react";
import { FiMapPin, FiCalendar, FiSearch, FiNavigation } from "react-icons/fi";
import { motion } from "motion/react";

export default function Hero() {
  const [searchParams, setSearchParams] = useState({
    from: '',
    to: '',
    date: '',
    transport: ''
  });

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchParams);
  };

  return (
    <section className="relative w-full py-40 flex flex-col items-center justify-center transition-colors duration-300">
      
      {/* Background Image (Unsplash) */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}
      >
        <div className="absolute inset-0 bg-black/60 dark:bg-black/70" />
      </div>

      <div className="container mx-auto max-w-7xl px-6 md:px-10 relative z-10 flex flex-col items-center text-center pt-20 pb-10">
        
        {/* Text Content */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-12"
        >
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-white leading-tight mb-6">
            Book Your <span className="text-[#039855]">Travel Tickets</span> Now!
          </h1>
          <p className="text-base md:text-xl text-zinc-200">
            Your gateway to seamless travel. Discover routes, select your seats, and book tickets in just a few clicks.
          </p>
        </motion.div>

        {/* Floating Full-Width Search Box */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-6xl bg-white dark:bg-[#141416] border border-zinc-200 dark:border-zinc-800 p-4 md:p-6 rounded-3xl shadow-2xl absolute -bottom-20 left-1/2 -translate-x-1/2"
        >
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row items-center gap-3 w-full">
            
            {/* From Input */}
            <div className="w-full flex-1">
              <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider mb-1 block pl-2 text-left">From</label>
              <div className="relative flex items-center">
                <Input 
                  type="text" 
                  placeholder="E.g. Dhaka" 
                  value={searchParams.from}
                  onChange={(e) => setSearchParams({...searchParams, from: e.target.value})}
                  classNames={{
                    inputWrapper: "h-14 bg-zinc-50 hover:bg-zinc-100 dark:bg-[#0A0A0C] border-none rounded-2xl transition-colors shadow-none px-0",
                    input: "pl-12 text-zinc-900 dark:text-white font-semibold text-base placeholder:font-normal placeholder:text-zinc-400"
                  }}
                />
              </div>
            </div>

            <div className="hidden md:block w-[1px] h-12 bg-zinc-200 dark:bg-zinc-800 self-end mb-1"></div>

            {/* To Input */}
            <div className="w-full flex-1">
              <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider mb-1 block pl-2 text-left">To</label>
              <div className="relative flex items-center">
                <Input 
                  type="text" 
                  placeholder="E.g. Chittagong" 
                  value={searchParams.to}
                  onChange={(e) => setSearchParams({...searchParams, to: e.target.value})}
                  classNames={{
                    inputWrapper: "h-14 bg-zinc-50 hover:bg-zinc-100 dark:bg-[#0A0A0C] border-none rounded-2xl transition-colors shadow-none px-0",
                    input: "pl-12 text-zinc-900 dark:text-white font-semibold text-base placeholder:font-normal placeholder:text-zinc-400"
                  }}
                />
              </div>
            </div>

            <div className="hidden md:block w-[1px] h-12 bg-zinc-200 dark:bg-zinc-800 self-end mb-1"></div>

            {/* Date Input */}
            <div className="w-full flex-[0.8]">
              <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider mb-1 block pl-2 text-left">Date</label>
              <div className="relative flex items-center">
                <Input 
                  type="date" 
                  value={searchParams.date}
                  onChange={(e) => setSearchParams({...searchParams, date: e.target.value})}
                  classNames={{
                    inputWrapper: "h-14 bg-zinc-50 hover:bg-zinc-100 dark:bg-[#0A0A0C] border-none rounded-2xl transition-colors shadow-none px-0",
                    input: "!pl-12 text-zinc-900 dark:text-white font-semibold text-base"
                  }}
                />
              </div>
            </div>

            <div className="hidden md:block w-[1px] h-12 bg-zinc-200 dark:bg-zinc-800 self-end mb-1"></div>

            {/* Transport Type */}
            <div className="w-full flex-[0.8] relative">
              <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider mb-1 block pl-2 text-left">Transport</label>
              <div className="relative flex items-center">
                <FiNavigation className="absolute left-4 text-zinc-400 z-10" size={18} />
                <select 
                  value={searchParams.transport}
                  onChange={(e) => setSearchParams({...searchParams, transport: e.target.value})}
                  className="w-full h-14 pl-12 pr-4 bg-zinc-50 hover:bg-zinc-100 dark:bg-[#0A0A0C] text-zinc-900 dark:text-white font-semibold text-base rounded-2xl appearance-none outline-none transition-colors cursor-pointer"
                >
                  <option value="" className="!text-zinc-500">All Types</option>
                  <option value="Bus" className="!text-zinc-900 dark:!text-white">Bus</option>
                  <option value="Train" className="!text-zinc-900 dark:!text-white">Train</option>
                  <option value="Launch" className="!text-zinc-900 dark:!text-white">Launch</option>
                  <option value="Flight" className="!text-zinc-900 dark:!text-white">Flight</option>
                </select>
              </div>
            </div>

            {/* Search Button */}
            <div className="w-full md:w-auto mt-5 md:mt-0 self-end">
              <Button 
                type="submit"
                className="w-full md:w-auto h-14 px-8 bg-[#039855] hover:bg-[#028046] text-white font-bold rounded-2xl transition-all shadow-xl shadow-[#039855]/30 flex items-center justify-center gap-2 text-base"
              >
                <FiSearch size={20} />
                Search
              </Button>
            </div>

          </form>
        </motion.div>
      </div>
    </section>
  );
}