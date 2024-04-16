import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { UserContext } from "../../context/userContext";

function AddModal({ show, handleClose }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { user } = useContext(UserContext);

  const submitForm = (e) => {
    e.preventDefault()
      axios
      .post("/add-todo", { title, content, user_id: user?.id })
      .then(({ data }) => {

        if (data.error) toast.error(data.error);

        else if(data.success) {
          toast.success(data.success);
          setTimeout(() => {
            location.reload()
          }, 2000);
        };
      })
      .catch((error) => console.log(error));
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>ADD</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={submitForm} >
            <div className="form-group my-2">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                name="title"
                id=""
                className="form-control"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="form-group my-2">
              <label htmlFor="content" className="form-label">
                Content
              </label>
              <input
                type="text"
                name="content"
                className="form-control"
                onChange={(e) => setContent(e.target.value)}
                id=""
              />
            </div>
            <div className="d-flex gap-2 float-end">
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button
                variant="success"
                type="submit"
              >
                Add
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AddModal;
