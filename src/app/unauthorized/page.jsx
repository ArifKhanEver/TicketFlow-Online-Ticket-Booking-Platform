'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiLock, FiArrowLeft, FiHome } from "react-icons/fi";
import { motion } from "motion/react";
import { authClient } from "@/lib/auth-client"; 

const ambientGlowStyle = "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#5B51F9]/10 rounded-full blur-[120px] pointer-events-none";

function UnauthorizedPage() {
  const router = useRouter();
  
  const { data: session } = authClient.useSession();
  const currentRole = session?.user?.role || "Guest";

  return (
    <div className="min-h-screen bg-[#0A0A0C] flex items-center justify-center px-4 relative overflow-hidden">
      
      {/* Background Decorative Ambient Light */}
      <div className={ambientGlowStyle} />

      {/* Main Glassmorphic Card Container */}
      <motion.div 
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 150, damping: 20 }}
        className="max-w-md w-full bg-[#141416]/90 border border-zinc-800/60 backdrop-blur-xl rounded-2xl p-8 text-center shadow-2xl relative z-10"
      >
        {/* Animated Lock Icon */}
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
          className="w-16 h-16 bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-red-500/5"
        >
          <FiLock size={28} className="animate-pulse" />
        </motion.div>

        {/* Error Typography */}
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xs font-semibold tracking-widest text-red-400 uppercase bg-red-500/5 px-3 py-1 rounded-full border border-red-500/10"
        >
          Error 403: Forbidden
        </motion.span>

        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-2xl font-bold tracking-tight text-white mt-4 mb-2"
        >
          Access Restricted
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-[14px] text-zinc-400 leading-relaxed mb-8"
        >
          This zone is restricted. Your current account role as a <span className="text-[#5B51F9] font-semibold capitalize bg-[#5B51F9]/10 px-2 py-0.5 rounded border border-[#5B51F9]/20">{currentRole}</span> does not have the required clearance to access this route directory.
        </motion.p>

        {/* Action Buttons Group */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center gap-4 justify-center"
        >
          {/* Go Back Button */}
          <button
            onClick={() => router.back()}
            className="w-full sm:w-auto flex items-center justify-center gap-2 border border-zinc-800 hover:bg-zinc-900 text-zinc-300 font-medium text-sm px-5 py-3 rounded-xl transition-all duration-200 cursor-pointer"
          >
            <FiArrowLeft size={16} />
            Go Back
          </button>

          {/* Go Home Button */}
          <Link href="/" className="w-full sm:w-auto">
            <motion.button 
              whileTap={{ scale: 0.97 }} 
              className="w-full flex items-center justify-center gap-2 bg-[#5B51F9] hover:bg-[#483EFF] text-white font-medium text-sm px-5 py-3 rounded-xl transition-all duration-200 shadow-md shadow-[#5B51F9]/10 cursor-pointer"
            >
              <FiHome size={16} />
              Return Home
            </motion.button>
          </Link>
        </motion.div>

        {/* Subtle Brand Footer */}
        <p className="text-[11px] text-zinc-600 mt-8 select-none">
          Secured by ticketflow Guard System
        </p>
      </motion.div>
    </div>
  );
}

export default UnauthorizedPage;