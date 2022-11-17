import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../../Context/AuthProvider';

const MyAppointments = () => {
    const {user} = useContext(AuthContext)
    
    const url = `http://localhost:5000/bookings?email=${user?.email}`

    const {data: bookings =[]} = useQuery({
        queryKey:['bookings',user?.email],
        queryFn: async () =>{
            const res = await fetch(url);
            const data = await res.json();
            return data;
        }
    })
    console.log(bookings);
    return (
        <div>
            <h1 className='my-5 text-2xl font-bold'>My Appointments</h1>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Service</th>
                            <th>Time</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookings.map((booking,i) =><tr
                            key={booking._id}>
                                <th>{i+1}</th>
                                <td>{booking.Patient}</td>
                                <td>{booking.treatmentName}</td>
                                <td>{booking.slot}</td>
                                <td>{booking.appointmentDate}</td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyAppointments;