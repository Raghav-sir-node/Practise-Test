import react, { useState, useEffect, useContext } from "react";
import { CartContext } from '../context/AuthContext';
import '../styles/cart.css';

function Cart() {
    const { cartItems } = useContext(CartContext);


return (
    <div>
        {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
        ) : (
            <div className="cart-container">
                <h1>Your Cart</h1>
                <ul className="cart-items">
                    {cartItems.map((item) => (
                        <li key={item.id} className="cart-item">
                            <img src={item.imageUrl} alt={item.name} />
                            <div className="cart-item-details">
                                <h2>{item.name}</h2>
                                <p>Price: ${item.price.toFixed(2)}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>)
        }
    </div>
)
}

export default Cart;