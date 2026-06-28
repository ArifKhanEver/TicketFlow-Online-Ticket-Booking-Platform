import { redirect } from 'next/navigation';
import Link from 'next/link';
import { stripe } from '../../lib/stripe';
import { FiCheckCircle, FiArrowRight, FiMail, FiHash } from 'react-icons/fi';
import { BsFillTicketFill, BsShieldCheck } from 'react-icons/bs';
import { makePayment } from '@/lib/actions/payment';
import { getUser } from '@/lib/core/session';

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id) {
    throw new Error('Please provide a valid session_id (`cs_test_...`)');
  }

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  });

  const { status, customer_details, amount_total, metadata } = session;
  const customerEmail = customer_details?.email;
  const pricePaid = amount_total ? amount_total / 100 : 0;

  const ticketTitle = metadata?.ticketTitle || "Fleet Travel Token";
  const bookingId = metadata?.bookingId || "N/A";
  const ticketId = metadata?.ticketId || "";
  const userId = metadata?.userId || "";

  const transactionId = typeof session.payment_intent === 'object'
    ? session.payment_intent?.id
    : session.payment_intent || session.id;

  if (status === 'open') {
    return redirect('/');
  }

  if (status === 'complete') {
    try {
      const payload = {
        bookingId,
        userId,
        transactionId,
        ticketId,
        ticketTitle,
        amount: pricePaid,
        customerEmail,
        status: "paid"
      }
      
      const result = await makePayment(payload);

    } catch (error) {
      console.error("Automated payment collection injection failed:", error);
    }

    return (
      <section className="min-h-screen w-full bg-zinc-50 dark:bg-[#0A0A0C] flex items-center justify-center p-4 md:p-6 !pt-40 pb-16 transition-colors duration-300">

        <div className="w-full max-w-xl bg-white dark:bg-[#111113] border border-zinc-200 dark:border-zinc-800/80 shadow-2xl rounded-[32px] p-6 md:p-10 text-center relative overflow-hidden">

          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-500 to-rose-500" />

          <div className="mb-6 inline-flex items-center justify-center relative">
            <div className="absolute inset-0 bg-pink-500/10 dark:bg-pink-500/20 rounded-full scale-150 blur-md animate-pulse" />
            <div className="p-4 bg-pink-500/10 text-pink-500 dark:bg-pink-500/20 rounded-2xl relative z-10">
              <FiCheckCircle size={40} className="stroke-[2.5]" />
            </div>
          </div>

          <h1 className="text-2xl md:text-3xl font-black text-zinc-900 dark:text-white tracking-tight">
            Payment Securely Processed
          </h1>
          <p className="text-pink-500/80 dark:text-pink-400/80 text-[10px] font-bold uppercase tracking-widest mt-1.5 flex items-center justify-center gap-1">
            <BsShieldCheck size={12} /> Transaction Secured via Stripe Gateway
          </p>

          <div className="mt-8 bg-zinc-50 dark:bg-[#141416]/60 rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 p-5 text-left space-y-4">

            <div className="flex items-start gap-3">
              <div className="p-2 bg-white dark:bg-zinc-800 text-pink-500 rounded-lg shadow-sm">
                <BsFillTicketFill size={14} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide">Fleet Token</p>
                <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100 truncate">{ticketTitle}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-zinc-200/60 dark:border-zinc-800/40 pt-4">
              <div className="flex items-start gap-2.5">
                <div className="p-2 bg-white dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 rounded-lg shadow-sm">
                  <FiHash size={14} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide">Booking ID</p>
                  <p className="text-xs font-mono font-bold text-zinc-700 dark:text-zinc-300">{bookingId}</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 sm:justify-end">
                <div className="sm:text-right">
                  <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide">Amount Charged</p>
                  <p className="text-xl font-black text-pink-500 dark:text-pink-400">{pricePaid} <span className="text-xs font-bold text-zinc-400 dark:text-zinc-500">BDT</span></p>
                </div>
              </div>
            </div>

            <div className="border-t border-zinc-200/60 dark:border-zinc-800/40 pt-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide">Stripe Txn ID</p>
              <p className="text-xs font-mono font-bold text-pink-600 dark:text-pink-400 bg-pink-500/5 dark:bg-pink-500/10 px-2.5 py-1 rounded-md select-all border border-pink-500/10">
                {transactionId}
              </p>
            </div>

          </div>

          <div className="mt-6 flex items-start gap-3 bg-pink-500/5 border border-pink-500/10 rounded-xl p-4 text-left">
            <FiMail size={16} className="text-pink-500 shrink-0 mt-0.5" />
            <p className="text-xs font-medium text-zinc-600 dark:text-zinc-400 leading-relaxed">
              We appreciate your business! A confirmation summary layout has been dispatched to <b className="text-zinc-900 dark:text-zinc-200 font-semibold">{customerEmail}</b>. For infrastructure inquiries, reach out at <a href="mailto:orders@example.com" className="text-pink-500 font-bold hover:underline">orders@example.com</a>.
            </p>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 w-full">
            <Link
              href="/dashboard/user/booked-tickets"
              className="flex-1 h-11 bg-zinc-950 hover:bg-pink-600 dark:bg-zinc-100 dark:text-black dark:hover:bg-pink-500 dark:hover:text-white text-white font-bold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-md shadow-pink-500/5"
            >
              View My Bookings <FiArrowRight size={14} />
            </Link>
            <Link
              href="/"
              className="h-11 px-6 border border-zinc-200 dark:border-zinc-800 hover:bg-pink-500/5 dark:hover:bg-pink-500/10 text-zinc-700 dark:text-zinc-300 hover:text-pink-500 dark:hover:text-pink-400 font-bold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center transition-colors"
            >
              Return Home
            </Link>
          </div>

        </div>
      </section>
    );
  }
}