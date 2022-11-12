import React from 'react';
import doctorSmall from '../../../assets/images/doctor-small.png'
import appointment from '../../../assets/images/appointment.png'
import PrimaryButton from '../../../components/PrimaryButton/PrimaryButton';

const MakeAppoinment = () => {
    return (
        <section className='mt-32'
        style={
            {
                background: `url(${appointment})`
            }
        }>
            <div className="hero">
                <div className="hero-content flex-col lg:flex-row">
                    <img src={doctorSmall} alt='doctor' className=" -mt-32 hidden md:block lg:w-1/2 bg-transparent rounded-lg shadow-2xl" />
                    <div>
                        <small className='text-sm font-bold text-primary'>Appointment</small>
                        <h1 className="text-3xl mt-5 text-white font-bold">Make an appointment Today</h1>
                        <p className="py-6 text-white">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsumis that it has a more-or-less normal distribution of letters,as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web pag</p>
                        <PrimaryButton>Get Appointment</PrimaryButton>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MakeAppoinment;