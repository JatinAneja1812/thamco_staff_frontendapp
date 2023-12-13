import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectedRoute = () => {
    const location = useLocation();
    const { isAuthenticated } = useAuth0();

    return (
        isAuthenticated ?
            <Outlet />
            : <Navigate
                to={'/'}
                state={{ from: location }} />
    );
};

export default ProtectedRoute;