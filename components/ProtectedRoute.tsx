import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Role } from '../types';

interface ProtectedRouteProps {
    children: React.ReactNode;
    allowedRoles: Role[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
    const { isAuthenticated, user } = useAuth();
    const location = useLocation();

    if (!isAuthenticated) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to. This allows us to send them along to that page after they log in.
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (!user || !allowedRoles.includes(user.role)) {
        // If the user is logged in but doesn't have the required role,
        // redirect them to the homepage or an "unauthorized" page.
        // For simplicity, we redirect to the homepage.
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;