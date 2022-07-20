import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom' 
import { API } from '../../config';
import './Signup.css'

const Signup = () => {
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [info,setInfo]=useState('');
    const [error,setError] = useState('');
    const [success,setSuccess]=useState(false);

    const handlechange=(e)=>{
        if(success===true){
            setSuccess(false)
        }
        if(error!==false){
            setError(false);
        }
        if(e.target.name==='username'){
            setName(e.target.value);
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
        if(name==='' || email==='' || password===''){
             setError('all fields are required');
        }
        else{
            let user={
                username:name,
                email:email,
                password:password
            }
            console.log(user);
            
            setInfo(user);
        }
    }

    const signupcall=()=>{
        let resp=fetch(`http://localhost:5000/api/signup`,{
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
            console.log(d)
            if(d.msg.success===true){
                setSuccess(true);
            }
            else{
                setError(JSON.stringify(d.msg.error));
            }
        })

    }

    
    const showsuccess=()=>{
        return <div style={{display:success?'':'none'}}>
            <h4>Congrates Account is created. Now you can  <Link to='/signin'>  login </Link></h4>
        </div>
    }

    useEffect(()=>{
        if(info!==null && password.length>=6){
            signupcall();
            setEmail('');
            setName('');
            setPassword('');
        }
        

    },[info])

    const showerror=()=>{
       return <div style={{display: error?'':'none',color:'red'}}>
            This property already registered, please try some other {error}
        </div>
    }


  return (
    <>
        {showerror()}
        {showsuccess()}
        
        <div className='signup'>
            
        
            <div className='signup-card'>
            

                <div className='signup-card-1'>
                    <h1>SIGNUP</h1>

                </div>
                


                <div className='signup-card-2'>
                    <form onSubmit={handlesubmit}>
                        <div>
                            <label>User Name</label><br/>
                            <input type="text" name="username" value={name} id="username" onChange={handlechange}/><br />
                            <span style={{visibility:name===''?'':'hidden', color:"red"}}>This field required</span>
                        </div>
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
                            <button>Create Account</button>
                            <span>Already have acconnt <Link to='/signin'>Signin</Link></span>
                        </div>

                    </form>

                </div>

                

            </div>

        </div>
        
    </>
  )
}

export default Signup