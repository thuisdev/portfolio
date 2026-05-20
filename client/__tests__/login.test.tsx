jest.mock('../src/context/AuthProvider')

import userEvent from '@testing-library/user-event'
import Login from '../src/pages/Login'
import { useAuth } from '../src/context/AuthProvider'
import { MemoryRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'

describe('User Login Test', () => {

    const mockLogin = jest.fn().mockResolvedValue({})
    const mockFailLogin = jest.fn().mockRejectedValue({})

    beforeEach(() => {
        (useAuth as jest.Mock).mockReturnValue({ login: mockLogin });

        window.alert = jest.fn();
    });

    it('should render the login form', async () => {
        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        )

        expect(screen.getByLabelText('Username')).toBeInTheDocument()
        expect(screen.getByLabelText('Password')).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument()
    });


    it('should call login on submit', async () => {
        const user = userEvent.setup();

        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        await user.type(screen.getByLabelText('Username'), 'testuser');
        await user.type(screen.getByLabelText('Password'), 'password123');

        await user.click(screen.getByRole('button', { name: 'Sign In' }));

        expect(mockLogin).toHaveBeenCalledWith({
            username: 'testuser',
            password: 'password123'
        })
    });


    it('should fail login', async () => {
        const user = userEvent.setup();

        (useAuth as jest.Mock).mockReturnValue({ login: mockFailLogin })

        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        await user.type(screen.getByLabelText('Username'), 'testuser');
        await user.type(screen.getByLabelText('Password'), 'password123');

        await user.click(screen.getByRole('button', { name: 'Sign In' }));

        expect(mockFailLogin).toHaveBeenCalledWith({
            username: 'testuser',
            password: 'password123'
        })
        expect(window.alert).toHaveBeenCalledWith('Login failed!')
    });

});