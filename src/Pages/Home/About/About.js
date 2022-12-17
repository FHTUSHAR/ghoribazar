import React from 'react';
import { Link } from 'react-router-dom';
import bgimg from '../../../images/th.jpg'

const About = () => {
    return (
        <div className='mt-5 lg:ml-8 divide-y divide-red-600'>
            <h1 className='text-3xl font-semibold text-blue-500 mb-5'>About us</h1>
            <div className="hero min-h-screen mt-9">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className='lg:w-1/2 lg:pl-10 '>
                        <img src={bgimg} className="lg:w-96 lg:h-1/2 rounded-lg shadow-2xl shadow-red-500" />
                    </div>
                    <div className='lg:w-1/2'>
                        <h1 className="text-5xl font-bold">About us!</h1>
                        <p className="py-6">We are dedicated to sale good watch.We verify all the seller so that you are not be cheated by any seller.</p>
                        <Link to={'/home'}> <button className="btn btn-primary">Get Started with us</button></Link>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default About;