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
      className="w-full max-w-5xl mx-auto px-4 md:px-6 space-y-6 pt-4"
    >
      {/* Upper Header Layout */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-5 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-zinc-900 dark:text-white tracking-tight flex items-center gap-2">
            <FiUsers className="text-[#039855]" size={26} /> Manage Users
          </h1>
          <p className="text-xs font-semibold text-zinc-400 mt-1">
            Moderate global user access tokens, escalate role privileges, and enforce fraud mitigation filters.
          </p>
        </div>
        <Chip variant="flat" color="success" className="font-bold text-xs uppercase px-2.5 h-7 rounded-lg">
          Total Users: {users.length}
        </Chip>
      </div>

      {/* Optimized Search Input (Font Size Increased to text-sm) */}
      <div className="w-full max-w-md relative flex items-center">
        <FiSearch className="absolute left-4 text-zinc-400 z-10" size={16} />
        <input
          type="text"
          placeholder="Search by Name or Email address..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-11 pl-11 pr-4 bg-white dark:bg-[#111113] border border-zinc-200 dark:border-zinc-800 focus:border-[#039855] focus:outline-none rounded-xl shadow-sm text-sm font-medium text-zinc-900 dark:text-white transition-colors placeholder:text-zinc-400"
        />
      </div>

      {/* MAIN CONTAINER PLATFORM */}
      {filteredUsers.length > 0 ? (
        <div className="w-full">
          
          {/* A) MOBILE VIEW: Stacked Grid Cards Layout (Hides on Desktop screen md) */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            <AnimatePresence mode="popLayout">
              {filteredUsers.map((userInstance) => {
                const isVendor = userInstance.role === 'vendor';
                const isAdmin = userInstance.role === 'admin';

                return (
                  <motion.div
                    key={userInstance._id}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white dark:bg-[#111113] p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <Avatar src={userInstance.avatar} name={userInstance.name} size="md" className="border border-zinc-200 dark:border-zinc-700" />
                        <div>
                          <p className="text-sm font-black text-zinc-900 dark:text-white">{userInstance.name}</p>
                          <p className="text-xs font-semibold text-zinc-400 flex items-center gap-1 mt-0.5"><FiMail size={12} /> {userInstance.email}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-1 border-t border-dashed border-zinc-100 dark:border-zinc-800/60">
                      <Chip size="sm" variant="flat" color={isAdmin ? "danger" : isVendor ? "primary" : "default"} className="font-black uppercase text-[10px] tracking-wider rounded-md">
                        {userInstance.role}
                      </Chip>
                      {userInstance.isFraud ? (
                        <span className="inline-flex items-center gap-1 font-black text-red-500 bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded text-[10px] uppercase tracking-wider">
                          <FiAlertTriangle size={10} /> Fraudulent
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 font-black text-[#039855] bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded text-[10px] uppercase tracking-wider">
                          <FiCheckCircle size={10} /> Verified
                        </span>
                      )}
                    </div>

                    {/* Mobile Administrative Control Pill Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                      <Button
                        size="sm"
                        variant="flat"
                        isDisabled={isAdmin || userInstance.isFraud}
                        onClick={() => handleRoleChange(userInstance._id, 'admin')}
                        className="font-black text-xs uppercase tracking-wider rounded-xl h-9 bg-purple-500/10 text-purple-600 dark:text-purple-400"
                        startContent={<FiShield size={13} />}
                      >
                        Admin
                      </Button>
                      <Button
                        size="sm"
                        variant="flat"
                        color="primary"
                        isDisabled={isVendor || userInstance.isFraud}
                        onClick={() => handleRoleChange(userInstance._id, 'vendor')}
                        className="font-black text-xs uppercase tracking-wider rounded-xl h-9 bg-blue-500/10 text-blue-600 dark:text-blue-400"
                        startContent={<FiUserCheck size={13} />}
                      >
                        Vendor
                      </Button>
                      {isVendor && (
                        <Button
                          size="sm"
                          color="danger"
                          variant={userInstance.isFraud ? "flat" : "solid"}
                          isDisabled={userInstance.isFraud}
                          onClick={() => handleMarkAsFraud(userInstance._id, userInstance.name)}
                          className="font-black text-xs uppercase tracking-wider rounded-xl h-9"
                          startContent={<FiAlertTriangle size={13} />}
                        >
                          {userInstance.isFraud ? "Flagged Fraud" : "Mark Fraud"}
                        </Button>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* B) DESKTOP VIEW: Premium Compact Table (Hidden on Mobile view, scaled font size) */}
          <div className="hidden md:block w-full border border-zinc-200 dark:border-zinc-800/80 rounded-2xl overflow-scroll bg-white dark:bg-[#111113] shadow-sm">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-zinc-50 dark:bg-[#18181b] border-b border-zinc-200 dark:border-zinc-800 text-zinc-400 font-black text-xs uppercase tracking-wider h-12">
                  <th className="px-6 align-middle">User Profile</th>
                  <th className="px-6 align-middle">Email Address</th>
                  <th className="px-6 align-middle text-center">Authorization Role</th>
                  <th className="px-6 align-middle text-center">Security Status</th>
                  <th className="px-6 align-middle text-center">Administrative Control</th>
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
                        {/* Font Size Scaling: text-sm font-black for clear names */}
                        <td className="px-6 py-3.5 align-middle whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <Avatar src={userInstance.avatar} name={userInstance.name} className="w-8 h-8 border border-zinc-200 dark:border-zinc-700 text-xs" />
                            <span className="text-sm font-black text-zinc-900 dark:text-white tracking-tight">
                              {userInstance.name}
                            </span>
                          </div>
                        </td>
                        
                        {/* Font Size Scaling: text-xs font-semibold for secondary email strings */}
                        <td className="px-6 py-3.5 align-middle whitespace-nowrap text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                          <span className="flex items-center gap-2"><FiMail size={14} className="text-zinc-400 shrink-0" /> {userInstance.email}</span>
                        </td>
                        
                        <td className="px-6 py-3.5 align-middle text-center whitespace-nowrap">
                          <Chip
                            size="sm"
                            variant="flat"
                            color={isAdmin ? "danger" : isVendor ? "primary" : "default"}
                            className="font-black uppercase text-[10px] tracking-wider h-6 rounded-md px-2"
                          >
                            {userInstance.role}
                          </Chip>
                        </td>
                        
                        <td className="px-6 py-3.5 align-middle text-center whitespace-nowrap">
                          {userInstance.isFraud ? (
                            <span className="inline-flex items-center gap-1 font-black text-red-500 bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded-md uppercase tracking-wider text-[10px]">
                              <FiAlertTriangle size={11} /> Fraudulent
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 font-black text-[#039855] bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded-md uppercase tracking-wider text-[10px]">
                              <FiCheckCircle size={11} /> Verified
                            </span>
                          )}
                        </td>

                        {/* RE-DESIGNED PILL BUTTONS (Font size scaled to text-xs) */}
                        <td className="px-6 py-3.5 align-middle text-center whitespace-nowrap">
                          <div className="flex items-center justify-center gap-2">
                            
                            <Button
                              size="sm"
                              variant="flat"
                              isDisabled={isAdmin || userInstance.isFraud}
                              onClick={() => handleRoleChange(userInstance._id, 'admin')}
                              className="font-black text-xs uppercase tracking-wider rounded-xl h-9 px-3.5 bg-purple-500/10 hover:bg-purple-600 text-purple-600 hover:text-white transition-all duration-200"
                              startContent={<FiShield size={13} className="shrink-0" />}
                            >
                              Make Admin
                            </Button>
                            
                            <Button
                              size="sm"
                              variant="flat"
                              color="primary"
                              isDisabled={isVendor || userInstance.isFraud}
                              onClick={() => handleRoleChange(userInstance._id, 'vendor')}
                              className="font-black text-xs uppercase tracking-wider rounded-xl h-9 px-3.5 bg-blue-500/10 hover:bg-blue-600 text-blue-600 hover:text-white transition-all duration-200"
                              startContent={<FiUserCheck size={13} className="shrink-0" />}
                            >
                              Make Vendor
                            </Button>

                            {isVendor && (
                              <Button
                                size="sm"
                                variant={userInstance.isFraud ? "flat" : "solid"}
                                color="danger"
                                isDisabled={userInstance.isFraud}
                                onClick={() => handleMarkAsFraud(userInstance._id, userInstance.name)}
                                className={`font-black text-xs uppercase tracking-wider rounded-xl h-9 px-3.5 transition-all duration-200 ${
                                  userInstance.isFraud 
                                    ? "bg-red-500/10 text-red-400" 
                                    : "bg-red-500 hover:bg-red-600 text-white shadow-md shadow-red-500/20"
                                }`}
                                startContent={<FiAlertTriangle size={13} className="shrink-0" />}
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

        </div>
      ) : (
        <div className="text-center py-16 bg-white dark:bg-[#111113] border border-zinc-200 dark:border-zinc-800 rounded-2xl max-w-xl mx-auto">
          <FiInfo size={32} className="mx-auto text-zinc-400 mb-2" />
          <p className="text-zinc-500 dark:text-zinc-400 font-bold text-sm">
            No profile records correspond to your query matrix criteria.
          </p>
        </div>
      )}
    </motion.div>
  );
}