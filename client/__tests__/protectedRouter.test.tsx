jest.mock('../src/context/AuthProvider');

import { MemoryRouter, Routes, Route } from "react-router-dom";
import { ProtectedRouter } from "../src/pages/ProtectedRoutes";
import { useAuth } from "../src/context/AuthProvider";
import { render, screen } from "@testing-library/react";

describe('Testing ProtectedRouter', () => {

    it('should render children when logged in', () => {
        (useAuth as jest.Mock).mockReturnValue({ isLoggedIn: true })

        render(
            <MemoryRouter>
                <ProtectedRouter>
                    <div>Protected Content</div>
                </ProtectedRouter>
            </MemoryRouter>
        )

        expect(screen.getByText('Protected Content')).toBeInTheDocument();
    });

    it('should redirect to /login when not logged in', () => {
        (useAuth as jest.Mock).mockReturnValue({ isLoggedIn: false })

        render(
            <MemoryRouter>
                <Routes>
                    <Route path="/login" element={<div>Login Page</div>} />
                    <Route path="/" element={
                        <ProtectedRouter>
                            <div>Protected Content</div>
                        </ProtectedRouter>
                    } />
                </Routes>
            </MemoryRouter>
        )

        expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
        expect(screen.getByText('Login Page')).toBeInTheDocument();
    });

});
