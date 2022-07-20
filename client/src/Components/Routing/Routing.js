import React from 'react'
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom'
import Home from '../Home/Home'
import Navbar from '../Navbar/Navbar'
import Signup from '../Signup/Signup'
import Signin from '../Signin/Signin'
import Shayri from '../Shayri/Shayri'
import ProtectedRoute from '../ProtectedRoute'
import Dashboard from '../Dashboard/Dashboard'
import PrivateRouteDashboard from '../PrivateRouteDashboard'
import { isAuthenticated } from '../auth/Auth'

const Routing = () => {
  return (
    <Router>
        <Navbar/>
        <Routes>
        
            <Route path='/' element={<Home/>}/>
            <Route element={<ProtectedRoute/>}>
              <Route path='/signup' element={<Signup/>} />
              <Route path='/signin' element={<Signin/>} />
            </Route>
          
           
              <Route path='/dashboard' element={<Dashboard/>}/>
            
           
            
           
            <Route path='/home' element={<Home/>}/>
            <Route path='/shayri' element={<Shayri/>} />
        </Routes>

    </Router>
  )
}

export default Routing