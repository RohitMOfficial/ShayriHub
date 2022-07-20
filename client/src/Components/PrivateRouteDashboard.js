import React from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { isAuthenticated } from './auth/Auth'


import Signin from './Signin/Signin'
const PrivateRouteDashboard = () => {
    
  return isAuthenticated()?<Outlet/>:<Navigate to='/signin'/>
}

export default PrivateRouteDashboard