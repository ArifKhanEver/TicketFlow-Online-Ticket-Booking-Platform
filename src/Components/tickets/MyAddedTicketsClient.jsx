'use client';

import React from 'react';
import { Card, Button, Chip } from "@heroui/react";
import { 
    FiLayers, FiMapPin, FiCalendar, FiDollarSign, 
    FiEdit2, FiTrash2, FiClock, FiCheckCircle, FiXCircle, FiInfo 
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation'; 
import UpdateTicketModal from './UpdateTicketModal';

export default function MyAddedTicketsClient({ initialTickets }) {
    const router = useRouter(); 

    const statusConfig = {
        approved: { text: "Approved", icon: FiCheckCircle, bg: "bg-green-500/10 text-green-500 border-green-500/20" },
        pending: { text: "Pending Verification", icon: FiClock, bg: "bg-amber-500/10 text-amber-500 border-amber-500/20" },
        rejected: { text: "Rejected by Admin", icon: FiXCircle, bg: "bg-red-500/10 text-red-500 border-red-500/20" }
    };

    const handleDeleteTicket = async (id) => {
        if (!confirm("Are you sure you want to delete this ticket permanently?")) return;

        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
            const res = await fetch(`${apiUrl}/api/tickets/${id}`, { method: "DELETE" });
            const data = await res.json();

            if (data.deletedCount > 0) {
                toast.success("Ticket deleted successfully.");
                router.refresh(); 
            } else {
                toast.error("Failed to delete the ticket.");
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred during deletion.");
        }
    };

    return (
        <div className="w-full space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-5 gap-4">
                <div>
                    <h1 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight">My Added Tickets</h1>
                    <p className="text-xs font-semibold text-zinc-400 mt-1">Manage, update, and monitor the verification pipeline of your listed fleet tokens.</p>
                </div>
                <Chip variant="flat" color="primary" className="font-bold text-xs uppercase px-2">
                    Total Fleet: {initialTickets.length} 
                </Chip>
            </div>

            <AnimatePresence>
                {initialTickets.length > 0 ? (
                    <div className="flex flex-col gap-4 w-full">
                        {initialTickets.map((ticket, index) => {
                            const currentStatus = statusConfig[ticket.status] || statusConfig.pending;
                            const StatusIcon = currentStatus.icon;
                            const isRejected = ticket.status === "rejected";

                            return (
                                <motion.div
                                    key={ticket._id}
                                    initial={{ opacity: 0, scale: 0.98, y: 12 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.97, y: -12 }}
                                    transition={{ duration: 0.25, delay: index * 0.04 }}
                                    className="w-full"
                                >
                                    <Card className="bg-white dark:bg-[#111113] border border-zinc-200 dark:border-zinc-800/80 shadow-sm hover:shadow-xl hover:border-[#039855]/30 transition-all duration-300 flex flex-col md:flex-row items-stretch rounded-[24px] overflow-hidden w-full group">
                                        
                                        <div className="relative h-44 md:h-auto w-full md:w-56 shrink-0 bg-zinc-100 dark:bg-zinc-900 overflow-hidden">
                                            <Image src={ticket.image} alt={ticket.title} fill className="object-cover group-hover:scale-102 transition-transform duration-500" />
                                            <span className="absolute top-3 left-3 text-[9px] font-black tracking-widest uppercase px-2.5 py-1 bg-black/60 backdrop-blur-md text-white rounded-lg shadow-sm">
                                                {ticket.transportType}
                                            </span>
                                        </div>

                                        <div className="p-6 flex-1 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                                            <div className="space-y-2.5 flex-1">
                                                <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-extrabold border rounded-md uppercase tracking-wider ${currentStatus.bg}`}>
                                                    <StatusIcon size={11} />
                                                    {currentStatus.text}
                                                </div>
                                                <h3 className="text-lg font-black text-zinc-900 dark:text-white tracking-tight">
                                                    {ticket.title}
                                                </h3>
                                                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                                                    <span className="flex items-center gap-1">
                                                        <FiMapPin size={13} className="text-[#039855]" />
                                                        Route: <b>{ticket.from}</b> → <b>{ticket.to}</b>
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <FiCalendar size={13} />
                                                        Departs: {new Date(ticket.departureDateTime).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <FiLayers size={13} />
                                                        Inventory: <b>{ticket.quantity} Tickets</b>
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="sm:text-right flex sm:flex-col justify-between sm:justify-center items-center sm:items-end w-full sm:w-auto border-t sm:border-t-0 border-zinc-100 dark:border-zinc-800/60 pt-4 sm:pt-0 shrink-0 gap-4">
                                                <div>
                                                    <p className="text-[9px] font-bold uppercase tracking-wider text-zinc-400">Rate Fare</p>
                                                    <p className="text-xl font-black text-[#039855]">{ticket.price} <span className="text-xs font-bold text-zinc-400">BDT</span></p>
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    <UpdateTicketModal ticket={ticket} isRejected={isRejected} />
                                                    <Button
                                                        isIconOnly
                                                        size="sm"
                                                        variant="flat"
                                                        isDisabled={isRejected}
                                                        onClick={() => handleDeleteTicket(ticket._id)}
                                                        title={isRejected ? "Action barred for rejected lists" : "Delete Ticket"}
                                                        className="bg-zinc-50 hover:bg-red-500/10 dark:bg-zinc-800 dark:hover:bg-red-500/20 text-zinc-700 dark:text-zinc-300 hover:text-red-500 transition-colors rounded-xl h-9 w-9"
                                                    >
                                                        <FiTrash2 size={13} />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </motion.div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white dark:bg-[#111113] border border-zinc-200 dark:border-zinc-800 rounded-[28px] max-w-xl mx-auto mt-12">
                        <FiInfo size={32} className="mx-auto text-zinc-400 mb-3" />
                        <p className="text-zinc-500 dark:text-zinc-400 font-bold text-sm">No ticket vectors published yet.</p>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}