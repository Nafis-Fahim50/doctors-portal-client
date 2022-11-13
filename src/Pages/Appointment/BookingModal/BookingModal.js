import { format } from 'date-fns';
import React from 'react';
import toast from 'react-hot-toast';

const BookingModal = ({ treatment, selectedDate, setTreatment }) => {
    const { name, slots } = treatment;
    const date = format(selectedDate, 'PP')
    
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

        console.log(booking);
        toast.success('succssfully submit appointment');
        form.reset();
        setTreatment(null)
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
                        <input name='name' type="text" placeholder="Full Name" className="input input-bordered  input-md  w-full max-w-full" />
                        <input name='phone' type="text" placeholder="Phone Number" required className="input input-bordered  input-md  w-full max-w-full" />
                        <input name='email' type="email" placeholder="Email Address" className="input input-bordered  input-md  w-full max-w-full" />
                        <input className='btn btn-accent w-full' type="submit" value="submit" />
                    </form>
                </div>
            </div>
        </>
    );
};

export default BookingModal;