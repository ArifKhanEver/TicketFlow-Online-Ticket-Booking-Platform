'use server'
import { serverMutation } from "../core/server";

export const modifyUserRole = async (data) => {
    return serverMutation("/api/users", data, "PATCH")
}