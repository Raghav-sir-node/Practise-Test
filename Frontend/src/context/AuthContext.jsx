import React, { createContext, useState } from 'react';
export const AuthContext = createContext();
export const CartContext = createContext();

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

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (item) => {
        setCartItems((prevItems) => [...prevItems, item]);
        localStorage.setItem('cartItems', JSON.stringify([...cartItems, item]));
    };

    const removeFromCart = (itemId) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
        localStorage.setItem('cartItems', JSON.stringify(cartItems.filter((item) => item.id !== itemId)));
    };

    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem('cartItems');
    };
    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};