import { redirect } from "next/navigation";
import { auth } from "../auth"
import {headers} from "next/headers";

export const getUser = async()=>{
    const session = await auth.api.getSession({
        headers: await headers()
    })
    
    return session?.user || null;
}

export const getUserToken = async()=>{
    const session = await auth.api.getSession({
        headers: await headers()
    })
    return session?.session?.token || null;
}

export const requiredRole = async(role)=>{
    const user = await getUser()
    if(!user){
        redirect('/signin')
    }
    if(user.role !== role){
        return redirect('/unauthorized')
    }
    return user;
}