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

export default function RequestedBookingsPage() {
  // ১. রিকোয়ারমেন্টের ৫টি রুলস কাভার করা রিচ ডামি ডাটা সেট
  const [requests, setRequests] = useState([
    {
      _id: "req_001",
      userName: "Shafiqul Islam Khan",
      userEmail: "shafiqul@example.com",
      ticketTitle: "Hanif Enterprise - Scania Multi-Axle (Dhaka → Barishal)",
      bookingQuantity: 2,
      unitPrice: 1200,
      status: "pending" // প্রাথমিক পেন্ডিং স্টেট
    },
    {
      _id: "req_002",
      userName: "Arif Khan Ever",
      userEmail: "arif.khan@example.com",
      ticketTitle: "Green Line Paribahan - Sleeper Class (Dhaka → Cox's Bazar)",
      bookingQuantity: 1,
      unitPrice: 1800,
      status: "pending"
    },
    {
      _id: "req_003",
      userName: "Tamim Iqbal",
      userEmail: "tamim@example.com",
      ticketTitle: "Subarna Express - Snigdha AC (Dhaka → Chattogram)",
      bookingQuantity: 4,
      unitPrice: 850,
      status: "accepted" // এক্সেপ্টেড স্টেট
    },
    {
      _id: "req_004",
      userName: "Nusrat Jahan",
      userEmail: "nusrat@example.com",
      ticketTitle: "US-Bangla Airlines - Boeing 737 (Dhaka → Sylhet)",
      bookingQuantity: 2,
      unitPrice: 4500,
      status: "rejected" // রিজেক্টেড স্টেট
    }
  ]);

  // ২. বুকিং স্ট্যাটাস ডাইনামিক ফিল্টার/আপডেট লজিক (PATCH API-র বিকল্প মক)
  const handleStatusAction = (id, actionStatus) => {
    toast.loading(`Processing booking queue token...`, { id: "status_update" });

    setTimeout(() => {
      setRequests(prev => prev.map(req => {
        if (req._id === id) {
          return { ...req, status: actionStatus };
        }
        return req;
      }));
      
      if (actionStatus === "accepted") {
        toast.success("Booking request accepted! Waiting for user payment checkout.", { id: "status_update" });
      } else {
        toast.error("Booking request rejected and purged from pipeline.", { id: "status_update" });
      }
    }, 1000);
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
          Pending Inbound: {requests.filter(r => r.status === 'pending').length}
        </Chip>
      </div>

      {/* ১০০% রেসপন্সিভ এবং ক্র্যাশ-ফ্রি নেটিভ রিয়্যাক্ট-টেলউইন্ড টেবিল */}
      {requests.length > 0 ? (
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
                {requests.map((req) => {
                  // টোটাল প্রাইস ক্যালকুলেশন লজিক (unit price * bookingQuantity)
                  const totalPrice = req.unitPrice * req.bookingQuantity;

                  return (
                    <tr 
                      key={req._id}
                      className="border-b border-zinc-100 dark:border-zinc-800/50 hover:bg-zinc-50/50 dark:hover:bg-[#141416]/40 transition-colors"
                    >
                      {/* 1. User Name & Email Specification Cell */}
                      <td className="px-6 py-4.5 align-middle whitespace-nowrap">
                        <div className="space-y-0.5">
                          <p className="text-sm font-black text-zinc-900 dark:text-white flex items-center gap-1.5">
                            <FiUser size={13} className="text-zinc-400" /> {req.userName}
                          </p>
                          <p className="text-xs font-semibold text-zinc-400 flex items-center gap-1.5">
                            <FiMail size={12} /> {req.userEmail}
                          </p>
                        </div>
                      </td>
                      
                      {/* 2. Ticket Title / Fleet Context Cell */}
                      <td className="px-6 py-4.5 align-middle max-w-xs">
                        <p className="text-sm font-black text-zinc-900 dark:text-white leading-tight line-clamp-2">
                          {req.ticketTitle}
                        </p>
                      </td>
                      
                      {/* 3. Seating Quantity Counter Allocation Cell */}
                      <td className="px-6 py-4.5 align-middle text-center font-mono font-bold text-sm text-zinc-800 dark:text-zinc-200">
                        {req.bookingQuantity}
                      </td>
                      
                      {/* 4. Total Price Evaluation Matrix Cell */}
                      <td className="px-6 py-4.5 align-middle text-right whitespace-nowrap">
                        <div>
                          <span className="text-sm font-black text-zinc-900 dark:text-white">
                            {totalPrice}.00 BDT
                          </span>
                          <p className="text-[10px] font-bold text-zinc-400">({req.unitPrice} × {req.bookingQuantity})</p>
                        </div>
                      </td>

                      {/* 5. Accept / Reject Control Action Buttons Matrix */}
                      <td className="px-6 py-4.5 align-middle text-center whitespace-nowrap">
                        {req.status === "pending" ? (
                          <div className="flex items-center justify-center gap-2">
                            {/* Accept Button */}
                            <Button
                              size="sm"
                              onClick={() => handleStatusAction(req._id, "accepted")}
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
                              onClick={() => handleStatusAction(req._id, "rejected")}
                              className="font-black text-xs uppercase tracking-wider rounded-xl h-9 px-4"
                              startContent={<FiX size={14} />}
                            >
                              Reject
                            </Button>
                          </div>
                        ) : (
                          /* স্ট্যাটাস পরিবর্তিত হয়ে গেলে যে ক্যাপসুল ব্যাজ দেখাবে */
                          <div className="flex justify-center">
                            <Chip 
                              size="sm" 
                              variant="flat" 
                              color={req.status === "accepted" ? "success" : "danger"}
                              className="font-black uppercase text-[10px] tracking-wider px-2 h-6 rounded-md"
                            >
                              <span className="flex items-center gap-1">
                                {req.status === "accepted" ? <FiCheckCircle size={10} /> : <FiXCircle size={10} />}
                                {req.status === "accepted" ? "Approved" : "Rejected"}
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