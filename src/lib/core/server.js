import { redirect } from "next/navigation";
import { getUserToken } from "./session";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export const authHeader = async()=> {
    const token = await getUserToken()
    const header = token? {
        authorization: `Bearer ${token}`
    }:{};
    return header
}

export const serverMutation = async (path, data, method = "POST") => {
    if (!baseUrl) {
        console.error("🚨 Error: NEXT_PUBLIC_BASE_URL is undefined in your environment variables!");
        return { error: "Base URL is not configured." };
    }

    try {
        const res = await fetch(`${baseUrl}${path}`, {
            method: method,
            headers: {
                'content-type': 'application/json',
                // ... await authHeader()
            },
            body: JSON.stringify(data)
        })
        if (!res.ok) {
            const errorHtml = await res.text();
            console.error(`🚨 Server Error [Status ${res.status}]:`, errorHtml.slice(0, 500)); 
            return { error: `Server returned status ${res.status}` };
        }

        console.log("status code", res.status)
        if(res.status == 401){
            redirect('/signin')
        }
        if(res.status == 403){
            redirect('/unauthorized')
        }
    
        return await res.json();

    }catch (error) {
        console.error("🚨 Fetch operation failed:", error);
        return { error: "Network connection failure." };
    }

}


export const serverFetch = async (path) => {
    if (!baseUrl) {
        console.error("🚨 Error: NEXT_PUBLIC_BASE_URL is missing!");
        return null;
    }

    try {
        const res = await fetch(`${baseUrl}${path}`);
        
        if (!res.ok) {
            console.error(`🚨 Fetch failed [Status ${res.status}] for path: ${path}`);
            return null;
        }

        return await res.json();
    } catch (error) {
        console.error(`🚨 Network error on fetch [${path}]:`, error);
        return null;
    }
};

export const protectedFetch = async (path) => {
    if (!baseUrl) {
        console.error("🚨 Error: NEXT_PUBLIC_BASE_URL is missing!");
        return null;
    }

    try {
        const res = await fetch(`${baseUrl}${path}`,
            {
                headers: await authHeader()
            }
        );
        
        if (!res.ok) {
            console.error(`🚨 Fetch failed [Status ${res.status}] for path: ${path}`);
            return null;
        }

        return await res.json();
    } catch (error) {
        console.error(`🚨 Network error on fetch [${path}]:`, error);
        return null;
    }
};