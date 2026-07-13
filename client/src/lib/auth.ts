import {createContext, type ReactNode, useContext, useState} from "react";

let accessToken: string | null = null;
const API_URL = import.meta.env.VITE_API_URL

const setAccessToken = (token: string | null ) => {
    accessToken = token;
}

const getAccessToken = () => {
    return accessToken;
}

interface User {
    id: string;
    email: string;
    name: string;
    avatarUrl?: string;
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    signup: (email: string, password: string, name: string) => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null)

const AuthProvider = ({children}: {children: ReactNode}) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const login = async (email: string, password: string) => {
        const res = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            body: JSON.stringify({email, password}),
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
        })
        if (!res.ok) {
            const data = await res.json().catch(()=>({}))
            throw new Error(data.message ?? 'login failed')
        }

        const data = await res.json()
        setAccessToken(data.accessToken)
        setUser(data.user)
    }

    const signup = async (email: string, password: string, name: string) => {
        const res = await fetch(`${API_URL}/auth/signup`, {
            method: "POST",
            body: JSON.stringify({email, password, name}),
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
        })
        if (!res.ok) {
            const data = await res.json().catch(()=>({}))
            throw new Error(data.message ?? 'signup failed')
        }
        const data = await res.json()
        setAccessToken(data.accessToken)
        setUser(data.user)
    }

    const logout = async () => {
        try {
            await fetch(`${API_URL}/auth/logout`, {
            method: "POST",
            credentials: 'include',
        })
        } finally {
            setAccessToken(null)
            setUser(null)
        }

    }

    return (
        <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
    {children}
    </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === null) {
        throw new Error('useAuth must be used within a AuthProvider');
    }
    return context;
};