import React, { useEffect, useState } from 'react';
import './Card.css'


const Card = ({title,likes,body,email,_id,increaseLike,isLike}) => {
    const [username,setUsername]=useState('');
    const [isliked,setIsliked]=useState(false);
    const emailobj={"email":email}

    const getUser=()=>{
        let resp=fetch(`http://localhost:5000/api/byemail`,{
            method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(emailobj)
        }).then(data=>{
            return data.json();
        })
        .catch(err=>{
            console.log(err);
        })
        let user=resp.then(d=>{
            setUsername(d.msg.user.username)
        }).catch(err=>{
            console.log(err);
        })
    }
    const handleclick=()=>{
        console.log(_id)
        increaseLike(_id);
        setIsliked(!isliked)
    }
    useEffect(()=>{
        getUser();
    })
  return (
    <div className='maincard'>
        <div className='shayri-card-title'>
            <p>{title}</p>
        </div>
        <div className='shayri-card-body'>
           {body}
        </div>
        <div className='shayri-card-footer'>
            <p>By : {username}</p>
            <p><span className='like-css'>{likes}</span> likes</p>
            
           {isLike? <button onClick={handleclick} disabled={isliked} className='likebutton-css'>like</button>:null}
        </div>

    </div>
  )
}

export default Card