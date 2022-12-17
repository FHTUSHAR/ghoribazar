import React from 'react';
import About from './About/About';
import Advertise from './Advertise/Advertise';
import Category from './Category/Category';

import HomeBanner from './HomeBanner/HomeBanner';

const Home = () => {
    return (
        <div id='hmbanner'>
            <HomeBanner></HomeBanner>
            <Category></Category>
            <Advertise></Advertise>
            <About></About>
        </div>
    );
};

export default Home;