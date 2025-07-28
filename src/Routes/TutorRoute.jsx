import React from 'react';
import useAuth from '../Hooks/useAuth';
import useUserRole from '../Hooks/useUserRole';
import { Navigate, useLocation } from 'react-router';

const TutorRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, roleLoading } = useUserRole();
  const location = useLocation();

  if (loading || roleLoading) {
    return <span className="loading loading-spinner loading-xl"></span>;
  }

  // Allow if role is 'Instructor' or 'admin'
  if (!user || (role !== 'Instructor' && role !== 'Admin')) {
    return <Navigate to="/" state={{ from: location.pathname }} replace />;
  }

  return children;
};

export default TutorRoute;
