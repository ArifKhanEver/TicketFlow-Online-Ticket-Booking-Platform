import React from 'react';
import { 
  FiSearch, FiDollarSign, FiCalendar, FiHash, 
  FiCheckCircle, FiArrowUpRight, FiDownload, FiInfo 
} from 'react-icons/fi';
import { getUser } from '@/lib/core/session';
import { getPaymentRecords } from '@/lib/api/payments';

export default async function TransactionHistoryPage({ searchParams }) {
  const user = await getUser();
  const rawPayments = await getPaymentRecords(user?.id);
  const payments = rawPayments.payments
  
  const params = await searchParams;
  const searchQuery = params?.q || '';

  const filteredTransactions = payments.filter(tx => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      tx.ticketTitle?.toLowerCase().includes(query) ||
      tx.transactionId?.toLowerCase().includes(query)
    );
  });

  return (
    <div className="w-full max-w-5xl mx-auto px-4 md:px-6 space-y-6">
      
      {/* Header section*/}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-5 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-zinc-900 dark:text-white tracking-tight">
            Transaction History
          </h1>
          <p className="text-xs font-semibold text-zinc-400 mt-1">
            Review immutable financial logs, audit trail identifiers, and stripe payment metadata.
          </p>
        </div>
        <div className="inline-flex items-center font-bold text-xs uppercase px-3 h-7 bg-green-500/10 text-green-500 border border-green-500/20 rounded-full">
          Settled Logs: {filteredTransactions.length}
        </div>
      </div>

      <form method="GET" className="w-full max-w-md relative flex items-center">
        <FiSearch className="absolute left-4 text-zinc-400 z-10" size={16} />
        <input
          type="text"
          name="q"
          placeholder="Press Enter to filter by Title or Txn ID..."
          defaultValue={searchQuery}
          className="w-full h-11 pl-11 pr-4 bg-white dark:bg-[#111113] border border-zinc-200 dark:border-zinc-800 focus:border-[#039855] focus:outline-none rounded-xl shadow-sm text-sm font-medium text-zinc-900 dark:text-white transition-colors placeholder:text-zinc-400"
        />
      </form>

      {filteredTransactions.length > 0 ? (
        <div className="w-full border border-zinc-200 dark:border-zinc-800/80 rounded-2xl overflow-hidden bg-white dark:bg-[#111113] shadow-sm overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="bg-zinc-50 dark:bg-[#18181b] border-b border-zinc-200 dark:border-zinc-800 text-zinc-400 font-bold text-[11px] uppercase tracking-wider h-12">
                <th className="px-6 align-middle">
                  <span className="flex items-center gap-1"><FiHash size={12} /> Transaction ID</span>
                </th>
                <th className="px-6 align-middle">Ticket Title / Seats</th>
                <th className="px-6 align-middle">
                  <span className="flex items-center gap-1"><FiCalendar size={12} /> Payment Date</span>
                </th>
                <th className="px-6 align-middle text-right">
                  <span className="flex items-center gap-1 justify-end"><FiDollarSign size={12} /> Amount</span>
                </th>
                <th className="px-6 align-middle text-center">Receipt</th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/40">
              {filteredTransactions.map((tx) => (
                <tr 
                  key={tx._id}
                  className="hover:bg-zinc-50/50 dark:hover:bg-[#141416]/40 transition-colors"
                >
                  <td className="px-6 py-4.5 align-middle whitespace-nowrap">
                    <span className="font-mono text-xs font-bold text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800/60 px-2.5 py-1.5 rounded-md border border-zinc-200/40 dark:border-zinc-700/30">
                      {tx.transactionId}
                    </span>
                  </td>
                  
                  <td className="px-6 py-4.5 align-middle">
                    <div>
                      <p className="text-sm font-black text-zinc-900 dark:text-white leading-tight">
                        {tx.ticketTitle}
                      </p>
                      <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mt-1 flex items-center gap-1">
                        <FiArrowUpRight size={11} className="text-[#039855]" /> Quantity: {tx.bookingQuantity || 1} Seats • Stripe Gateway
                      </p>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4.5 align-middle whitespace-nowrap">
                    <div className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                      <p className="text-zinc-900 dark:text-zinc-200">
                        {new Date(tx.paidAt || tx.paymentDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                      <p className="text-[10px] text-zinc-400 mt-0.5">
                        {new Date(tx.paidAt || tx.paymentDate).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}
                      </p>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4.5 align-middle text-right whitespace-nowrap">
                    <div className="flex flex-col items-end">
                      <span className="text-sm font-black text-[#039855]">
                        +{tx.amount}.00 BDT
                      </span>
                      <div className="inline-flex items-center gap-0.5 text-[9px] font-black uppercase px-1.5 py-0.5 bg-green-500/10 text-green-500 border border-green-500/20 rounded mt-1">
                        <FiCheckCircle size={8} /> Settled
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4.5 align-middle text-center whitespace-nowrap">
                    <a
                      href={`/api/invoices/download/${tx.transactionId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center h-8 w-8 bg-zinc-100 hover:bg-[#039855]/10 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-[#039855] rounded-xl transition-colors"
                      title="Download Invoice PDF"
                    >
                      <FiDownload size={14} />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        /* ফালব্যাক ভিউ কন্টেইনার */
        <div className="text-center py-20 bg-white dark:bg-[#111113] border border-zinc-200 dark:border-zinc-800 rounded-[24px] max-w-xl mx-auto">
          <FiInfo size={32} className="mx-auto text-zinc-400 mb-3" />
          <p className="text-zinc-500 dark:text-zinc-400 font-bold text-sm">
            No transaction settlements correspond to your query criteria.
          </p>
        </div>
      )}
    </div>
  );
}