import axios from './axiosConfig';

export interface User {
    user_id: number;
    username: string;
    name: string;
    email: string;
    role: string;
    created_at: string;
}

export interface UpdateUserData {
    name: string;
    email: string;
}

export const getAllUsers = async () => {
    return axios.get<User[]>('/api/users');
}

export const getUserById = async (id: string) => {
    return axios.get<User>(`/api/users/${id}`);
}

export const updateUser = async (id: string, userData: UpdateUserData) => {
    return axios.put(`/api/users/${id}`, userData);
}

export const deleteUser = async (id: string) => {
    return axios.delete(`/api/users/${id}`);
}