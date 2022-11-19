import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';
import Loading from '../../Shared/Loading/Loading';

const ManageDoctors = () => {
    const [deleteDoctor, setDeleteDoctor] = useState(null);

    const { data: doctors, isLoading, refetch } = useQuery({
        queryKey: ['doctors'],
        queryFn: async () => {
            try {
                const res = await fetch('http://localhost:5000/doctors', {
                    headers: {
                        authorization: `bearer ${localStorage.getItem('accessToken')}`
                    }
                })
                const data = await res.json()
                return data;
            }
            catch (error) {
                toast.error(error.message)
            }
        }
    })

    
    const closeModal = () =>{
        setDeleteDoctor(null);
    }

    const handleDeleteDoctor = doctor =>{
        fetch(`http://localhost:5000/doctors/${doctor._id}`,{
            method:'DELETE',
            headers:{
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(res => res.json())
        .then(data =>{
            if(data.deletedCount > 0){
                refetch();
                toast.success(`Successfully deleted Dr. ${doctor.name}`)
            }
            
        })
    }

    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div>
            <h1 className='my-5 text-2xl font-bold'>Manage Doctors: {doctors?.length}</h1>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Photo</th>
                            <th>Name</th>
                            <th>Speciality</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            doctors.map((doctor, i) => <tr key={doctor._id} className="hover">
                                <th>{i + 1}</th>
                                <td><div className="avatar">
                                    <div className="w-12 rounded-full">
                                        <img src={doctor.image} alt='doctor' />
                                    </div>
                                </div></td>
                                <td>{doctor.name}</td>
                                <td>{doctor.specialty}</td>
                                <td>{doctor.email}</td>
                                <td>
                                    <label onClick={()=>setDeleteDoctor(doctor)} htmlFor="confirmation-modal" className="btn btn-sm text-white btn-error">Delete</label>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
            {
                deleteDoctor && <ConfirmationModal
                title={`Are you sure want to delete?`}
                message={`If you delete ${deleteDoctor?.name}, it can't be undone.`}
                closeModal={closeModal}
                modalData={deleteDoctor}
                successAction={handleDeleteDoctor}
                succesButtonName='Delete'></ConfirmationModal>
            }
        </div>
    );
};

export default ManageDoctors;