import { useState, useEffect } from 'react';
import { getAllUsers, updateUser, deleteUser } from '../api/users';
import { getAllBlogs, createBlog, updateBlog, deleteBlog } from '../api/blogs';
import BlogModal from '../components/BlogModal';
import UserModal from '../components/UserModal';

import type { User } from '../context/AuthProvider';
import type { Blog, BlogData } from '../api/blogs';
import type { UpdateUserData } from '../api/users';

const AdminDashboard = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [blogs, setBlogs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const [editBlog, setEditBlog] = useState<Blog | null>(null)
    const [editUser, setEditUser] = useState<User | null>(null)

    const [showCreateBlog, setShowCreateBlog] = useState<boolean>(false)

    useEffect(() => {
        fetchData();
    }, []);

    // Fetch Data
    const fetchData = async () => {
        try {
            const [usersRes, blogsRes] = await Promise.all([
                getAllUsers(),
                getAllBlogs()
            ]);
            setUsers(usersRes.data);
            setBlogs(blogsRes.data);
        } catch (error) {
            console.error('Failed to fetch data:', error);
        } finally {
            setLoading(false);
        }
    };

    // Handle User
    const handleDeleteUser = async (userId: number) => {
        if (!window.confirm('Are you sure you want to delete this user?')) return;

        try {
            await deleteUser(userId.toString());
            setUsers(users.filter(u => u.user_id !== userId));
            alert('User deleted successfully!');
        } catch (error) {
            console.error('Delete failed:', error);
            alert('Failed to delete user');
        }
    };

    const handleEditUser = async (userId: number, userData: UpdateUserData) => {
        try {
            await updateUser(userId.toString(), userData)
            await fetchData()
            setEditUser(null)
        } catch (error) {
            alert('Failed to update user')
        }
    };

    // Handle Blog
    const handleDeleteBlog = async (blogId: number) => {
        if (!window.confirm('Are you sure you want to delete this blog?')) return;

        try {
            await deleteBlog(blogId.toString());
            setBlogs(blogs.filter(b => b.blog_id !== blogId));
            alert('Blog deleted successfully!');
        } catch (error) {
            console.error('Delete failed:', error);
            alert('Failed to delete blog');
        }
    };

    const handleEditBlog = async (blogId: number, blogData: BlogData) => {
        try {
            const updatedBlog = await updateBlog(blogId.toString(), blogData);
            setBlogs(blogs.map(b => b.blog_id === blogId ? updatedBlog.data : b))
            setEditBlog(null)
        } catch (error) {
            alert('Failed to update the blog')
        }
    };

    const handleCreateBlog = async (blogData: BlogData) => {
        try {
            await createBlog({ ...blogData });
            await fetchData()
            setShowCreateBlog(false);
            alert('Blog created successfully!')
        } catch (error) {
            console.error('Create blog failed:', error);
            alert('Failed to create a blog')
        }
    };

    // Handle loading
    if (loading) {
        return (
            <section className="w-full py-16 px-5 min-h-[calc(100vh-64px)] flex items-center justify-center">
                <p className="text-text-muted text-[18px]">Loading dashboard...</p>
            </section>
        );
    }

    return (
        <>
            {/* Header */}
            <section className="w-full py-16 px-5 md:px-8 border-b border-border-default">
                <div className="max-w-7xl mx-auto">
                    <h1 className="font-display text-text-strong text-[36px] md:text-[48px] lg:text-[64px] font-bold tracking-[2px]">
                        Admin Dashboard
                    </h1>
                    <p className="text-text-muted text-[14px] md:text-[16px] mt-4">
                        Manage users and blog posts
                    </p>
                </div>
            </section>

            {/* Blog Posts Section */}
            <section className="w-full py-16 px-5 md:px-8 border-b border-border-default">
                <div className="max-w-7xl mx-auto">

                    <h2 className="font-display text-text-strong text-[24px] md:text-[32px] font-semibold">
                        Blog Posts ({blogs.length})
                    </h2>
                    <button
                        onClick={() => setShowCreateBlog(true)}
                        className="text-text-muted text-[14px] py-2 px-4 rounded-[8px] border border-border-default hover:text-white transition-all duration-300 m-6">
                        Create Blog
                    </button>


                    {blogs.length === 0 ? (
                        <p className="text-text-muted text-center text-[16px]">No blog posts yet</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {blogs.map((blog) => (
                                <div
                                    key={blog.blog_id}
                                    className="flex flex-col justify-between p-6 bg-white/[0.02] border border-border-default rounded-[12px] hover:bg-white/[0.04] hover:border-border-default/60 transition-all duration-300"
                                >
                                    <div className="mb-4">
                                        <p className="text-text-strong text-[16px] md:text-[18px] font-semibold mb-3 line-clamp-2">
                                            {blog.title}
                                        </p>
                                        <time className="text-text-muted text-[12px] tracking-[2px]">
                                            {new Date(blog.created_at).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric'
                                            }).toUpperCase()}
                                        </time>
                                    </div>
                                    <div className="flex gap-4 pt-4 border-t border-border-default">
                                        <button
                                            onClick={() => setEditBlog(blog)}
                                            className="flex-1 text-text-muted text-[14px] py-2 px-4 rounded-[8px] border border-transparent hover:text-white hover:border-border-default transition-all duration-300"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteBlog(blog.blog_id)}
                                            className="flex-1 text-text-muted text-[14px] py-2 px-4 rounded-[8px] border border-transparent hover:text-red-400 hover:border-red-400/30 transition-all duration-300"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Users Section */}
            <section className="w-full py-16 px-5 md:px-8 border-b border-border-default">
                <div className="max-w-7xl mx-auto">
                    <h2 className="font-display text-text-strong text-[24px] md:text-[32px] font-semibold mb-10 text-center">
                        Users ({users.length})
                    </h2>

                    {users.length === 0 ? (
                        <p className="text-text-muted text-center text-[16px]">No users yet</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {users.map((user) => (
                                <div
                                    key={user.user_id}
                                    className="flex flex-col justify-between p-6 bg-white/[0.02] border border-border-default rounded-[12px] hover:bg-white/[0.04] hover:border-border-default/60 transition-all duration-300"
                                >
                                    <div className="mb-4">
                                        <p className="text-text-strong text-[16px] md:text-[18px] font-semibold mb-2">
                                            {user.username}
                                        </p>
                                        <p className="text-text-muted text-[14px] mb-3">
                                            {user.email}
                                        </p>
                                        <span className={`inline-block text-[11px] tracking-[2px] px-3 py-1 rounded-full ${user.role === 'admin'
                                            ? 'bg-purple-900/10 text-purple-300 border border-purple-500/30'
                                            : 'bg-white/5 text-text-muted border border-border-default'
                                            }`}>
                                            {user.role.toUpperCase()}
                                        </span>
                                    </div>
                                    <div className="flex gap-4 pt-4 border-t border-border-default">
                                        <button
                                            onClick={() => setEditUser(user)}
                                            className="flex-1 text-text-muted text-[14px] py-2 px-4 rounded-[8px] border border-transparent hover:text-white hover:border-border-default transition-all duration-300"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteUser(user.user_id)}
                                            className="flex-1 text-text-muted text-[14px] py-2 px-4 rounded-[8px] border border-transparent hover:text-red-400 hover:border-red-400/30 transition-all duration-300"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
            {/* Modals */}
            {(showCreateBlog || editBlog) && (
                <BlogModal
                    blog={editBlog}
                    onSubmit={(blogId, blogData) => {
                        if (blogId) handleEditBlog(blogId, blogData)
                        else handleCreateBlog(blogData)
                    }}
                    onClose={() => {
                        setShowCreateBlog(false)
                        setEditBlog(null)
                    }}
                />
            )}

            {editUser && (
                <UserModal
                    user={editUser}
                    onSubmit={handleEditUser}
                    onClose={() => {
                        setEditUser(null)
                    }}
                />
            )}

        </>
    );
};

export default AdminDashboard;