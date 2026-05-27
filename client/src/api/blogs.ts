import axios from './axiosConfig';
import type { BlogData, BlogByIdResponse } from '../types/api';
import type { Blog } from '../types/models';

export const getAllBlogs = async () => {
    return axios.get<Blog[]>('/api/blogs');
}

export const getBlogById = async (id: string) => {
    return axios.get<BlogByIdResponse>(`/api/blogs/${id}`);
}

export const createBlog = async (blogData: BlogData) => {
    return axios.post('/api/blogs', blogData);
}

export const updateBlog = async (id: string, blogData: BlogData) => {
    return axios.put(`/api/blogs/${id}`, blogData);
}

export const deleteBlog = async (id: string) => {
    return axios.delete(`/api/blogs/${id}`);
}