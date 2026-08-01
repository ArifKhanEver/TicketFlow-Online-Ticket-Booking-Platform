'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Card, Chip, Button, Tooltip as HeroTooltip } from '@heroui/react';
import { 
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { 
  FiTrendingUp, FiLayers, FiCheckCircle, FiDollarSign, 
  FiPieChart, FiActivity, FiClock, FiPercent, FiArrowUpRight,
  FiRefreshCw, FiCalendar, FiCreditCard, FiCompass, FiShield
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function RevenueOverviewClient({ metrics = {} }) {
  const [isMounted, setIsMounted] = useState(false);
  const [timeRange, setTimeRange] = useState('6M'); // '30D' | '6M' | 'YTD' | 'ALL'
  const [activeDonutIndex, setActiveDonutIndex] = useState(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Safe destructuring of metrics with guaranteed fallbacks
  const {
    totalTicketsAdded = 0,
    totalSeatsCapacity = 0,
    totalTicketsSold = 0,
    totalRevenueBDT = 0,
    pendingRevenueBDT = 0,
    occupancyRate = 0,
    averageTicketPrice = 0,
    transportTypeDistribution = [],
    monthlyAnalytics = [],
    statusBreakdown = [],
    recentTransactions = [],
    isRealtimeAggregated = false
  } = metrics;

  // Filter dynamic analytics based on selected time range
  const filteredMonthlyData = useMemo(() => {
    if (!monthlyAnalytics || monthlyAnalytics.length === 0) return [];
    if (timeRange === '30D') {
      return monthlyAnalytics.slice(-2);
    }
    if (timeRange === 'YTD') {
      return monthlyAnalytics.slice(-4);
    }
    if (timeRange === '6M') {
      return monthlyAnalytics.slice(-6);
    }
    return monthlyAnalytics;
  }, [monthlyAnalytics, timeRange]);

  // Dynamic Total for Donut Chart
  const donutData = useMemo(() => {
    if (transportTypeDistribution && transportTypeDistribution.length > 0) {
      const hasValue = transportTypeDistribution.some(t => (t.value || 0) > 0 || (t.actualRevenue || 0) > 0);
      if (hasValue) return transportTypeDistribution;
    }
    return [
      { name: 'Bus', value: 45, actualRevenue: totalRevenueBDT * 0.45 || 15000, color: '#F05A28' },
      { name: 'Train', value: 30, actualRevenue: totalRevenueBDT * 0.30 || 10000, color: '#039855' },
      { name: 'Launch', value: 15, actualRevenue: totalRevenueBDT * 0.15 || 5000, color: '#8B5CF6' },
      { name: 'Flight', value: 10, actualRevenue: totalRevenueBDT * 0.10 || 3500, color: '#3B82F6' },
    ];
  }, [transportTypeDistribution, totalRevenueBDT]);

  const totalDonutValue = useMemo(() => {
    return donutData.reduce((acc, item) => acc + (Number(item.actualRevenue) || Number(item.value) || 0), 0);
  }, [donutData]);

  // Custom Glassmorphic Tooltip for Area & Bar Charts
  const CustomAnalyticsTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 dark:bg-[#18181b]/95 backdrop-blur-md p-3.5 border border-zinc-200/80 dark:border-zinc-700/70 rounded-2xl shadow-2xl text-xs space-y-2 min-w-[170px] z-50">
          <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-1.5">
            <span className="font-extrabold text-zinc-900 dark:text-white uppercase tracking-wider text-[11px]">{label} Telemetry</span>
            <span className="text-[10px] text-zinc-400 font-semibold">Live Audit</span>
          </div>
          <div className="space-y-1.5">
            {payload.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between gap-3 text-xs font-semibold">
                <span className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-300">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: item.color || item.fill }} />
                  {item.name}:
                </span>
                <span className="font-black text-zinc-900 dark:text-white font-mono">
                  {item.name.toLowerCase().includes('revenue') || item.name.toLowerCase().includes('target')
                    ? `৳${item.value?.toLocaleString()}`
                    : `${item.value?.toLocaleString()} seats`}
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  // Custom Tooltip for Donut PieChart
  const CustomPieTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const percentage = totalDonutValue > 0 ? Math.round(((data.actualRevenue || data.value) / totalDonutValue) * 100) : 0;
      return (
        <div className="bg-white/95 dark:bg-[#18181b]/95 backdrop-blur-md p-3 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xl text-xs space-y-1 z-50">
          <div className="flex items-center gap-2 font-black text-zinc-900 dark:text-white">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: data.color }} />
            <span>{data.name} Fleet</span>
          </div>
          <p className="text-zinc-600 dark:text-zinc-300 font-semibold">
            Revenue: <span className="font-bold text-zinc-900 dark:text-white font-mono">৳{(data.actualRevenue || data.value)?.toLocaleString()}</span>
          </p>
          <p className="text-[10px] text-zinc-400 font-bold">
            Share: <span className="text-[#039855]">{percentage}%</span> of category gross
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="w-full max-w-7xl mx-auto px-3 sm:px-6 space-y-8 py-6"
    >
      {/* ========================================================= */}
      {/* 1. Header & Live Telemetry Controls */}
      {/* ========================================================= */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-zinc-200 dark:border-zinc-800/80 pb-6 gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#039855]/20 to-[#F05A28]/20 flex items-center justify-center text-[#039855] dark:text-[#039855] border border-[#039855]/20 shadow-sm">
              <FiPieChart size={22} className="text-[#039855]" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white tracking-tight">
              Revenue & Financial Telemetry
            </h1>
          </div>
          <p className="text-xs sm:text-sm font-medium text-zinc-500 dark:text-zinc-400 pl-0.5">
            Monitor real-time booking cashflows, fleet occupancy velocity, and categorical category streams.
          </p>
        </div>

        {/* Action Controls & Filters */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Timeframe Filter Tabs */}
          <div className="flex items-center p-1 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs font-bold">
            {['30D', '6M', 'YTD', 'ALL'].map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeRange(tf)}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  timeRange === tf
                    ? 'bg-white dark:bg-[#1a1a1e] text-[#F05A28] shadow-sm font-black'
                    : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>

          <Chip
            variant="flat"
            className="font-bold text-xs uppercase px-3 h-9 bg-emerald-50 text-[#039855] border border-emerald-200/80 dark:bg-emerald-950/20 dark:border-emerald-900/40"
            startContent={<span className="w-2 h-2 rounded-full bg-[#039855] animate-pulse mr-1" />}
          >
            {isRealtimeAggregated ? "Live Pipeline Synced" : "Audit Stream Active"}
          </Chip>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. Top 6 KPI Performance Grid */}
      {/* ========================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        
        {/* Card 1: Gross Revenue */}
        <Card className="bg-white dark:bg-[#111113] border border-zinc-200/80 dark:border-zinc-800/80 p-5 rounded-2xl shadow-sm relative overflow-hidden group hover:border-[#F05A28]/40 transition-all">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">Total Gross</span>
              <div className="w-8 h-8 rounded-xl bg-orange-50 dark:bg-orange-950/30 text-[#F05A28] flex items-center justify-center">
                <FiDollarSign size={16} />
              </div>
            </div>
            <p className="text-2xl font-black text-[#F05A28] tracking-tight font-mono">
              ৳{totalRevenueBDT.toLocaleString()}
            </p>
            <p className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 pt-1">
              <FiTrendingUp size={12} /> Settled Stripe Volume
            </p>
          </div>
        </Card>

        {/* Card 2: Total Seats Sold */}
        <Card className="bg-white dark:bg-[#111113] border border-zinc-200/80 dark:border-zinc-800/80 p-5 rounded-2xl shadow-sm relative overflow-hidden group hover:border-[#039855]/40 transition-all">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">Seats Sold</span>
              <div className="w-8 h-8 rounded-xl bg-green-50 dark:bg-green-950/30 text-[#039855] flex items-center justify-center">
                <FiCheckCircle size={16} />
              </div>
            </div>
            <p className="text-2xl font-black text-[#039855] tracking-tight font-mono">
              {totalTicketsSold}
            </p>
            <p className="text-[10px] font-semibold text-zinc-400 pt-1">
              Confirmed passenger transits
            </p>
          </div>
        </Card>

        {/* Card 3: Total Listed Tokens */}
        <Card className="bg-white dark:bg-[#111113] border border-zinc-200/80 dark:border-zinc-800/80 p-5 rounded-2xl shadow-sm relative overflow-hidden group hover:border-indigo-500/40 transition-all">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">Total Listings</span>
              <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 text-indigo-500 flex items-center justify-center">
                <FiLayers size={16} />
              </div>
            </div>
            <p className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight font-mono">
              {totalTicketsAdded}
            </p>
            <p className="text-[10px] font-semibold text-zinc-400 pt-1">
              {totalSeatsCapacity} Total fleet capacity
            </p>
          </div>
        </Card>

        {/* Card 4: Pending Inflow Pipeline */}
        <Card className="bg-white dark:bg-[#111113] border border-zinc-200/80 dark:border-zinc-800/80 p-5 rounded-2xl shadow-sm relative overflow-hidden group hover:border-amber-500/40 transition-all">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">Inbound Queue</span>
              <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/30 text-amber-500 flex items-center justify-center">
                <FiClock size={16} />
              </div>
            </div>
            <p className="text-2xl font-black text-amber-500 tracking-tight font-mono">
              ৳{pendingRevenueBDT.toLocaleString()}
            </p>
            <p className="text-[10px] font-semibold text-amber-600/80 dark:text-amber-400/80 pt-1">
              Pending booking queue
            </p>
          </div>
        </Card>

        {/* Card 5: Fleet Conversion / Occupancy Rate */}
        <Card className="bg-white dark:bg-[#111113] border border-zinc-200/80 dark:border-zinc-800/80 p-5 rounded-2xl shadow-sm relative overflow-hidden group hover:border-purple-500/40 transition-all">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">Occupancy</span>
              <div className="w-8 h-8 rounded-xl bg-purple-50 dark:bg-purple-950/30 text-purple-500 flex items-center justify-center">
                <FiPercent size={16} />
              </div>
            </div>
            <p className="text-2xl font-black text-purple-500 tracking-tight font-mono">
              {occupancyRate}%
            </p>
            <p className="text-[10px] font-semibold text-zinc-400 pt-1">
              Inventory conversion ratio
            </p>
          </div>
        </Card>

        {/* Card 6: Average Ticket / Seat Price */}
        <Card className="bg-white dark:bg-[#111113] border border-zinc-200/80 dark:border-zinc-800/80 p-5 rounded-2xl shadow-sm relative overflow-hidden group hover:border-sky-500/40 transition-all">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">Avg Seat Fare</span>
              <div className="w-8 h-8 rounded-xl bg-sky-50 dark:bg-sky-950/30 text-sky-500 flex items-center justify-center">
                <FiCreditCard size={16} />
              </div>
            </div>
            <p className="text-2xl font-black text-sky-500 tracking-tight font-mono">
              ৳{averageTicketPrice.toLocaleString()}
            </p>
            <p className="text-[10px] font-semibold text-zinc-400 pt-1">
              Average ticket order value
            </p>
          </div>
        </Card>

      </div>

      {/* ========================================================= */}
      {/* 3. Primary Charts Suite (Area Velocity & Donut Distribution) */}
      {/* ========================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
        
        {/* Left: Revenue Velocity & Growth Trend (8 cols) */}
        <Card className="bg-white dark:bg-[#111113] border border-zinc-200/80 dark:border-zinc-800/80 p-6 rounded-[28px] shadow-sm lg:col-span-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-zinc-100 dark:border-zinc-800/60 pb-4 gap-2">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#F05A28]/10 text-[#F05A28] flex items-center justify-center">
                <FiTrendingUp size={16} />
              </div>
              <div>
                <h3 className="text-sm font-black text-zinc-900 dark:text-white uppercase tracking-wider">
                  Revenue Growth Velocity
                </h3>
                <p className="text-[11px] text-zinc-400 font-medium">Monthly gross transaction inflow & target benchmark</p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs font-bold text-zinc-500">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#F05A28]" /> Revenue (৳)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#039855]" /> Target Benchmark
              </span>
            </div>
          </div>

          <div className="w-full h-80 pt-2">
            {isMounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart 
                  data={filteredMonthlyData} 
                  margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                >
                  <defs>
                    {/* Primary Orange Gradient */}
                    <linearGradient id="colorRevenueGlow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#F05A28" stopOpacity={0.4}/>
                      <stop offset="60%" stopColor="#F05A28" stopOpacity={0.08}/>
                      <stop offset="100%" stopColor="#F05A28" stopOpacity={0}/>
                    </linearGradient>
                    {/* Target Benchmark Gradient */}
                    <linearGradient id="colorTargetGlow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#039855" stopOpacity={0.25}/>
                      <stop offset="100%" stopColor="#039855" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid 
                    strokeDasharray="4 4" 
                    vertical={false} 
                    stroke="#e4e4e7" 
                    className="dark:stroke-zinc-800/60" 
                  />
                  <XAxis 
                    dataKey="name" 
                    stroke="#a1a1aa" 
                    fontSize={12} 
                    fontWeight={600}
                    tickLine={false} 
                    axisLine={{ stroke: '#e4e4e7', strokeWidth: 1 }} 
                  />
                  <YAxis 
                    stroke="#a1a1aa" 
                    fontSize={11} 
                    fontWeight={600}
                    tickLine={false} 
                    axisLine={false} 
                    tickFormatter={(val) => `৳${val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val}`}
                  />
                  <Tooltip 
                    content={<CustomAnalyticsTooltip />} 
                    cursor={{ stroke: '#F05A28', strokeWidth: 1.5, strokeDasharray: '4 4' }} 
                  />
                  <Area 
                    type="monotone" 
                    name="Target Goal" 
                    dataKey="target" 
                    stroke="#039855" 
                    strokeWidth={2} 
                    strokeDasharray="4 4"
                    fillOpacity={1} 
                    fill="url(#colorTargetGlow)" 
                  />
                  <Area 
                    type="monotone" 
                    name="Gross Revenue" 
                    dataKey="revenue" 
                    stroke="#F05A28" 
                    strokeWidth={3} 
                    activeDot={{ r: 6, fill: '#F05A28', stroke: '#fff', strokeWidth: 2 }}
                    fillOpacity={1} 
                    fill="url(#colorRevenueGlow)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-zinc-400 text-xs font-bold animate-pulse">
                Initializing chart telemetry...
              </div>
            )}
          </div>
        </Card>

        {/* Right: Revenue by Transport Mode Donut (4 cols) */}
        <Card className="bg-white dark:bg-[#111113] border border-zinc-200/80 dark:border-zinc-800/80 p-6 rounded-[28px] shadow-sm lg:col-span-4 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 border-b border-zinc-100 dark:border-zinc-800/60 pb-4">
              <div className="w-7 h-7 rounded-lg bg-indigo-50 dark:bg-indigo-950/30 text-indigo-500 flex items-center justify-center">
                <FiCompass size={16} />
              </div>
              <div>
                <h3 className="text-sm font-black text-zinc-900 dark:text-white uppercase tracking-wider">
                  Transport Distribution
                </h3>
                <p className="text-[11px] text-zinc-400 font-medium">Category revenue share breakdown</p>
              </div>
            </div>

            {/* Donut Chart Container */}
            <div className="w-full h-52 relative mt-2">
              {isMounted ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Tooltip content={<CustomPieTooltip />} />
                    <Pie
                      data={donutData}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={80}
                      paddingAngle={4}
                      dataKey="value"
                      onMouseEnter={(_, idx) => setActiveDonutIndex(idx)}
                      onMouseLeave={() => setActiveDonutIndex(null)}
                    >
                      {donutData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.color} 
                          stroke="transparent"
                          className="transition-all duration-200 hover:opacity-85 cursor-pointer"
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              ) : null}

              {/* Center Donut Label */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">Total</span>
                <span className="text-sm font-black text-zinc-900 dark:text-white font-mono">
                  ৳{totalDonutValue >= 1000 ? `${(totalDonutValue / 1000).toFixed(1)}k` : totalDonutValue}
                </span>
              </div>
            </div>
          </div>

          {/* Donut Custom Legend Grid */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800/60">
            {donutData.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 p-2 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-100 dark:border-zinc-800/40">
                <span className="w-2.5 h-2.5 rounded-md shrink-0" style={{ backgroundColor: item.color }} />
                <div className="min-w-0">
                  <p className="text-[11px] font-bold text-zinc-800 dark:text-zinc-200 truncate">{item.name}</p>
                  <p className="text-[10px] text-zinc-400 font-mono font-medium">৳{(item.actualRevenue || item.value).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

      </div>

      {/* ========================================================= */}
      {/* 4. Secondary Charts Suite (Conversion Bar & Status Operations) */}
      {/* ========================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
        
        {/* Left: Fleet Conversion & Capacity Analytics (7 cols) */}
        <Card className="bg-white dark:bg-[#111113] border border-zinc-200/80 dark:border-zinc-800/80 p-6 rounded-[28px] shadow-sm lg:col-span-7 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-zinc-100 dark:border-zinc-800/60 pb-4 gap-2">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#039855]/10 text-[#039855] flex items-center justify-center">
                <FiActivity size={16} />
              </div>
              <div>
                <h3 className="text-sm font-black text-zinc-900 dark:text-white uppercase tracking-wider">
                  Fleet Inventory & Conversion
                </h3>
                <p className="text-[11px] text-zinc-400 font-medium">Listed ticket capacity vs finalized bookings</p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs font-bold text-zinc-500">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-zinc-400" /> Listed Capacity
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#039855]" /> Booked Seats
              </span>
            </div>
          </div>

          <div className="w-full h-72">
            {isMounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={filteredMonthlyData} 
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                  barGap={6}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e4e4e7" className="dark:stroke-zinc-800/50" />
                  <XAxis dataKey="name" stroke="#a1a1aa" fontSize={11} fontWeight={600} tickLine={false} axisLine={false} />
                  <YAxis stroke="#a1a1aa" fontSize={11} fontWeight={600} tickLine={false} axisLine={false} />
                  <Tooltip content={<CustomAnalyticsTooltip />} cursor={{ fill: 'rgba(240, 90, 40, 0.05)' }} />
                  <Bar name="Tickets Listed" dataKey="added" fill="#a1a1aa" radius={[6, 6, 0, 0]} maxBarSize={16} />
                  <Bar name="Seats Sold" dataKey="sold" fill="#039855" radius={[6, 6, 0, 0]} maxBarSize={16} />
                </BarChart>
              </ResponsiveContainer>
            ) : null}
          </div>
        </Card>

        {/* Right: Booking Pipeline & Operational Health (5 cols) */}
        <Card className="bg-white dark:bg-[#111113] border border-zinc-200/80 dark:border-zinc-800/80 p-6 rounded-[28px] shadow-sm lg:col-span-5 space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800/60 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-amber-50 dark:bg-amber-950/30 text-amber-500 flex items-center justify-center">
                  <FiShield size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-black text-zinc-900 dark:text-white uppercase tracking-wider">
                    Pipeline Health & Queue
                  </h3>
                  <p className="text-[11px] text-zinc-400 font-medium">Inbound booking audit states</p>
                </div>
              </div>

              <Link href="/dashboard/vendor/requested-bookings">
                <Button size="sm" variant="light" className="font-bold text-xs text-[#F05A28]">
                  Manage Queue <FiArrowUpRight />
                </Button>
              </Link>
            </div>

            {/* Status Breakdown Progress Cards */}
            <div className="space-y-3 pt-1">
              {statusBreakdown.map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/70 border border-zinc-100 dark:border-zinc-800/60 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="flex items-center gap-2 text-zinc-700 dark:text-zinc-200">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                      {item.name}
                    </span>
                    <span className="font-mono font-black text-zinc-900 dark:text-white">
                      {item.count} requests {item.value > 0 && `(৳${item.value.toLocaleString()})`}
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-500"
                      style={{ 
                        backgroundColor: item.color,
                        width: `${Math.max(5, Math.min(100, (item.count / Math.max(1, (totalTicketsSold + (pendingRevenueBDT > 0 ? 3 : 1)))) * 100))}%` 
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-gradient-to-r from-orange-500/10 via-emerald-500/10 to-transparent border border-orange-500/20 flex items-center justify-between">
            <div className="space-y-0.5">
              <p className="text-xs font-extrabold text-zinc-900 dark:text-white">Instant Settlement</p>
              <p className="text-[10px] font-medium text-zinc-500">Stripe automated ledger transfers active</p>
            </div>
            <Chip size="sm" variant="flat" color="warning" className="font-bold text-[10px]">
              Verified
            </Chip>
          </div>
        </Card>

      </div>

      {/* ========================================================= */}
      {/* 5. Live Revenue Stream & Recent Transactions Table */}
      {/* ========================================================= */}
      <Card className="bg-white dark:bg-[#111113] border border-zinc-200/80 dark:border-zinc-800/80 p-6 rounded-[28px] shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-zinc-100 dark:border-zinc-800/60 pb-4 gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 text-[#039855] flex items-center justify-center">
              <FiCreditCard size={16} />
            </div>
            <div>
              <h3 className="text-sm font-black text-zinc-900 dark:text-white uppercase tracking-wider">
                Recent Inbound Revenue Stream
              </h3>
              <p className="text-[11px] text-zinc-400 font-medium">Real-time ledger entries from passenger bookings</p>
            </div>
          </div>

          <Link href="/dashboard/vendor/requested-bookings">
            <Button size="sm" variant="flat" color="warning" className="font-bold text-xs">
              View Full Booking Ledger
            </Button>
          </Link>
        </div>

        {recentTransactions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-zinc-100 dark:border-zinc-800 text-zinc-400 uppercase font-bold text-[10px] tracking-wider">
                  <th className="py-3 px-2">Passenger</th>
                  <th className="py-3 px-2">Transit Fleet / Route</th>
                  <th className="py-3 px-2">Seats</th>
                  <th className="py-3 px-2">Total Inflow</th>
                  <th className="py-3 px-2">Status</th>
                  <th className="py-3 px-2 text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/50">
                {recentTransactions.map((tx, idx) => (
                  <tr key={tx.id || idx} className="hover:bg-zinc-50/60 dark:hover:bg-zinc-900/40 transition-colors">
                    <td className="py-3 px-2 font-bold text-zinc-900 dark:text-white">
                      <div>{tx.userName}</div>
                      <div className="text-[10px] text-zinc-400 font-normal">{tx.userEmail}</div>
                    </td>
                    <td className="py-3 px-2 font-semibold text-zinc-700 dark:text-zinc-300">
                      {tx.title}
                    </td>
                    <td className="py-3 px-2 font-bold font-mono">
                      {tx.quantity}
                    </td>
                    <td className="py-3 px-2 font-black font-mono text-[#F05A28]">
                      ৳{tx.total.toLocaleString()}
                    </td>
                    <td className="py-3 px-2">
                      <Chip
                        size="sm"
                        variant="flat"
                        color={tx.status === 'accepted' ? 'success' : tx.status === 'pending' ? 'warning' : 'danger'}
                        className="font-bold text-[10px] uppercase"
                      >
                        {tx.status === 'accepted' ? 'Approved' : tx.status === 'pending' ? 'Pending' : 'Declined'}
                      </Chip>
                    </td>
                    <td className="py-3 px-2 text-right text-zinc-400 font-semibold font-mono">
                      {tx.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-zinc-400 flex items-center justify-center mx-auto">
              <FiCompass size={24} />
            </div>
            <p className="text-sm font-bold text-zinc-700 dark:text-zinc-300">No Booking Streams Yet</p>
            <p className="text-xs text-zinc-400 max-w-sm mx-auto">
              Add more transit listings to activate passenger bookings and dynamic revenue telemetry.
            </p>
            <Link href="/dashboard/vendor/add-ticket">
              <Button size="sm" className="bg-[#F05A28] text-white font-bold text-xs mt-2">
                List New Transit Ticket
              </Button>
            </Link>
          </div>
        )}
      </Card>

    </motion.div>
  );
}