import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';

function Clientprotected() {
    const role = useSelector((state) => state.Auth.role);
  
  return (
    role === 'client' ? <Outlet/> : <Navigate to={'/login'}></Navigate>
  )
}

export default Clientprotected
