'use server'
import { serverMutation } from "../core/server";

export const addTicket = async (path, data) => {
    return serverMutation(path, data)
}

export const approveTicket = async (path, data) => {
    return serverMutation(path, data, "PATCH")
}