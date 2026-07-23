import react, { useState, useEffect, useContext } from "react";
import { CartContext } from '../context/AuthContext';
import '../styles/cart.css';

function Cart() {
    const { cartItems, removeFromCart, addToCart } = useContext(CartContext);

    let totalPrice = 0;

    cartItems.forEach((item) => {
        totalPrice += item.price * item.quantity;
    });
    return (
        <div>
            {cartItems.length === 0 ? (
                <div className="Empty_cart">
                    <p>Your cart is empty.</p>
                </div>
            ) : (
                <div className="cart-container">
                    <h1>Your Cart</h1>
                    <ul className="cart-items">
                        {cartItems.map((item) => (
                            <>
                                <li key={item._id} className="cart-item">
                                    <div className="cart-item-content-left">
                                        <img src={item.imageUrl} alt={item.name} />
                                        <div className="cart-item-details">
                                            <h2>{item.name}</h2>
                                            <p>Price: ${item.price.toFixed(2)}</p>
                                        </div>

                                    </div>
                                    <div className="cart-item-content-right">
                                        <div>
                                            <p>Quantity: {item.quantity}</p>
                                            <button className="remove-button" onClick={() => removeFromCart(item._id)}>Remove</button>
                                            <button className="add-button" onClick={() => addToCart(item)}>Add More</button>

                                        </div>
                                        <div className="item-Subtotal">
                                            <p>SubTotal :</p>
                                            <p>{item.quantity * item.price.toFixed(2)}</p>
                                        </div>
                                    </div>
                                </li>
                            </>
                        ))}
                        <li className="cart-total">
                            <h2>Total Price: ${totalPrice.toFixed(2)}</h2>
                        </li>
                    </ul>

                </div>)
            }
        </div>
    )
}

export default Cart;