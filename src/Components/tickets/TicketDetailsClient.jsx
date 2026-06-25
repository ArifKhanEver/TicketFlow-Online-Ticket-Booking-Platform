'use client';
import React, { useState, useEffect } from 'react';
import { Button, Input, Card } from "@heroui/react";
import {
    FiClock, FiMapPin, FiCalendar, FiDollarSign,
    FiLayers, FiTruck, FiCheckCircle, FiUser, FiInfo,
    FiAlertCircle, FiShield, FiHelpCircle, FiCheck
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Image from 'next/image';
import { bookingTicket, updateTotalTicket } from '@/lib/actions/bookings';

export default function TicketDetailsClient({ ticket }) {
    const router = useRouter();
    const { data: session } = authClient.useSession();
    const user = session?.user;

    const [timeLeft, setTimeLeft] = useState("");
    const [isDeparted, setIsDeparted] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [bookingQty, setBookingQty] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const calculateCountdown = () => {
            const difference = +new Date(ticket.departureDateTime) - +new Date();

            if (difference <= 0) {
                setTimeLeft("Departed / Expired");
                setIsDeparted(true);
                return;
            }

            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((difference / 1000 / 60) % 60);
            const seconds = Math.floor((difference / 1000) % 60);

            const daysStr = days > 0 ? `${days}day ` : "";
            setTimeLeft(`${daysStr}${hours}h ${minutes}min ${seconds}sec left`);
        };

        calculateCountdown();
        const interval = setInterval(calculateCountdown, 1000);
        return () => clearInterval(interval);
    }, [ticket.departureDateTime]);

    const getArrivalTime = () => {
        if (!ticket.departureDateTime) return "--:--";

        const depDate = new Date(ticket.departureDateTime);
        const arrDate = new Date(depDate.getTime() + (ticket.journeyDuration || 0) * 60 * 60 * 1000);

        return arrDate.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };

    const handleConfirmBooking = async (e) => {
        e.preventDefault();

        if (!user) {
            toast.error("Please login first to book a ticket.");
            router.push('/auth/signin');
            return;
        }

        if (user.role !== "user") {
            toast.error("Only general users can book a ticket.");
            return;
        }

        if (bookingQty <= 0) {
            toast.error("Booking quantity must be at least 1.");
            return;
        }
        if (bookingQty > ticket.quantity) {
            toast.error(`Booking quantity cannot exceed available capacity (${ticket.quantity} tickets).`);
            return;
        }

        setIsSubmitting(true);

        const bookingPayload = {
            ticketId: ticket._id,
            ticketTitle: ticket.title,
            image: ticket.image,
            from: ticket.from,
            to: ticket.to,
            departureDateTime: ticket.departureDateTime,
            unitPrice: ticket.price,
            bookingQuantity: bookingQty,
            totalPrice: ticket.price * bookingQty,
            status: "pending",
            journeyDuration: ticket.journeyDuration,
            userId: user.id,
            userName:user.name,
            userEmail:user.email,
            vendorId: ticket.vendorId,
        };

        try {
            const data = await bookingTicket("/api/bookings", bookingPayload);

            if (data?.success || data?.insertedId) {
                toast.success("Booking requested successfully! Waiting for Vendor acceptance.");

                setIsModalOpen(false);

                router.push("/dashboard/user/booked-tickets");
            } else {
                throw new Error(data?.message || "Failed to complete booking request.");
            }
        } catch (error) {
            toast.error(error.message || "Something went wrong!");
        } finally {
            setIsSubmitting(false);
        }
    };

    const isBookingDisabled = isDeparted || ticket.quantity === 0;

    return (
        <div className="container mx-auto max-w-6xl px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                {/* Left Side: Media, Overview, Amenities, Guidelines & FAQs */}
                <div className="lg:col-span-7 space-y-6">
                    {/* Image Banner */}
                    <div className="relative h-64 md:h-[420px] rounded-[32px] overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-lg">
                        <Image
                            src={ticket.image}
                            alt={ticket.title}
                            fill
                            priority
                            className="object-cover"
                        />
                        <div className="absolute top-4 left-4 bg-[#039855] text-white font-black px-4 py-1.5 rounded-xl text-xs uppercase tracking-widest shadow">
                            {ticket.transportType}
                        </div>
                    </div>

                    {/* NEW SECTION 1: Transit Experience Overview */}
                    <div className="bg-white dark:bg-[#111113] p-6 rounded-[24px] border border-zinc-200/60 dark:border-zinc-800/80 shadow-sm">
                        <h3 className="text-base font-black !text-zinc-900 dark:!text-white mb-3 tracking-tight">
                            Journey Overview & Experience
                        </h3>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                            Experience a seamless and premium transit from <span className="font-bold text-[#039855]">{ticket.from}</span> to <span className="font-bold text-[#F05A28]">{ticket.to}</span> operated by <span className="font-semibold">{ticket.title}</span>. Known for state-of-the-art vehicle tracking, professional crew members, and absolute punctuality, this journey ensures top-tier comfort. Sit back, relax, and enjoy optimized routes designed to give you the shortest transit time possible.
                        </p>
                    </div>

                    {/* Inclusion Perks Card */}
                    <div className="bg-white dark:bg-[#111113] p-6 rounded-[24px] border border-zinc-200/60 dark:border-zinc-800/80 shadow-sm">
                        <h3 className="text-sm font-black uppercase tracking-wider text-zinc-400 mb-4 flex items-center gap-2">
                            <FiInfo className="text-[#039855]" /> Included Perks & Amenities
                        </h3>
                        <div className="flex flex-wrap gap-2.5">
                            {ticket.perks?.map((perk, index) => (
                                <span key={index} className="px-3.5 py-2 rounded-xl text-xs font-bold bg-zinc-50 dark:bg-[#18181b] text-zinc-700 dark:text-zinc-300 border border-zinc-100 dark:border-zinc-800/60 flex items-center gap-1.5">
                                    <FiCheck className="text-[#039855]" /> {perk}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* NEW SECTION 2: Travel Guidelines & Policies (Static) */}
                    <div className="bg-white dark:bg-[#111113] p-6 rounded-[24px] border border-zinc-200/60 dark:border-zinc-800/80 shadow-sm">
                        <h3 className="text-sm font-black uppercase tracking-wider text-zinc-400 mb-4 flex items-center gap-2">
                            <FiAlertCircle className="text-[#F05A28]" /> Terms & Travel Guidelines
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                            <div className="p-3 bg-zinc-50 dark:bg-[#141416] rounded-xl border border-zinc-100 dark:border-zinc-800/50">
                                <p className="text-zinc-900 dark:text-white font-bold mb-1">Reporting Time</p>
                                Passengers are requested to arrive at the counter at least 30 minutes prior to schedule.
                            </div>
                            <div className="p-3 bg-zinc-50 dark:bg-[#141416] rounded-xl border border-zinc-100 dark:border-zinc-800/50">
                                <p className="text-zinc-900 dark:text-white font-bold mb-1">Luggage Allowance</p>
                                Maximum of 20kg free luggage per passenger ceiling constraint. Excess weight is subject to vendor fees.
                            </div>
                            <div className="p-3 bg-zinc-50 dark:bg-[#141416] rounded-xl border border-zinc-100 dark:border-zinc-800/50">
                                <p className="text-zinc-900 dark:text-white font-bold mb-1">Cancellation Policy</p>
                                Rescheduling or cancellation requests must be filed 12 hours prior to dynamic departure.
                            </div>
                            <div className="p-3 bg-zinc-50 dark:bg-[#141416] rounded-xl border border-zinc-100 dark:border-zinc-800/50">
                                <p className="text-zinc-900 dark:text-white font-bold mb-1">Conduct Policy</p>
                                Co-passenger comfort is mandatory. Management preserves the right to cancel unvetted bookings.
                            </div>
                        </div>
                    </div>

                    {/* NEW SECTION 3: Frequently Asked Questions (FAQ) */}
                    <div className="bg-white dark:bg-[#111113] p-6 rounded-[24px] border border-zinc-200/60 dark:border-zinc-800/80 shadow-sm">
                        <h3 className="text-sm font-black uppercase tracking-wider text-zinc-400 mb-4 flex items-center gap-2">
                            <FiHelpCircle className="text-blue-500" /> Frequently Asked Questions
                        </h3>
                        <div className="space-y-3">
                            <div className="border-b border-zinc-100 dark:border-zinc-800/60 pb-3">
                                <p className="text-sm font-bold text-zinc-900 dark:text-white mb-1">How will I get my dynamic ticket after payment?</p>
                                <p className="text-xs text-zinc-500 dark:text-zinc-400">Once the vendor approves your pending request and payment is completed, a digital ticket payload with an implicit QR code will appear directly inside your dashboard repository.</p>
                            </div>
                            <div className="border-b border-zinc-100 dark:border-zinc-800/60 pb-3">
                                <p className="text-sm font-bold text-zinc-900 dark:text-white mb-1">Are there any hidden service or checkout charges?</p>
                                <p className="text-xs text-zinc-500 dark:text-zinc-400">No, the pricing dashboard remains fully transparent. Payment gateways calculate pure direct fares without hidden commissions.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Meta Details & Live CTA Action Box */}
                <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
                    <Card className="p-6 md:p-8 bg-white dark:bg-[#111113] border border-zinc-200/60 dark:border-zinc-800/80 shadow-xl rounded-[32px] overflow-hidden relative">
                        <div className="absolute top-0 left-0 w-full h-2 bg-[#F05A28]" />

                        {/* Title Section */}
                        <div className="mb-6">
                            <h1 className="text-2xl md:text-3xl font-black !text-zinc-900 dark:!text-white leading-tight tracking-tight">
                                {ticket.title}
                            </h1>
                        </div>

                        {/* LIVE COUNTDOWN DISPLAY */}
                        <div className={`mb-6 p-4 rounded-2xl border flex items-center gap-3 transition-colors ${isDeparted
                            ? "bg-red-50 text-red-600 border-red-100 dark:bg-red-500/5 dark:text-red-500 dark:border-red-500/10"
                            : "bg-orange-50 text-[#F05A28] border-orange-100 dark:bg-[#F05A28]/5 dark:text-[#F05A28] dark:border-[#F05A28]/10"
                            }`}>
                            <FiClock className={!isDeparted && "animate-spin"} size={18} />
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Time Until Departure</p>
                                <p className="text-sm font-black mt-0.5 tracking-widest">{timeLeft}</p>
                            </div>
                        </div>

                        {/* Route Specification Grid */}
                        <div className="space-y-4 border-b border-zinc-100 dark:border-zinc-800/80 pb-6 mb-6">
                            <div className="flex justify-between items-center text-sm font-bold">
                                <span className="text-zinc-400 flex items-center gap-1.5"><FiMapPin size={14} className="text-[#039855]" /> Departure Point</span>
                                <span className="!text-zinc-900 dark:!text-white">{ticket.from}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm font-bold">
                                <span className="text-zinc-400 flex items-center gap-1.5"><FiMapPin size={14} className="text-[#F05A28]" /> Terminal Destination</span>
                                <span className="!text-zinc-900 dark:!text-white">{ticket.to}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm font-bold">
                                <span className="text-zinc-400 flex items-center gap-1.5"><FiCalendar size={14} /> Start Schedule</span>
                                <span className="!text-zinc-900 dark:!text-white">
                                    {new Date(ticket.departureDateTime).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}
                                </span>
                            </div>
                            <div className="flex justify-between items-center text-sm font-bold">
                                <span className="text-zinc-400 flex items-center gap-1.5"><FiClock size={14} /> Expected Arrival</span>
                                <span className="!text-zinc-900 dark:!text-white">{getArrivalTime()}</span>
                            </div>
                        </div>

                        {/* Financials & Stock Cap Details */}
                        <div className="flex justify-between items-end mb-8">
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Fare Rate</p>
                                <p className="text-3xl font-black text-[#039855] flex items-center">{ticket.price} <span className="text-xs font-bold text-zinc-400 ml-1">BDT</span></p>
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Inventory Status</p>
                                <p className={`text-sm font-black mt-1 ${ticket.quantity === 0 ? 'text-red-500' : 'text-zinc-700 dark:text-zinc-300'}`}>
                                    {ticket.quantity === 0 ? "Sold Out" : `${ticket.quantity} Tickets Left`}
                                </p>
                            </div>
                        </div>

                        {/* Master CTA Button */}
                        <Button
                            fullWidth
                            disabled={isBookingDisabled}
                            onClick={() => setIsModalOpen(true)}
                            className={`h-14 rounded-2xl text-sm font-black uppercase tracking-wider text-white transition-all shadow-lg ${isBookingDisabled
                                ? "bg-zinc-200 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-600 cursor-not-allowed shadow-none"
                                : "bg-[#039855] hover:bg-black dark:bg-zinc-100 dark:text-black dark:hover:bg-[#039855] dark:hover:text-white shadow-xl"
                                }`}
                        >
                            {isDeparted ? "Journey Expired" : ticket.quantity === 0 ? "Sold Out" : "Book Seats Now"}
                        </Button>
                    </Card>

                    {/* NEW SECTION 4: Sidebar Trust Badges */}
                    <div className="p-4 bg-zinc-100/50 dark:bg-[#111113]/40 border border-zinc-200 dark:border-zinc-800 rounded-2xl space-y-3">
                        <div className="flex items-center gap-3 text-xs font-bold text-zinc-600 dark:text-zinc-400">
                            <FiShield className="text-[#039855]" size={16} />
                            <span>Verified Operator Guarantee</span>
                        </div>
                        <div className="flex items-center gap-3 text-xs font-bold text-zinc-600 dark:text-zinc-400">
                            <FiCheckCircle className="text-blue-500" size={16} />
                            <span>Instant Booking Authentication Protocol</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* MODAL WINDOW SYSTEM */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        />

                        <motion.div
                            initial={{ scale: 0.95, y: 15, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.95, y: 15, opacity: 0 }}
                            className="bg-white dark:bg-[#111113] border border-zinc-200 dark:border-zinc-800 rounded-[32px] w-full max-w-md p-6 md:p-8 shadow-2xl relative z-10 overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-full h-2 bg-[#039855]" />

                            <h2 className="text-xl font-black !text-zinc-900 dark:!text-white tracking-tight mb-2">Configure Seat Booking</h2>
                            <p className="text-xs text-zinc-600 font-medium mb-6">Specify the allocation quota you intend to reserve for this transit.</p>

                            <form onSubmit={handleConfirmBooking} className="space-y-5">
                                <div>
                                    <label className="text-zinc-500 font-bold text-xs uppercase tracking-wider block mb-2">Desired Quantity</label>
                                    <Input
                                        type="number"
                                        min="1"
                                        max={ticket.quantity}
                                        value={bookingQty}
                                        onChange={(e) => setBookingQty(Number(e.target.value))}
                                        required
                                        fullWidth
                                        startContent={<FiLayers className="text-zinc-400" size={16} />}
                                        classNames={{
                                            inputWrapper: "h-12 border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#0A0A0C]/60 focus-within:border-[#039855]",
                                            input: "font-bold text-sm"
                                        }}
                                    />
                                    <span className="text-[13px] text-zinc-700 block mt-1.5 pl-1">
                                        Max permissible checkout ceiling: <b>{ticket.quantity}</b> Tickets.
                                    </span>
                                </div>

                                <div className="bg-zinc-50 dark:bg-[#0A0A0C]/40 p-4 rounded-2xl border border-zinc-100 dark:border-zinc-900">
                                    <div className="flex justify-between items-center text-sm font-bold text-zinc-500 mb-2">
                                        <span>Unit Price</span>
                                        <span>{ticket.price} BDT</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm font-black border-t border-zinc-200/40 dark:border-zinc-800/40 pt-2">
                                        <span className="!text-zinc-900 dark:!text-white">Aggregate Price</span>
                                        <span className="text-[#039855]">{ticket.price * bookingQty} BDT</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 pt-2">
                                    <Button
                                        type="button"
                                        variant="flat"
                                        fullWidth
                                        onClick={() => setIsModalOpen(false)}
                                        className="h-12 rounded-xl font-bold text-xs uppercase tracking-wider"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        isLoading={isSubmitting}
                                        fullWidth
                                        className="h-12 bg-[#039855] hover:bg-[#027a44] text-white font-black rounded-xl text-xs uppercase tracking-wider shadow-md"
                                    >
                                        <FiCheckCircle size={14} className="mr-1" /> Confirm Request
                                    </Button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}