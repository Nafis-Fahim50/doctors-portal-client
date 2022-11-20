import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import Cheakout from './Cheakout';

const stripePromise = loadStripe(process.env.REACT_APP_pk)

const Payment = () => {
    const booking = useLoaderData();
    const { treatmentName, price, appointmentDate, slot } = booking;
    return (
        <div>
            <h1 className='text-2xl my-5 font-bold text-primary'>Payment</h1>
            <h3 className="text-xl">Payment for {treatmentName}</h3>
            <p className="mt-2">Please pay <strong className='text-red-500'>${price} Dollar</strong> for your appointment on {appointmentDate} at {slot}</p>
            <div className='w-96 my-12'>
                <Elements stripe={stripePromise}>
                    <Cheakout
                    booking={booking}/>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;