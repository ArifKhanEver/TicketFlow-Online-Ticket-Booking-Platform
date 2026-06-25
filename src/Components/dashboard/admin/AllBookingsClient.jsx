'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Chip, Avatar, Button } from '@heroui/react';
import { 
  FiSearch, FiLayers, FiDollarSign, FiInfo, FiClock, 
  FiCheckCircle, FiXCircle, FiMail, FiActivity, FiArrowUpRight,
  FiChevronLeft, FiChevronRight 
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

export default function AllBookingsClient({ 
  initialBookings = [], 
  totalReservations = 0, 
  totalPages = 1,
  currentPage = 1,
  initialSearch = ''
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchText, setSearchText] = useState(initialSearch);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const current = new URLSearchParams(Array.from(searchParams.entries()));
      
      if (searchText) {
        current.set('search', searchText);
      } else {
        current.delete('search');
      }
      current.set('page', '1'); 

      router.push(`${pathname}?${current.toString()}`);
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [searchText, pathname, router, searchParams]);

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set('page', newPage.toString());
    router.push(`${pathname}?${current.toString()}`);
  };

  const statusConfig = {
    paid: { text: "Paid & Secured", bg: "bg-green-500/10 text-green-500 border-green-500/20", icon: FiCheckCircle },
    accepted: { text: "Vendor Approved", bg: "bg-blue-500/10 text-blue-500 border-blue-500/20", icon: FiCheckCircle },
    pending: { text: "Pending Decision", bg: "bg-amber-500/10 text-amber-500 border-amber-500/20", icon: FiClock },
    rejected: { text: "Cancelled Log", bg: "bg-red-500/10 text-red-500 border-red-500/20", icon: FiXCircle }
  };

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
          Total Records: {initialBookings.length}
        </Chip>
      </div>

      {/* Real-time Query Input Box (Backend Sync) */}
      <div className="w-full max-w-sm relative flex items-center">
        <FiSearch className="absolute left-3.5 text-zinc-400 z-10" size={14} />
        <input
          type="text"
          placeholder="Search client, operator or route..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full h-9 pl-10 pr-4 bg-white dark:bg-[#111113] border border-zinc-200 dark:border-zinc-800 focus:border-[#039855] focus:outline-none rounded-xl shadow-xs text-xs font-medium text-zinc-900 dark:text-white transition-colors placeholder:text-zinc-400"
        />
      </div>

      {/* RENDER GRID HUB */}
      {initialBookings.length > 0 ? (
        <div className="w-full space-y-4">
          
          {/* A) MOBILE RESPONSIVE STRUCTURE: Compact Identity Cards Layout */}
          <div className="grid grid-cols-1 gap-3.5 md:hidden">
            <AnimatePresence mode="popLayout">
              {initialBookings.map((booking) => {
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
                      <Avatar src={booking.avatar || "https://cdn-icons-png.flaticon.com/512/6858/6858504.png"} name={booking.userName} size="sm" className="border border-zinc-200 dark:border-zinc-700" />
                      <div>
                        <p className="text-xs font-black text-zinc-900 dark:text-white leading-none">{booking.userName}</p>
                        <p className="text-[10px] font-semibold text-zinc-400 flex items-center gap-1 mt-1"><FiMail size={11} /> {booking.userEmail}</p>
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
                  {initialBookings.map((booking) => {
                    const badge = statusConfig[booking.status] || statusConfig.pending;
                    const StatusIcon = badge.icon;

                    return (
                      <tr key={booking._id} className="border-b border-zinc-100 dark:border-zinc-800/50 hover:bg-zinc-50/40 dark:hover:bg-[#141416]/30 transition-colors">
                        <td className="px-5 py-3 align-middle whitespace-nowrap">
                          <div className="flex items-center gap-2.5">
                            <Avatar src={booking.avatar || "https://cdn-icons-png.flaticon.com/512/6858/6858504.png"} name={booking.customerName} className="w-7 h-7 border border-zinc-200 dark:border-zinc-700 text-[11px]" />
                            <div>
                              <p className="text-xs font-bold text-zinc-900 dark:text-white tracking-tight">{booking.userName}</p>
                              <p className="text-[10px] font-semibold text-zinc-400 mt-0.5 flex items-center gap-1"><FiMail size={11} /> {booking.userEmail}</p>
                            </div>
                          </div>
                        </td>
                        
                        <td className="px-5 py-3 align-middle max-w-xs">
                          <div>
                            <p className="text-xs font-bold text-zinc-900 dark:text-white tracking-tight line-clamp-1">{booking.ticketTitle}</p>
                            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mt-0.5 flex items-center gap-1">
                              <FiArrowUpRight size={11} className="text-[#039855]" /> {booking.route}
                            </p>
                          </div>
                        </td>
                        
                        <td className="px-5 py-3 align-middle text-center font-mono font-bold text-xs text-zinc-800 dark:text-zinc-200">
                          {booking.bookingQuantity}
                        </td>
                        
                        <td className="px-5 py-3 align-middle text-right whitespace-nowrap text-xs font-black text-zinc-900 dark:text-white">
                          <span>{booking.totalPrice?.toLocaleString()}.00 BDT</span>
                        </td>
                        
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

          {/* C) PREMIUM BACKEND PAGINATION CONTROL MATRIX */}
          <div className="w-full flex items-center justify-between pt-2 border-t border-zinc-100 dark:border-zinc-800/80">
            <p className="text-[11px] font-bold text-zinc-400">
              Page <span className="text-zinc-900 dark:text-white">{currentPage}</span> of {totalPages}
            </p>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="flat"
                disabled={currentPage <= 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className="h-8 min-w-0 px-2.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-lg text-xs font-bold"
              >
                <FiChevronLeft size={14} />
              </Button>
              <Button
                size="sm"
                variant="flat"
                disabled={currentPage >= totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                className="h-8 min-w-0 px-2.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-lg text-xs font-bold"
              >
                <FiChevronRight size={14} />
              </Button>
            </div>
          </div>

        </div>
      ) : (
        <div className="text-center py-16 bg-white dark:bg-[#111113] border border-zinc-200 dark:border-zinc-800 rounded-xl max-w-xl mx-auto">
          <FiInfo size={28} className="mx-auto text-zinc-400 mb-2" />
          <p className="text-zinc-500 dark:text-zinc-400 font-bold text-xs">
            No global reservation records found matching the query context.
          </p>
        </div>
      )}
    </motion.div>
  );
}