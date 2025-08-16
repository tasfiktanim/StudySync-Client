import React from 'react';
import Banner from './Banner/Banner';
import Testimonials from './Testimonials';
import CountUpPage from './CountUpPage';
import StudySessions from '../dashboard/StudySessions';
import NotesBanner from './NotesBanner';
import DownloadAppSection from './DownloadAppSection';

const Home = () => {
    return (
        <div className="flex flex-col gap-16"> 
            <Banner />
            <StudySessions />
            <CountUpPage />
            <Testimonials />
            <NotesBanner />
            <DownloadAppSection />
        </div>
    );
};

export default Home;
