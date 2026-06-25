"use server"
import { serverFetch } from "../core/server"

export const getAllUsers = async(path)=>{
    return serverFetch(path)
}