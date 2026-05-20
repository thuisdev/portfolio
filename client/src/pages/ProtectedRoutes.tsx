import { useAuth } from "../context/AuthProvider";
import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

interface ProtectedRouteProps {
    children: ReactNode;
}

export const ProtectedRouter = ({ children }: ProtectedRouteProps) => {
    const { isLoggedIn } = useAuth();

    if (!isLoggedIn) {
        return <Navigate to="/login" />
    }

    return <>{children}</>
}