import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaGoogle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';
import useToken from '../../Hooks/useToken';

const Signup = () => {
    const {createUser,updateUser} = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [createUserEmail, setCreateUserEmail] = useState('')
    const [token] = useToken(createUserEmail);
    const navigate = useNavigate();
    if(token){
        navigate('/');
    }
    const handleSignup = data => {
        console.log(data);
        createUser(data.email, data.password)
        .then(result =>{
            const user = result.user;
            console.log(user)
            toast.success('Successfully Signup')
            const userInfo = {
                displayName: data.name
            }
            updateUser(userInfo)
            .then(()=>{
                savedUser(data.name, data.email);
            })
            .catch(err => toast.error(err.message))
        })
        .catch(err =>{
            toast.error(err.message)
        })
    }

    const savedUser = (name, email) =>{
        const user = {name, email};
        fetch('http://localhost:5000/users',{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body: JSON.stringify(user) 
        })
        .then(res => res.json())
        .then(data =>{
           setCreateUserEmail(email)
        })
    }
    return (
        <div className='h-[600px] flex justify-center items-center'>
            <div className='w-96 p-7  shadow-xl rounded-xl'>
                <h2 className='text-xl text-center'>Signup</h2>
                <form onSubmit={handleSubmit(handleSignup)} >
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
                        <label className="label"> <span className="label-text">Password</span></label>
                        <input type="password"
                            {...register('password', {
                                required: 'Password must required',
                                minLength: { value: 6, message: 'Password must be 6 characters or longer'},
                                pattern: { value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/, message: 'Password must have uppercase, number and special characters' }
                            })}
                            className="input input-bordered w-full max-w-xs" />
                        {errors.password && <p className='text-red-600 mt-2' role="alert">{errors.password?.message}</p>}
                    </div>
                    <input className='btn btn-accent w-full mt-5 mb-2' value="Signup" type="submit" />
                </form>
                <p>Already Have an Account? <Link className='text-secondary' to="/login">Please Login</Link></p>
                <div className="divider">OR</div>
                <button className='btn btn-outline text-red-500 w-full'><FaGoogle className='inline mr-2 text-red-500'></FaGoogle>CONTINUE WITH GOOGLE</button>
            </div>
        </div>
    );
};

export default Signup;