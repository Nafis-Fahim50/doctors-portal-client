import React from 'react';

const AvaliableAppointmentCard = ({ appointment, setTreatment }) => {
    const { name, slots, price } = appointment;
    return (
        <div className="card shadow-xl">
            <div className="card-body text-center">
                <h2 className="text-2xl font-bold text-secondary">{name}</h2>
                <p>{slots.length > 0 ? slots[0] : 'Try Another day'}</p>
                <p>{slots.length} {slots.length > 1 ? 'spaces' : 'space'} available</p>
                <p className='text-red-500'>Price: ${price}</p>
                <div className="card-actions justify-center">
                    <label htmlFor="booking-modal"
                   disabled={slots.length === 0}
                    className="btn btn-primary text-white"
                    onClick={()=> setTreatment(appointment)}
                    >Book Appointment</label>
                </div>
            </div>
        </div>
    );
};

export default AvaliableAppointmentCard;