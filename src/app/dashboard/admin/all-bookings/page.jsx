import React from 'react';
import AllBookingsClient from '@/Components/dashboard/admin/AllBookingsClient';
import { getUser } from '@/lib/core/session';
import { getAllBookings } from '@/lib/api/bookings';

export default async function AllBookingsPage({ searchParams }) {
  const resolvedParams = await searchParams;
  const search = resolvedParams?.search || '';
  const page = parseInt(resolvedParams?.page || '1', 10);
  let totalCount = null;
  let totalPages = null;

  const user = await getUser()
  const data = await getAllBookings(user.role)

  return (
    <AllBookingsClient 
      initialBookings={data.data} 
      totalReservations={totalCount} 
      totalPages={totalPages}
      currentPage={page}
      initialSearch={search}
    />
  );
}