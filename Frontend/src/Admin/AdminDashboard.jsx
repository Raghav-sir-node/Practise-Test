import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/AdminDashboard.css';

function AdminDashboard() {
    const [adminData, setAdminData] = useState(null);
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);


console.log('User role:', user.role);
    useEffect(() => {
        if (!user || user.role !== 'admin') {
            console.log('User in AdminDashboard:', !user || user.role !== 'admin');
            navigate('/');
        }
        fetch('https://humble-space-adventure-5gxpvq5qv4vpcv4jv-5000.app.github.dev/api/analytics', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log('Analytics data:', data);
                setAdminData(data);
            });
    }, [user]);
    return (
        <div className="admin-dashboard">
            <header className="dashboard-header">
                <h1>Admin Dashboard</h1>
                <p>Quick analytics for products, users, orders, and revenue.</p>
            </header>

            {adminData ? (
                <section className="dashboard-cards">
                    <article className="dashboard-card" onClick={() => navigate('/adminProducts')}>
                        <span className="card-label">Products</span>
                        <strong>{adminData.totalProducts}</strong>
                    </article>
                    <article className="dashboard-card" onClick={() => navigate('/adminUsers')}>
                        <span className="card-label">Users</span>
                        <strong>{adminData.totalUsers}</strong>
                    </article>
                    <article className="dashboard-card" onClick={() => navigate('/adminOrders')}>
                        <span className="card-label">Orders</span>
                        <strong>{adminData.totalOrders}</strong>
                    </article>
                    <article className="dashboard-card revenue-card">
                        <span className="card-label">Revenue</span>
                        <strong style={{ color: adminData.totalRevenue > 0 ? '#27c227' : 'white' }}>₹{adminData.totalRevenue}</strong>
                    </article>
                </section>
            ) : (
                <div className="loading-box">Loading dashboard data...</div>
            )}
        </div>
    );
}

export default AdminDashboard;