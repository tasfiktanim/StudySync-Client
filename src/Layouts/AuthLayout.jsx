import React from 'react';
import { Outlet } from 'react-router';

const AuthLayout = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-base-100 px-4">
            <Outlet />
        </div>
    );
};

export default AuthLayout;
