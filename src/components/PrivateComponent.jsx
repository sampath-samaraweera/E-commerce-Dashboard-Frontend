import React from 'react';
import { Navigate, Outlet} from 'react-router-dom'
import { useLocation } from 'react-router-dom';

const PrivateComponent= ()=>{
    const auth = localStorage.getItem('token');
    console.log("auth is",auth);
    const location = useLocation();
    
    return auth ?<Outlet />:<Navigate to="login" />
}

export default PrivateComponent