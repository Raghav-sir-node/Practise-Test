import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import "../styles/AdminUsers.css";

export default function AdminUsers() {
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [adminData, setAdminData] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        if (!user || user.role !== 'admin') {
            console.log('User in AdminUsers:', !user || user.role !== 'admin');
            navigate('/');
        }
    console.log('User in AdminUsers:', user);

        fetch('https://humble-space-adventure-5gxpvq5qv4vpcv4jv-5000.app.github.dev/api/products').then(response => response.json()).then(data => {
            console.log('Fetched admin data:', data);
            setAdminData(data);
            setLoading(false);
        });
    }, [user]);

    function UpdateProducts(product) {
        fetch(`https://humble-space-adventure-5gxpvq5qv4vpcv4jv-5000.app.github.dev/api/products/${product._id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${user.token}`
            },
            body: JSON.stringify({ name: product.name, description: product.description, price: product.price, stock: product.stock })
        }).then(response => response.json()).then(data => {
            console.log('Updated product:', data);
        });
    }
    return (
        <div className="admin-products">
            <header className="admin-users-products-header">
                <h1>All Products</h1>
                <p>Welcome, {user ? user.name : 'Admin'}!</p>
            </header>
            <div className="admin-users-table-wrapper">
                <table className="admin-users-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {!loading && adminData && adminData.map((product) => (
                            <tr key={product._id}>
                                <td data-label="ID">{product._id}</td>

                                <td data-label="Name">
                                    <input type="text" value={product.name} onChange={(e) => {
                                        setAdminData(prevData => {
                                            return prevData.map(p => {
                                                if (p._id === product._id) {
                                                    return { ...p, name: e.target.value }
                                                }
                                                return p;
                                            })
                                        })
                                    }} />
                                </td>

                                <td data-label="Description">
                                    <input type="text" value={product.description} onChange={(e) => {
                                        setAdminData(prevData => {
                                            return prevData.map(p => {
                                                if (p._id === product._id) {
                                                    return { ...p, description: e.target.value }
                                                }
                                                return p;
                                            })
                                        })
                                    }} /></td>
                                <td data-label="Price">
                                    <input type="text" value={product.price} onChange={(e) => {
                                        setAdminData(prevData => {
                                            return prevData.map(p => {
                                                if (p._id === product._id) {
                                                    return { ...p, price: e.target.value }
                                                }
                                                return p;
                                            })
                                        })
                                    }} />
                                </td>
                                <td data-label="Stock">
                                    <input type="number"
                                        value={product.stock < 0 ? 0 : product.stock}
                                        onChange={(e) => {
                                            setAdminData(prevData => {
                                                return prevData.map(p => {
                                                    if (p._id === product._id) {
                                                        return { ...p, stock: e.target.value }
                                                    }
                                                    return p;
                                                })
                                            })
                                        }}
                                    />
                                </td>
                                <td>
                                    <button className="Delete-Red" onClick={() => {
                                        fetch(`https://humble-space-adventure-5gxpvq5qv4vpcv4jv-5000.app.github.dev/api/products/${product._id}`, {
                                            method: "DELETE",
                                            headers: {
                                                "Authorization": `Bearer ${user.token}`
                                            }
                                        }).then(response => response.json()).then(data => {
                                            console.log('Deleted product:', data);
                                            setAdminData(prevData => prevData.filter(p => p._id !== product._id));
                                        })
                                    }} >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                        }
                    </tbody>
                </table>
                <div className="admin-users-save-button-wrapper">
                    <button className="admin-users-save-button" onClick={() => {
                        adminData.forEach(product => {
                            UpdateProducts(product);
                        })
                    }}>
                        Save Changes
                    </button>
                </div>
                <div>
                    <button className="admin-add-product" onClick={() => {
                        navigate('/addProduct');
                    }}>
                        Add New Product
                    </button>
                </div>
            </div>
        </div>
    )
}   