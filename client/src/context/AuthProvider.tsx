import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { login as apiLogin, register as apiRegister, logout as apiLogout, getStoredToken, getStoredUser, getMe } from '../api/auth';
import type { LoginCredentials, RegisterCredentials, AuthResponse } from '../api/auth';

export interface User {
    user_id: number,
    username: string,
    name: string,
    email: string,
    role: string
}

interface AuthContextType {
    user: User | null;
    isLoggedIn: boolean;
    isAdmin: boolean;
    login: (credentials: LoginCredentials) => Promise<void>;
    register: (credentials: RegisterCredentials) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);


export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const initAuth = async () => {
            const token = getStoredToken()

            if (!token) return

            try {
                const response = await getMe()
                setUser(response.data)
            } catch {
                logout()
                setUser(null)
            }
        }

        initAuth()
    }, [])

    const isLoggedIn = !!user

    const isAdmin = user?.role === 'admin'

    const login = async (credentials: LoginCredentials) => {
        try {
            const response: AuthResponse = await apiLogin(credentials);
            setUser(response.user)
        }
        catch (error) {
            console.error('Login failed:', error)
            throw error;
        }
    }

    const register = async (credentials: RegisterCredentials) => {
        try {
            const response: AuthResponse = await apiRegister(credentials)
            setUser(response.user)
        }
        catch (error) {
            console.error('Register failed:', error)
            throw error
        }
    }

    const logout = () => {
        apiLogout()
        setUser(null)
    }

    const value: AuthContextType = {
        user,
        isLoggedIn,
        isAdmin,
        login,
        register,
        logout

    };
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within AuthProvider'
        )
    }
    return context
}