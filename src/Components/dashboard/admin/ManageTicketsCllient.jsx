'use client';

import React, { useState, useMemo } from 'react';
import { Chip, Button } from '@heroui/react'; 
import {
  FiSearch, FiCheck, FiX, FiMapPin, FiCalendar,
  FiLayers, FiInfo, FiClock, FiCheckCircle, FiXCircle
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { approveTicket } from '@/lib/actions/ticket';
import { useRouter } from 'next/navigation';

export default function ManageTicketsClient({ tickets = [] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const statusConfig = {
    approved: { text: "Approved", bg: "bg-green-500/10 text-green-500 border-green-500/20", icon: FiCheckCircle },
    pending: { text: "Pending Review", bg: "bg-amber-500/10 text-amber-500 border-amber-500/20", icon: FiClock },
    rejected: { text: "Rejected", bg: "bg-red-500/10 text-red-500 border-red-500/20", icon: FiXCircle }
  };

  const handleStatusUpdate = async (ticketId, actionStatus) => {
    toast.loading(`Updating fleet listing parameters...`, { id: "ticket_sync" });

    try {
      const updateDoc = { ticketId, actionStatus };
      const data = await approveTicket('/api/bookings', updateDoc);

      if (data?.success) {
        router.refresh();
        if (actionStatus === "approved") {
          toast.success("Ticket approved! Visible on platform catalogs.", { id: "ticket_sync" });
        } else {
          toast.error("Ticket rejected and suppressed from main catalogs.", { id: "ticket_sync" });
        }
      } else {
        toast.error(data?.error || "Failed to update ticket parameters.", { id: "ticket_sync" });
      }
    } catch (error) {
      console.error("Frontend synchronization failure log:", error);
      toast.error("Network roundtrip latency failure.", { id: "ticket_sync" });
    }
  };

  const filteredTickets = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    return (tickets || []).filter(ticket =>
      (ticket.title || '').toLowerCase().includes(query) ||
      (ticket.vendorName || '').toLowerCase().includes(query) ||
      (ticket.from || '').toLowerCase().includes(query) ||
      (ticket.to || '').toLowerCase().includes(query)
    );
  }, [searchQuery, tickets]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-5xl mx-auto px-4 md:px-6 space-y-6 pt-4"
    >
      {/* Header Profile Title Box */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-zinc-200 dark:border-zinc-200/10 pb-5 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-zinc-900 dark:text-white tracking-tight flex items-center gap-2">
            <FiLayers className="text-[#039855]" size={26} /> Manage Tickets
          </h1>
          <p className="text-xs font-semibold text-zinc-400 mt-1">
            Audit inbound vendor fleet registries, authenticate transport metadata, and authorize public distribution channels.
          </p>
        </div>
        <Chip variant="flat" color="warning" className="font-bold text-xs uppercase px-2.5 h-7 rounded-lg">
          Pending Verification: {tickets.filter(t => t.status === 'pending').length}
        </Chip>
      </div>

      {/* Real-time Filter Search Input Box */}
      <div className="w-full max-w-md relative flex items-center">
        <FiSearch className="absolute left-4 text-zinc-400 z-10" size={16} />
        <input
          type="text"
          placeholder="Filter by Ticket Title, Operator or Route..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-11 pl-11 pr-4 bg-white dark:bg-[#111113] border border-zinc-200 dark:border-zinc-800 focus:border-[#039855] focus:outline-none rounded-xl shadow-sm text-sm font-medium text-zinc-900 dark:text-white transition-colors placeholder:text-zinc-400"
        />
      </div>

      {/* RENDER VIEW CONTROLLER MATRIX */}
      {filteredTickets.length > 0 ? (
        <div className="w-full">

          {/* A) MOBILE RESPONSIVE VIEW */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            <AnimatePresence mode="popLayout">
              {filteredTickets.map((ticket) => {
                const badge = statusConfig[ticket.status] || statusConfig.pending;
                const StatusIcon = badge.icon;

                return (
                  <motion.div
                    key={ticket._id}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white dark:bg-[#111113] p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4"
                  >
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-500 rounded-md">
                        {ticket.transportType}
                      </span>
                      <h3 className="text-base font-black text-zinc-900 dark:text-white tracking-tight mt-1">
                        {ticket.title}
                      </h3>
                      <p className="text-xs font-bold text-zinc-400 mt-0.5">Operator: {ticket.vendorName}</p>
                    </div>

                    <div className="space-y-1.5 text-xs font-semibold text-zinc-500 dark:text-zinc-400 pt-1">
                      <div className="flex justify-between">
                        <span>Route Vector:</span>
                        <span className="text-zinc-900 dark:text-white font-bold">{ticket.from} → {ticket.to}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Schedule Date:</span>
                        <span className="text-zinc-800 dark:text-zinc-300">
                          {new Date(ticket.departureDateTime).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Inventory / Fare:</span>
                        <span className="text-zinc-900 dark:text-white">{ticket.quantity} Seats • <b className="text-[#039855]">{ticket.price} BDT</b></span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-dashed border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 text-[10px] font-black border rounded-md uppercase tracking-wider ${badge.bg}`}>
                        <StatusIcon size={11} />
                        {badge.text}
                      </span>

                      {ticket.status === 'pending' && (
                        <div className="flex gap-2">
                          <Button size="sm" onClick={() => handleStatusUpdate(ticket._id, 'approved')} className="bg-[#039855] text-white font-black text-xs uppercase tracking-wider h-8 rounded-lg px-3">
                            Approve
                          </Button>
                          <Button size="sm" variant="flat" color="danger" onClick={() => handleStatusUpdate(ticket._id, 'rejected')} className="font-black text-xs uppercase tracking-wider h-8 rounded-lg px-3">
                            Reject
                          </Button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* B) DESKTOP VIEW */}
          <div className="hidden md:block w-full border border-zinc-200 dark:border-zinc-800/80 rounded-2xl overflow-hidden bg-white dark:bg-[#111113] shadow-sm">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-zinc-50 dark:bg-[#18181b] border-b border-zinc-200 dark:border-zinc-800 text-zinc-400 font-black text-xs uppercase tracking-wider h-12">
                  <th className="px-6 align-middle">Transit Operator Title</th>
                  <th className="px-6 align-middle">Route Profile</th>
                  <th className="px-6 align-middle text-center"><span className="flex items-center gap-1 justify-center"><FiCalendar size={13} /> Departs</span></th>
                  <th className="px-6 align-middle text-center">Stock / Fare</th>
                  <th className="px-6 align-middle text-center">Moderation Token</th>
                  <th className="px-6 align-middle text-center">Administrative Action</th>
                </tr>
              </thead>

              <tbody>
                <AnimatePresence mode="popLayout">
                  {filteredTickets.map((ticket) => {
                    const badge = statusConfig[ticket.status] || statusConfig.pending;
                    const StatusIcon = badge.icon;

                    return (
                      <tr
                        key={ticket._id}
                        className="border-b border-zinc-100 dark:border-zinc-800/50 hover:bg-zinc-50/40 dark:hover:bg-[#141416]/30 transition-colors"
                      >
                        <td className="px-6 py-3.5 align-middle">
                          <div>
                            <p className="text-sm font-black text-zinc-900 dark:text-white tracking-tight">
                              {ticket.title}
                            </p>
                            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mt-0.5 flex items-center gap-1">
                              Owner: <b>{ticket.vendorName}</b> • <span className="text-blue-500">{ticket.transportType}</span>
                            </p>
                          </div>
                        </td>

                        <td className="px-6 py-3.5 align-middle text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                          <span className="flex items-center gap-1.5">
                            <FiMapPin size={13} className="text-[#039855]" />
                            <b>{ticket.from}</b> → <b>{ticket.to}</b>
                          </span>
                        </td>

                        <td className="px-6 py-3.5 align-middle text-center whitespace-nowrap text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                          <p className="text-zinc-900 dark:text-zinc-200">
                            {new Date(ticket.departureDateTime).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </p>
                          <p className="text-[10px] text-zinc-400 mt-0.5">
                            {new Date(ticket.departureDateTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}
                          </p>
                        </td>

                        <td className="px-6 py-3.5 align-middle text-center whitespace-nowrap text-xs font-bold text-zinc-700 dark:text-zinc-300">
                          <p>{ticket.quantity} Seats</p>
                          <p className="text-xs font-black text-[#039855] mt-0.5">{ticket.price} BDT</p>
                        </td>

                        <td className="px-6 py-3.5 align-middle text-center whitespace-nowrap">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 text-[10px] font-black border rounded-md uppercase tracking-wider ${badge.bg}`}>
                            <StatusIcon size={11} />
                            {badge.text}
                          </span>
                        </td>

                        <td className="px-6 py-3.5 align-middle text-center whitespace-nowrap">
                          {ticket.status === 'pending' ? (
                            <div className="flex items-center justify-center gap-2">
                              <Button
                                size="sm"
                                onClick={() => handleStatusUpdate(ticket._id, 'approved')}
                                className="font-black text-xs uppercase tracking-wider rounded-xl h-9 px-4 bg-[#039855] hover:bg-black text-white transition-all duration-200 shadow-sm shadow-green-500/10"
                                startContent={<FiCheck size={13} />}
                              >
                                Approve
                              </Button>

                              <Button
                                size="sm"
                                variant="flat"
                                color="danger"
                                onClick={() => handleStatusUpdate(ticket._id, 'rejected')}
                                className="font-black text-xs uppercase tracking-wider rounded-xl h-9 px-4 bg-red-500/10 text-red-600 hover:bg-red-600 hover:text-white transition-all duration-200"
                                startContent={<FiX size={13} />}
                              >
                                Reject
                              </Button>
                            </div>
                          ) : (
                            <span className="text-xs font-bold text-zinc-400 italic">Logs Finalized</span>
                          )}
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
        <div className="text-center py-16 bg-white dark:bg-[#111113] border border-zinc-200 dark:border-zinc-800 rounded-2xl max-w-xl mx-auto">
          <FiInfo size={32} className="mx-auto text-zinc-400 mb-2" />
          <p className="text-zinc-500 dark:text-zinc-400 font-bold text-sm">
            No inbound transit ticket records correspond to your query matrix criteria.
          </p>
        </div>
      )}
    </motion.div>
  );
}