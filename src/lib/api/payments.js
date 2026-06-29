"use server"
import { protectedFetch } from "../core/server"

export const getPaymentRecords = async (userId) => {
    return protectedFetch(`/api/payments/user?userId=${userId}`);
}