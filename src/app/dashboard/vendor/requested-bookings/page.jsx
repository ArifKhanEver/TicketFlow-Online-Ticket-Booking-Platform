import RequestedBookingsClient from '@/Components/dashboard/vendor/RequestedBookingsClient';
import { getRequestedBookings } from '@/lib/api/bookings';
import { getUser } from '@/lib/core/session';
import React from 'react';

const RequestedBookingsPage = async() => {
  const user = await getUser()
  const bookings = await getRequestedBookings("/api/bookings/requested-bookings", user.id)
  return (
    <div>
      <RequestedBookingsClient bookings={bookings.data}/>
    </div>
  );
};

export default RequestedBookingsPage;