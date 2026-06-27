'use client';

import React, { useState, useEffect } from 'react';
import { Card, Button, Chip } from '@heroui/react';
import {
  FiClock, FiMapPin, FiCalendar, FiDollarSign,
  FiCheckCircle, FiXCircle, FiCreditCard, FiAlertCircle, FiTag, FiLayers,
  FiInfo
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import Image from 'next/image';
import { redirect } from 'next/navigation';

const CountdownTimer = ({ departureTime, status }) => {
  const [timeLeft, setTimeLeft] = useState("");
  const [isPassed, setIsPassed] = useState(false);

  useEffect(() => {
    if (status === "rejected") {
      setTimeLeft("");
      return;
    }

    const calculateTime = () => {
      const difference = +new Date(departureTime) - +new Date();
      if (difference <= 0) {
        setTimeLeft("Expired");
        setIsPassed(true);
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      const dayStr = days > 0 ? `${days}day ` : "";
      setTimeLeft(`${dayStr}${hours}h ${minutes}m ${seconds}s left`);
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [departureTime, status]);

  if (status === "rejected" || !timeLeft) return null;

  return (
    <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider shadow-sm border ${isPassed || status === "paid"
      ? "bg-zinc-50 text-zinc-500 border-zinc-200 dark:bg-zinc-900 dark:text-zinc-500 dark:border-zinc-800"
      : "bg-orange-50 text-[#F05A28] border-orange-200 dark:bg-orange-950/10 dark:text-orange-400 dark:border-orange-900/20 animate-pulse"
      }`}>
      <FiClock size={13} />
      <span>{timeLeft}</span>
    </div>
  );
};

export default function MyBookedTicketsClient({ bookings: initialBookings = [] }) {
  const [bookings, setBookings] = useState(initialBookings);

  const statusBadges = {
    pending: { label: "Pending Approval", bg: "bg-amber-500/10 text-amber-500 border-amber-500/20", icon: FiClock },
    accepted: { label: "Approved by Vendor", bg: "bg-blue-500/10 text-blue-500 border-blue-500/20", icon: FiCheckCircle },
    rejected: { label: "Rejected by Vendor", bg: "bg-red-500/10 text-red-500 border-red-500/20", icon: FiXCircle },
    paid: { label: "Paid & Secured", bg: "bg-green-500/10 text-green-500 border-green-500/20", icon: FiCheckCircle }
  };


  const handlePayment = async () => {
    toast.loading("Invoking Stripe Checkout Gateway...", { id: "stripe" });

    try {
      const res = await fetch('/api/subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });

      const data = await res.json();
      console.log("Stripe Session Data Response:", data); // 🎯 কনসোলে চেক করার জন্য

      if (data?.url) {
        // ডিরেক্ট উইন্ডো লোকেশন চেঞ্জ
        window.location.href = data.url;
      } else {
        toast.error(data?.error || "Failed to parse checkout registry.", { id: "stripe" });
      }

    } catch (error) {
      console.error("Redirection pipeline broken:", error);
      toast.error("Stripe gateway handshaking failure.", { id: "stripe" });
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 md:px-6 space-y-8">
      {/* Upper Header Typography */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-5 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-zinc-900 dark:text-white tracking-tight">
            My Booked Tickets
          </h1>
          <p className="text-xs font-semibold text-zinc-400 mt-1">
            Review your transactional transit logs, process invoices, and track live departure capsules.
          </p>
        </div>
        <Chip variant="flat" color="success" className="font-bold text-xs uppercase px-2.5">
          Reserves: {bookings?.length ?? 0}
        </Chip>
      </div>

      {/* Stacked Vertical List Container (Horizontal Layout) */}
      <div className="flex flex-col gap-6 w-full">
        <AnimatePresence>
          {bookings.length > 0 ? (
            bookings.map((booking, idx) => {
              const badge = statusBadges[booking.status] || statusBadges.pending;
              const BadgeIcon = badge.icon;
              const totalPrice = booking.unitPrice * booking.bookingQuantity;

              const isDeparturePassed = +new Date(booking.departureDateTime) < +new Date();
              const isPaymentDisabled = isDeparturePassed || booking.status !== 'accepted';

              const depDate = new Date(booking.departureDateTime);
              const arrDate = new Date(depDate.getTime() + (booking.journeyDuration || 6) * 60 * 60 * 1000);
              const arrivalString = arrDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
              const departureString = depDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

              return (
                <motion.div
                  key={booking._id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: idx * 0.04 }}
                >
                  <Card className="bg-white dark:bg-[#111113] border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-xl hover:border-[#039855]/40 transition-all duration-300 flex flex-col md:flex-row items-stretch rounded-[28px] overflow-hidden w-full">

                    {/* Left Side Cover Photo Image */}
                    <div className="w-full md:w-64 h-48 md:h-auto relative shrink-0 bg-zinc-100 dark:bg-zinc-900">
                      <Image
                        src={booking.image || "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=600"}
                        alt={booking.ticketTitle}
                        fill
                        className="object-cover"
                      />
                      <span className="absolute top-3 left-3 text-[10px] font-black tracking-widest uppercase px-2.5 py-1 bg-black/60 backdrop-blur-md text-white rounded-lg shadow-sm flex items-center gap-1">
                        <FiTag size={11} className="text-white" /> Booked
                      </span>
                    </div>

                    {/* Right Side Complex Horizontal Content Space */}
                    <div className="flex-1 p-6 flex flex-col justify-between gap-6">

                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 w-full">
                        <div className="space-y-1">
                          <h3 className="text-lg md:text-xl font-black text-zinc-900 dark:text-white tracking-tight">
                            {booking.ticketTitle}
                          </h3>
                          <div className="flex items-center gap-2">
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-extrabold border rounded-md uppercase tracking-wider ${badge.bg}`}>
                              <BadgeIcon size={10} />
                              {badge.label}
                            </span>
                            <span className="text-[11px] font-bold text-zinc-400 flex items-center gap-1">
                              <FiLayers size={11} /> Allocation: <b>{booking.bookingQuantity} Seats</b>
                            </span>
                          </div>
                        </div>

                        <CountdownTimer departureTime={booking.departureDateTime} status={booking.status} />
                      </div>

                      {/* Journey Vector Timeline */}
                      <div className="flex items-center justify-between relative max-w-xl w-full">
                        <div className="text-left">
                          <p className="text-base md:text-lg font-black text-zinc-900 dark:text-white">{departureString}</p>
                          <p className="text-xs font-bold text-zinc-500 dark:text-zinc-400 mt-0.5 flex items-center gap-1">
                            <FiMapPin size={11} className="text-[#039855]" /> {booking.from}
                          </p>
                        </div>

                        <div className="flex-1 flex flex-col items-center justify-center px-4 md:px-8 relative">
                          <p className="text-[9px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-1">
                            {booking.journeyDuration || 6} Hours
                          </p>
                          <div className="w-full flex items-center">
                            <div className="w-2 h-2 rounded-full bg-zinc-300 dark:bg-zinc-700 z-10" />
                            <div className="flex-1 border-t-2 border-dashed border-zinc-200 dark:border-zinc-800" />
                            <div className="w-2 h-2 rounded-full border-2 border-[#039855] bg-white dark:bg-[#111113] z-10" />
                          </div>
                          <span className="text-[9px] text-zinc-400 font-bold mt-1">
                            {new Date(booking.departureDateTime).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </span>
                        </div>

                        <div className="text-right">
                          <p className="text-base md:text-lg font-black text-zinc-900 dark:text-white">{arrivalString}</p>
                          <p className="text-xs font-bold text-zinc-500 dark:text-zinc-400 mt-0.5 flex items-center gap-1 justify-end">
                            <FiMapPin size={11} className="text-[#F05A28]" /> {booking.to}
                          </p>
                        </div>
                      </div>

                      {/* Card Footer */}
                      <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full">
                        <div className="flex items-baseline gap-2">
                          <div>
                            <p className="text-[9px] font-bold uppercase tracking-wider text-zinc-400">Total Aggregate Fare</p>
                            <p className="text-2xl font-black text-[#039855]">{totalPrice} <span className="text-xs font-bold text-zinc-400">BDT</span></p>
                          </div>
                          <p className="text-[10px] font-bold text-zinc-400">({booking.unitPrice} BDT × {booking.bookingQuantity} seats)</p>
                        </div>

                        <div className="sm:text-right shrink-0">
                          {booking.status === 'accepted' && (
                            <div className="flex flex-col items-end gap-1">
                              <form action="/api/checkout_sessions" method="POST">

                                {/* Simplified to self-closing tags */}
                                <input name="bookingId" value={booking._id} type="hidden" />
                                <input name="totalPrice" value={totalPrice} type="hidden" />

                                <Button
                                  // Re-enabled: Ensure the button is functionally blocked when disabled
                                  disabled={isPaymentDisabled || isDeparturePassed}
                                  type="submit"
                                  className={`h-11 px-6 text-xs font-black uppercase tracking-wider text-white transition-all rounded-xl shadow-md ${isPaymentDisabled || isDeparturePassed
                                      ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-600 cursor-not-allowed shadow-none pointer-events-none"
                                      : "bg-black hover:bg-[#039855] dark:bg-zinc-100 dark:text-black dark:hover:bg-[#039855] dark:hover:text-white"
                                    }`}
                                >
                                  <FiCreditCard size={13} className="mr-1.5" />
                                  {isDeparturePassed ? "Locked / Passed" : "Pay via Stripe"}
                                </Button>
                              </form>

                              {isDeparturePassed && (
                                <span className="text-[9px] font-bold text-red-500 flex items-center gap-0.5 mt-1">
                                  <FiAlertCircle size={10} /> Schedule elapsed. Payment barred.
                                </span>
                              )}
                            </div>
                          )}

                          {booking.status === 'paid' && (
                            <div className="h-10 px-4 bg-green-500/5 border border-green-500/20 text-green-500 rounded-xl flex items-center justify-center text-xs font-black uppercase tracking-wider gap-1.5">
                              <FiCheckCircle size={13} /> Boarding Pass Issued
                            </div>
                          )}

                          {booking.status === 'pending' && (
                            <div className="h-10 px-4 bg-amber-500/5 border border-amber-500/20 text-amber-600 dark:text-amber-500 rounded-xl flex items-center justify-center text-xs font-black uppercase tracking-wider gap-1.5">
                              <FiClock size={13} /> Pending Verification
                            </div>
                          )}

                          {booking.status === 'rejected' && (
                            <div className="h-10 px-4 bg-red-500/5 border border-red-500/20 text-red-500 rounded-xl flex items-center justify-center text-xs font-black uppercase tracking-wider gap-1.5">
                              <FiXCircle size={13} /> Reservation Cancelled
                            </div>
                          )}
                        </div>

                      </div>

                    </div>
                  </Card>
                </motion.div>
              );
            })
          ) : (
            <div className="text-center py-16 bg-white dark:bg-[#111113] border border-zinc-200 dark:border-zinc-800 rounded-2xl max-w-xl mx-auto">
              <FiInfo size={32} className="mx-auto text-zinc-400 mb-2" />
              <p className="text-zinc-500 dark:text-zinc-400 font-bold text-sm">
                No active reservation records found on the server.
              </p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}