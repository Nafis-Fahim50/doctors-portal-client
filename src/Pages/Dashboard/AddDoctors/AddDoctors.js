import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import Loading from '../../Shared/Loading/Loading';

const AddDoctors = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const imageHostingKey = process.env.REACT_APP_imagebbKey;
   
    const { data: specialites = [], isLoading } = useQuery({
        queryKey: ['speciality'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/appointmentSpecialty`)
            const data = await res.json()
            return data
        }
    })
    const handleAddDoctor = data => {
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?expiration=600&key=${imageHostingKey}`
        fetch(url,{
            method:'POST',
            body: formData
        })
        .then(res => res.json())
        .then(imageData =>{
           if(imageData.success){
                console.log(imageData.data.url)
           }
        })
    }

    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div className='mt-12'>
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
                        <label className="label"> <span className="label-text">Specialty</span></label>
                        <select
                            {...register('specialty')}
                            className="select input-bordered w-full max-w-xs">
                            {
                                specialites.map(specialty => <option
                                    key={specialty._id}
                                    value={specialty.name}
                                >{specialty.name}</option>)
                            }
                        </select>
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Photo</span></label>
                        <input type="file"
                            {...register('image', { required: 'Photo is required' })}
                            className="input  w-full max-w-xs" />
                        {errors.img && <p className='text-red-600 mt-2' role="alert">{errors.img?.message}</p>}
                    </div>
                    <input className='btn btn-accent w-full mt-5 mb-2' value="Add Doctor" type="submit" />
                </form>
            </div>
        </div>
    );
};

export default AddDoctors;