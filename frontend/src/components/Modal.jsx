import React, { useContext, useEffect, useState } from 'react'

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { UserContext } from '../../context/userContext';
import {toast} from 'react-hot-toast'


function ModalComponent({action, show, handleClose, todo}) {
  
  const [current, setCurrent] = useState('');

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [defaultValue, getDefaultValue] = useState('');

  
  useEffect(() => {
    
    setCurrent(todo)
    
  }, [todo])
  
  const deleteTodo = () => {
    axios.delete("/delete/"+ todo._id)
    .then(() => location.reload())
    .catch(error => console.log(error))
    
  }
  console.log(defaultValue)
  const submitForm = (e) => {
    e.preventDefault()
    if(!title || !content) return toast.error("No changes made");
    axios.post("/change-todo", {title, content, id: todo._id  })
    .then(({data}) => {
      toast.success(data.success)
      setTimeout(() => {
        location.reload()
      }, 2000);
    })
    .catch(error => console.log(error))

    

  }
    return (
    <>
  
    {
      action == "e" ? (
        <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>EDIT</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={submitForm}>
          <div className="form-group my-2">
            <label htmlFor="title" className="form-label">Title</label>
            <input onChange={e => setTitle(e.target.value)} type="text" name="title" className='form-control' defaultValue={current.title}/>
          </div>
          <div className="form-group my-2">
            <label htmlFor="content" className="form-label">Content</label>
            <input onChange={e => setContent(e.target.value)} type="text" name="content" className='form-control' defaultValue={current.content}/>
          </div>
         <div className="d-flex gap-2 float-end">
         <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" type="submit">
          Save Changes
        </Button>
         </div>
        </form>
      </Modal.Body>
      
    </Modal>
      )
      :
      (
        <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>DELETE</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you Sure ?
      </Modal.Body>
      <Modal.Footer>
        <a className='btn btn-danger' role='button' onClick={deleteTodo}>
          Delete
        </a>
        
      </Modal.Footer>
    </Modal>
      )
    }
  
    </>
  );
}





export default ModalComponent