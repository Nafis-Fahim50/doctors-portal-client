import React from 'react';
import treatment from '../../../assets/images/treatment.png'
const DentalCare = () => {
    return (
        <div className='mt-24'>
            <div className="hero">
                <div className="hero-content flex-col lg:flex-row">
                    <img src={treatment} alt='dental-care' className="max-w-sm lg:ml-20 rounded-lg shadow-2xl" />
                    <div className='lg:ml-20'>
                        <h1 className="text-5xl lg:w-8/12 font-bold">Exceptional Dental Care, on Your Terms</h1>
                        <p className="text-justify py-6 lg:w-9/12">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsumis that it has a more-or-less normal distribution of letters,as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page</p>
                        <button className="btn btn-primary text-white bg-gradient-to-r from-primary to-secondary">Get Started</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DentalCare;