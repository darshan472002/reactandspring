import React from 'react'
import { useState } from 'react'
import userContext from './userContext'

const UserProvider = ({ children }) => {
    
    const [user, setUser] = useState({
        name: "Darshan"
    });

    return (
        <userContext.Provider value={user}>
            {children}
        </userContext.Provider>
    )
}

export default UserProvider;