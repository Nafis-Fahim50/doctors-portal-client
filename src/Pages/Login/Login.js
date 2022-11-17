import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from '../../Context/AuthProvider';
import toast from 'react-hot-toast';
import { GoogleAuthProvider } from 'firebase/auth';
import useToken from '../../Hooks/useToken';

const Login = () => {
    const {userLogin, providerLogin, resetPassword} = useContext(AuthContext)
    const { register,formState: { errors }, handleSubmit} = useForm();
    const [userEmail, setUserEmail] = useState('')
    const [loginUserEmail, setLoginUserEmail] = useState('')
    const [token] = useToken(loginUserEmail);
    const location = useLocation();
    const navigate = useNavigate();


    const from = location.state?.from?.pathname || '/';

    if(token){
        navigate(from, { replace: true });
    }

    
    const googleProvider = new GoogleAuthProvider();

    const handleGoogleLogin = () =>{
        providerLogin(googleProvider)
        .then(result =>{
            const user = result.user;
            console.log(user);
            toast.success('Succssfully login')
            navigate(from, {replace:true})
        })
    }
    const handleLogin = data =>{
        // console.log(data);
        userLogin(data.email, data.password)
        .then(result =>{
            const user = result.user;
            console.log(user);
            setLoginUserEmail(data.email)
            toast.success('Succussfully login')
        })
        .catch(err =>{
            toast.error(err.message);
        })
    }

    const hanleBlurEmail = event =>{
        const email = event.target.value;
        setUserEmail(email);
    }

    const handlePasswordReset = () =>{
        if(!userEmail){
            toast.error('Please Enter your Email')
            return
        }
        resetPassword(userEmail)
        .then(()=>{
            toast.success('Send reset verificatio code')
        })
        .catch(err=>{
            toast.error(err.message)
        })
    }

    return (
        <div className='h-[600px] flex justify-center items-center'>
            <div className='w-96 p-7  shadow-xl rounded-xl'>
                <h2 className='text-xl text-center'>Login</h2>
                <form onSubmit={handleSubmit(handleLogin)}>
                    <div onBlur={hanleBlurEmail} className="form-control w-full max-w-xs">
                        <label  className="label"> <span className="label-text">Email</span></label>
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
                        <p className='my-2'>Forget Password? <button onClick={handlePasswordReset} type='button' className='btn-link'>Reset Password</button></p>
                    </div>
                    <input className='btn btn-accent w-full' value="Login" type="submit" />
                </form>
                <p>New to Doctors Portal <Link className='text-secondary' to="/signup">Create new Account</Link></p>
                <div className="divider">OR</div>
                <button onClick={handleGoogleLogin} className='btn btn-outline text-red-500 w-full'><FaGoogle className='inline mr-2 text-red-500'></FaGoogle>CONTINUE WITH GOOGLE</button>
            </div>
        </div>
    );
};

export default Login;