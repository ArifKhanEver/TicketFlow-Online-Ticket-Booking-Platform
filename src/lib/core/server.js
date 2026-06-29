import { redirect } from "next/navigation";
import { getUserToken } from "./session";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export const authHeader = async()=> {
    const token = await getUserToken()
    const header = token ? {
        "Authorization": `Bearer ${token}`
    } : {};
    
    return header
}


export const serverMutation = async (path, data, method = "POST") => {
    if (!baseUrl) {
        console.error("🚨 Error: NEXT_PUBLIC_BASE_URL is undefined in your environment variables!");
        return { error: "Base URL is not configured.", success: false };
    }

    let redirectTo = null;

    try {
        const res = await fetch(`${baseUrl}${path}`, {
            method: method,
            headers: {
                'content-type': 'application/json',
                ... await authHeader()
            },
            body: JSON.stringify(data)
        });

        if (res.status === 401) {
            redirectTo = '/signin';
        } else if (res.status === 403) {
            redirectTo = '/unauthorized';
        } 
        else if (!res.ok) {
            try {
                const errorData = await res.json();
                return { 
                    error: errorData?.error || `Server returned status ${res.status}`, 
                    success: false 
                };
            } catch {
                return { error: `Server returned status ${res.status}`, success: false };
            }
        } else {
            return await res.json();
        }

    } catch (error) {
        console.error("🚨 Fetch operation failed:", error);
        return { error: "Network connection failure.", success: false };
    }

    if (redirectTo) {
        redirect(redirectTo);
    }
};


export const serverFetch = async (path) => {
    if (!baseUrl) {
        console.error("🚨 Error: NEXT_PUBLIC_BASE_URL is missing!");
        return null;
    }

    try {
        const res = await fetch(`${baseUrl}${path}`, {cache:'no-store'});
        
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



export const serverDelete = async (id) => {
    const res = await fetch(`${baseUrl}/api/tickets/${id}`, {
        method: "DELETE",
        headers: {
            'content-type': 'application/json',
            ... await authHeader()
        },
    });
    return await res.json();
}