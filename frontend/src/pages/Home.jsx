import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import ModalComponent from "../components/Modal";
import axios from "axios";
function Home() {
  const [todoList, setTodoList] = useState([{}]);
  const { user } = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);
  const [typeModal, setTypeModal] = useState('');
  const [todoId, setTodoId] = useState('');


  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  useEffect(() => {
    axios
      .get("/get-todo", { id: user?.id })
      .then(({ data }) => {
        setTodoList(data);
      })
      .catch((error) => console.log(error));
  }, []);


  const ActionModal = (e) => {
    e.preventDefault()
    const id = e.target.id;
    const href = e.target.href;
    
    openModal();
    if (id == "edit"){
      setTypeModal('e')
      setTodoId(e.target.href)
      axios.get('/todo/' + todoId)
      .then(response => console.log(response))
      .catch(error => console.log(error))
    }
    else if (id == "delete"){
      setTypeModal('d')
      setTodoId(e.target.href)
      
    }
  };  

  

  return (
    <div className="container my-5">
      <ModalComponent show={showModal} handleClose={closeModal} action={typeModal} todoId={todoId}/>

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
                  onClick={ActionModal}
                  className="d-flex text-danger align-items-center text-decoration-none"
                >
                  Delete
                </a>
                <a
                  id="edit"
                  style={{ cursor: "pointer" }}
                  href={val._id}
                  onClick={ActionModal}
                  className="d-flex text-success align-items-center text-decoration-none"
                >
                  Edit
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Home;
