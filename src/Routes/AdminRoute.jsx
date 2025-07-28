import React, { Children } from 'react';

import { Navigate, useLocation } from 'react-router';
import useAuth from '../Hooks/useAuth';
import useUserRole from '../Hooks/useUserRole';

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const { role, roleLoading } = useUserRole();
    const location = useLocation();

    if (loading || roleLoading) {
        return <span className="loading loading-spinner loading-xl"></span>
    }

    if (!user || role !== 'Admin') {
        return <Navigate state={{ from: location.pathname }} to="/"></Navigate>
    }

    return children;
};

export default AdminRoute;