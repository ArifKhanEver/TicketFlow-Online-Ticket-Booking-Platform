'use server'
import { serverMutation } from "../core/server"

export const makePayment = async (data) => {
    return serverMutation('/api/payments/save', data)
}