import { useState, useEffect } from 'react';
import type { BlogData } from '../types/api';
import type { Blog } from '../types/models';

interface BlogModalProps {
    blog: Blog | null;
    onSubmit: (blogId: number | null, blogData: BlogData) => void;
    onClose: () => void;
}

const BlogModal = ({ blog, onSubmit, onClose }: BlogModalProps) => {
    const isEditing = blog !== null;

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [blogPrvText, setBlogPrvText] = useState('');
    const [blogImgSrc, setBlogImgSrc] = useState('');

    // Pre-fill fields when editing
    useEffect(() => {
        if (blog) {
            setTitle(blog.title);
            setContent(blog.content);
            setBlogPrvText(blog.blog_prv_text);
            setBlogImgSrc(blog.blog_img_src);
        }
    }, [blog]);

    const handleSubmit: React.SubmitEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        onSubmit(isEditing ? blog!.blog_id : null, {
            title,
            content,
            blogPrvText,
            blogImgSrc,
        });
    };

    return (
        // Backdrop
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
            onClick={onClose}
        >
            {/* Modal Box */}
            <div
                className="max-w-md md:max-w-lg lg:max-w-xl w-full bg-white/[0.02] border border-border-default rounded-[20px] p-8 md:p-12"
                onClick={e => e.stopPropagation()}
            >
                <h2 className="text-white font-display font-bold text-[28px] md:text-[32px] lg:text-[36px] tracking-[2px] mb-2 text-center">
                    {isEditing ? 'Edit Blog' : 'Create Blog'}
                </h2>

                <p className="text-text-muted text-[13px] md:text-[14px] text-center mb-8">
                    {isEditing ? 'Update your blog post' : 'Write a new blog post'}
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                    {/* Title */}
                    <div className="relative">
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            placeholder=" "
                            required
                            className="peer w-full bg-transparent border-b border-border-default text-text-body text-[14px] pt-5 pb-2 outline-none focus:border-white transition-colors duration-300"
                        />
                        <label htmlFor="title" className="absolute left-0 top-5 text-text-muted text-[13px] transition-all duration-300 peer-placeholder-shown:top-5 peer-focus:top-0 peer-focus:text-[11px] peer-focus:text-white peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-[11px]">
                            Title
                        </label>
                    </div>

                    {/* Preview Text */}
                    <div className="relative">
                        <input
                            type="text"
                            id="blogPrvText"
                            value={blogPrvText}
                            onChange={e => setBlogPrvText(e.target.value)}
                            placeholder=" "
                            required
                            className="peer w-full bg-transparent border-b border-border-default text-text-body text-[14px] pt-5 pb-2 outline-none focus:border-white transition-colors duration-300"
                        />
                        <label htmlFor="blogPrvText" className="absolute left-0 top-5 text-text-muted text-[13px] transition-all duration-300 peer-placeholder-shown:top-5 peer-focus:top-0 peer-focus:text-[11px] peer-focus:text-white peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-[11px]">
                            Preview Text
                        </label>
                    </div>

                    {/* Image URL */}
                    <div className="relative">
                        <input
                            type="text"
                            id="blogImgSrc"
                            value={blogImgSrc}
                            onChange={e => setBlogImgSrc(e.target.value)}
                            placeholder=" "
                            required
                            className="peer w-full bg-transparent border-b border-border-default text-text-body text-[14px] pt-5 pb-2 outline-none focus:border-white transition-colors duration-300"
                        />
                        <label htmlFor="blogImgSrc" className="absolute left-0 top-5 text-text-muted text-[13px] transition-all duration-300 peer-placeholder-shown:top-5 peer-focus:top-0 peer-focus:text-[11px] peer-focus:text-white peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-[11px]">
                            Image URL
                        </label>
                    </div>

                    {/* Content */}
                    <div className="relative">
                        <textarea
                            id="content"
                            value={content}
                            onChange={e => setContent(e.target.value)}
                            placeholder=" "
                            required
                            rows={4}
                            className="peer w-full bg-transparent border-b border-border-default text-text-body text-[14px] pt-5 pb-2 outline-none focus:border-white transition-colors duration-300 resize-none"
                        />
                        <label htmlFor="content" className="absolute left-0 top-5 text-text-muted text-[13px] transition-all duration-300 peer-placeholder-shown:top-5 peer-focus:top-0 peer-focus:text-[11px] peer-focus:text-white peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-[11px]">
                            Content
                        </label>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-4 mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 text-[14px] text-text-muted px-4 py-3 rounded-[20px] border border-border-default transition-all duration-300 hover:text-white hover:bg-white/[0.02]"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 text-[14px] text-text-muted px-4 py-3 rounded-[20px] border border-border-default transition-all duration-300 hover:text-white hover:bg-white/[0.02]"
                        >
                            {isEditing ? 'Save Changes' : 'Create'}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default BlogModal;