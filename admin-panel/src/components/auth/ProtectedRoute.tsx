import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types/auth';

interface ProtectedRouteProps {
    children: React.ReactNode;
    allowedRoles?: UserRole[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
    const { user, isAuthenticated } = useAuth();
    const location = useLocation();

    if (!isAuthenticated) {
        // Redirect to login but save the current location they were trying to go to
        return <Navigate to="/login" state={{ from: location }} replace />;
    }


    if (allowedRoles && user && !allowedRoles.includes(user.role)) {
        // Role not allowed, redirect to their specific overview or login
        const dashboardPath = `/${user.role.toLowerCase().replace('_', '-')}/overview`;
        return <Navigate to={dashboardPath} replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
