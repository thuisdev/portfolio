export interface User {
    user_id: number;
    username: string;
    name: string;
    email: string;
    role: string;
    created_at?: string;
}

export interface Blog {
    blog_id: number;
    title: string;
    content: string;
    blog_prv_text: string;
    blog_img_src: string;
    user_id?: number;
    created_at: string;
}
