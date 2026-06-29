import React from 'react';
import { getMyBookedTickets } from '@/lib/api/bookings';
import MyBookedTicketsClient from '@/Components/dashboard/user/MyBookedTicketsClient';
import { getUser, getUserToken } from '@/lib/core/session';
import { authHeader } from '@/lib/core/server';


export default async function MyBookedTicketsPage() {
  const user = await getUser()
  const bookings = await getMyBookedTickets("/api/bookings/my-bookings", user.id);

  return <MyBookedTicketsClient bookings={bookings.data} />;
}