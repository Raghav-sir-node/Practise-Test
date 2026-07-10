import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setuser] = useState(false);
    const [cartItems, setCartItems] = useState(0);

    const addToCart = () => {
        setCartItems(cartItems + 1);
    };

    const removeFromCart = () => {
        if (cartItems > 0) {
            setCartItems(cartItems - 1);
        }
    };

    const clearCart = () => {
        setCartItems(0);
    };  

    const login = (userdata) => {
        setuser(userdata)
        localStorage.setItem('userInfo', JSON.stringify(userdata))

    }
    const logout = () => {
        setuser(false)
        localStorage.removeItem('userInfo')
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, cartItems, addToCart, removeFromCart, clearCart }}>
            {children}
        </AuthContext.Provider>
    );
};