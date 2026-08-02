import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/AdminOrder.css';

export default function AdminOrder() {
    const [orders, setOrders] = useState([]);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate()

    useEffect(() => {
        if (!user || user.role !== 'admin') {
            navigate('/')
        }
        fetch('https://humble-space-adventure-5gxpvq5qv4vpcv4jv-5000.app.github.dev/api/orders')
            .then(response => response.json())
            .then(data => {
                console.log('Fetched orders data:', data);
            });
    }, [user]);

    return (
        <h1>Admin Orders</h1>
    )

}