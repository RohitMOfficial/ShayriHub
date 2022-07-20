import React, { useEffect, useState } from 'react'
import Card from '../Card/Card';
import './Shayri.css';

const Shayri = () => {
    const [shayri,setShayri]=useState([]);
    const [liked,setLiked]=useState(false);
    const [search,setSearch]=useState('');
    const [error,setError]=useState('');

    const handlechange=(e)=>{
        if(e.target.name==='search'){
            setSearch(e.target.value);
        }
    }

    const handlesubmit=(e)=>{
        e.preventDefault();
        
            searchByCategory();
        
    }

    const searchByCategory=()=>{
        let category=search.trim();
        let categoryObj={
            'category':category
        }
        if(category===''){
            setError('');
            getShayri();
        }
        else{
            let resp=fetch(`http://localhost:5000/api/search/category`,{
                method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(categoryObj)
            }).then(data=>{
                return data.json();
            })
            .catch(err=>{
                console.log(err);
            })
            let data=resp.then(d=>{
                if(d.msg.success===false){
                    setError(d.msg.error);
                }
                else{
                    if(d.msg.data.length===0){
                        setError("No user with this category");
                    }
                    else{
                        setError('')
                    }
                    setShayri(d.msg.data);
                    
                }
            })

        }
    }

    const showerror=()=>{
        console.log("hello this is showerror ",error)

        return <div style={{display:error?'':'none'}}>
            <h1>No shayri with this category</h1>
        </div>
    }

    const getShayri=()=>{
        let resp=fetch(`http://localhost:5000/api/notes`,{
            method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
        }).then(data=>{
            return data.json();
        })
        .catch(err=>{
            console.log(err);
        })
        let data=resp.then(d=>{
            setShayri(d.msg.data);
        }).catch(err=>{
            console.log(err);
        })
    }


    const increaseLike=(_id)=>{
        let resp=fetch(`http://localhost:5000/api/incLike/${_id}`,{
            method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
        }).then(data=>{
            return data.json();
        })
        .catch(err=>{
            console.log(err);
        })
        let data=resp.then(d=>{
            console.log(d);
        })
        setLiked(!liked)
    }

    useEffect(()=>{
        getShayri();
    },[liked]);

    

  return (
    <div className='allcard-main'>
        <div className='search-div'>
            <form onSubmit={handlesubmit}>
                <input type="text" name='search' id='search' onChange={handlechange} placeholder="Category" />
                <button>search</button>
            </form>
            
        </div>


        {showerror()}

        <div className='allcard'>
            
            {
                shayri.map(e=>{
                    return (
                        <div >
                            <Card title={e.title} likes={e.like} body={e.description} email={e.email} _id={e._id} increaseLike={increaseLike} isLike={true}/>
                        </div>
                    )
                })
            }
        </div>
        
        

    </div>
  )
}

export default Shayri