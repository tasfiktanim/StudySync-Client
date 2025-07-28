import React from 'react';
import Banner from './Banner/Banner';
import Testimonials from './Testimonials';
import CountUpPage from './CountUpPage';
import StudySessions from '../dashboard/StudySessions';


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <StudySessions></StudySessions>
            <Testimonials></Testimonials>
            <CountUpPage></CountUpPage>
        </div>
    );
};

export default Home;