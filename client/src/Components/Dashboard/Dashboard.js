import React, { useEffect, useState } from 'react'
import { isAuthenticated } from '../auth/Auth';
import { useNavigate } from 'react-router-dom';
import Card from '../Card/Card';
import Edit from '../Model/Edit';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Create from '../Create/Create';
import Remove from '../Remove/Remove';
import './Dashboard.css'

const Dashboard = () => {
    const [userShayri,setUserShayri]=useState([]);
    const [buttonclick,setButtonclick]=useState(false);
    
    const nav=useNavigate();






    const getShayri=()=>{
        let resp=fetch(`http://localhost:5000/api/userNote/${isAuthenticated().user._id}`,{
            method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${isAuthenticated().token}`
        }
        }).then(data=>{
            return data.json();
        })
        .catch(err=>{
            console.log(err);
        })
        let data=resp.then(d=>{
           if(d.msg.success===false){
             nav('/signin')
           }
           else{
                setUserShayri(d.msg.data)
           }
        }).catch(err=>{
            console.log(err);
        })
    }

    const isclicked=()=>{
        console.log("button clicked invoked")
        setButtonclick(!buttonclick);
    }
    useEffect(()=>{
        if(isAuthenticated()){
            getShayri();
            console.log('i am here')
        }
        else{
            nav('/signin')
        }
        
    },[buttonclick])


  return (
    <div className='allcard-main'>
        
        <div>
            
            <Create clicked={isclicked} /> 
        </div>

        <div className='allcard'>
            {
                userShayri.map(e=>{
                    return (
                        <div >
                            
                            <Card title={e.title} likes={e.like} body={e.description} email={e.email} _id={e._id} isLike={false} />
                            <div className='e-r-buttons'>
                            <Edit title={e.title} body={e.description} category={e.category} _id={e._id} clicked={isclicked} /> <Remove _id={e._id} clicked={isclicked}/>
                            </div>
                            
                        </div>




                    )
                })
            }
        </div>
        
        

    </div>
  )
}

export default Dashboard