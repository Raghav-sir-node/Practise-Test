import react, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from '../context/AuthContext';
import '../styles/cart.css';

function Cart() {
    const { cartItems, clearCart, removeFromCart, addToCart } = useContext(CartContext);

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
                                            <button className="remove-button" onClick={() => removeFromCart(item._id)}>-</button>
                                            <p>{item.quantity}</p>
                                            <button className="add-button" onClick={() => addToCart(item)}>+</button>

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
                            <button className="clear-button" onClick={() => clearCart()}>Clear Cart</button>
                            <div>
                                <h2>Total Price: ${totalPrice.toFixed(2)}</h2>

                                <Link to="/checkout" className="checkout-button">Checkout</Link>
                            </div>
                        </li>

                    </ul>

                </div>)
            }
        </div>
    )
}

export default Cart;