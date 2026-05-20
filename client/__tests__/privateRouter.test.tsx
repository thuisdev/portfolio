jest.mock('../src/context/AuthProvider');

import { MemoryRouter } from "react-router-dom";
import PrivateRoute from "../src/pages/PrivateRouter";
import { useAuth } from "../src/context/AuthProvider";
import { render, screen } from "@testing-library/react";
import { Routes, Route } from 'react-router-dom'

describe('testing Private Router', () => {

    it('should render children', async () => {
        (useAuth as jest.Mock).mockReturnValue({
            isLoggedIn: true,
            isAdmin: true
        })

        render(
            <MemoryRouter>
                <PrivateRoute>
                    <div>Protected Content</div>
                </PrivateRoute>
            </MemoryRouter>
        )

        expect(await screen.findByText('Protected Content')).toBeInTheDocument();
    });

    it('should navigate to /login (!isLoggedIn)', async () => {
        (useAuth as jest.Mock).mockReturnValue({
            isLoggedIn: false,
        })

        render(
            <MemoryRouter>
                <Routes>
                    <Route path="/login" element={<div>Login Page</div>} />
                    <Route path="/" element={
                        <PrivateRoute>
                            <div>Protected Content</div>
                        </PrivateRoute>
                    } />
                </Routes>
            </MemoryRouter>
        )

        expect(await screen.queryByText('Protected Content')).not.toBeInTheDocument();
        expect(screen.getByText('Login Page')).toBeInTheDocument();
    });

    it('should navigate to /404 (!isAdmin)', async () => {
        (useAuth as jest.Mock).mockReturnValue({
            isLoggedIn: true,
            isAdmin: false
        })

        render(
            <MemoryRouter>
                <Routes>
                    <Route path="/404" element={<div>404 Page</div>} />
                    <Route path="/" element={
                        <PrivateRoute>
                            <div>Protected Content</div>
                        </PrivateRoute>
                    } />
                </Routes>
            </MemoryRouter>
        )

        expect(await screen.queryByText('Protected Content')).not.toBeInTheDocument();
        expect(screen.getByText('404 Page')).toBeInTheDocument();
    });


})