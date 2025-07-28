
import React from 'react';
import useUserRole from '../../../Hooks/useUserRole';
import Loading from '../../../Layouts/Loading';
import TutorDashboard from './TutorDashboard';
import AdminDashboard from './AdminDashboard';
import UserDashboard from './UserDashboard';

const DashboardHome = () => {
    const { role, roleLoading } = useUserRole();

    if (roleLoading) {
        return <Loading></Loading>
    }

    if(role === 'User'){
        return <UserDashboard></UserDashboard>
    }
    else if(role === 'Instructor'){
        return <TutorDashboard></TutorDashboard>
    }
    else if(role ==='Admin'){
        return <AdminDashboard></AdminDashboard>
    }
    else {
        return <></>
    }

};

export default DashboardHome;
