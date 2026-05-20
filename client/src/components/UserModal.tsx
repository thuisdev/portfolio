import { useState, useEffect } from 'react';
import type { User } from '../context/AuthProvider';
import type { UpdateUserData } from '../api/users';

interface UserModalProps {
    user: User;
    onSubmit: (userId: number, userData: UpdateUserData) => void;
    onClose: () => void;
}

const UserModal = ({ user, onSubmit, onClose }: UserModalProps) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        setName(user.name);
        setEmail(user.email);
    }, [user]);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        onSubmit(user.user_id, { name, email });
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
            onClick={onClose}
        >
            <div
                className="max-w-md md:max-w-lg w-full bg-white/[0.02] border border-border-default rounded-[20px] p-8 md:p-12"
                onClick={e => e.stopPropagation()}
            >
                <h2 className="text-white font-display font-bold text-[28px] md:text-[32px] tracking-[2px] mb-2 text-center">
                    Edit User
                </h2>

                <p className="text-text-muted text-[13px] md:text-[14px] text-center mb-8">
                    Editing: <span className="text-white">{user.username}</span>
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                    {/* Name */}
                    <div className="relative">
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            placeholder=" "
                            required
                            className="peer w-full bg-transparent border-b border-border-default text-text-body text-[14px] pt-5 pb-2 outline-none focus:border-white transition-colors duration-300"
                        />
                        <label htmlFor="name" className="absolute left-0 top-5 text-text-muted text-[13px] transition-all duration-300 peer-placeholder-shown:top-5 peer-focus:top-0 peer-focus:text-[11px] peer-focus:text-white peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-[11px]">
                            Name
                        </label>
                    </div>

                    {/* Email */}
                    <div className="relative">
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder=" "
                            required
                            className="peer w-full bg-transparent border-b border-border-default text-text-body text-[14px] pt-5 pb-2 outline-none focus:border-white transition-colors duration-300"
                        />
                        <label htmlFor="email" className="absolute left-0 top-5 text-text-muted text-[13px] transition-all duration-300 peer-placeholder-shown:top-5 peer-focus:top-0 peer-focus:text-[11px] peer-focus:text-white peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-[11px]">
                            Email
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
                            Save Changes
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default UserModal;
