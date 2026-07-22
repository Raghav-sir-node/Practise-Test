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

        setCartItems((prevItems) => {
            let qty = 0
            if (prevItems.length > 0) {

                for (let i = 0; i < prevItems.length; i++) {
                    if (prevItems[i]._id === item._id) {
                        console.log('MATCHED',prevItems[i]._id,' === ',item._id);

                        prevItems[i] = { ...prevItems[i], quantity: (prevItems[i].quantity || 0) + 1 }
                        return [...prevItems]
                    }
                }
                console.log('UNMATCHED');

                return [...prevItems, item];
            }

            else {
                return [item]
            }
        })
        localStorage.setItem('cartItems', JSON.stringify([...cartItems]));
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