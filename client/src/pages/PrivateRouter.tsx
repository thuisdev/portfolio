import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import type { ReactNode } from 'react';

export interface PrivateRouteProps {
    children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
    const { isLoggedIn, isAdmin } = useAuth();

    if (!isLoggedIn) {
        return <Navigate to="/login" />;
    }

    if (!isAdmin) {
        return <Navigate to="/404" />;
    }

    return <>{children}</>;
};

export default PrivateRoute