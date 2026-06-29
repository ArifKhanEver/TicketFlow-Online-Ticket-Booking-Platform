'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Chip, Button, Avatar, 
  Modal, useOverlayState 
} from '@heroui/react';
import {
  FiSearch, FiUserCheck, FiShield, FiAlertTriangle,
  FiUsers, FiMail, FiCheckCircle, FiInfo, FiUnlock
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { modifyUserRole } from '@/lib/actions/users';

export default function ManageUsersClient({ users = [], currentAdminId }) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  
  const state = useOverlayState();
  
  const [pendingAction, setPendingAction] = useState(null); 
  const [isMutating, setIsMutating] = useState(false);

  const triggerConfirmation = (userId, userName, type, payloadValue) => {
    setPendingAction({ userId, userName, type, payloadValue });
    state.open(); 
  };

  const handleExecuteConfirmedAction = async () => {
    if (!pendingAction) return;
    setIsMutating(true);
    
    const { userId, type, payloadValue } = pendingAction;
    const toastId = type === 'role' ? "role_sync" : "fraud_sync";
    
    toast.loading(`Processing state sync pipeline...`, { id: toastId });
    state.close(); 

    try {
      const currentUser = users?.find(user => user._id === userId);
      const currentRole = currentUser ? currentUser.role : 'vendor';
      const currentBannedStatus = currentUser ? currentUser.banned : false;

      let payload = { userId };

      if (type === 'role') {
        payload.modifiedRole = payloadValue;
        payload.banned = payloadValue !== 'vendor' ? false : currentBannedStatus;
      } else if (type === 'ban_toggle') {
        payload.modifiedRole = currentRole;
        payload.banned = payloadValue;
      }

      const data = await modifyUserRole(payload);
      
      if (data?.success) {
        router.refresh();
        
        if (type === 'role') {
          toast.success(`User privileges updated to ${payloadValue}!`, { id: toastId });
        } else {
          payloadValue 
            ? toast.error(`Vendor session revoked and BANNED.`, { id: toastId })
            : toast.success(`Vendor access restored and UNBANNED!`, { id: toastId });
        }
      } else {
        toast.error(data?.error || "Pipeline operation aborted.", { id: toastId });
      }
    } catch (error) {
      console.error(error);
      toast.error("Network processing failure.", { id: toastId });
    } finally {
      setIsMutating(false);
      setPendingAction(null);
    }
  };

  const filteredUsers = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return users?.filter(user =>
      user.name?.toLowerCase().includes(query) ||
      user.email?.toLowerCase().includes(query)
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
            Moderate global user access tokens, escalate role privileges, and enforce ecosystem penalty structures.
          </p>
        </div>
        <Chip variant="flat" color="success" className="font-bold text-xs uppercase px-2.5 h-7 rounded-lg">
          Total Registry: {users?.length}
        </Chip>
      </div>

      {/* Search Input */}
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
      {filteredUsers?.length > 0 ? (
        <div className="w-full">

          {/* A) MOBILE VIEW */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            <AnimatePresence mode="popLayout">
              {filteredUsers?.map((userInstance) => {
                const isVendor = userInstance.role === 'vendor';
                const isAdmin = userInstance.role === 'admin';
                const isSelf = userInstance._id === currentAdminId; 

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
                        <Avatar src={userInstance.image} name={userInstance.name} className="w-9 h-9 border border-zinc-200 dark:border-zinc-700" />
                        <div>
                          <p className="text-sm font-black text-zinc-900 dark:text-white flex items-center gap-1">
                            {userInstance.name}
                            {isSelf && <Chip size="sm" variant="solid" color="warning" className="h-4 text-[8px] font-black tracking-widest rounded px-1 uppercase">You</Chip>}
                          </p>
                          <p className="text-xs font-semibold text-zinc-400 flex items-center gap-1 mt-0.5"><FiMail size={12} /> {userInstance.email}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-1 border-t border-dashed border-zinc-100 dark:border-zinc-800/60">
                      <Chip size="sm" variant="flat" color={isAdmin ? "danger" : isVendor ? "primary" : "default"} className="font-black uppercase text-[10px] tracking-wider rounded-md">
                        {userInstance.role}
                      </Chip>
                      {userInstance.banned ? (
                        <span className="inline-flex items-center gap-1 font-black text-red-500 bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded text-[10px] uppercase tracking-wider">
                          <FiAlertTriangle size={10} /> Banned User
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 font-black text-[#039855] bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded text-[10px] uppercase tracking-wider">
                          <FiCheckCircle size={10} /> Active
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                      <Button
                        size="sm"
                        variant="flat"
                        isDisabled={isAdmin || userInstance.banned || isSelf}
                        onClick={() => triggerConfirmation(userInstance._id, userInstance.name, 'role', 'admin')}
                        className="font-black text-xs uppercase tracking-wider rounded-xl h-9 bg-purple-500/10 text-purple-600 dark:text-purple-400"
                        startContent={<FiShield size={13} />}
                      >
                        Admin
                      </Button>
                      <Button
                        size="sm"
                        variant="flat"
                        color="primary"
                        isDisabled={isVendor || userInstance.banned || isSelf}
                        onClick={() => triggerConfirmation(userInstance._id, userInstance.name, 'role', 'vendor')}
                        className="font-black text-xs uppercase tracking-wider rounded-xl h-9 bg-blue-500/10 text-blue-600 dark:text-blue-400"
                        startContent={<FiUserCheck size={13} />}
                      >
                        Vendor
                      </Button>
                      {isVendor && (
                        <Button
                          size="sm"
                          color={userInstance.banned ? "success" : "danger"}
                          variant={userInstance.banned ? "flat" : "solid"}
                          isDisabled={isSelf || isMutating}
                          onClick={() => triggerConfirmation(userInstance._id, userInstance.name, 'ban_toggle', !userInstance.banned)}
                          className="font-black text-xs uppercase tracking-wider rounded-xl h-9"
                          startContent={userInstance.banned ? <FiUnlock size={13} /> : <FiAlertTriangle size={13} />}
                        >
                          {userInstance.banned ? "Unban Vendor" : "Ban Vendor"}
                        </Button>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* B) DESKTOP VIEW */}
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
                    const isSelf = userInstance._id === currentAdminId;

                    return (
                      <tr key={userInstance._id} className="border-b border-zinc-100 dark:border-zinc-800/50 hover:bg-zinc-50/40 dark:hover:bg-[#141416]/30 transition-colors">
                        <td className="px-6 py-3.5 align-middle whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <Avatar src={userInstance.image} name={userInstance.name} className="w-8 h-8 border border-zinc-200 dark:border-zinc-700" />
                            <span className="text-sm font-black text-zinc-900 dark:text-white tracking-tight flex items-center gap-1.5">
                              {userInstance.name}
                              {isSelf && <Chip size="sm" variant="solid" color="warning" className="h-4.5 text-[8px] font-black tracking-widest rounded-md px-1 uppercase">You</Chip>}
                            </span>
                          </div>
                        </td>

                        <td className="px-6 py-3.5 align-middle whitespace-nowrap text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                          <span className="flex items-center gap-2"><FiMail size={14} className="text-zinc-400 shrink-0" /> {userInstance.email}</span>
                        </td>

                        <td className="px-6 py-3.5 align-middle text-center whitespace-nowrap">
                          <Chip size="sm" variant="flat" color={isAdmin ? "danger" : isVendor ? "primary" : "default"} className="font-black uppercase text-[10px] tracking-wider h-6 rounded-md px-2">
                            {userInstance.role}
                          </Chip>
                        </td>

                        <td className="px-6 py-3.5 align-middle text-center whitespace-nowrap">
                          {userInstance.banned ? (
                            <span className="inline-flex items-center gap-1 font-black text-red-500 bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded-md uppercase tracking-wider text-[10px]">
                              <FiAlertTriangle size={11} /> Banned
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 font-black text-[#039855] bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded-md uppercase tracking-wider text-[10px]">
                              <FiCheckCircle size={11} /> Active
                            </span>
                          )}
                        </td>

                        <td className="px-6 py-3.5 align-middle text-center whitespace-nowrap">
                          <div className="flex items-center justify-center gap-2">
                            <Button
                              size="sm"
                              variant="flat"
                              isDisabled={isAdmin || userInstance.banned || isSelf}
                              onClick={() => triggerConfirmation(userInstance._id, userInstance.name, 'role', 'admin')}
                              className="font-black text-xs uppercase tracking-wider rounded-xl h-9 px-3.5 bg-purple-500/10 hover:bg-purple-600 text-purple-600 hover:text-white transition-all duration-200"
                              startContent={<FiShield size={13} className="shrink-0" />}
                            >
                              Make Admin
                            </Button>

                            <Button
                              size="sm"
                              variant="flat"
                              color="primary"
                              isDisabled={isVendor || userInstance.banned || isSelf}
                              onClick={() => triggerConfirmation(userInstance._id, userInstance.name, 'role', 'vendor')}
                              className="font-black text-xs uppercase tracking-wider rounded-xl h-9 px-3.5 bg-blue-500/10 hover:bg-blue-600 text-blue-600 hover:text-white transition-all duration-200"
                              startContent={<FiUserCheck size={13} className="shrink-0" />}
                            >
                              Make Vendor
                            </Button>

                            {isVendor && (
                              <Button
                                size="sm"
                                variant={userInstance.banned ? "flat" : "solid"}
                                color={userInstance.banned ? "success" : "danger"}
                                isDisabled={isSelf || isMutating}
                                onClick={() => triggerConfirmation(userInstance._id, userInstance.name, 'ban_toggle', !userInstance.banned)}
                                className={`font-black text-xs uppercase tracking-wider rounded-xl h-9 px-3.5 transition-all duration-200 ${
                                  userInstance.banned
                                    ? "bg-green-500/10 text-green-500 hover:bg-green-600 hover:text-white"
                                    : "bg-red-500 hover:bg-red-600 text-white shadow-md shadow-red-500/20"
                                }`}
                                startContent={userInstance.banned ? <FiUnlock size={13} className="shrink-0" /> : <FiAlertTriangle size={13} className="shrink-0" />}
                              >
                                {userInstance.banned ? "Unban Vendor" : "Ban Vendor"}
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

      {/* ⭐ ফিক্সড: HeroUI v3-এর লেটেস্ট অফিসিয়াল কম্পাউন্ড মোডাল স্ট্রাকচার */}
      <Modal state={state}>
        <Modal.Backdrop variant="blur">
          <Modal.Container>
            <Modal.Dialog>
              {({ close }) => (
                <>
                  <Modal.Header className="flex flex-col gap-1 text-sm font-black text-zinc-900 dark:text-white uppercase tracking-wider">
                    <span className="flex items-center gap-2 text-amber-500">
                      <FiAlertTriangle size={18} /> Confirm Platform Authorization Mutate
                    </span>
                  </Modal.Header>
                  <Modal.Body>
                    <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 leading-relaxed">
                      Are you absolutely certain you want to proceed with this operation? You are attempting to modify the structural parameter logs of 
                      <b className="text-zinc-900 dark:text-white px-1">"{pendingAction?.userName}"</b> inside the core database pipeline.
                    </p>
                    <div className="p-3 bg-zinc-50 dark:bg-zinc-900/50 rounded-xl border border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-[11px] font-bold uppercase tracking-wider">
                      <span className="text-zinc-400">Target Action Queue:</span>
                      <span className={`px-2 py-0.5 rounded text-white ${pendingAction?.type === 'role' ? 'bg-purple-600' : pendingAction?.payloadValue ? 'bg-red-600' : 'bg-green-600'}`}>
                        {pendingAction?.type === 'role' ? `Change Privilege to ${pendingAction?.payloadValue}` : pendingAction?.payloadValue ? 'Enforce Account Ban' : 'Revoke Account Ban'}
                      </span>
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button 
                      size="sm" 
                      variant="flat" 
                      onClick={close}
                      className="font-bold text-xs uppercase rounded-xl h-9 px-4"
                    >
                      Cancel
                    </Button>
                    <Button 
                      size="sm" 
                      onClick={handleExecuteConfirmedAction}
                      className={`font-black text-xs uppercase tracking-wider rounded-xl h-9 px-4 text-white ${
                        pendingAction?.type === 'role' 
                          ? 'bg-purple-600 hover:bg-purple-700' 
                          : pendingAction?.payloadValue 
                            ? 'bg-red-600 hover:bg-red-700' 
                            : 'bg-green-600 hover:bg-green-700'
                      }`}
                    >
                      Confirm Execution
                    </Button>
                  </Modal.Footer>
                </>
              )}
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>

    </motion.div>
  );
}