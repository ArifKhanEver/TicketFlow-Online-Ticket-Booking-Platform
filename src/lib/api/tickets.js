"use server"
import { serverFetch } from "../core/server"

export const getTickets = async(path)=>{
    return serverFetch(path)
}