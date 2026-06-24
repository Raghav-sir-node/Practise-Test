import React, { createContext, useState } from 'react';


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setuser] = useState(false);

    const login = (userdata) => {
        setuser(userdata)
        localStorage.setItem('userInfo', JSON.stringify(userdata))

    }
    const logout = () => {
        setuser(false)
        localStorage.removeItem('userInfo')
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};