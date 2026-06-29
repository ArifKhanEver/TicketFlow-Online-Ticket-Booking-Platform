import { redirect } from "next/navigation";
import { auth } from "../auth"
import {headers} from "next/headers";

export const getUser = async()=>{
    const session = await auth.api.getSession({
        headers: await headers()
    })
    
    return session?.user || null;
}

export const getUserToken = async () => {
    try {
        const response = await auth.api.getToken({
            headers: await headers()
        });
        const token = response?.token || null;
        return token;
    } catch (error) {
        console.error("Failed to extract JWT token:", error.message);
        return null;
    }
}

export const requiredRole = async(role)=>{
    const user = await getUser()
    if(!user){
        redirect('/auth/signin')
    }
    if(user.role !== role){
        return redirect('/unauthorized')
    }
    return user;
}