import React from 'react';
import Advertise from './Advertise/Advertise';
import Category from './Category/Category';
import FAQ from './FAQ/FAQ';
import HomeBanner from './HomeBanner/HomeBanner';

const Home = () => {
    return (
        <div>
            <HomeBanner></HomeBanner>
            <Category></Category>
            <Advertise></Advertise>
            <FAQ></FAQ>
        </div>
    );
};

export default Home;