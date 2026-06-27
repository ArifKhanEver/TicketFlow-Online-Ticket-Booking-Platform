'use client';

import React, { useState } from 'react';
import { 
  FiEdit2, FiMapPin, FiCalendar, FiDollarSign,
  FiLayers, FiTag, FiTruck, FiClock, FiX, FiCheck
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { updateTicket } from '@/lib/actions/ticket';

export default function UpdateTicketModal({ ticket, isRejected }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedPerks, setSelectedPerks] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const availablePerks = [
    { id: "AC", label: "Air Conditioner" },
    { id: "Wifi", label: "Free Wi-Fi" },
    { id: "Breakfast", label: "Snacks / Breakfast" },
    { id: "Water", label: "Mineral Water" },
    { id: "Charging", label: "Charging Port" }
  ];

  const handleOpenModal = () => {
    setSelectedPerks(ticket?.perks || []);
    setPreviewUrl(ticket?.image || "");
    setImageFile(null);
    setIsOpen(true);
  };

  const handlePerkToggle = (perk) => {
    if (selectedPerks.includes(perk)) {
      setSelectedPerks(selectedPerks.filter(p => p !== perk));
    } else {
      setSelectedPerks([...selectedPerks, perk]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    setLoading(true);
    toast.loading("Synchronizing updated fleet registry...", { id: "edit_sync" });

    const formData = new FormData(e.currentTarget);
    let finalImageUrl = ticket.image; 

    try {
      if (imageFile) {
        const imgBBKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
        const imgFormData = new FormData();
        imgFormData.append("image", imageFile);

        const imgBBRes = await fetch(`https://api.imgbb.com/1/upload?key=${imgBBKey}`, {
          method: "POST",
          body: imgFormData,
        });
        const imgBBData = await imgBBRes.json();
        if (imgBBData.success) {
          finalImageUrl = imgBBData.data.display_url;
        } else {
          throw new Error("Failed to upload new banner sequence.");
        }
      }

      const updatedPayload = {
        ticketId: ticket._id,
        title: formData.get("title")?.toString().trim(),
        from: formData.get("from")?.toString().trim(),
        to: formData.get("to")?.toString().trim(),
        transportType: formData.get("transportType"),
        price: Number(formData.get("price")),
        quantity: Number(formData.get("quantity")),
        departureDateTime: formData.get("departureDateTime"),
        journeyDuration: Number(formData.get("journeyDuration")),
        perks: selectedPerks,
        image: finalImageUrl,
        status: "pending" 
      };

      const result = await updateTicket(updatedPayload);

      if (result?.success) {
        toast.success("Ticket parameters updated successfully!", { id: "edit_sync" });
        router.refresh();
        setIsOpen(false);
      } else {
        toast.error(result?.error || "Failed to patch core data.", { id: "edit_sync" });
      }

    } catch (error) {
      console.error(error);
      toast.error(error.message || "An exception occurred.", { id: "edit_sync" });
    } finally {
      setLoading(false);
    }
  };

  const inputStyles = "w-full h-12 pl-11 pr-4 border border-zinc-200 dark:border-zinc-800/80 bg-zinc-200 hover:bg-zinc-100/50 focus:bg-white dark:bg-[#18181b] dark:hover:bg-[#1f1f22] dark:focus:bg-[#18181b] rounded-xl text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-600 font-semibold text-sm focus:border-[#F05A28] dark:focus:border-[#F05A28] focus:ring-4 focus:ring-[#F05A28]/10 outline-none transition-all duration-200";
  
  const labelStyles = "text-zinc-700 dark:text-zinc-300 text-left font-bold text-xs mb-1.5 uppercase tracking-wider block pl-1";
  
  const iconStyles = "absolute left-4 text-zinc-400 dark:text-zinc-500 z-10 pointer-events-none";

  return (
    <>
      <button
        type="button"
        disabled={isRejected}
        onClick={handleOpenModal}
        title={isRejected ? "Action barred for rejected lists" : "Update Ticket"}
        className="bg-zinc-100 hover:bg-blue-500/10 dark:bg-zinc-800 dark:hover:bg-blue-500/20 text-zinc-700 dark:text-zinc-300 hover:text-blue-500 transition-colors rounded-xl h-9 w-9 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed border border-zinc-200/50 dark:border-zinc-700/50"
      >
        <FiEdit2 size={13} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-x-hidden overflow-y-auto">
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-zinc-900/40 dark:bg-black/70 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="bg-white dark:bg-[#111113] border border-zinc-100 dark:border-zinc-900 rounded-[28px] shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden relative z-10"
            >
              <form onSubmit={handleSaveChanges} className="flex flex-col h-full overflow-hidden">
                
                {/* Header */}
                <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800/80 px-6 py-4 shrink-0 bg-zinc-200 dark:bg-[#141416]/20">
                  <div>
                    <h2 className="text-xl font-black text-zinc-900 dark:text-white tracking-tight flex items-center gap-2">
                      <FiEdit2 className="text-[#F05A28]" size={20} /> Update Ticket Specifications
                    </h2>
                  </div>
                  <button 
                    type="button" 
                    onClick={() => setIsOpen(false)} 
                    className="p-2 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded-full text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors"
                  >
                    <FiX size={16} />
                  </button>
                </div>

                {/* Body */}
                <div className="p-6 space-y-5 overflow-y-auto flex-1 bg-gray-200 dark:bg-black">
                  
                  <div className="w-full">
                    <label className={labelStyles}>Ticket Title / Fleet Name</label>
                    <div className="relative flex items-center">
                      <FiTag className={iconStyles} size={16} />
                      <input type="text" name="title" defaultValue={ticket?.title || ""} required className={inputStyles} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
                    <div>
                      <label className={labelStyles}>From</label>
                      <div className="relative flex items-center">
                        <FiMapPin className={iconStyles} size={16} />
                        <input type="text" name="from" defaultValue={ticket?.from || ""} required className={inputStyles} />
                      </div>
                    </div>
                    <div>
                      <label className={labelStyles}>To</label>
                      <div className="relative flex items-center">
                        <FiMapPin className={iconStyles} size={16} />
                        <input type="text" name="to" defaultValue={ticket?.to || ""} required className={inputStyles} />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full">
                    <div>
                      <label className={labelStyles}>Transport Type</label>
                      <div className="relative flex items-center w-full">
                        <FiTruck className={iconStyles} size={16} />
                        <select 
                          name="transportType" 
                          defaultValue={ticket?.transportType || ""} 
                          required 
                          className="w-full h-12 pl-12 pr-4 bg-zinc-200 hover:bg-zinc-100/50 focus:bg-white dark:bg-[#18181b] dark:hover:bg-[#1f1f22] dark:focus:bg-[#18181b] border border-zinc-200 dark:border-zinc-800/80 text-zinc-900 dark:text-white font-semibold text-sm rounded-xl outline-none cursor-pointer focus:border-[#F05A28] dark:focus:border-[#F05A28] focus:ring-4 focus:ring-[#F05A28]/10 transition-all duration-200 appearance-none"
                        >
                          <option value="Bus" className="!text-zinc-900 dark:!text-white !bg-white dark:!bg-zinc-900">Bus</option>
                          <option value="Train" className="!text-zinc-900 dark:!text-white !bg-white dark:!bg-zinc-900">Train</option>
                          <option value="Launch" className="!text-zinc-900 dark:!text-white !bg-white dark:!bg-zinc-900">Launch</option>
                          <option value="Flight" className="!text-zinc-900 dark:!text-white !bg-white dark:!bg-zinc-900">Flight</option>
                        </select>
                        {/* Custom Dropdown Arrow */}
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                          <svg className="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className={labelStyles}>Departure Time</label>
                      <div className="relative flex items-center">
                        <FiCalendar className={iconStyles} size={16} />
                        <input 
                          type="datetime-local" 
                          name="departureDateTime" 
                          defaultValue={ticket?.departureDateTime ? ticket.departureDateTime.slice(0, 16) : ""} 
                          required 
                          style={{ colorScheme: 'dark light' }}
                          className="w-full h-12 pl-12 pr-4 border border-zinc-200 dark:border-zinc-800/80 bg-zinc-200 hover:bg-zinc-100/50 focus:bg-white dark:bg-[#18181b] dark:hover:bg-[#1f1f22] dark:focus:bg-[#18181b] rounded-xl text-zinc-900 dark:text-white font-semibold text-sm focus:border-[#F05A28] dark:focus:border-[#F05A28] focus:ring-4 focus:ring-[#F05A28]/10 outline-none transition-all duration-200" 
                        />
                      </div>
                    </div>

                    <div>
                      <label className={labelStyles}>Duration</label>
                      <div className="relative flex items-center">
                        <FiClock className={iconStyles} size={16} />
                        <input type="number" name="journeyDuration" defaultValue={ticket?.journeyDuration || ""} required min="1" className={inputStyles} />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
                    <div>
                      <label className={labelStyles}>Price (BDT)</label>
                      <div className="relative flex items-center">
                        <FiDollarSign className={iconStyles} size={16} />
                        <input type="number" name="price" defaultValue={ticket?.price || ""} required min="1" className={inputStyles} />
                      </div>
                    </div>
                    <div>
                      <label className={labelStyles}>Seats Quantity</label>
                      <div className="relative flex items-center">
                        <FiLayers className={iconStyles} size={16} />
                        <input type="number" name="quantity" defaultValue={ticket?.quantity !== undefined ? ticket.quantity : ""} required min="0" className={inputStyles} />
                      </div>
                    </div>
                  </div>

                  {/* Modern Perks Checkboxes */}
                  <div className="bg-zinc-200 dark:bg-[#141416]/40 p-5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 w-full shadow-sm">
                    <label className="text-zinc-900 dark:text-zinc-200 font-black text-xs block uppercase tracking-wider mb-4">Included Perks</label>
                    <div className="flex flex-wrap gap-3 sm:gap-4">
                      {availablePerks.map((perk) => {
                        const isChecked = selectedPerks.includes(perk.id);
                        return (
                          <label key={perk.id} className="flex items-center gap-2.5 cursor-pointer select-none group bg-zinc-100 dark:bg-[#18181b] px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors shadow-sm">
                            <div className="relative flex items-center justify-center">
                              <input type="checkbox" checked={isChecked} onChange={() => handlePerkToggle(perk.id)} className="sr-only" />
                              <div className={`w-4 h-4 rounded-[4px] border-2 transition-all flex items-center justify-center ${
                                isChecked 
                                  ? 'bg-[#F05A28] border-[#F05A28]' 
                                  : 'border-zinc-300 dark:border-zinc-600 bg-transparent group-hover:border-[#F05A28]/50'
                              }`}>
                                {isChecked && <FiCheck className="text-white" size={10} strokeWidth={4} />}
                              </div>
                            </div>
                            <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">{perk.label}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* Modern Dropzone */}
                  <div>
                    <label className={labelStyles}>Transport Cover Image</label>
                    <label className="min-h-28 flex flex-col sm:flex-row items-center justify-center gap-5 border-2 border-dashed border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 hover:bg-zinc-100/50 dark:bg-[#141416]/40 dark:hover:bg-[#141416]/80 rounded-2xl p-5 cursor-pointer hover:border-[#F05A28]/50 dark:hover:border-[#F05A28]/50 transition-all duration-200 w-full group">
                      {previewUrl && (
                        <div className="relative w-36 h-20 rounded-xl overflow-hidden shrink-0 border border-zinc-200 dark:border-zinc-800 shadow-sm group-hover:shadow-md transition-shadow">
                          <Image src={previewUrl} alt="Preview" fill className="object-cover" />
                        </div>
                      )}
                      <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                        <span className="text-sm font-bold text-zinc-700 dark:text-zinc-300 group-hover:text-[#F05A28] transition-colors truncate max-w-xs">
                          {imageFile ? imageFile.name : "Upload new cover photo"}
                        </span>
                        <p className="text-[11px] font-medium text-zinc-500 dark:text-zinc-500 mt-1">Leave unchanged to keep the existing visual asset.</p>
                      </div>
                      <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                    </label>
                  </div>
                </div>

                {/* Footer */}
                <div className="border-t border-zinc-100 dark:border-zinc-800/80 px-6 py-4 flex gap-3 justify-end shrink-0 bg-zinc-50/80 dark:bg-[#141416]/50">
                  <button 
                    type="button" 
                    onClick={() => setIsOpen(false)} 
                    className="h-10 px-5 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-bold text-xs uppercase rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    disabled={loading} 
                    className="h-10 px-6 bg-[#F05A28] hover:bg-[#d94a1d] text-white font-bold text-xs uppercase rounded-xl shadow-lg shadow-[#F05A28]/20 transition-colors disabled:opacity-50 disabled:shadow-none"
                  >
                    {loading ? "Updating..." : "Confirm Update"}
                  </button>
                </div>

              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}