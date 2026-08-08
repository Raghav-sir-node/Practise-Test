import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import "../styles/AdminUsers.css";

export default function AdminDashboard() {
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);

    const [adminData, setAdminData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        console.log('User role:', user.role, "user", !user);
        if (!user || user.role !== 'admin') {
            console.log('User in AdminDashboard:', !user || user.role !== 'admin');
            navigate('/');
        }
        async function fetchAdminData() {
            try {
                const response = await fetch('https://humble-space-adventure-5gxpvq5qv4vpcv4jv-5000.app.github.dev/api/auth/getUser', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setAdminData(data);
                setLoading(false);
            }
            catch (error) {
                console.error('Error fetching admin data:', error);
            }
            finally {
                setLoading(false);
            }

        }
        fetchAdminData();
    }, [user]);
    return (
        <div className="admin-users">
            <header className="admin-users-header">
                <h1>All Users</h1>
                <p>Welcome, {user ? user.name : 'Admin'}!</p>
            </header>
            <div className="admin-users-table-wrapper">
                <table className="admin-users-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Mobile Number</th>
                            <th>Verified</th>
                        </tr>
                    </thead>
                    <tbody>
                       {!loading &&adminData && adminData.map((user) => (
                            <tr key={user._id}>
                                <td data-label="ID">{user._id}</td>
                                <td data-label="Name">{user.name}</td>
                                <td data-label="Email">{user.email}</td>
                                <td data-label="Role">{user.role}</td>
                                <td data-label="Mobile Number">{user.mobilenumber}</td>
                                <td data-label="Verified">{user.verified ? 'Yes' : 'No'}</td>
                            </tr>
                        ))
                       }
                    </tbody>
                </table>
            </div>
        </div>
    )
}   