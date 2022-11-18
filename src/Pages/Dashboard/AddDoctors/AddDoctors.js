import React from 'react';
import { useForm } from 'react-hook-form';

const AddDoctors = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const handleAddDoctor = data => {
        console.log(data)
    }
    return (
        <div className='mt-16'>
            <div className='w-96 p-7  shadow-xl rounded-xl'>
                <h2 className='text-xl text-center'>Add Doctors</h2>
                <form onSubmit={handleSubmit(handleAddDoctor)} >
                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Name</span></label>
                        <input type="text"
                            {...register('name', { required: 'Name is required' })}
                            className="input input-bordered w-full max-w-xs" />
                        {errors.name && <p className='text-red-600 mt-2' role="alert">{errors.name?.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Email</span></label>
                        <input type="email"
                            {...register('email', { required: 'Email is required' })}
                            className="input input-bordered w-full max-w-xs" />
                        {errors.email && <p className='text-red-600 mt-2' role="alert">{errors.email?.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Speciality</span></label>
                        <select className="select select-bordered w-full max-w-xs">
                            <option disabled selected>Select a Speciality</option>
                            <option>Han Solo</option>
                            <option>Greedo</option>
                        </select>
                    </div>
                    <input className='btn btn-accent w-full mt-5 mb-2' value="Add Doctor" type="submit" />
                </form>
            </div>
        </div>
    );
};

export default AddDoctors;