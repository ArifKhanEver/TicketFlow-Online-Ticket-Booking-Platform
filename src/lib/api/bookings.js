"use server"
import { protectedFetch, serverFetch } from "../core/server"

export const getMyBookedTickets = async(path, userId)=>{
    return protectedFetch(`${path}?userId=${userId}`)
}

export const getRequestedBookings = async(path, vendorId)=>{
    return protectedFetch(`${path}?vendorId=${vendorId}`)
}

export const getAllBookings = async(role)=>{
    return protectedFetch(`/api/bookings/admin/all-bookings?role=${role}`)
}