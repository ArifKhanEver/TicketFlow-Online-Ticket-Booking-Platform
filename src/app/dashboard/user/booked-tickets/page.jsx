import React from 'react';
import { getMyBookedTickets } from '@/lib/api/bookings';
import MyBookedTicketsClient from '@/Components/dashboard/user/MyBookedTicketsClient';
import { getUser } from '@/lib/core/session';


export default async function MyBookedTicketsPage() {
  const user = await getUser()

  const bookings = await getMyBookedTickets("/api/bookings/my-bookings", user.id);

  console.log(bookings.data)

  return <MyBookedTicketsClient bookings={bookings.data} />;
}