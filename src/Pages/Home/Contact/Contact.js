import React from 'react';
import appoinmnet from '../../../assets/images/appointment.png'
import PrimaryButton from '../../../components/PrimaryButton/PrimaryButton';

const Contact = () => {
    return (
        <section className='mt-16'  style={{ backgroundImage: `url(${appoinmnet})` }}>
            <div className="hero">
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        <h4 className='text-secondary font-bold mt-10'>Contact Us</h4>
                        <h1 className='text-2xl  text-white'>Stay connected with us</h1>
                        <div className='mt-7'>
                            <input type="text" placeholder="Email Address" className="input text-black input-bordered input-sm w-full max-w-xs" />
                            <input type="text" placeholder="Password" className="input text-black mt-3 input-bordered input-sm w-full max-w-xs" />
                            <textarea className="textarea text-black py-7 mt-3 w-full max-w-xs " placeholder="Bio"></textarea>
                        </div>
                        <div className='mt-5 mb-8'>
                            <PrimaryButton>Submit</PrimaryButton>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;