"use server"
import { serverFetch } from "../core/server"

export const getTickets = async()=>{
    return serverFetch(`/api/tickets`)
}

export const getSingleTicket = async(path, id)=>{
    return serverFetch(`${path}/${id}`)
}

export const getVendorTickets = async(path, vendorId)=>{
    return serverFetch(`${path}?vendorId=${vendorId}`)
}