'use client';

import React from 'react';
import { Card, Chip } from '@heroui/react';
import { 
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, 
  CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { 
  FiTrendingUp, FiLayers, FiCheckCircle, FiDollarSign, 
  FiPieChart, FiActivity 
} from 'react-icons/fi';

export default function RevenueOverviewClient({ metrics }) {
  
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-[#18181b] p-4 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xl text-xs font-bold space-y-1">
          <p className="text-zinc-400 uppercase tracking-wider mb-1">{label} Analytics</p>
          {payload.map((item, idx) => (
            <p key={idx} style={{ color: item.color || item.fill }} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-current" />
              {item.name}: {item.value.toLocaleString()} {item.name === 'Revenue' && 'BDT'}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-6 space-y-8 py-4">
      
      {/* হেডার সেকশন */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-5 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-zinc-900 dark:text-white tracking-tight flex items-center gap-2">
            <FiPieChart className="text-[#039855]" size={28} /> Revenue Overview
          </h1>
          <p className="text-xs font-semibold text-zinc-400 mt-1">
            Analyze listed vector counts, track sales conversion velocity, and audit pipeline cash flows.
          </p>
        </div>
        <Chip variant="flat" color="success" className="font-bold text-xs uppercase px-2.5 h-7">
          Live Audit Sync
        </Chip>
      </div>

      {/* স্ট্যাটস কার্ডস গ্রিড */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
        {/* Total Added */}
        <Card className="bg-white dark:bg-[#111113] border border-zinc-200 dark:border-zinc-800/80 p-6 rounded-2xl flex flex-row items-center justify-between shadow-sm relative overflow-hidden group">
          <div className="space-y-1.5 relative z-10">
            <p className="text-xs font-bold uppercase tracking-wider text-zinc-400">Total Tickets Added</p>
            <p className="text-3xl font-black text-zinc-900 dark:text-white tracking-tight">{metrics.totalTicketsAdded}</p>
            <p className="text-[10px] font-semibold text-zinc-400">Aggregate published fleet constraints</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-zinc-100 dark:bg-zinc-800/40 text-zinc-500 flex items-center justify-center shrink-0 transition-transform group-hover:scale-105">
            <FiLayers size={22} />
          </div>
        </Card>

        {/* Total Sold */}
        <Card className="bg-white dark:bg-[#111113] border border-zinc-200 dark:border-zinc-800/80 p-6 rounded-2xl flex flex-row items-center justify-between shadow-sm relative overflow-hidden group">
          <div className="space-y-1.5 relative z-10">
            <p className="text-xs font-bold uppercase tracking-wider text-zinc-400">Total Seats Sold</p>
            <p className="text-3xl font-black text-[#039855] tracking-tight">{metrics.totalTicketsSold}</p>
            <p className="text-[10px] font-semibold text-zinc-400">Successfully finalized user transits</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-green-50 dark:bg-green-950/20 text-[#039855] flex items-center justify-center shrink-0 transition-transform group-hover:scale-105">
            <FiCheckCircle size={22} />
          </div>
        </Card>

        {/* Total Revenue */}
        <Card className="bg-white dark:bg-[#111113] border border-zinc-200 dark:border-zinc-800/80 p-6 rounded-2xl flex flex-row items-center justify-between shadow-sm relative overflow-hidden group sm:col-span-2 lg:col-span-1">
          <div className="space-y-1.5 relative z-10">
            <p className="text-xs font-bold uppercase tracking-wider text-zinc-400">Total Revenue Generated</p>
            <p className="text-3xl font-black text-[#F05A28] tracking-tight">
              {metrics.totalRevenueBDT.toLocaleString()} <span className="text-xs font-bold text-zinc-400">BDT</span>
            </p>
            <p className="text-[10px] font-semibold text-zinc-400">Net checkout balance volume via Stripe</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-orange-50 dark:bg-orange-950/20 text-[#F05A28] flex items-center justify-center shrink-0 transition-transform group-hover:scale-105">
            <FiDollarSign size={22} />
          </div>
        </Card>
      </div>

      {/* চার্ট ভিজুয়ালাইজেশন */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
        
        {/* রেভিনিউ গ্রোথ চার্ট */}
        <Card className="bg-white dark:bg-[#111113] border border-zinc-200 dark:border-zinc-800/80 p-5 rounded-[24px] shadow-sm lg:col-span-7 space-y-4">
          <div className="flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-800/60 pb-3">
            <FiTrendingUp className="text-[#F05A28]" size={16} />
            <h3 className="text-sm font-black text-zinc-900 dark:text-white uppercase tracking-wider">Revenue Growth Velocity</h3>
          </div>
          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={metrics.monthlyAnalytics} margin={{ top: 10, right: 5, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F05A28" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#F05A28" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e4e4e7" className="dark:stroke-zinc-800/50" />
                <XAxis dataKey="name" stroke="#a1a1aa" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#a1a1aa" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#F05A28', strokeWidth: 1, strokeDasharray: '4 4' }} />
                <Area type="monotone" name="Revenue" dataKey="revenue" stroke="#F05A28" strokeWidth={2.5} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* কনভার্সন অ্যানালিটিক্স চার্ট */}
        <Card className="bg-white dark:bg-[#111113] border border-zinc-200 dark:border-zinc-800/80 p-5 rounded-[24px] shadow-sm lg:col-span-5 space-y-4">
          <div className="flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-800/60 pb-3">
            <FiActivity className="text-[#039855]" size={16} />
            <h3 className="text-sm font-black text-zinc-900 dark:text-white uppercase tracking-wider">Fleet Conversion Analytics</h3>
          </div>
          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={metrics.monthlyAnalytics} margin={{ top: 10, right: 5, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e4e4e7" className="dark:stroke-zinc-800/50" />
                <XAxis dataKey="name" stroke="#a1a1aa" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#a1a1aa" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
                <Legend iconSize={10} iconType="circle" wrapperStyle={{ fontSize: '11px', fontWeight: 'bold', paddingTop: '10px' }} />
                <Bar name="Tickets Added" dataKey="added" fill="#a1a1aa" radius={[4, 4, 0, 0]} maxBarSize={12} />
                <Bar name="Tickets Sold" dataKey="sold" fill="#039855" radius={[4, 4, 0, 0]} maxBarSize={12} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

      </div>
    </div>
  );
}