import axios from './axiosConfig';
import type { UpdateUserData } from '../types/api';
import type { User } from '../types/models';

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