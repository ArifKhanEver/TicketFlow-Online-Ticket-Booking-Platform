'use client';

import React, { useState, useMemo } from 'react';
import { Chip, Avatar } from '@heroui/react';
import { 
  FiSearch, FiLayers, FiDollarSign, FiInfo, FiClock, 
  FiCheckCircle, FiXCircle, FiUser, FiMail, FiActivity, FiArrowUpRight 
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

export default function AllBookingsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  // ১. বৈশ্বিক বুকিং ট্র্যাকিং অডিটের জন্য অল-স্ট্যাটাস কাভার করা রিচ ডামি ডাটা সেট
  const [globalBookings, setGlobalBookings] = useState([
    {
      _id: "bk_901",
      customerName: "Shafiqul Islam Khan",
      customerEmail: "shafiqul.khan@example.com",
      ticketTitle: "Hanif Enterprise - Scania Multi-Axle",
      route: "Dhaka → Barishal",
      bookingQuantity: 2,
      totalPrice: 2400,
      status: "paid", // পেইড ও কনফার্মড বুকিং
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100"
    },
    {
      _id: "bk_902",
      customerName: "Arif Khan Ever",
      customerEmail: "arif.khan@gmail.com",
      ticketTitle: "Green Line Paribahan - Sleeper Class",
      route: "Dhaka → Cox's Bazar",
      bookingQuantity: 1,
      totalPrice: 1800,
      status: "accepted", // ভেন্ডর এক্সেপ্ট করেছে, ইউজারের পেমেন্ট বাকি
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100"
    },
    {
      _id: "bk_903",
      customerName: "Rahat Chowdhury",
      customerEmail: "rahat.chow@yahoo.com",
      ticketTitle: "Subarna Express - Snigdha AC",
      route: "Dhaka → Chattogram",
      bookingQuantity: 3,
      totalPrice: 2550,
      status: "pending",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100"
    },
    {
      _id: "bk_904",
      customerName: "Sultana Razia",
      customerEmail: "razia.transit@outlook.com",
      ticketTitle: "US-Bangla Airlines - Boeing 737",
      route: "Dhaka → Sylhet",
      bookingQuantity: 1,
      totalPrice: 4500,
      status: "rejected",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100"
    }
  ]);

  const statusConfig = {
    paid: { text: "Paid & Secured", bg: "bg-green-500/10 text-green-500 border-green-500/20", icon: FiCheckCircle },
    accepted: { text: "Vendor Approved", bg: "bg-blue-500/10 text-blue-500 border-blue-500/20", icon: FiCheckCircle },
    pending: { text: "Pending Decision", bg: "bg-amber-500/10 text-amber-500 border-amber-500/20", icon: FiClock },
    rejected: { text: "Cancelled Log", bg: "bg-red-500/10 text-red-500 border-red-500/20", icon: FiXCircle }
  };

  const filteredBookings = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return globalBookings.filter(booking => 
      booking.customerName.toLowerCase().includes(query) ||
      booking.customerEmail.toLowerCase().includes(query) ||
      booking.ticketTitle.toLowerCase().includes(query) ||
      booking.route.toLowerCase().includes(query)
    );
  }, [searchQuery, globalBookings]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-5xl mx-auto px-4 md:px-6 space-y-5 pt-4"
    >
      {/* Upper Header Container */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4 gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-black text-zinc-900 dark:text-white tracking-tight flex items-center gap-2">
            <FiActivity className="text-[#039855]" size={24} /> Central Booking Matrix
          </h1>
          <p className="text-[11px] font-semibold text-zinc-400 mt-0.5">
            Audit platform-wide transaction streams, observe lifecycle tokens, and analyze distribution queues.
          </p>
        </div>
        <Chip variant="flat" color="success" className="font-bold text-[10px] uppercase px-2 h-6 rounded-md">
          Total Reservations: {globalBookings.length}
        </Chip>
      </div>

      {/* Real-time Query Input Box */}
      <div className="w-full max-w-sm relative flex items-center">
        <FiSearch className="absolute left-3.5 text-zinc-400 z-10" size={14} />
        <input
          type="text"
          placeholder="Filter by Customer, Operator, Route..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-9 pl-10 pr-4 bg-white dark:bg-[#111113] border border-zinc-200 dark:border-zinc-800 focus:border-[#039855] focus:outline-none rounded-xl shadow-xs text-xs font-medium text-zinc-900 dark:text-white transition-colors placeholder:text-zinc-400"
        />
      </div>

      {/* RENDER GRID HUB */}
      {filteredBookings.length > 0 ? (
        <div className="w-full">
          
          {/* A) MOBILE RESPONSIVE STRUCTURE: Compact Identity Cards Layout */}
          <div className="grid grid-cols-1 gap-3.5 md:hidden">
            <AnimatePresence mode="popLayout">
              {filteredBookings.map((booking) => {
                const badge = statusConfig[booking.status] || statusConfig.pending;
                const StatusIcon = badge.icon;

                return (
                  <motion.div
                    key={booking._id}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white dark:bg-[#111113] p-4.5 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-3.5"
                  >
                    <div className="flex items-center gap-2.5">
                      <Avatar src={booking.avatar} name={booking.customerName} size="sm" className="border border-zinc-200 dark:border-zinc-700" />
                      <div>
                        <p className="text-xs font-black text-zinc-900 dark:text-white leading-none">{booking.customerName}</p>
                        <p className="text-[10px] font-semibold text-zinc-400 flex items-center gap-1 mt-1"><FiMail size={11} /> {booking.customerEmail}</p>
                      </div>
                    </div>

                    <div className="space-y-1 text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 pt-1 border-t border-dashed border-zinc-100 dark:border-zinc-800/60">
                      <p className="text-zinc-900 dark:text-zinc-200 font-bold text-xs">{booking.ticketTitle}</p>
                      <div className="flex justify-between pt-1">
                        <span>Route Parameters:</span>
                        <span className="text-zinc-800 dark:text-zinc-300 font-bold">{booking.route}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Allocated Quota:</span>
                        <span className="text-zinc-800 dark:text-zinc-300 font-bold">{booking.bookingQuantity} Seats</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Aggregate Valuation:</span>
                        <span className="text-[#039855] font-black">{booking.totalPrice} BDT</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between">
                      <span className="font-mono text-[9px] text-zinc-400 font-bold uppercase">ID: {booking._id}</span>
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-[9px] font-black border rounded uppercase tracking-wider ${badge.bg}`}>
                        <StatusIcon size={10} />
                        {badge.text}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* B) DESKTOP VIEW: High-Contrast Corporate Grid Table Layout */}
          <div className="hidden md:block w-full border border-zinc-200 dark:border-zinc-800/80 rounded-xl overflow-hidden bg-white dark:bg-[#111113] shadow-xs">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-zinc-50 dark:bg-[#18181b] border-b border-zinc-200 dark:border-zinc-800 text-zinc-400 font-black text-[10px] uppercase tracking-wider h-11">
                  <th className="px-5 align-middle">Customer Token Signature</th>
                  <th className="px-5 align-middle">Fleet Manifest Operator / Routing</th>
                  <th className="px-5 align-middle text-center"><span className="flex items-center gap-1 justify-center"><FiLayers size={11} /> Seats</span></th>
                  <th className="px-5 align-middle text-right"><span className="flex items-center gap-1 justify-end"><FiDollarSign size={11} /> Valuation</span></th>
                  <th className="px-5 align-middle text-center">Lifecycle Status</th>
                </tr>
              </thead>
              
              <tbody>
                <AnimatePresence mode="popLayout">
                  {filteredBookings.map((booking) => {
                    const badge = statusConfig[booking.status] || statusConfig.pending;
                    const StatusIcon = badge.icon;

                    return (
                      <tr 
                        key={booking._id}
                        className="border-b border-zinc-100 dark:border-zinc-800/50 hover:bg-zinc-50/40 dark:hover:bg-[#141416]/30 transition-colors"
                      >
                        {/* 1. Customer Profiles details cell */}
                        <td className="px-5 py-3 align-middle whitespace-nowrap">
                          <div className="flex items-center gap-2.5">
                            <Avatar src={booking.avatar} name={booking.customerName} className="w-7 h-7 border border-zinc-200 dark:border-zinc-700 text-[11px]" />
                            <div>
                              <p className="text-xs font-bold text-zinc-900 dark:text-white tracking-tight">
                                {booking.customerName}
                              </p>
                              <p className="text-[10px] font-semibold text-zinc-400 mt-0.5 flex items-center gap-1">
                                <FiMail size={11} /> {booking.customerEmail}
                              </p>
                            </div>
                          </div>
                        </td>
                        
                        {/* 2. Ticket descriptions and vector routes cell */}
                        <td className="px-5 py-3 align-middle max-w-xs">
                          <div>
                            <p className="text-xs font-bold text-zinc-900 dark:text-white tracking-tight line-clamp-1">
                              {booking.ticketTitle}
                            </p>
                            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mt-0.5 flex items-center gap-1">
                              <FiArrowUpRight size={11} className="text-[#039855]" /> {booking.route}
                            </p>
                          </div>
                        </td>
                        
                        {/* 3. Seating quantity log allocation cell */}
                        <td className="px-5 py-3 align-middle text-center font-mono font-bold text-xs text-zinc-800 dark:text-zinc-200">
                          {booking.bookingQuantity}
                        </td>
                        
                        {/* 4. Pricing Aggregate fare totals */}
                        <td className="px-5 py-3 align-middle text-right whitespace-nowrap text-xs font-black text-zinc-900 dark:text-white">
                          <span>{booking.totalPrice?.toLocaleString()}.00 BDT</span>
                        </td>
                        
                        {/* 5. Booking operational lifecycle badge column */}
                        <td className="px-5 py-3 align-middle text-center whitespace-nowrap">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-[9px] font-black border rounded-md uppercase tracking-wider ${badge.bg}`}>
                            <StatusIcon size={11} />
                            {badge.text}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

        </div>
      ) : (
        /* Empty States Container fallback elements */
        <div className="text-center py-16 bg-white dark:bg-[#111113] border border-zinc-200 dark:border-zinc-800 rounded-xl max-w-xl mx-auto">
          <FiInfo size={28} className="mx-auto text-zinc-400 mb-2" />
          <p className="text-zinc-500 dark:text-zinc-400 font-bold text-xs">
            No active reservation vectors correspond to your query criteria matrix.
          </p>
        </div>
      )}
    </motion.div>
  );
}