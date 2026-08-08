import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/AdminOrder.css';

export default function AdminOrder() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const { user } = useContext(AuthContext);
    const navigate = useNavigate()

    function HandleStatus(e, orderId) {
        fetch(`https://humble-space-adventure-5gxpvq5qv4vpcv4jv-5000.app.github.dev/api/orders/${orderId}/status`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${user.token}`
            },
            body: JSON.stringify({ status: (e.target.value).toLowerCase() })
        }).then(response => response.json()).then(data => {
            console.log('Status updated:', data);
        }).catch(error => {
            console.error('Error updating status:', error);
        });

        setOrders(prevOrders => {
            const updatedOrders = [...prevOrders];
            for (let i = 0; i < prevOrders.length; i++) {
                if (updatedOrders[i]._id === orderId) {
                    updatedOrders[i].status = e.target.value;
                    break;
                }
            }
            return updatedOrders;
        })
    }

    useEffect(() => {
        if (!user || user.role !== 'admin') {
            navigate('/')
            return
        }
        fetch('https://humble-space-adventure-5gxpvq5qv4vpcv4jv-5000.app.github.dev/api/orders', {
            headers: {
                "Authorization": `Bearer ${user.token}`
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setOrders(data);
                setLoading(false);
            }).catch(error => {
                console.error('Error fetching orders:', error);
            }).finally(() => {
                setLoading(false);
            });
    }, [user]);

    return (
        <div className="admin-orders">
            <h1 className="admin-orders-title">All Orders</h1>
            <table className="admin-orders-table">
                <thead>
                    <tr >
                        <th>Order ID</th>
                        <th>User</th>
                        <th>Email</th>
                        <th>Products</th>
                        <th>Total Amount</th>
                        <th>Status</th>
                    </tr>
                </thead>

                {
                    loading ? [...Array(5)].map((_, index) => (
                        <tr key={index}>
                            <td><div className="skeleton skeleton-text"></div></td>
                            <td><div className="skeleton skeleton-text"></div></td>
                            <td><div className="skeleton skeleton-text"></div></td>

                            <td><div className="skeleton skeleton-text"></div></td>

                            <td><div className="skeleton skeleton-text"></div></td>
                            <td><div className="skeleton skeleton-status"></div></td>
                        </tr>
                    )) : (

                        <tbody>
                            {orders.map(order => (
                                <tr key={order._id}>
                                    <td data-label="Order ID">{order._id}</td>
                                    <td data-label="User">{order.user?.name || '-'}</td>
                                    <td data-label="Email">{order.user?.email || '-'}</td>
                                    <td data-label="Products">
                                        <div className="admin-product-list">
                                            {order.products.map(product => (
                                                <div className="product-item" key={product._id}>
                                                    {product._id?.name || 'Unknown'} - ₹{product._id?.price || '0'} x {product.quantity}
                                                </div>
                                            ))}
                                        </div>
                                    </td>
                                    <td data-label="Total Amount">₹{order.totalAmount}</td>
                                    <td data-label="Status">
                                        <select
                                            value={order.status}
                                            onChange={(e) => HandleStatus(e, order._id)}
                                            className={`status-select status ${String(order.status || '').toLowerCase()}`}
                                        >
                                            <option value="Pending" >Pending</option>
                                            <option value="picked-up" >Picked-Up</option>
                                            <option value="Delivered" >Delivered</option>
                                            <option value="Cancelled" >Cancelled</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    )}
            </table>
        </div >
    )

}