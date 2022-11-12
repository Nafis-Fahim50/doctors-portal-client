import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import AvaliableAppointmentCard from './AvaliableAppointmentCard';

const AvaliableAppointmnet = ({selectedDate}) => {
    const [appointmentOption,setAppointmentOption] = useState([])
    useEffect(() => {
        fetch('appointmentOptions.json')
        .then(res => res.json())
        .then(data => setAppointmentOption(data));
    },[]) 
    return (
        <section className='mt-16'>
            <p className='text-secondary font-bold text-center'>Available Appointments on {format(selectedDate,'PP')}</p>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16'>
                {
                    appointmentOption.map(option => <AvaliableAppointmentCard
                    key={option._id}
                    appointment={option}>
                    </AvaliableAppointmentCard>)
                }
            </div>
        </section>
    );
};

export default AvaliableAppointmnet;