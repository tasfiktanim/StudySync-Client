import React from 'react';
import Banner from './Banner/Banner';
import Testimonials from './Testimonials';
import CountUpPage from './CountUpPage';
import StudySessions from '../dashboard/StudySessions';
import NotesBanner from './NotesBanner';
import VideoSection from './VideoSection';

const Home = () => {
    return (
        <div className="flex flex-col gap-16"> 
            <Banner />
            <StudySessions />
            <Testimonials />
            <NotesBanner />
            <VideoSection />
        </div>
    );
};

export default Home;
