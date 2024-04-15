import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {toast} from 'react-hot-toast'
import axios from 'axios';
function Register() {
  const [cred,setCred] = useState({
    username: '',
    password: '',
    verify_password: ''
  });
  
  const registerUser = (e) => {
      e.preventDefault();
      axios.post('/register',cred)
      .then(response => {
        if(response.data.error) toast.error(response.data.error);
        else if(response.data.success) toast.success(response.data.success);
      })
      .catch(error => console.log(error))
  }

  return (
    <form className='position-absolute top-50 start-50 translate-middle' onSubmit={registerUser}>
      <div className="form-group my-2">
        <label htmlFor="username" className="form-label">Username</label>
        <input type="text" name="username" className='form-control' id="" required onChange={e => setCred({...cred , username: e.target.value})}/>
      </div>
      <div className="form-group my-2">
        <label htmlFor="password" className="form-label">Password</label>
        <input type="password" name="password" className='form-control' id="" required onChange={e => setCred({...cred, password: e.target.value})}/>
      </div>
      <div className="form-group my-2">
        <label htmlFor="verify_password" className="form-label">Re-Enter Password</label>
        <input type="password" name="verify_password" className='form-control' id="" required onChange={e => setCred({...cred, verify_password: e.target.value})} />
      </div>
      <div className="form-group my-2">
        <button type="submit" className='btn btn-success'>Register</button>
        <p>Don't have an account ? <Link to='/login'>Login.</Link></p>
      </div>
    </form>
  )
}

export default Register