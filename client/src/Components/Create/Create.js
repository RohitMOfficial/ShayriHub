import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React
, { useState }

from 'react';
import '../Model/Edit.css'
import { isAuthenticated } from '../auth/Auth';

function MyVerticallyCenteredModal(props) {
    const [title,setTitle]=useState('');
    const [body,setBody]=useState('');
    const [category,setCategory]=useState('');
    const [info,setInfo]=useState({});
    const handlechange=(e)=>{
        if(e.target.name==='title'){
            setTitle(e.target.value);
            console.log(title);
        }
        if(e.target.name==='body'){
            setBody(e.target.value);
        }
        if(e.target.name==='category'){
            setCategory(e.target.value);
        }
        
    }

    const savechanges=(obj)=>{
        console.log("log inside the savechanges function",obj)
        let resp=fetch(`http://localhost:5000/api/create/${isAuthenticated().user._id}`,{
            method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${isAuthenticated().token}`
        },
        body:JSON.stringify(info)
        }).then(data=>{
            return data.json();
        })
        .catch(err=>{
            console.log(err);
        })
        let data=resp.then(d=>{
            if(d.msg.success===false){
                alert("Not created due to some error, Try again");
            }
            else{
                console.log(d)
                alert("New Shayri created",d);
                props.clicked();
            }
        })
    }

    const handlesave=()=>{
        if(title===''|| body==='' || category===''){
            alert("All fields are required");
        }
        else{
            let obj={
                "title":title,
                "description":body,
                "category":category
            }
            setInfo(obj);
            savechanges();
            

        }
    }
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          New Creation 
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Title: <textarea name="title" id="title" cols="10" rows="1" value={title}  required onChange={handlechange}></textarea>
        Description:<textarea name="body" id="body" cols="10" rows="1" value={body}  required onChange={handlechange}></textarea>
        Category:<textarea name="category" id="category" cols="10" rows="1" value={category}  required onChange={handlechange}></textarea>
      </Modal.Body>
      <Modal.Footer>
      
        <Button onClick={props.onHide}>Close</Button>
        <Button variant="primary" onClick={handlesave}>
            Save Changes
          </Button>
      </Modal.Footer>
    </Modal>
  );
}

function Create({clicked}) {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        Create New +
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        clicked={clicked}
      />
    </>
  );
}

export default Create