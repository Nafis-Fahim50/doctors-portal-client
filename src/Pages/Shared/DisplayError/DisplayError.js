import React, { useContext } from 'react';
import { useNavigate, useRouteError } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthProvider';

const DisplayError = () => {
    const {logOut} = useContext(AuthContext);
    const navigate = useNavigate();
    const error = useRouteError();

    const handleLogOut = () => {
        logOut()
            .then(() => {
                navigate('/login');
             })
            .catch(err => console.log(err));
    }
    return (
        <div className='container mx-auto mt-44'>
            <h1 className='text-3xl mb-16 text-red-600'>Ops! Something went wrong!</h1>
            <p className='text-red-400'>{error.statusText || error.message}</p>
            <h4 className="text-3xl mt-8"> Please <button onClick={handleLogOut} className='text-primary font-bold'>Sign out</button> and log back in</h4>
        </div>
    );
};

export default DisplayError;