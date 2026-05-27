import axios from "./axiosConfig";
import type { AuthResponse, LoginCredentials, RegisterCredentials } from "../types/api";

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await axios.post('/api/auth/login', credentials);

    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));

    return response.data;
};

export const register = async (credentials: RegisterCredentials): Promise<AuthResponse> => {
    const response = await axios.post('/api/auth/create-account', credentials);

    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));

    return response.data;
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
};

export const getStoredToken = (): string | null => {
    return localStorage.getItem('token');
};

export const getStoredUser = () => {
    try {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    }
    catch (err) {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        return null
    }
};

export const getMe = async () => {
    return axios.get('/api/auth/me')
}