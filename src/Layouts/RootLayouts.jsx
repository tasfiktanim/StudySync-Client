import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Shared/Navbar/Navbar';
import Footer from '../Shared/Footer/Footer';
import CountUpPage from '../Pages/Home/CountUpPage';
import DownloadAppSection from '../Pages/Home/DownloadAppSection';

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

                <div className="flex flex-col gap-16 mx-auto px-4 py-8 sm:px-6 lg:px-8">
                    <CountUpPage className="w-full" />

                    <DownloadAppSection
                        className="w-full bg-white rounded-3xl shadow-lg px-6 py-8"
                    />
                </div>

                <div className="h-16 md:h-24"></div>

            </main>

            <Footer />
        </div>
    );
};

export default RootLayouts;
