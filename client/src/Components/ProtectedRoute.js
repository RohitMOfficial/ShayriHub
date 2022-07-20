import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { isAuthenticated } from './auth/Auth'
import Home from './Home/Home'
import Signin from './Signin/Signin'
const ProtectedRoute = () => {
  return isAuthenticated()?<Navigate to='/home'/>:<Outlet/>
}

export default ProtectedRoute