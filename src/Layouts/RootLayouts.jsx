import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Shared/Navbar/Navbar';
import Footer from '../Shared/Footer/Footer';

const RootLayouts = () => {
  return (
    <div className="min-h-screen w-full bg-base-100 flex flex-col">
        
      <header className="sticky top-0 z-50 w-full">
        <Navbar />
      </header>

      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default RootLayouts;
