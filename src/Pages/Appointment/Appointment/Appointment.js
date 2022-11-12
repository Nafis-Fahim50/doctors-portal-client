import React, { useState } from 'react';
import AppointmentBanner from '../AppointmentBanner/AppointmentBanner';
import AvaliableAppointmnet from '../AvaliableAppointment/AvaliableAppointmnet';

const Appointment = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    return (
        <div>
            <AppointmentBanner
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}></AppointmentBanner>
            <AvaliableAppointmnet
            selectedDate={selectedDate}></AvaliableAppointmnet>
        </div>
    );
};

export default Appointment;