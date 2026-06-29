import React from 'react';
import { getUser } from '@/lib/core/session';
import RevenueOverviewClient from '@/Components/dashboard/vendor/RevenueOverviewClient';

async function getRevenueMetrics(role, userId) {
  if (!role || !userId) return null;
  
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    
    const res = await fetch(`${apiUrl}/api/revenue/overview?role=${role}&userId=${userId}`, { 
      cache: 'no-store' 
    });
    
    const data = await res.json();
    return data.success ? data.metrics : null;
  } catch (error) {
    console.error("Failed to compile dynamic analytics on server:", error);
    return null;
  }
}

export default async function RevenueOverviewPage() {
  const user = await getUser();
  
  const serverMetrics = await getRevenueMetrics(user?.role, user?.id);

  const defaultMetrics = {
    totalTicketsAdded: 0,
    totalTicketsSold: 0,
    totalRevenueBDT: 0,
    monthlyAnalytics: []
  };

  return <RevenueOverviewClient metrics={serverMetrics || defaultMetrics} />;
}