import React from 'react'
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

function Freelanceprotected() {
    const role = useSelector((state) => state.Auth.role);
  
  return (
  
 
    role === 'freelancer' ? <Outlet/> : <Navigate to={'/login'}></Navigate>
  
  )
}

export default Freelanceprotected
