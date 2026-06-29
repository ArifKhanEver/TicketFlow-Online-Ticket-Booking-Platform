"use server"
import { protectedFetch, serverFetch } from "../core/server"

export const getAllUsers = async(path)=>{
    return protectedFetch(path)
}