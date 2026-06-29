"use server"
import { protectedFetch, serverFetch } from "../core/server"

export const getTickets = async (query = {}) => {
    const searchParams = new URLSearchParams(query);
    const queryString = searchParams.toString();

    const finalPath = `/api/tickets${queryString ? `?${queryString}` : ''}`;

    return serverFetch(finalPath);
}

export const getSingleTicket = async (path, id) => {
    return protectedFetch(`${path}/${id}`)
}

export const getVendorTickets = async (path, vendorId) => {
    return serverFetch(`${path}?vendorId=${vendorId}`)
}