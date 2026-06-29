'use server'
import { revalidatePath } from "next/cache";
import { serverDelete, serverMutation } from "../core/server";

export const addTicket = async (path, data) => {
    return serverMutation(path, data)
}

export const approveTicket = async (path, data) => {
    return serverMutation(path, data, "PATCH")
}


export const advertiseTicket = async (ticketId, isAdvertised) => {
    const data = { ticketId, isAdvertised }
    return serverMutation('/api/tickets/advertise', data, "PATCH")
}

export const updateTicket = async (data) => {
    const response = await serverMutation('/api/tickets', data, "PATCH")
    if (response?.success) {
        revalidatePath('/dashboard/vendor/my-tickets');
    }

    return response;
}

export const deleteTicket = async(id)=>{
    return serverDelete(id)
}