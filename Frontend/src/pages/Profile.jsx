import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import '../styles/Profile.css';
function Profile() {
    const { user } = useContext(AuthContext);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        async function fetchUserData() {
            if (user && user.token) {
                try {
                    let response = await fetch('https://humble-space-adventure-5gxpvq5qv4vpcv4jv-5000.app.github.dev/api/orders/getMyOrders', {
                        headers: {
                            'authorization': `Bearer ${user.token}`,
                        },
                    })
                    let data = await response.json();
                    console.log('Fetched user data:', data);
                    setUserData(data);
                }
                catch (error) {
                    console.log(error);
                }
            }
        }
        fetchUserData();
    }, [user]);

    return (
        <div className="profile-page">
            <header className="profile-header">
                <h1>Profile Page</h1>
            </header>
            <div className="profile-info">
                <p><strong>Name:</strong> {user?.name}</p>
                <p><strong>Email:</strong> {user?.email}</p>
            </div>
            {userData ? (
                <section className="profile-content">
                    <h2>Your Orders</h2>
                    <ul className="orders-list">
                        {
                            userData.map((order) => (
                                <li key={order._id} className="order-card">
                                    <div className="order-summary">
                                        <p><strong>Order ID:</strong> {order._id}</p>
                                        <p><strong>Shipping Address:</strong> {order.address}</p>
                                        <p>
                                            <strong>Status:</strong>{' '}
                                            <span className="status-badge">{order.status}</span>
                                        </p>
                                    </div>
                                    <div className="order-products">
                                        <p className="products-title">Products</p>
                                        <ul>
                                            {order.products.map((product, index) => (
                                                <li key={index}>
                                                    {product._id.name} <span>(Qty: {product.quantity}, ₹{product.price})</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <p className="order-total">Total Amount: ₹{order.totalAmount}</p>
                                </li>
                            ))
                        }
                    </ul>
                </section>
            ) : (
                <p className="loading-message">Loading your orders...</p>
            )}
        </div>
    );
}

export default Profile;     
