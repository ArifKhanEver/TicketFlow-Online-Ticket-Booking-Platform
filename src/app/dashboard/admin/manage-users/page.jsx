'use client';

import React, { useState, useMemo } from 'react';
import { Chip, Button, Avatar } from '@heroui/react';
import { 
  FiSearch, FiUserCheck, FiShield, FiAlertTriangle, 
  FiUsers, FiMail, FiCheckCircle, FiInfo 
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

export default function ManageUsersPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const [users, setUsers] = useState([
    {
      _id: "u_001",
      name: "Shafiqul Islam Khan",
      email: "shafiqul.khan@ticketbari.com",
      role: "admin",
      isFraud: false,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100"
    },
    {
      _id: "u_002",
      name: "Arif Khan Ever",
      email: "arif.khan@gmail.com",
      role: "vendor",
      isFraud: false,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100"
    },
    {
      _id: "u_003",
      name: "Rahat Chowdhury",
      email: "rahat.chow@yahoo.com",
      role: "user",
      isFraud: false,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100"
    },
    {
      _id: "u_004",
      name: "Sultana Razia",
      email: "razia.transit@outlook.com",
      role: "vendor",
      isFraud: true,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100"
    }
  ]);

  const handleRoleChange = (id, newRole) => {
    toast.loading(`Updating user authorization structure...`, { id: "role_sync" });
    
    setTimeout(() => {
      setUsers(prev => prev.map(user => {
        if (user._id === id) {
          return { ...user, role: newRole, isFraud: newRole !== 'vendor' ? false : user.isFraud };
        }
        return user;
      }));
      toast.success(`User role successfully escalated to ${newRole}!`, { id: "role_sync" });
    }, 800);
  };

  const handleMarkAsFraud = (id, currentName) => {
    const proceed = confirm(`Are you sure you want to flag "${currentName}" as FRAUD? All associated fleet listings will be hidden instantly.`);
    if (!proceed) return;

    toast.loading(`Enforcing platform penalty constraints...`, { id: "fraud_sync" });

    setTimeout(() => {
      setUsers(prev => prev.map(user => {
        if (user._id === id) {
          return { ...user, isFraud: true };
        }
        return user;
      }));
      toast.error(`Vendor flagged as FRAUD. Listings sequestered.`, { id: "fraud_sync" });
    }, 1000);
  };

  const filteredUsers = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return users.filter(user => 
      user.name.toLowerCase().includes(query) || 
      user.email.toLowerCase().includes(query)
    );
  }, [searchQuery, users]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-5xl mx-auto px-4 md:px-6 space-y-5 pt-4"
    >
      {/* Upper Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4 gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-black text-zinc-900 dark:text-white tracking-tight flex items-center gap-2">
            <FiUsers className="text-[#039855]" size={24} /> Manage Users
          </h1>
          <p className="text-[11px] font-semibold text-zinc-400 mt-0.5">
            Moderate global user access tokens, escalate role privileges, and enforce fraud mitigation filters.
          </p>
        </div>
        <Chip variant="flat" color="success" className="font-bold text-[10px] uppercase px-2 h-6 rounded-md">
          Total Users: {users.length}
        </Chip>
      </div>

      {/* Compact Filter Input */}
      <div className="w-full max-w-sm relative flex items-center">
        <FiSearch className="absolute left-3.5 text-zinc-400 z-10" size={14} />
        <input
          type="text"
          placeholder="Search by Name or Email address..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-9 pl-10 pr-4 bg-white dark:bg-[#111113] border border-zinc-200 dark:border-zinc-800 focus:border-[#039855] focus:outline-none rounded-xl shadow-xs text-xs font-medium text-zinc-900 dark:text-white transition-colors placeholder:text-zinc-400"
        />
      </div>

      {/* COMPACT & BUGBUSTED NATIVE INDUSTRIAL TABLE */}
      {filteredUsers.length > 0 ? (
        <div className="w-full border border-zinc-200 dark:border-zinc-800/80 rounded-xl overflow-hidden bg-white dark:bg-[#111113] shadow-xs overflow-x-auto">
          <table className="w-full border-collapse text-left text-xs">
            <thead>
              <tr className="bg-zinc-50 dark:bg-[#18181b] border-b border-zinc-200 dark:border-zinc-800 text-zinc-400 font-black text-[10px] uppercase tracking-wider h-10">
                <th className="px-5 align-middle">User Signature Profile</th>
                <th className="px-5 align-middle">Email Address</th>
                <th className="px-5 align-middle text-center">Authorization Role</th>
                <th className="px-5 align-middle text-center">Security Status</th>
                <th className="px-5 align-middle text-center">Administrative Control</th>
              </tr>
            </thead>
            
            <tbody>
              <AnimatePresence mode="popLayout">
                {filteredUsers.map((userInstance) => {
                  const isVendor = userInstance.role === 'vendor';
                  const isAdmin = userInstance.role === 'admin';

                  return (
                    <tr 
                      key={userInstance._id}
                      className="border-b border-zinc-100 dark:border-zinc-800/50 hover:bg-zinc-50/40 dark:hover:bg-[#141416]/30 transition-colors"
                    >
                      {/* 1. Name Profile Cell (Compact py-2) */}
                      <td className="px-5 py-2 align-middle whitespace-nowrap">
                        <div className="flex items-center gap-2.5">
                          <Avatar 
                            src={userInstance.avatar} 
                            name={userInstance.name} 
                            className="w-6 h-6 border border-zinc-200 dark:border-zinc-700 text-[10px]" 
                          />
                          <span className="text-xs font-bold text-zinc-900 dark:text-white tracking-tight">
                            {userInstance.name}
                          </span>
                        </div>
                      </td>
                      
                      {/* 2. Email Address Cell */}
                      <td className="px-5 py-2 align-middle whitespace-nowrap font-medium text-zinc-500 dark:text-zinc-400 text-[11px]">
                        <span className="flex items-center gap-1.5"><FiMail size={12} className="text-zinc-400 shrink-0" /> {userInstance.email}</span>
                      </td>
                      
                      {/* 3. Role Badge Cell */}
                      <td className="px-5 py-2 align-middle text-center whitespace-nowrap">
                        <Chip
                          size="sm"
                          variant="flat"
                          color={isAdmin ? "danger" : isVendor ? "primary" : "default"}
                          className="font-black uppercase text-[9px] tracking-wider h-5 rounded-md px-1.5"
                        >
                          {userInstance.role}
                        </Chip>
                      </td>
                      
                      {/* 4. Security Flags */}
                      <td className="px-5 py-2 align-middle text-center whitespace-nowrap">
                        {userInstance.isFraud ? (
                          <span className="inline-flex items-center gap-1 font-black text-red-500 bg-red-500/10 border border-red-500/20 px-1.5 py-0.5 rounded uppercase tracking-wider text-[9px]">
                            <FiAlertTriangle size={10} /> Fraudulent
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 font-black text-[#039855] bg-green-500/10 border border-green-500/20 px-1.5 py-0.5 rounded uppercase tracking-wider text-[9px]">
                            <FiCheckCircle size={10} /> Verified
                          </span>
                        )}
                      </td>

                      {/* 5. RE-DESIGNED ADMINISTRATIVE BUTTONS MATRICES */}
                      <td className="px-5 py-2 align-middle text-center whitespace-nowrap">
                        <div className="flex items-center justify-center gap-1.5">
                          
                          {/* Premium Action Pill: Make Admin */}
                          <Button
                            size="sm"
                            variant="flat"
                            color="secondary"
                            isDisabled={isAdmin || userInstance.isFraud}
                            onClick={() => handleRoleChange(userInstance._id, 'admin')}
                            className="font-black text-[9px] uppercase tracking-wider rounded-lg h-7 px-2.5 bg-purple-500/10 hover:bg-purple-500 text-purple-600 hover:text-white transition-all duration-200"
                            startContent={<FiShield size={11} className="shrink-0" />}
                          >
                            Make Admin
                          </Button>
                          
                          {/* Premium Action Pill: Make Vendor */}
                          <Button
                            size="sm"
                            variant="flat"
                            color="primary"
                            isDisabled={isVendor || userInstance.isFraud}
                            onClick={() => handleRoleChange(userInstance._id, 'vendor')}
                            className="font-black text-[9px] uppercase tracking-wider rounded-lg h-7 px-2.5 bg-blue-500/10 hover:bg-blue-600 text-blue-600 hover:text-white transition-all duration-200"
                            startContent={<FiUserCheck size={11} className="shrink-0" />}
                          >
                            Make Vendor
                          </Button>

                          {/* Premium Action Pill: Mark as Fraud (Strict Conditional Rendering) */}
                          {isVendor && (
                            <Button
                              size="sm"
                              variant={userInstance.isFraud ? "flat" : "solid"}
                              color="danger"
                              isDisabled={userInstance.isFraud}
                              onClick={() => handleMarkAsFraud(userInstance._id, userInstance.name)}
                              className={`font-black text-[9px] uppercase tracking-wider rounded-lg h-7 px-2.5 transition-all duration-200 ${
                                userInstance.isFraud 
                                  ? "bg-red-500/10 text-red-400" 
                                  : "bg-red-500 hover:bg-red-600 text-white shadow-xs shadow-red-500/20"
                              }`}
                              startContent={<FiAlertTriangle size={11} className="shrink-0" />}
                            >
                              {userInstance.isFraud ? "Flagged Fraud" : "Mark As Fraud"}
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      ) : (
        /* Fallback Empty View */
        <div className="text-center py-16 bg-white dark:bg-[#111113] border border-zinc-200 dark:border-zinc-800 rounded-xl max-w-xl mx-auto">
          <FiInfo size={28} className="mx-auto text-zinc-400 mb-2" />
          <p className="text-zinc-500 dark:text-zinc-400 font-bold text-xs">
            No profile records correspond to your query matrix criteria.
          </p>
        </div>
      )}
    </motion.div>
  );
}