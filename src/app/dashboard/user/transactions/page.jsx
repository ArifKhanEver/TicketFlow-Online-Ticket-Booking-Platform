'use client';

import React, { useState, useMemo } from 'react';
import { Chip, Button } from '@heroui/react';
import { 
  FiSearch, FiDollarSign, FiCalendar, FiHash, 
  FiCheckCircle, FiArrowUpRight, FiDownload, FiInfo 
} from 'react-icons/fi';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

export default function TransactionHistoryPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const dummyTransactions = [
    {
      _id: "tx_101",
      transactionId: "ch_3MxsK2LkdEStR6Y41bX7yz21",
      amount: 2400,
      ticketTitle: "Hanif Enterprise - Scania Multi-Axle",
      paymentDate: "2026-06-24T10:15:30.000Z",
      route: "Dhaka to Barishal",
      gateway: "Stripe Card"
    },
    {
      _id: "tx_102",
      transactionId: "ch_4Nkd82JjshWqP1M90aB2xz98",
      amount: 1800,
      ticketTitle: "Green Line Paribahan - Sleeper Class",
      paymentDate: "2026-06-20T14:45:00.000Z",
      route: "Dhaka to Cox's Bazar",
      gateway: "Stripe GooglePay"
    },
    {
      _id: "tx_103",
      transactionId: "ch_1Azk90LpdmQzR5T82cK1lm45",
      amount: 2550,
      ticketTitle: "Subarna Express - Snigdha AC",
      paymentDate: "2026-06-18T07:20:15.000Z",
      route: "Dhaka to Chattogram",
      gateway: "Stripe Card"
    },
    {
      _id: "tx_104",
      transactionId: "ch_9Plm12QvbtWxZ8Y43nN5op90",
      amount: 4500,
      ticketTitle: "US-Bangla Airlines - Boeing 737",
      paymentDate: "2026-06-12T19:10:00.000Z",
      route: "Dhaka to Sylhet",
      gateway: "Stripe ApplePay"
    }
  ];

  const filteredTransactions = useMemo(() => {
    if (!searchQuery) return dummyTransactions;
    const query = searchQuery.toLowerCase();
    return dummyTransactions.filter(tx => 
      tx.ticketTitle.toLowerCase().includes(query) ||
      tx.transactionId.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const handleDownloadInvoice = (txId) => {
    toast.success(`Downloading PDF Invoice for ${txId}...`);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-5xl mx-auto px-4 md:px-6 space-y-6"
    >
      {/* Header Typography Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-5 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-zinc-900 dark:text-white tracking-tight">
            Transaction History
          </h1>
          <p className="text-xs font-semibold text-zinc-400 mt-1">
            Review immutable financial logs, audit trail identifiers, and stripe payment metadata.
          </p>
        </div>
        <Chip variant="flat" color="success" className="font-bold text-xs uppercase px-2.5">
          Settled Logs: {dummyTransactions.length}
        </Chip>
      </div>

      {/* Optimized Search Input Layout Container */}
      <div className="w-full max-w-md relative flex items-center">
        <FiSearch className="absolute left-4 text-zinc-400 z-10" size={16} />
        <input
          type="text"
          placeholder="Filter by Ticket Title or Transaction ID..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-11 pl-11 pr-4 bg-white dark:bg-[#111113] border border-zinc-200 dark:border-zinc-800 focus:border-[#039855] focus:outline-none rounded-xl shadow-sm text-sm font-medium text-zinc-900 dark:text-white transition-colors placeholder:text-zinc-400"
        />
      </div>

      {/* ১০০% এরর-ফ্রি এবং ফুললি রেসপন্সিভ নেটিভ টেবিল মেকানিজম */}
      {filteredTransactions.length > 0 ? (
        <div className="w-full border border-zinc-200 dark:border-zinc-800/80 rounded-2xl overflow-hidden bg-white dark:bg-[#111113] shadow-sm overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            {/* Table Header Matrix */}
            <thead>
              <tr className="bg-zinc-50 dark:bg-[#18181b] border-b border-zinc-200 dark:border-zinc-800 text-zinc-400 font-bold text-[11px] uppercase tracking-wider h-12">
                <th className="px-6 align-middle"><span className="flex items-center gap-1"><FiHash size={12} /> Transaction ID</span></th>
                <th className="px-6 align-middle">Ticket Title / Routing</th>
                <th className="px-6 align-middle"><span className="flex items-center gap-1"><FiCalendar size={12} /> Payment Date</span></th>
                <th className="px-6 align-middle text-right"><span className="flex items-center gap-1 justify-end"><FiDollarSign size={12} /> Amount</span></th>
                <th className="px-6 align-middle text-center">Receipt</th>
              </tr>
            </thead>
            
            {/* Table Body dynamic loop system */}
            <tbody>
              {filteredTransactions.map((tx) => (
                <tr 
                  key={tx._id}
                  className="border-b border-zinc-100 dark:border-zinc-800/50 hover:bg-zinc-50/50 dark:hover:bg-[#141416]/40 transition-colors"
                >
                  {/* 1. Transaction ID */}
                  <td className="px-6 py-4.5 align-middle whitespace-nowrap">
                    <span className="font-mono text-xs font-bold text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800/60 px-2 py-1 rounded-md border border-zinc-200/40 dark:border-zinc-700/30">
                      {tx.transactionId}
                    </span>
                  </td>
                  
                  {/* 2. Ticket Title and Routes */}
                  <td className="px-6 py-4.5 align-middle">
                    <div>
                      <p className="text-sm font-black text-zinc-900 dark:text-white leading-tight">
                        {tx.ticketTitle}
                      </p>
                      <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mt-1 flex items-center gap-1">
                        <FiArrowUpRight size={11} className="text-[#039855]" /> {tx.route} • {tx.gateway}
                      </p>
                    </div>
                  </td>
                  
                  {/* 3. Date Configuration */}
                  <td className="px-6 py-4.5 align-middle whitespace-nowrap">
                    <div className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                      <p className="text-zinc-900 dark:text-zinc-200">
                        {new Date(tx.paymentDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                      <p className="text-[10px] text-zinc-400 mt-0.5">
                        {new Date(tx.paymentDate).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}
                      </p>
                    </div>
                  </td>
                  
                  {/* 4. Financial Calculations */}
                  <td className="px-6 py-4.5 align-middle text-right whitespace-nowrap">
                    <div className="flex flex-col items-end">
                      <span className="text-sm font-black text-[#039855]">
                        +{tx.amount}.00 BDT
                      </span>
                      <Chip size="sm" variant="flat" color="success" className="h-4 text-[9px] font-black uppercase px-1 mt-1 rounded-md">
                        <span className="flex items-center gap-0.5"><FiCheckCircle size={8} /> Settled</span>
                      </Chip>
                    </div>
                  </td>

                  {/* 5. PDF Actions */}
                  <td className="px-6 py-4.5 align-middle text-center whitespace-nowrap">
                    <Button
                      isIconOnly
                      size="sm"
                      variant="flat"
                      onClick={() => handleDownloadInvoice(tx.transactionId)}
                      className="bg-zinc-100 hover:bg-[#039855]/10 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-[#039855] rounded-xl transition-colors"
                      title="Download Invoice PDF"
                    >
                      <FiDownload size={14} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        /* UI Empty Fallback View Container */
        <div className="text-center py-20 bg-white dark:bg-[#111113] border border-zinc-200 dark:border-zinc-800 rounded-[24px] max-w-xl mx-auto">
          <FiInfo size={32} className="mx-auto text-zinc-400 mb-3" />
          <p className="text-zinc-500 dark:text-zinc-400 font-bold text-sm">
            No transaction settlements correspond to your query criteria.
          </p>
        </div>
      )}
    </motion.div>
  );
}