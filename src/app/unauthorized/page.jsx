'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiLock, FiArrowLeft, FiHome } from "react-icons/fi";
import { motion } from "motion/react";
import { authClient } from "@/lib/auth-client"; 
import { Button } from "@heroui/react";

const ambientGlowStyle = "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#039855]/10 rounded-full blur-[120px] pointer-events-none";

function UnauthorizedPage() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const currentRole = session?.user?.role || "Guest";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#050505] flex items-center justify-center px-4 relative overflow-hidden transition-colors duration-300">
      
      {/* Background Decorative Ambient Light */}
      <div className={ambientGlowStyle} />

      {/* Main Glassmorphic Card Container */}
      <motion.div 
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 150, damping: 20 }}
        className="max-w-md w-full bg-white dark:bg-[#141416]/90 border border-gray-200 dark:border-zinc-800/60 backdrop-blur-xl rounded-[28px] p-8 text-center shadow-xl dark:shadow-2xl relative z-10"
      >
        {/* Animated Lock Icon */}
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
          className="w-16 h-16 bg-red-500/10 border border-red-500/20 text-red-500 dark:text-red-400 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-red-500/5"
        >
          <FiLock size={28} className="animate-pulse" />
        </motion.div>

        {/* Error Typography */}
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xs font-bold tracking-widest text-red-600 dark:text-red-400 uppercase bg-red-500/5 px-3 py-1.5 rounded-full border border-red-500/10"
        >
          Error 403: Forbidden
        </motion.span>

        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-2xl font-black tracking-tight text-black dark:text-white mt-6 mb-2"
        >
          Access Restricted
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-sm text-gray-500 dark:text-zinc-400 leading-relaxed mb-8"
        >
          This zone is restricted. Your current account role as a <span className="text-[#039855] font-bold capitalize bg-[#039855]/10 px-2 py-0.5 rounded border border-[#039855]/20">{currentRole}</span> does not have the required clearance to access this route directory.
        </motion.p>

        {/* Action Buttons Group */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center gap-4 justify-center"
        >
          {/* Go Back Button */}
          <Button
            onClick={() => router.back()}
            className="w-full sm:w-auto flex items-center justify-center gap-2 border border-gray-200 dark:border-zinc-800 bg-transparent hover:bg-gray-100 dark:hover:bg-zinc-900 text-gray-700 dark:text-zinc-300 font-bold text-xs uppercase tracking-wider h-12 px-5 rounded-xl transition-all"
          >
            <FiArrowLeft size={16} />
            Go Back
          </Button>

          {/* Go Home Button - Synced with TicketFlow Green Button Theme */}
          <Button 
            as={Link}
            href="/"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#039855] hover:bg-[#028046] text-white font-bold text-xs uppercase tracking-wider h-12 px-5 rounded-xl transition-all shadow-md shadow-[#039855]/20"
          >
            <FiHome size={16} />
            Return Home
          </Button>
        </motion.div>

        {/* Subtle Brand Footer */}
        <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 dark:text-zinc-600 mt-8 select-none">
          Secured by TicketFlow Guard System
        </p>
      </motion.div>
    </div>
  );
}

export default UnauthorizedPage;