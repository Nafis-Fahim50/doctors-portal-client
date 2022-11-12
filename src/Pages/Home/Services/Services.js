import React from 'react';
import fluoride from '../../../assets/images/fluoride.png'
import cavity from '../../../assets/images/cavity.png'
import whitening from '../../../assets/images/whitening.png'
import ServiceCard from './ServiceCard';


const Services = () => {
    const servicesData = [
        {
            id: 1,
            name: 'Fluoride Treatment',
            description: 'Fluoride varnish can be applied to both baby teeth and adult teeth by a dentist.',
            img: fluoride
        },
        {
            id: 2,
            name: 'Cavity Filling',
            description: 'Our dentist will numb the area and use a numbing gel before injecting a local anesthetic known as Lidocaine.',
            img: cavity
        },
        {
            id: 3,
            name: 'Teeth Whitening',
            description: 'Everyone notices a bright, white, glowing smile. And everyone notices how confident you feel when you have that beautiful smile. ',
            img: whitening
        },
    ]
    return (
        <div className='mt-16'>
            <div className='text-center'>
                <h3 className='font-bold text-primary uppercase'>Our Services</h3>
                <p className='text-3xl font-bold'>Services We Provide</p>
            </div>
            <div className='grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-10'>
                {
                   servicesData.map(service => <ServiceCard
                   id={service.id}
                   service={service}></ServiceCard>)
                }
            </div>
        </div>
    );
};

export default Services;