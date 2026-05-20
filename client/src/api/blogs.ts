import axios from './axiosConfig';

export interface Blog {
    blog_id: number;
    title: string;
    content: string;
    blog_prv_text: string;
    blog_img_src: string;
    user_id: number;
    created_at: string;
};

export interface BlogData {
    title: string;
    content: string;
    blogPrvText: string;
    blogImgSrc: string;
    userId?: number;
}

export const getAllBlogs = async () => {
    return axios.get<Blog[]>('/api/blogs');
}

export const getBlogById = async (id: string) => {
    return axios.get<Blog>(`/api/blogs/${id}`);
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