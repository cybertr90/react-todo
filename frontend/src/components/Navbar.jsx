import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../context/userContext'
import axios from 'axios';

function Navbar() {
  const { user } = useContext(UserContext);
const session = Boolean(user?.id);
  const logout = () => {
    axios.get('/logout')
    .then(response => location.reload())
    .catch(error => console.log(error))
  }
  
  return (  
    <>
      <nav className="navbar navbar-expand-lg bg-body-teriary navbar-light bg-light">
        <a href="#" className="navbar-brand">Project</a>
        <ul className="navbar-nav gap-2">
          {
            (session == false) ? (
              <>
                <li className="nav-item">
                  <Link to='/login' className='nav-link'>Login</Link>
                </li>

                <li className="nav-item">
                  <Link to='/register' className='nav-link'>Register</Link>

                </li>
              </>
            ):
            (
                <>
                  <div className="nav-item dropdown ms-auto">
                    <Link className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      <i className="bi bi-person"></i>
                      {user?.username}
                    </Link>
                    <ul className="dropdown-menu">
                      <li><Link className="dropdown-item" href="#" onClick={logout}>Logout</Link></li>
                      <li className='dropdown-item'></li>
                    </ul>
                  </div>
                
                </>
            )
          }
        </ul>

      </nav>
    </>
  )
}

export default Navbar