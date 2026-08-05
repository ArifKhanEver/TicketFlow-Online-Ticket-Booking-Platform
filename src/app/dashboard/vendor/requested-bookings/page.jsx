import RequestedBookingsClient from '@/Components/dashboard/vendor/RequestedBookingsClient';
import { getRequestedBookings } from '@/lib/api/bookings';
import { getUser } from '@/lib/core/session';
import { redirect } from 'next/navigation';
import React from 'react';

export const dynamic = 'force-dynamic';

const RequestedBookingsPage = async () => {
  const user = await getUser();
  if (!user) {
    redirect('/auth/signin');
  }
  const bookings = await getRequestedBookings("/api/bookings/requested-bookings", user.id);
  return (
    <div>
      <RequestedBookingsClient bookings={bookings?.data || []} />
    </div>
  );
};

export default RequestedBookingsPage;