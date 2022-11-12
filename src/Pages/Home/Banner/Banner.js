import React from 'react';
import chair from '../../../assets/images/chair.png'
import './Banner.css'

const Banner = () => {
    return (
        <div className='bannerImg rounded-lg px-10 py-10'>
            <div className="hero lg:my-10">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <img src={chair} alt='' className="rounded-lg w-full lg:w-4/12 shadow-2xl" />
                    <div>
                        <h1 className="text-2xl lg:text-4xl font-bold">Your New Smile Starts <br /> Here</h1>
                        <p className="py-6 lg:w-1/2">A dentist is a doctor who specializes in teeth, gums, and the mouth. If you get a bad toothache, you should probably go to the dentist.</p>
                        <button className="btn btn-primary text-white bg-gradient-to-r from-primary to-secondary">Get Started</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;