import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router'; 
import { toast } from 'react-toastify';
import useAuth from '../../Hooks/useAuth';
import useUserRole from '../../Hooks/useUserRole';
import { FiMenu, FiSun, FiMoon } from 'react-icons/fi';
import { FaBookOpen } from 'react-icons/fa';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { role, roleLoading } = useUserRole();
  const [theme, setTheme] = useState('light');

  // Sync with system theme and handle theme changes
  useEffect(() => {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const savedTheme = localStorage.getItem('theme') || systemTheme;
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = (e) => {
      const newTheme = e.matches ? 'dark' : 'light';
      setTheme(newTheme);
      localStorage.setItem('theme', newTheme);
      document.documentElement.setAttribute('data-theme', newTheme);
    };
    mediaQuery.addEventListener('change', handleSystemThemeChange);
    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
  }, []);

  // Handle theme toggle
  const handleThemeToggle = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast.success(`Logged out successfully!${user?.email ? ` (${user.email})` : ''}`);
      navigate('/');
    } catch (error) {
      toast.error('Failed to logout');
    }
  };

  // Base routes for both logged-in and logged-out users
  const baseNavLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `block py-2 px-4 text-sm sm:text-base rounded-lg transition ${
              isActive
                ? 'text-primary font-semibold bg-primary/10'
                : 'text-base-content hover:text-primary hover:bg-base-200'
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
                : 'text-base-content hover:text-primary hover:bg-base-200'
            }`
          }
        >
          Tutors
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/my-created-sessions"
          className={({ isActive }) =>
            `block py-2 px-4 text-sm sm:text-base rounded-lg transition ${
              isActive
                ? 'text-primary font-semibold bg-primary/10'
                : 'text-base-content hover:text-primary hover:bg-base-200'
            }`
          }
        >
          Study Sessions
        </NavLink>
      </li>
    </>
  );

  // Additional routes for logged-in users
  const protectedNavLinks = (
    <>
      <li>
        <NavLink
          to="/dashboard/tutors"
          className={({ isActive }) =>
            `block py-2 px-4 text-sm sm:text-base rounded-lg transition ${
              isActive
                ? 'text-primary font-semibold bg-primary/10'
                : 'text-base-content hover:text-primary hover:bg-base-200'
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
                  : 'text-base-content hover:text-primary hover:bg-base-200'
              }`
            }
          >
            Create Sessions
          </NavLink>
        </li>
      )}
    </>
  );

  // Combine links based on user authentication
  const navLinks = user ? (
    <>
      {baseNavLinks}
      {protectedNavLinks}
    </>
  ) : (
    baseNavLinks
  );

  // Dropdown menu items including theme toggle for mobile and medium devices
  const dropdownMenuItems = (
    <>
      {navLinks}
      {!user ? (
        <>
          <li>
            <NavLink
              to="/login"
              className="block py-2 px-4 text-sm sm:text-base text-base-content hover:text-primary hover:bg-base-200 rounded-lg transition"
            >
              Login
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/signup"
              className="block py-2 px-4 text-sm sm:text-base text-base-content hover:text-primary hover:bg-base-200 rounded-lg transition"
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
              className="block py-2 px-4 text-sm sm:text-base text-base-content hover:text-primary hover:bg-base-200 rounded-lg transition"
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <button
              onClick={handleThemeToggle}
              className="block py-2 px-4 text-sm sm:text-base text-base-content hover:text-primary hover:bg-base-200 rounded-lg transition w-full text-left flex items-center gap-2"
              aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
              title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            >
              {theme === 'light' ? (
                <FiMoon className="w-5 h-5 text-base-content" />
              ) : (
                <FiSun className="w-5 h-5 text-base-content" />
              )}
              {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
            </button>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="block py-2 px-4 text-sm sm:text-base text-error hover:bg-error/10 rounded-lg transition w-full text-left"
            >
              Logout
            </button>
          </li>
        </>
      )}
    </>
  );

  return (
    <header className="bg-base-100 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3">
          {/* Left: Logo + Mobile Menu */}
          <div className="flex items-center gap-3">
            {/* Mobile Dropdown */}
            <div className="dropdown lg:hidden">
              <label tabIndex={0} className="btn btn-ghost p-2">
                <FiMenu className="h-6 w-6 text-base-content" />
              </label>
              <ul
                tabIndex={0}
                className="menu dropdown-content mt-2 z-[999] p-2 shadow-lg bg-base-100 rounded-lg w-[90vw] max-w-[300px] space-y-1"
              >
                {dropdownMenuItems}
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

          {/* Right Side (Auth Buttons / Profile / Theme Toggle for Desktop) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Toggle (Desktop only) */}
            <button
              onClick={handleThemeToggle}
              className="hidden lg:flex btn btn-ghost btn-sm sm:btn-md rounded-full"
              aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
              title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            >
              {theme === 'light' ? (
                <FiMoon className="w-5 h-5 text-base-content" />
              ) : (
                <FiSun className="w-5 h-5 text-base-content" />
              )}
            </button>
            {!user ? (
              <>
                <NavLink
                  to="/login"
                  className="btn btn-outline btn-sm sm:btn-md rounded-full text-base-content hover:bg-primary hover:text-primary-content transition"
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
                  className="btn btn-outline btn-sm sm:btn-md rounded-full text-base-content hover:bg-primary hover:text-primary-content transition"
                >
                  Dashboard
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="btn btn-error btn-sm sm:btn-md rounded-full shadow-md hover:bg-error-dark transition text-primary-content"
                >
                  Logout
                </button>
                <img
                  src={user?.photoURL || 'https://i.ibb.co/4pDNDk1/avatar.png'}
                  alt="Profile"
                  title={user?.displayName || user?.email || 'User'}
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