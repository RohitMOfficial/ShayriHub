import React, { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { authenticate, isAuthenticated } from '../auth/Auth';

import './Signin.css'

const Signin = () => {

    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [info,setInfo]=useState('')
    const [error,setError]=useState('');
    const [success,setSuccess]=useState(false);
    let nav=useNavigate();
    const handlechange=(e)=>{
        if(success===true){
            setSuccess(false);
        }
        if(error!==false){
            setError(false);
        }
        
        if(e.target.name==='email'){
            setEmail(e.target.value);
        }
        if(e.target.name==='password'){
            setPassword(e.target.value);
        }
        console.log(e.target.value);
    }

    const handlesubmit=(e)=>{
        e.preventDefault();
        if(email==='' || password===''){
             setError('all fields are required');
        }
        else{
            let user={
                email:email,
                password:password
            }
            
            
            setInfo(user);
            
        }
    }

    const navigate=()=>{
        return <Navigate to='/home' />
    }
    const signin=()=>{
        let resp=fetch(`http://localhost:5000/api/signin`,{
            method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(info)
        }).then(data=>{
            return data.json();
        })
        .catch(err=>{
            console.log(err);
        })
        let data=resp.then(d=>{
            
            if(d.msg.success===false){
                setError(d.msg.error)
            }
            else{
                setSuccess(true);
                
                    authenticate(d.msg);
                    console.log(isAuthenticated());
                    nav('/home');
                
               
            }
        }).catch(err=>{
            console.log(err);
        })
    }
   


    const showerror=()=>{
        return <div style={{display:error?'':'none',color:"red"}}>
        {error}
        </div>
    }
    const showsuccess=()=>{
        return <div style={{display:success?'':'none',color:"green"}}>
            Success Login Navigating to Home page
        </div>
    }
    
    useEffect(()=>{
        if(info!=''){
            signin();
        }
        
    },[info])


  return (
    <>
    
    
    {showerror()}
    {showsuccess()}
    <div className='signup'>
        
        
    
        <div className='signup-card'>
        

            <div className='signup-card-1'>
                <h1>SIGNIN</h1>

            </div>
            


            <div className='signup-card-2'>
                <form onSubmit={handlesubmit}>
                    
                    <div>
                        <label> Email </label><br/>
                        <input type="email" name='email' value={email} id='email' onChange={handlechange}/><br />
                        <span style={{visibility:email===''?'':'hidden', color:"red"}}>This field required</span>
                    </div>
                    <div>
                        <label> Password </label><br />
                        <input type="password" name='password' value={password} id='password' onChange={handlechange}/><br />
                        <span style={{color:password.length>=6?"green":"red"}}>Atleast Lenght of 6 required</span>
                    </div>
                    <div className='form-button'>
                        <button>LogIn</button>
                        <span>No Account! Pls create one first <Link to='/signup'>SIGNUP</Link></span>
                    </div>

                </form>

            </div>

            

        </div>

    </div>
    
</>
  )
}

export default Signin