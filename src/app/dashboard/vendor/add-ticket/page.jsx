'use client';

import React, { useState } from 'react';
import { Input, Button, Card } from "@heroui/react";
import { 
    FiPlusCircle, FiMapPin, FiCalendar, FiDollarSign, 
    FiLayers, FiCamera, FiUser, FiMail, FiTag, FiTruck, FiClock 
} from 'react-icons/fi';
import { motion } from 'framer-motion';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Image from 'next/image';
import { BiArrowToTop } from 'react-icons/bi';
import { addTicket } from '@/lib/actions/addTicket';

export default function AddTicketPage() {
    const router = useRouter();
    const { data: session } = authClient.useSession();
    const user = session?.user;

    const [loading, setLoading] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState("");
    const [selectedPerks, setSelectedPerks] = useState([]);

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImageFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handlePerkToggle = (perk) => {
        if (selectedPerks.includes(perk)) {
            setSelectedPerks(selectedPerks.filter(p => p !== perk));
        } else {
            setSelectedPerks([...selectedPerks, perk]);
        }
    };

    const handleAddTicket = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const title = formData.get("title")?.toString().trim();
        const from = formData.get("from")?.toString().trim();
        const to = formData.get("to")?.toString().trim();
        const transportType = formData.get("transportType");
        const price = Number(formData.get("price"));
        const quantity = Number(formData.get("quantity"));
        const departureDateTime = formData.get("departureDateTime");
        const journeyDuration = Number(formData.get("journeyDuration")); 

        if (!title || !from || !to || !transportType || !departureDateTime || !journeyDuration) {
            toast.error("Please fill in all required fields.");
            return;
        }
        if (price <= 0 || quantity <= 0 || journeyDuration <= 0) {
            toast.error("Price, Quantity and Duration must be greater than zero.");
            return;
        }
        if (!imageFile) {
            toast.error("Please upload a transport image.");
            return;
        }

        setLoading(true);
        let uploadedImageUrl = "";

        try {
            const imgBBKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
            if (!imgBBKey) {
                throw new Error("ImgBB API key is missing in .env file!");
            }

            const imgFormData = new FormData();
            imgFormData.append("image", imageFile);

            const imgBBRes = await fetch(`https://api.imgbb.com/1/upload?key=${imgBBKey}`, {
                method: "POST",
                body: imgFormData,
            });
            const imgBBData = await imgBBRes.json();

            if (imgBBData.success) {
                uploadedImageUrl = imgBBData.data.display_url; 
            } else {
                throw new Error("Failed to upload image to ImgBB.");
            }

            const ticketPayload = {
                title,
                from,
                to,
                transportType,
                price,
                quantity,
                departureDateTime,
                journeyDuration,
                perks: selectedPerks,
                image: uploadedImageUrl,
                vendorId: user?.id || "",
                status: "pending",
                isAdvertised: false
            };

            const result = await addTicket('/api/tickets', ticketPayload);

            if(result?.insertedId){
                toast.success("Ticket added successfully! Waiting for Admin's verification.");
                router.push("/dashboard/vendor/my-tickets");
            }

        } catch (error) {
            console.error(error);
            toast.error(error.message || "An error occurred while publishing the ticket.");
        } finally {
            setLoading(false);
        }
    };

    const inputStyleMap = {
        inputWrapper: "h-12 w-full border-zinc-300 dark:border-zinc-800 bg-white dark:bg-[#0A0A0C]/40 group-data-[focus=true]:border-[#F05A28]/60 group-data-[hover=true]:border-zinc-400 dark:group-data-[hover=true]:border-zinc-700 transition-colors duration-200",
        input: "w-full text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-600 font-medium text-sm",
    };

    const labelStyles = "text-zinc-700 dark:text-zinc-300 font-bold text-xs mb-1.5 uppercase tracking-wider block pl-1";

    const availablePerks = [
        { id: "AC", label: "Air Conditioner" },
        { id: "Wifi", label: "Free Wi-Fi" },
        { id: "Breakfast", label: "Snacks / Breakfast" },
        { id: "Water", label: "Mineral Water" },
        { id: "Charging", label: "Charging Port" }
    ];

    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.98 }} 
            animate={{ opacity: 1, scale: 1 }} 
            className="w-full max-w-5xl mx-auto p-4 md:p-6 pb-16"
        >
            <Card className="w-full p-6 md:p-10 bg-white dark:bg-[#111113] border border-zinc-100 dark:border-zinc-900 shadow-2xl rounded-[32px] overflow-hidden relative">
                
                <div className="absolute top-0 left-0 w-full h-2.5 bg-[#F05A28]" />

                {/* Header */}
                <div className="mb-8 flex items-center gap-3 border-b border-zinc-100 dark:border-zinc-800 pb-5">
                    <div className="p-3 bg-[#F05A28]/10 text-[#F05A28] rounded-2xl">
                        <FiPlusCircle size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight">Create Travel Ticket</h1>
                        <p className="text-xs text-zinc-400 dark:text-zinc-500 font-medium mt-0.5">Fill out the details to submit a new ticket for verification.</p>
                    </div>
                </div>

                <form onSubmit={handleAddTicket} className="space-y-6 w-full">
                    
                    {/* Title */}
                    <div className="w-full">
                        <label className={labelStyles}>Ticket Title / Fleet Name</label>
                        <Input
                            type="text"
                            name="title"
                            fullWidth
                            placeholder="e.g., Silk Line Scania Multi-Axle Sleeper"
                            variant="bordered"
                            radius="xl"
                            isRequired
                            classNames={inputStyleMap}
                            startContent={<FiTag className="text-zinc-400 dark:text-zinc-600 mr-1" size={16} />}
                        />
                    </div>

                    {/* From & To Route Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
                        <div className="w-full">
                            <label className={labelStyles}>From (Departure Point)</label>
                            <Input
                                type="text"
                                name="from"
                                fullWidth
                                placeholder="e.g., Dhaka (Gabtoli)"
                                variant="bordered"
                                radius="xl"
                                isRequired
                                classNames={inputStyleMap}
                                startContent={<FiMapPin className="text-zinc-400 dark:text-zinc-600 mr-1" size={16} />}
                            />
                        </div>
                        <div className="w-full">
                            <label className={labelStyles}>To (Destination Point)</label>
                            <Input
                                type="text"
                                name="to"
                                fullWidth
                                placeholder="e.g., Cox's Bazar"
                                variant="bordered"
                                radius="xl"
                                isRequired
                                classNames={inputStyleMap}
                                startContent={<FiMapPin className="text-zinc-400 dark:text-zinc-600 mr-1" size={16} />}
                            />
                        </div>
                    </div>

                    {/* Transport Selection, Time, and Duration (3 Column Row) */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full">
                        <div className="w-full">
                            <label className={labelStyles}>Transport Type</label>
                            <div className="relative flex items-center w-full">
                                <FiTruck className="absolute left-4 text-zinc-400 dark:text-zinc-600 z-10" size={16} />
                                <select 
                                    name="transportType"
                                    required
                                    className="w-full h-12 pl-12 pr-4 bg-white dark:bg-[#0A0A0C]/40 border-2 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white font-semibold text-sm rounded-xl outline-none transition-colors cursor-pointer focus:border-[#F05A28]/60 hover:border-zinc-300 dark:hover:border-zinc-700"
                                >
                                    <option value="" disabled selected>Select Transport Mode</option>
                                    <option value="Bus">Bus</option>
                                    <option value="Train">Train</option>
                                    <option value="Launch">Launch</option>
                                    <option value="Flight">Flight</option>
                                </select>
                            </div>
                        </div>

                        <div className="w-full">
                            <label className={labelStyles}>Departure Date & Time</label>
                            <Input
                                type="datetime-local"
                                name="departureDateTime"
                                fullWidth
                                variant="bordered"
                                radius="xl"
                                isRequired
                                classNames={inputStyleMap}
                                startContent={<FiCalendar className="text-zinc-400 dark:text-zinc-600 mr-1" size={16} />}
                            />
                        </div>

                        <div className="w-full">
                            <label className={labelStyles}>Est. Journey Duration (Hours)</label>
                            <Input
                                type="number"
                                name="journeyDuration"
                                fullWidth
                                placeholder="e.g., 8"
                                min="1"
                                variant="bordered"
                                radius="xl"
                                isRequired
                                classNames={inputStyleMap}
                                startContent={<FiClock className="text-zinc-400 dark:text-zinc-600 mr-1" size={16} />}
                            />
                        </div>
                    </div>

                    {/* BDT Price & Quantity */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
                        <div className="w-full">
                            <label className={labelStyles}>Price Per Unit (BDT)</label>
                            <Input
                                type="number"
                                name="price"
                                fullWidth
                                placeholder="e.g., 1200"
                                min="1"
                                variant="bordered"
                                radius="xl"
                                isRequired
                                classNames={inputStyleMap}
                                startContent={<FiDollarSign className="text-zinc-400 dark:text-zinc-600 mr-1" size={16} />}
                            />
                        </div>
                        <div className="w-full">
                            <label className={labelStyles}>Available Tickets Capacity</label>
                            <Input
                                type="number"
                                name="quantity"
                                fullWidth
                                placeholder="e.g., 40"
                                min="1"
                                variant="bordered"
                                radius="xl"
                                isRequired
                                classNames={inputStyleMap}
                                startContent={<FiLayers className="text-zinc-400 dark:text-zinc-600 mr-1" size={16} />}
                            />
                        </div>
                    </div>

                    {/* Custom Checkboxes */}
                    <div className="bg-zinc-50 dark:bg-[#0A0A0C]/50 p-5 rounded-2xl border border-zinc-100 dark:border-zinc-900/60 w-full">
                        <label className="text-zinc-700 dark:text-zinc-300 font-bold text-xs block uppercase tracking-wider mb-4 pl-1">
                            Included Perks & Amenities
                        </label>
                        <div className="flex flex-wrap gap-4 sm:gap-6">
                            {availablePerks.map((perk) => {
                                const isChecked = selectedPerks.includes(perk.id);
                                return (
                                    <label 
                                        key={perk.id} 
                                        className="flex items-center gap-2.5 cursor-pointer select-none group"
                                    >
                                        <div className="relative">
                                            <input
                                                type="checkbox"
                                                checked={isChecked}
                                                onChange={() => handlePerkToggle(perk.id)}
                                                className="sr-only"
                                            />
                                            <div className={`w-5 h-5 rounded-md border-2 transition-all flex items-center justify-center ${
                                                isChecked 
                                                    ? 'bg-[#F05A28] border-[#F05A28]' 
                                                    : 'border-zinc-300 dark:border-zinc-700 group-hover:border-zinc-400 dark:group-hover:border-zinc-500'
                                            }`}>
                                                {isChecked && (
                                                    <svg className="w-3 h-3 text-white fill-current" viewBox="0 0 20 20">
                                                        <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                                                    </svg>
                                                )}
                                            </div>
                                        </div>
                                        <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 transition-colors group-hover:text-zinc-900 dark:group-hover:text-zinc-100">
                                            {perk.label}
                                        </span>
                                    </label>
                                );
                            })}
                        </div>
                    </div>

                    {/* Cover Image Upload Area */}
                    <div className="w-full">
                        <label className={labelStyles}>Transport Cover Image</label>
                        <label className="min-h-28 flex flex-col items-center justify-center gap-2 border-2 border-dashed border-zinc-300 dark:border-zinc-800 bg-white dark:bg-[#0A0A0C]/40 rounded-2xl px-4 py-4 cursor-pointer hover:border-[#F05A28]/60 transition-colors w-full">
                            {previewUrl ? (
                                <div className="relative w-36 h-20 rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-sm">
                                    <Image
                                        src={previewUrl}
                                        alt="Fleet Cover Preview"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            ) : (
                                <FiCamera className="text-zinc-400 dark:text-zinc-600" size={24} />
                            )}
                            <span className="text-xs font-bold text-zinc-500 text-center truncate max-w-xs">
                                {imageFile ? imageFile.name : "Click to select or drop a cover photo"}
                            </span>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                        </label>
                    </div>

                    {/* Readonly Vendor Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2 opacity-70 w-full">
                        <div className="w-full">
                            <label className={labelStyles}>Publisher Name</label>
                            <Input
                                type="text"
                                value={user?.name || "User Name"}
                                disabled
                                fullWidth
                                variant="flat"
                                radius="xl"
                                classNames={inputStyleMap}
                                startContent={<FiUser className="text-zinc-400 dark:text-zinc-600 mr-1" size={16} />}
                            />
                        </div>
                        <div className="w-full">
                            <label className={labelStyles}>Publisher Email</label>
                            <Input
                                type="email"
                                value={user?.email || "user@company.com"}
                                disabled
                                fullWidth
                                variant="flat"
                                radius="xl"
                                classNames={inputStyleMap}
                                startContent={<FiMail className="text-zinc-400 dark:text-zinc-600 mr-1" size={16} />}
                            />
                        </div>
                    </div>

                    {/* Dispatch Form Button */}
                    <div className="flex justify-end pt-4 w-full">
                        <Button
                            type="submit"
                            isLoading={loading}
                            className="w-full sm:w-auto h-12 px-10 bg-[#F05A28] hover:bg-[#d94a1d] text-white font-bold rounded-xl text-sm shadow-lg shadow-[#F05A28]/20 transition-all duration-200 active:scale-[0.99]"
                        >
                            {loading ? <BiArrowToTop className="mr-1" size={16} /> : <FiPlusCircle className="mr-1" size={16} />}
                            {loading ? "Publishing..." : "Publish Ticket"}
                        </Button>
                    </div>

                </form>
            </Card>
        </motion.div>
    );
}