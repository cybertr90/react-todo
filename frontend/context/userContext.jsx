import { createContext, useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom'
import axios from "axios";

const UserContext = createContext({});

const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();


    async function getCurrentUser(){
        axios.get('/get-user')
        .then(({data}) => {
            if(!data) navigate('/login');
            else setUser(data);
        })
    }

    useEffect(() => {
         getCurrentUser();
        
    }, [])

    const userData = {
        user,
        setUser
    }

    return(
        <UserContext.Provider value={{user,setUser,getCurrentUser}}>
            {children}
        </UserContext.Provider>
    )

}
export {
    UserContextProvider,
    UserContext
}