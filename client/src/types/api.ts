import type { Blog, User } from './models';

export interface LoginCredentials {
    username: string;
    password: string;
}

export interface RegisterCredentials {
    username: string;
    name: string;
    email: string;
    password: string;
}

export interface AuthResponse {
    token: string;
    user: User;
}

export interface BlogData {
    title: string;
    content: string;
    blogPrvText: string;
    blogImgSrc: string;
}

export interface UpdateUserData {
    name: string;
    email: string;
}

export type BlogByIdResponse = Blog[];
