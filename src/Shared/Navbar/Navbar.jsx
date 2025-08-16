import React from 'react';
import { NavLink, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import useAuth from '../../Hooks/useAuth';
import useUserRole from '../../Hooks/useUserRole';
import { FiMenu } from 'react-icons/fi';
import { FaBookOpen } from 'react-icons/fa';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { role, roleLoading } = useUserRole();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully!');
      navigate('/');
    } catch (error) {
      toast.error('Failed to logout');
    }
  };

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `block py-2 px-4 text-sm sm:text-base rounded-lg transition ${
              isActive
                ? 'text-primary font-semibold bg-primary/10'
                : 'text-gray-700 hover:text-primary hover:bg-gray-100'
            }`
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/our-tutors"
          className={({ isActive }) =>
            `block py-2 px-4 text-sm sm:text-base rounded-lg transition ${
              isActive
                ? 'text-primary font-semibold bg-primary/10'
                : 'text-gray-700 hover:text-primary hover:bg-gray-100'
            }`
          }
        >
          Tutors
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/tutors"
          className={({ isActive }) =>
            `block py-2 px-4 text-sm sm:text-base rounded-lg transition ${
              isActive
                ? 'text-primary font-semibold bg-primary/10'
                : 'text-gray-700 hover:text-primary hover:bg-gray-100'
            }`
          }
        >
          Be Our Tutor
        </NavLink>
      </li>
      {!roleLoading && (role === 'Instructor' || role === 'Admin') && (
        <li>
          <NavLink
            to="/dashboard/sessions"
            className={({ isActive }) =>
              `block py-2 px-4 text-sm sm:text-base rounded-lg transition ${
                isActive
                  ? 'text-primary font-semibold bg-primary/10'
                  : 'text-gray-700 hover:text-primary hover:bg-gray-100'
              }`
            }
          >
            Create Sessions
          </NavLink>
        </li>
      )}
      <li>
        <NavLink
          to="/dashboard/my-created-sessions"
          className={({ isActive }) =>
            `block py-2 px-4 text-sm sm:text-base rounded-lg transition ${
              isActive
                ? 'text-primary font-semibold bg-primary/10'
                : 'text-gray-700 hover:text-primary hover:bg-gray-100'
            }`
          }
        >
          Study Sessions
        </NavLink>
      </li>
    </>
  );

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3">
          {/* Left: Logo + Mobile Menu */}
          <div className="flex items-center gap-3">
            {/* Mobile Dropdown */}
            <div className="dropdown lg:hidden">
              <label tabIndex={0} className="btn btn-ghost p-2">
                <FiMenu className="h-6 w-6 text-gray-700" />
              </label>
              <ul
                tabIndex={0}
                className="menu dropdown-content mt-2 z-[999] p-2 shadow-lg bg-white rounded-lg w-[90vw] max-w-[300px] space-y-1"
              >
                {navLinks}
                {!user ? (
                  <>
                    <li>
                      <NavLink
                        to="/login"
                        className="block py-2 px-4 text-sm sm:text-base text-gray-700 hover:text-primary hover:bg-gray-100 rounded-lg transition"
                      >
                        Login
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/signup"
                        className="block py-2 px-4 text-sm sm:text-base text-gray-700 hover:text-primary hover:bg-gray-100 rounded-lg transition"
                      >
                        Sign Up
                      </NavLink>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <NavLink
                        to="/dashboard"
                        className="block py-2 px-4 text-sm sm:text-base text-gray-700 hover:text-primary hover:bg-gray-100 rounded-lg transition"
                      >
                        Dashboard
                      </NavLink>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="block py-2 px-4 text-sm sm:text-base text-red-600 hover:bg-red-100 rounded-lg transition w-full text-left"
                      >
                        Logout
                      </button>
                    </li>
                  </>
                )}
              </ul>
            </div>

            {/* Logo */}
            <NavLink
              to="/"
              className="flex items-center gap-2 text-xl sm:text-2xl font-bold tracking-tight text-primary"
            >
              <FaBookOpen className="text-primary w-6 h-6 sm:w-8 sm:h-8" />
              <span className="truncate">StudySphere</span>
            </NavLink>
          </div>

          {/* Center (Desktop Links) */}
          <div className="hidden lg:flex">
            <ul className="flex space-x-2 font-medium">{navLinks}</ul>
          </div>

          {/* Right Side (Auth Buttons / Profile) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {!user ? (
              <>
                <NavLink
                  to="/login"
                  className="btn btn-outline btn-sm sm:btn-md rounded-full text-gray-700 hover:bg-primary hover:text-white transition"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className="btn btn-primary btn-sm sm:btn-md rounded-full shadow-md hover:bg-primary-dark transition"
                >
                  Sign Up
                </NavLink>
              </>
            ) : (
              <div className="flex items-center gap-2 sm:gap-3">
                <NavLink
                  to="/dashboard"
                  className="btn btn-outline btn-sm sm:btn-md rounded-full text-gray-700 hover:bg-primary hover:text-white transition"
                >
                  Dashboard
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="btn btn-error btn-sm sm:btn-md rounded-full shadow-md hover:bg-red-600 transition"
                >
                  Logout
                </button>
                <img
                  src={user.photoURL || 'https://i.ibb.co/4pDNDk1/avatar.png'}
                  alt="Profile"
                  title={user.displayName || user.email}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-primary object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
