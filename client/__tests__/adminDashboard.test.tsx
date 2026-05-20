jest.mock('../src/context/AuthProvider');
jest.mock('../src/api/blogs');
jest.mock('../src/api/users');

import userEvent from '@testing-library/user-event'
import { useAuth } from '../src/context/AuthProvider'
import { getAllBlogs, deleteBlog } from '../src/api/blogs'
import { getAllUsers, deleteUser } from '../src/api/users'
import { MemoryRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import AdminDashboard from '../src/pages/AdminDashboard';

describe('Admin Dashboard Test', () => {

    beforeEach(() => {
        (useAuth as jest.Mock).mockReturnValue({
            isAdmin: true,
            user: { user_id: 1, username: 'admin' }
        })

        window.alert = jest.fn();

        (getAllBlogs as jest.Mock).mockResolvedValue({
            data: [{
                blog_id: 1,
                user_id: 1,
                title: 'title',
                content: 'content',
                blogPrvText: 'blogPrvText',
                blogImgSrc: 'blogImgSrc'
            }]
        });

        (getAllUsers as jest.Mock).mockResolvedValue({
            data: [{
                user_id: 1,
                username: 'testuser',
                name: 'Test',
                email: 'test@test.com',
                role: 'user'
            }]
        });
    });

    it('should return all Blogs and Users', async () => {
        render(
            <MemoryRouter>
                <AdminDashboard />
            </MemoryRouter>
        )

        expect(await screen.findByText('title')).toBeInTheDocument();
        expect(await screen.findByText('testuser')).toBeInTheDocument();
    });

    it('should delete blog', async () => {
        const user = userEvent.setup();

        render(
            <MemoryRouter>
                <AdminDashboard />
            </MemoryRouter>
        );

        await screen.findByText('title')

        const deleteButtons = screen.getAllByRole('button', { name: 'Delete' })

        window.confirm = jest.fn().mockReturnValue(true)

        await user.click(deleteButtons[0])

        expect(deleteBlog as jest.Mock).toHaveBeenCalledWith('1')

        expect(window.alert).toHaveBeenCalledWith('Blog deleted successfully!')
    });

    it('should delete user', async () => {
        const user = userEvent.setup();

        render(
            <MemoryRouter>
                <AdminDashboard />
            </MemoryRouter>
        )

        await screen.findByText('testuser')

        const deleteButtons = screen.getAllByRole('button', { name: 'Delete' })

        window.confirm = jest.fn().mockReturnValue(true)

        await user.click(deleteButtons[1])

        expect(deleteUser as jest.Mock).toHaveBeenCalledWith('1')
        expect(window.alert).toHaveBeenCalledWith('User deleted successfully!')

    });

    it('should open creat blog modal', async () => {
        const user = userEvent.setup();

        render(
            <MemoryRouter>
                <AdminDashboard />
            </MemoryRouter>
        )

        await screen.findByText('title')

        await user.click(screen.getByRole('button', { name: 'Create Blog' }))

        expect(await screen.findByLabelText('Image URL')).toBeInTheDocument()
    });

    it('should open edit blog with text by blog id', async () => {
        const user = userEvent.setup();

        render(
            <MemoryRouter>
                <AdminDashboard />
            </MemoryRouter>
        )

        await screen.findByText('title')

        const editButtons = screen.getAllByRole('button', { name: 'Edit' })

        await user.click(editButtons[0])

        expect(await screen.findByText('Edit Blog')).toBeInTheDocument();
        expect(await screen.findByDisplayValue('title')).toBeInTheDocument()
    });
});