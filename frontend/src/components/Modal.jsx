import React, { useEffect, useState } from 'react'

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


function ModalComponent({action, show, handleClose, todoId}) {
  
  const [header, setHeader] = useState('');
  const [title, setTitle] = useState('');
  
  useEffect(() => {
    if(action == "e") {
      
      setHeader("Edit")
    }
    else if(action == "d") setHeader("Delete");
  
  }, [action])






  return (
    <>
  
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{header}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="form-group my-2">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" name="title" id="" className='form-control'/>
          </div>
          <div className="form-group my-2">
            <label htmlFor="content" className="form-label">Content</label>
            <input type="text" name="content" className='form-control' id="" />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  
    </>
  );
}





export default ModalComponent