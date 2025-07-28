import { createBrowserRouter } from "react-router";
import RootLayouts from "../Layouts/RootLayouts";
import { Component } from "react";
import Home from "../Pages/Home/Home";
import AuthLayout from "../Layouts/AuthLayout";
import Register from "../Pages/Auth/Register";
import Login from "../Pages/Auth/Login";
import PrivateRoute from "../Routes/PrivateRoute";
import SessionDetails from "../Pages/BookedSession/SessionDetails";
import SessionForm from "../Pages/BookedSession/SessionForm";
import DashboardLayout from "../Layouts/DashboardLayout";
import BookedSessions from "../Pages/dashboard/BookedSessions";
import MyCreatedSessions from "../Pages/dashboard/MyCreatedSessions";
import Payment from "../Pages/dashboard/Payment/Payment";
import PaymentHistory from "../Pages/dashboard/Payment/PaymentHistory";
import CreateNote from "../Pages/dashboard/Student/CreateNote";
import ManageNotes from "../Pages/dashboard/Student/ManageNotes";
import StudyMaterials from "../Pages/dashboard/Student/StudyMaterials";
import Tutors from "../Pages/Tutor/Tutors";
import ourTutors from "../Pages/Tutor/ourTutors";
import AllTutors from "../Pages/Tutor/AllTutors";
import AdminUsers from "../Pages/dashboard/AdminUsers";
import AdminRoute from "../Routes/AdminRoute";
import UploadMaterialForm from "../Pages/Tutor/UploadMaterialForm";
import ViewMaterials from "../Pages/Tutor/ViewMaterials";
import BookedSessionDetails from "../Pages/dashboard/Student/BookedSessionDetails";
import DashboardHome from "../Pages/dashboard/Dashboard/DashboardHome";
import TutorRoute from "../Routes/TutorRoute";





export const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayouts,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: 'bookedSession/:id',
                element: <PrivateRoute><SessionDetails></SessionDetails>
                </PrivateRoute>
            },
        ]
    },
    {
        path: '/',
        Component: AuthLayout,
        children: [
            {
                path: 'login',
                Component: Login
            },
            {
                path: 'register',
                Component: Register
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
        children: [
            {
                index: true,
                Component: DashboardHome,
            },
            {
                path: 'booked-sessions',
                element: <BookedSessions />,
            },
            {
                path: "booked/:id",
                element: <BookedSessionDetails />,
            },
            {
                path: 'payment/:sessionId',
                Component: Payment,
            },
            {
                path: 'paymentHistory',
                element: <AdminRoute>
                    <PaymentHistory></PaymentHistory>
                </AdminRoute>,
            },
            {
                path: 'my-created-sessions',
                element:
                    <MyCreatedSessions />,
            },
            {
                path: 'all-users',
                element: <AdminRoute>
                    <AllTutors />
                </AdminRoute>,
            },
            {
                path: 'tutors',
                element: <Tutors />,
            },
            {
                path: 'our-tutors',
                Component: ourTutors,
            },
            {
                path: 'upload-materials',
                element: <TutorRoute><UploadMaterialForm /></TutorRoute>,
            },
            {
                path: 'view-materials',
                element: <ViewMaterials />,
            },
            {
                path: 'sessions',
                element: <TutorRoute><SessionForm></SessionForm>
                </TutorRoute>,
            },
            {
                path: 'adminUsers',
                element:
                    <AdminRoute>
                        <AdminUsers />
                    </AdminRoute>,
            },
            {
                path: 'create-note',
                element: <CreateNote />,
            },
            {
                path: 'manage-notes',
                element: <ManageNotes />,
            },
            {
                path: 'study-materials',
                element: <StudyMaterials />,
            },
        ]
    },
]);