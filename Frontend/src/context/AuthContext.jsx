import React, { createContext, useState, useEffect } from 'react';
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

    const [cartItems, setCartItems] = useState(() => {
        const storedCartItems = localStorage.getItem('cartItems');
        return storedCartItems ? JSON.parse(storedCartItems) : [];
    })

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify([...cartItems]));
    }, [cartItems]);

    const addToCart = (item) => {

        setCartItems((prevItems) => {
            if (prevItems.length > 0) {

                for (let i = 0; i < prevItems.length; i++) {
                    if (prevItems[i]._id === item._id) {

                        prevItems[i] = { ...prevItems[i], quantity: (prevItems[i].quantity || 0) + 1 }
                        console.log('UPDATED ITEM', prevItems[i].quantity);
                        return [...prevItems]
                    }
                }
            }

            return [...prevItems, { ...item, quantity: 1 }];
        })
    };

    const removeFromCart = (itemId) => {
        console.log("removeFromCart called", itemId);
        setCartItems((prevItems) => {

            let index = prevItems.findIndex((item) => item._id === itemId) 
            if(index === -1) {
                console.log("Item not found in cart");
                alert("Item not found in cart");
                return prevItems; // Item not found, return previous state
            }

            prevItems[index].quantity>1? prevItems[index].quantity--: prevItems.splice(index, 1)
            return [...prevItems]
            })
        //localStorage.setItem('cartItems', JSON.stringify(cartItems.filter((item) => item.id !== itemId)));
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