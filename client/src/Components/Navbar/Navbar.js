import React from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated, signout } from '../auth/Auth'
import UserTooltip from '../Tooltip/UserTooptip'
import './Navbar.css'

const Navbar = () => {
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light mainnav">
  <div class="container-fluid">
    <Link to='/' className=' logo-css'>SHAYRI-HUB</Link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
       
        <li class="nav-item">
          <Link className="all-nav-link" to='/shayri'>Shayri</Link>
        </li>
        <li class="nav-item">
          {isAuthenticated() && <Link className=" all-nav-link" to='/dashboard'>Dashboard</Link>}
        </li>
        
        
      </ul>
      <form class="d-flex">
        <div className='username'>{isAuthenticated()?<UserTooltip info={isAuthenticated().user}/>:<p>Guest </p>}</div>
        
        {isAuthenticated()?<button onClick={signout} class="btn btn-outline-danger">Log out</button>:<Link to='/signin' class="btn btn-outline-success">SignIn</Link>}
        {/* <button class="btn btn-outline-success" type="submit">Search</button> */}
      </form>
    </div>
  </div>
</nav>
  )
}

export default Navbar