import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from '../../Context/AuthProvider';
import toast from 'react-hot-toast';

const Login = () => {
    const {userLogin} = useContext(AuthContext)
    const { register,formState: { errors }, handleSubmit} = useForm();

    const handleLogin = data =>{
        // console.log(data);
        userLogin(data.email, data.password)
        .then(result =>{
            const user = result.user;
            console.log(user)
            toast.success('Succussfully login')
        })
        .catch(err =>{
            toast.error(err.message);
        })
    }
    return (
        <div className='h-[600px] flex justify-center items-center'>
            <div className='w-96 p-7  shadow-xl rounded-xl'>
                <h2 className='text-xl text-center'>Login</h2>
                <form onSubmit={handleSubmit(handleLogin)}>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Email</span></label>
                        <input type="email"
                            {...register("email", {
                                required: "Email Address is required"
                            })}
                            className="input input-bordered w-full max-w-xs" />
                            {errors.email && <p className='text-red-600 mt-2' role="alert">{errors.email?.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Password</span></label>
                        <input type="password"
                            {...register("password", {
                                required: "Password is required",
                            })}
                            className="input input-bordered w-full max-w-xs" />
                        {errors.password && <p className='text-red-600 mt-2' role="alert">{errors.password?.message}</p>}
                        <label className="label"> <span className="label-text">Forget Password?</span></label> 
                    </div>
                    <input className='btn btn-accent w-full' value="Login" type="submit" />
                </form>
                <p>New to Doctors Portal <Link className='text-secondary' to="/signup">Create new Account</Link></p>
                <div className="divider">OR</div>
                <button className='btn btn-outline text-red-500 w-full'><FaGoogle className='inline mr-2 text-red-500'></FaGoogle>CONTINUE WITH GOOGLE</button>
            </div>
        </div>
    );
};

export default Login;