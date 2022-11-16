import { format } from 'date-fns';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../Context/AuthProvider';

const BookingModal = ({ treatment, selectedDate, setTreatment,refetch }) => {
    const { name, slots } = treatment;
    const date = format(selectedDate, 'PP')
    const {user} = useContext(AuthContext);
    
    const handleBooking = event =>{
        event.preventDefault();
        const form = event.target;
        const slot = form.slot.value;
        const patientName = form.name.value;
        const phone = form.phone.value;
        const email = form.email.value;

        const booking = {
            appointmentDate: date,
            treatmentName: name,
            Patient: patientName,
            slot,
            phone,
            email
        }

        fetch('http://localhost:5000/bookings',{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(booking)
        })
        .then(res => res.json())
        .then(data=>{
            if(data.acknowledged){
                toast.success('succssfully submit appointment');
                refetch();
                setTreatment(null)
            }
            else{
                toast.error(data.message)
            }
        })
    }
    
    return (
        <>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">{name}</h3>
                    <form onSubmit={handleBooking} className='grid grid-cols-1 gap-3 mt-10'>
                        <input type="text" value={date} placeholder="Type here" disabled className="input bg-gray-200 font-semibold  input-md  w-full max-w-full" />
                        <select name='slot' className="select bg-gray-200 w-full">
                            {
                                slots.map((slot,i) => <option
                                    key={i} 
                                    value={slot}>{slot}</option>)
                            }
                        </select>
                        <input name='name' defaultValue={user?.displayName} disabled type="text" placeholder="Full Name" className="input input-bordered  input-md  w-full max-w-full" />
                        <input name='phone' type="text" placeholder="Phone Number" required className="input input-bordered  input-md  w-full max-w-full" />
                        <input name='email' defaultValue={user?.email} disabled type="email" placeholder="Email Address" className="input input-bordered  input-md  w-full max-w-full" />
                        <input className='btn btn-accent w-full' type="submit" value="submit" />
                    </form>
                </div>
            </div>
        </>
    );
};

export default BookingModal;