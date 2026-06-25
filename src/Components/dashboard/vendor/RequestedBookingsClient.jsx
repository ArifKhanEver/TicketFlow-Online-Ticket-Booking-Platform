'use client';

import React, { useState } from 'react';
import { Chip, Button } from '@heroui/react';
import {
  FiUser, FiMail, FiCheck, FiX, FiLayers,
  FiDollarSign, FiInfo, FiFileText, FiClock,
  FiCheckCircle,
  FiXCircle
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { updateBookingStatus } from '@/lib/actions/bookings';

export default function RequestedBookingsClient({ bookings = [] }) {
  const router = useRouter();

  const [loadingId, setLoadingId] = useState(null);

  const handleStatusAction = async (bookingId, actionStatus) => {
    setLoadingId(bookingId);
    toast.loading(`Synchronizing with server pipeline...`, { id: "status_update" });

    try {
      const serverData = { bookingId, actionStatus };
      const data = await updateBookingStatus('/api/bookings/requested-bookings', serverData);

      if (data.success) {
        router.refresh();

        if (actionStatus === "accepted") {
          toast.success("Request approved! Catalog updated.", { id: "status_update" });
        } else {
          toast.error("Request declined and suppressed.", { id: "status_update" });
        }
      } else {
        toast.error(data.error || "Failed to update status", { id: "status_update" });
      }
    } catch (error) {
      console.error(error);
      toast.error("Network roundtrip latency failure.", { id: "status_update" });
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-5xl mx-auto px-4 md:px-6 space-y-6 pt-6"
    >
      {/* Upper Typography Content Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-5 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-zinc-900 dark:text-white tracking-tight">
            Requested Bookings
          </h1>
          <p className="text-xs font-semibold text-zinc-400 mt-1">
            Audit customer queue matrix streams, allocate dynamic seating quotas, and moderate booking requests.
          </p>
        </div>
        <Chip variant="flat" color="warning" className="font-bold text-xs uppercase px-2.5">
          Pending Inbound: {bookings.filter(r => r.status === 'pending').length}
        </Chip>
      </div>

      {bookings.length > 0 ? (
        <div className="w-full border border-zinc-200 dark:border-zinc-800/80 rounded-2xl overflow-hidden bg-white dark:bg-[#111113] shadow-sm overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            {/* Table Headers Column Setup */}
            <thead>
              <tr className="bg-zinc-50 dark:bg-[#18181b] border-b border-zinc-200 dark:border-zinc-800 text-zinc-400 font-bold text-[11px] uppercase tracking-wider h-12">
                <th className="px-6 align-middle">Customer Specifications</th>
                <th className="px-6 align-middle">Ticket Details Reference</th>
                <th className="px-6 align-middle text-center"><span className="flex items-center gap-1 justify-center"><FiLayers size={12} /> Seats</span></th>
                <th className="px-6 align-middle text-right"><span className="flex items-center gap-1 justify-end"><FiDollarSign size={12} /> Aggregate Price</span></th>
                <th className="px-6 align-middle text-center">Pipeline Actions</th>
              </tr>
            </thead>

            {/* Table Dynamic Content Rows Area */}
            <tbody>
              <AnimatePresence mode="popLayout">
                {bookings.map((booking) => {
                  const totalPrice = booking.unitPrice * booking.bookingQuantity;

                  return (
                    <tr
                      key={booking._id}
                      className="border-b border-zinc-100 dark:border-zinc-800/50 hover:bg-zinc-50/50 dark:hover:bg-[#141416]/40 transition-colors"
                    >
                      {/* 1. User Name & Email Specification Cell */}
                      <td className="px-6 py-4.5 align-middle whitespace-nowrap">
                        <div className="space-y-0.5">
                          <p className="text-sm font-black text-zinc-900 dark:text-white flex items-center gap-1.5">
                            <FiUser size={13} className="text-zinc-400" /> {booking.userName}
                          </p>
                          <p className="text-xs font-semibold text-zinc-400 flex items-center gap-1.5">
                            <FiMail size={12} /> {booking.userEmail}
                          </p>
                        </div>
                      </td>

                      {/* 2. Ticket Title / Fleet Context Cell */}
                      <td className="px-6 py-4.5 align-middle max-w-xs">
                        <p className="text-sm font-black text-zinc-900 dark:text-white leading-tight line-clamp-2">
                          {booking.ticketTitle}
                        </p>
                      </td>

                      {/* 3. Seating Quantity Counter Allocation Cell */}
                      <td className="px-6 py-4.5 align-middle text-center font-mono font-bold text-sm text-zinc-800 dark:text-zinc-200">
                        {booking.bookingQuantity}
                      </td>

                      {/* 4. Total Price Evaluation Matrix Cell */}
                      <td className="px-6 py-4.5 align-middle text-right whitespace-nowrap">
                        <div>
                          <span className="text-sm font-black text-zinc-900 dark:text-white">
                            {totalPrice}.00 BDT
                          </span>
                          <p className="text-[10px] font-bold text-zinc-400">({booking.unitPrice} × {booking.bookingQuantity})</p>
                        </div>
                      </td>

                      {/* 5. Accept / Reject Control Action Buttons Matrix */}
                      <td className="px-6 py-4.5 align-middle text-center whitespace-nowrap">
                        {booking.status === "pending" ? (
                          <div className="flex items-center justify-center gap-2">
                            {/* Accept Button */}
                            <Button
                              size="sm"
                              onClick={() => handleStatusAction(booking._id, "accepted")}
                              className="bg-[#039855] text-white font-black text-xs uppercase tracking-wider rounded-xl h-9 px-4 shadow-sm"
                              startContent={<FiCheck size={14} />}
                            >
                              Accept
                            </Button>

                            {/* Reject Button */}
                            <Button
                              size="sm"
                              variant="flat"
                              color="danger"
                              onClick={() => handleStatusAction(booking._id, "rejected")}
                              className="font-black text-xs uppercase tracking-wider rounded-xl h-9 px-4"
                              startContent={<FiX size={14} />}
                            >
                              Reject
                            </Button>
                          </div>
                        ) : (
                          <div className="flex justify-center">
                            <Chip
                              size="sm"
                              variant="flat"
                              color={booking.status === "accepted" ? "success" : "danger"}
                              className="font-black uppercase text-[10px] tracking-wider px-2 h-6 rounded-md"
                            >
                              <span className="flex items-center gap-1">
                                {booking.status === "accepted" ? <FiCheckCircle size={10} /> : <FiXCircle size={10} />}
                                {booking.status === "accepted" ? "Approved" : "Rejected"}
                              </span>
                            </Chip>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      ) : (
        /* UI Empty Fallback View Dashboard Container */
        <div className="text-center py-20 bg-white dark:bg-[#111113] border border-zinc-200 dark:border-zinc-800 rounded-[24px] max-w-xl mx-auto">
          <FiInfo size={32} className="mx-auto text-zinc-400 mb-3" />
          <p className="text-zinc-500 dark:text-zinc-400 font-bold text-sm">
            No inbound user booking requests correspond to your queue criteria.
          </p>
        </div>
      )}
    </motion.div>
  );
}