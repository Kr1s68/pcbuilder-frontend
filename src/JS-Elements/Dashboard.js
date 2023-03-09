import { updateCurrentUser } from 'firebase/auth';
import React, { useState } from 'react';
import { useAuth } from './Contexts/AuthContexts'
import { Link, useNavigate } from 'react-router-dom';



function Dashboard(props) {


    const [error, setError] = useState()
    const { currentUser, logout } = useAuth()
    const history =  useNavigate()

    async function handleLogout(){
        
        setError('')

        try{

            await logout()
            history('/login')

        }catch{

            setError('Failed to log out')

        }

    }

    return (
        <div>

                <div style={{width: "500px", height: "500px", backgroundColor:"white"}}> 

                    <strong>Email: </strong>{currentUser.email}

                    <button onClick={handleLogout}>Log Out</button>
                
                </div>

            
        </div>
    );
}

export default Dashboard;