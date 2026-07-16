import {getAccessToken, setAccessToken} from "./token"

const API_URL = import.meta.env.VITE_API_URL;

let refreshPromise: Promise<boolean> | null = null

const refreshAccessToken = (): Promise<boolean> => {
    // A refresh is already in flight — join it instead of starting another.
    if (refreshPromise) return refreshPromise

    refreshPromise = (async () => {
        try {
            const res = await fetch(`${API_URL}/auth/refresh`, {
                method: 'POST',
                credentials: 'include',
            })
            if (!res.ok) return false
            const data = await res.json()
            setAccessToken(data.accessToken)
            return true
        } catch {
            return false
        }
    })()

    // Clear the slot once it settles, so the *next* expiry can refresh again.
    refreshPromise.finally(() => {
        refreshPromise = null
    })

    return refreshPromise
}

const request = async (path: string, options: RequestInit = {}) => {

    const doFetch = () => {
        const token = getAccessToken();
        return fetch(`${API_URL}${path}`, {
            ...options,
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                ...(token ? {Authorization: `Bearer ${token}`} : {}),
                ...options.headers
            },
        })
    }
    let res = await doFetch()

    if (res.status === 401) {
        const refreshed = await refreshAccessToken()
        if (!refreshed) throw new Error("Session Expired")
        res = await doFetch()
    }
    if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message ?? `Request failed with status ${res.status}`);
    }
    if (res.status === 204) return null

    return res.json()
}


export const api = {
    get: (path: string) => request(path),
    post: (path: string, body?: unknown) => request(path, {method: 'POST', body: JSON.stringify(body)}),
    patch: (path: string, body?: unknown) => request(path, {method: 'PATCH', body: JSON.stringify(body)}),
    delete: (path: string) => request(path, {method: 'DELETE'}),
}