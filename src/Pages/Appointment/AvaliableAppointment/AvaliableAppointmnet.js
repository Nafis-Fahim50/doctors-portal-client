import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import React, { useState } from 'react';
import Loading from '../../Shared/Loading/Loading';
import BookingModal from '../BookingModal/BookingModal';
import AvaliableAppointmentCard from './AvaliableAppointmentCard';

const AvaliableAppointmnet = ({selectedDate}) => {
    const [treatment, setTreatment] = useState(null);
    const date = format(selectedDate,'PP')

    const {data: appointmentOption =[], refetch, isLoading} = useQuery({
        queryKey:['appointmentOption',date],
        queryFn:()=> fetch(`http://localhost:5000/appointoptions?date=${date}`)
        .then(res => res.json())
    }) 

    if(isLoading){
        return <Loading></Loading>
    }
    
    return (
        <section className='mt-16'>
            <p className='text-secondary font-bold text-center'>Available Appointments on {format(selectedDate,'PP')}</p>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16'>
                {
                    appointmentOption.map(option => <AvaliableAppointmentCard
                    key={option._id}
                    appointment={option}
                    setTreatment={setTreatment}>
                    </AvaliableAppointmentCard>)
                }
            </div>
            {
                treatment &&
                <BookingModal
                treatment={treatment}
                selectedDate={selectedDate}
                setTreatment={setTreatment}
                refetch={refetch}
                ></BookingModal>
            }
        </section>
    );
};

export default AvaliableAppointmnet;