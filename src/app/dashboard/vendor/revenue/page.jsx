import React from 'react';
import { getUser } from '@/lib/core/session';
import RevenueOverviewClient from '@/Components/dashboard/vendor/RevenueOverviewClient';
import { getVendorRevenueOverview } from '@/lib/api/revenue';

export const dynamic = 'force-dynamic';

export default async function RevenueOverviewPage() {
  const user = await getUser();
  
  const serverMetrics = await getVendorRevenueOverview(user?.id, user?.role);

  const defaultMetrics = {
    totalTicketsAdded: 0,
    totalSeatsCapacity: 0,
    totalTicketsSold: 0,
    totalRevenueBDT: 0,
    pendingRevenueBDT: 0,
    occupancyRate: 0,
    averageTicketPrice: 0,
    transportTypeDistribution: [
      { name: 'Bus', value: 0, actualRevenue: 0, ticketsAdded: 0, ticketsSold: 0, color: '#F05A28' },
      { name: 'Train', value: 0, actualRevenue: 0, ticketsAdded: 0, ticketsSold: 0, color: '#039855' },
      { name: 'Launch', value: 0, actualRevenue: 0, ticketsAdded: 0, ticketsSold: 0, color: '#8B5CF6' },
      { name: 'Flight', value: 0, actualRevenue: 0, ticketsAdded: 0, ticketsSold: 0, color: '#3B82F6' },
    ],
    monthlyAnalytics: [],
    statusBreakdown: [],
    recentTransactions: []
  };

  return <RevenueOverviewClient metrics={serverMetrics || defaultMetrics} />;
}