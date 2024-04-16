import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import ModalComponent from "../components/Modal";
import axios from "axios";
import * as Icon from 'react-bootstrap-icons'
import AddModal from "../components/AddModal";
function Home() {
  const [todoList, setTodoList] = useState([{}]);
  const { user } = useContext(UserContext);
  const [showEDModal, setShowEDModal] = useState(false);
  const [typeModal, setTypeModal] = useState('');
  const [todoInfo, setTodoInfo] = useState({});
  const [showAddModal, setShowAddModal] = useState(false);


  const openModal = () => setShowEDModal(true);
  const closeModal = () => setShowEDModal(false);

  const openAddModal = () => setShowAddModal(true);
  const closeAddModal = () => setShowAddModal(false);

  useEffect(() => {
    axios 
      .get("/get-todo?id=" + user?.id) 
      .then(({ data }) => {
        setTodoList(data);
      })
      .catch((error) => console.log(error));
  }, [user]);

  const ActionModal = (mode, item) => {

    openModal();
    if (mode == "edit"){
      setTypeModal('e')
      setTodoInfo(item)
      
    }
    else if (mode == "delete"){
      setTypeModal('d')
      setTodoInfo(item)
    } 
  };  
  
  const addModal = () => {
    openAddModal();
  }

  
  return (
    <div className="container my-5">
    
      <a className="text-success text-decoration-none" style={{fontSize: "20px"}} id="addTodoButton" role="button" onClick={() => openAddModal()}>
        <Icon.Plus></Icon.Plus>
        Add To-Do
      </a>
      <table className="table table-striped table-bordered table-hovered">
        <thead>
          <tr>
            <th>Title</th>
            <th>Content</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {todoList.map((val, index) => (
            <tr key={index}>
              <td>{val.title}</td>
              <td>{val.content}</td>
              <td className="d-flex gap-3">
                <a
                  style={{ cursor: "pointer" }}
                  id="delete"
                  onClick={()=>{
                    ActionModal("delete", val);
                  }}
                  className="d-flex text-danger align-items-center text-decoration-none"

                >
                  Delete
                </a>
                <a
                  id="edit"
                  style={{ cursor: "pointer" }}
                  onClick={()=>{
                    ActionModal("edit", val);
                  }}
                  className="d-flex text-success align-items-center text-decoration-none"
                >
                  Edit
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ModalComponent show={showEDModal} handleClose={closeModal} action={typeModal} todo={todoInfo}/>
      <AddModal show={showAddModal} handleClose={closeAddModal} />

    </div>
  );
}

export default Home;
