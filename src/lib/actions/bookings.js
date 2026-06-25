'use server'
import { serverMutation } from "../core/server"

export const bookingTicket = async(path, data)=>{
    return serverMutation(path, data)
}

export const updateBookingStatus = async(path, data)=>{
    return serverMutation(path, data, "PATCH")
}

export const updateTotalTicket = async(path, data)=>{
    return serverMutation(path, data, "PATCH")
}