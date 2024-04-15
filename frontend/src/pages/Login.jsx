import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {toast} from 'react-hot-toast';
import { UserContext } from '../../context/userContext';


function Login() {
  const navigate = useNavigate();
  const {getCurrentUser} = useContext(UserContext);
  const [cred, setCred] = useState({
    username: '',
    password: ''
  });

  const loginUser = e => {
    e.preventDefault();
    
    axios.post('/login', cred)
    .then(response =>{
      console.log(response)
      if(response.data.success)
      {
        navigate('/');
        getCurrentUser();
      }
      else if(response.data.error) return toast.error(response.data.error);
    })
    .catch(error => console.log(error))
  }


  return (
    <form className='position-absolute top-50 start-50 translate-middle' onSubmit={loginUser}>
      <div className="form-group my-2">
        <label htmlFor="username" className="form-label">Username</label>
        <input type="text" name="username" className='form-control' id="" required onChange={e => setCred({...cred, username: e.target.value})}/>
      </div>
      <div className="form-group my-2">
        <label htmlFor="password" className="form-label">Password</label>
        <input type="password" name="password" className='form-control' id="" required onChange={e => setCred({ ...cred, password: e.target.value })} />
      </div>
      <div className="form-group my-2">
        <button type="submit" className='btn btn-success'>Login</button>
        <p>Don't have an account ? <Link to='/register'>Register.</Link></p>
      </div>
    </form>
  )
}

export default Login