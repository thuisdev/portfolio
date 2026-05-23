import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import type { ReactNode } from 'react';

export interface PrivateRouteProps {
    children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
    const { isLoggedIn, isLoading, isAdmin } = useAuth();

    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    if (!isAdmin) {
        return <Navigate to="/404" replace />;
    }

    if (isLoading) { return <>{children}</>; }
};

export default PrivateRoute