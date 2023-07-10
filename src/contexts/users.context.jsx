import { createContext, useState, useEffect } from 'react';

import { onAuthStateChangedListener } from '../utils/firebsae/firebase.utils';

import { createUserDocimentFromAuth } from '../utils/firebsae/firebase.utils';

export const UserContext = createContext({
    currentUser: null,
    setcurrentUser: () => null,
})

export const UserProvider = ({ children }) => {
    const [currentUser, setcurrentUser] = useState(null);
    const value = { currentUser, setcurrentUser };

    useEffect(()=>{
        const unsubscribe =  onAuthStateChangedListener((user) => {
            if(user) {
                createUserDocimentFromAuth(user);
            }
            setcurrentUser(user);
        })
        return unsubscribe;
    }, [])

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}