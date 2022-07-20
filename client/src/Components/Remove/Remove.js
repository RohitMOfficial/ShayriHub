import React from 'react'
import { isAuthenticated } from '../auth/Auth'

const Remove = ({clicked,_id}) => {
    const handleclick=()=>{
        let resp=fetch(`http://localhost:5000/api/remove/${isAuthenticated().user._id}/${_id}`,{
            method: 'DELETE',
        headers: {
            Accept: 'application/json',
            
            Authorization: `Bearer ${isAuthenticated().token}`
        },
        
        }).then(data=>{
            return data.json();
        })
        .catch(err=>{
            console.log(err);
        })
        let data=resp.then(d=>{
            console.log("inside remove component",d)
            if(d.msg.success===false){
                alert("Not Removed, try again");
            }
            else{
                console.log(d)
                alert("Shayri is removed",d);
                clicked();
            }
        })
    }
    
  return (
    <div>
        <button onClick={handleclick}>Remove</button>
    </div>
  )
}

export default Remove