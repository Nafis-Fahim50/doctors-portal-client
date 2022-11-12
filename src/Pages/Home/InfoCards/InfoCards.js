import React from 'react';
import clock from '../../../assets/icons/clock.svg'
import marker from '../../../assets/icons/marker.svg'
import phone from '../../../assets/icons/phone.svg'


const InfoCards = () => {
    return (
        <div className='px-10 pb-10'>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-5 mt-5'>
                <div className='bg-gradient-to-r from-primary to-secondary rounded-lg px-5 py-10'>
                    <div className='flex gap-5 text-white'>
                        <img src={clock} alt="" />
                        <div>
                            <p className='font-bold my-3'>Opening Hours</p>
                            <small className='text-sm'>9 AM and 5 PM</small>
                        </div>
                    </div>
                </div>
                <div className='bg-accent rounded-lg px-5 py-10'>
                    <div className='flex gap-5 text-white'>
                        <img src={marker} alt="" />
                        <div>
                            <p className='font-bold my-3'>Visit our location</p>
                            <small className='text-sm'>Lokkipur, Rajshahi, Bangladesh</small>
                        </div>
                    </div>
                </div>
                <div className='bg-gradient-to-r from-secondary to-primary rounded-lg px-5 py-10'>
                    <div className='flex gap-5 text-white'>
                        <img src={phone} alt="" />
                        <div>
                            <p className='font-bold my-3'>Contact us now</p>
                            <small className='text-sm'>+8801316315819</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InfoCards;