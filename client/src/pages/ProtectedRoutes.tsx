import { useAuth } from "../context/AuthProvider";
import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

interface ProtectedRouteProps {
    children: ReactNode;
}

export const ProtectedRouter = ({ children }: ProtectedRouteProps) => {
    const { isLoggedIn, isLoading } = useAuth();

    if (isLoading) return null
    
    if (!isLoggedIn) return <Navigate to="/login" replace />

    return <>{children}</>
}