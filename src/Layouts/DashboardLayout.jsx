import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router';
import { FaBars, FaBookmark, FaStickyNote, FaTimes } from 'react-icons/fa';
import {
  FaBook,
  FaClipboardList,
  FaFileAlt,
  FaFolderOpen,
  FaPlusCircle,
  FaUsers,
  FaHistory,
  FaUserShield,
} from 'react-icons/fa';
import useUserRole from '../Hooks/useUserRole';
import Navbar from '../Shared/Navbar/Navbar';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { role, roleLoading } = useUserRole();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-5 py-3 rounded-lg transition-colors duration-200 cursor-pointer
     ${isActive
      ? 'bg-blue-600 text-white shadow-lg'
      : 'text-gray-700 hover:bg-blue-100 hover:text-blue-700'
    }`;

  return (
    <section>
      <div>
        <Navbar />
      </div>

      <div className="flex min-h-screen bg-gray-100 text-gray-900">
        {/* Sidebar */}
        <aside
          className={`fixed z-40 inset-y-0 left-0 w-64 bg-white shadow-lg transform
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            transition-transform duration-300 ease-in-out
            md:sticky md:top-0 md:translate-x-0 md:h-screen flex flex-col`}
        >
          {/* Mobile-only topbar inside sidebar */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-300 md:hidden">
            <h2 className="text-2xl font-semibold text-blue-700">Dashboard</h2>
            <button
              onClick={toggleSidebar}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
              aria-label="Close sidebar"
            >
              <FaTimes size={22} />
            </button>
          </div>

          {/* Scrollable Nav Area */}
          <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-2">
            {/* Basic User Links */}
            <NavLink to="/dashboard/overview" className={navLinkClass}>
              <FaBook size={18} /> Overview
            </NavLink>
            <NavLink to="/dashboard/profile" className={navLinkClass}>
              <FaUserShield size={18} /> Profile
            </NavLink>
            <NavLink to="/dashboard/booked-sessions" className={navLinkClass}>
              <FaBookmark size={18} /> Booked Sessions
            </NavLink>

            <NavLink to="/dashboard/create-note" className={navLinkClass}>
              <FaStickyNote size={18} /> Create Note
            </NavLink>

            <NavLink to="/dashboard/manage-notes" className={navLinkClass}>
              <FaClipboardList size={18} /> Manage Notes
            </NavLink>

            <NavLink to="/dashboard/study-materials" className={navLinkClass}>
              <FaFolderOpen size={18} /> Study Materials
            </NavLink>

            <NavLink to="/dashboard/view-materials" className={navLinkClass}>
              <FaFileAlt size={18} /> View All Materials
            </NavLink>

            {/* Instructor Links */}
            {!roleLoading && (role === 'Instructor' || role === 'Admin') && (
              <>
                <NavLink to="/dashboard/upload-materials" className={navLinkClass}>
                  <FaFileAlt size={18} /> Upload Material
                </NavLink>

                <NavLink to="/dashboard/sessions" className={navLinkClass}>
                  <FaPlusCircle size={18} /> Create Study Sessions
                </NavLink>

                <NavLink to="/dashboard/my-created-sessions" className={navLinkClass}>
                  <FaBookmark size={18} /> View All Study Sessions
                </NavLink>
              </>
            )}

            {/* Admin Links */}
            {!roleLoading && role === 'Admin' && (
              <>
                <hr className="my-4 border-gray-300" />

                <NavLink to="/dashboard/all-users" className={navLinkClass}>
                  <FaUsers size={18} /> View All Tutors
                </NavLink>

                <NavLink to="/dashboard/paymentHistory" className={navLinkClass}>
                  <FaHistory size={18} /> Payment History
                </NavLink>

                <NavLink to="/dashboard/adminUsers" className={navLinkClass}>
                  <FaUserShield size={18} /> Admin User
                </NavLink>
              </>
            )}
          </nav>
        </aside>

        {/* Main content */}
        <div className="flex-1 flex flex-col min-h-screen">
          {/* Mobile Topbar */}
          <header className="sticky top-0 z-30 bg-white border-b border-gray-300 px-6 py-4 shadow-md flex items-center justify-between md:hidden">
            <h2 className="text-xl font-semibold text-blue-700">Dashboard</h2>
            <button
              onClick={toggleSidebar}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
              aria-label="Open sidebar"
            >
              <FaBars size={24} />
            </button>
          </header>

          {/* Page Content */}
          <main className="flex-1 p-8 overflow-y-auto bg-gray-50 transition-colors duration-300">
            <Outlet />
          </main>
        </div>
      </div>
    </section>
  );
};

export default DashboardLayout;
