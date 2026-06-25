"use server"
import { serverFetch } from "../core/server"

export const getMyBookedTickets = async(path, userId)=>{
    return serverFetch(`${path}?userId=${userId}`)
}

export const getRequestedBookings = async(path, vendorId)=>{
    return serverFetch(`${path}?vendorId=${vendorId}`)
}

export const getAllBookings = async(role)=>{
    return serverFetch(`/api/bookings/admin/all-bookings?role=${role}`)
}