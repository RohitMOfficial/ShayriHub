import React from 'react'
import { Link } from 'react-router-dom'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { isAuthenticated } from '../auth/Auth'
import './Home.css'

const Home = () => {
  return (
    <div className='home-page-main'>
        <div className='home-page-child1'>
            <div className='home-page-data'>
                <p className='text-center home-page-title'><span>Best</span> <span>Shayri</span> <span>platform</span> </p>
                <p className='home-page-info text-center'>Showcase your shayri talent to world</p>
                <p className='home-page-moreinfo text-center '>Read shayri and search with different categories like love, sad, dhoka, bewafa etc. You can give like to the shayri and motivate the contributors</p>
            </div>
            <div className='home-page-link'>
                {isAuthenticated()?'':<Link to='/signin' className='btn btn-outline-danger'>SignIn</Link>}
                <Link to='/signin' className='btn btn-outline-info'>Start Exploring</Link>
                

            </div>
            
        </div>
        <div className='home-page-child2'>
            <img src="https://images.pexels.com/photos/235986/pexels-photo-235986.jpeg?auto=compress&cs=tinysrgb&w=600" alt="img" />
        </div>
    </div>
  )
}

export default Home