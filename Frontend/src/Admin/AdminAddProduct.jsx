import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/AdminProducts.css';

export default function AdminAddProduct() {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [product, setProduct] = useState({});

 
    async function handleSubmit(e) {
        e.preventDefault();
        try {

            let response = await fetch('https://humble-space-adventure-5gxpvq5qv4vpcv4jv-5000.app.github.dev/api/products', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${user.token}`
                },
                body: JSON.stringify(product)
            })
            let data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }
            navigate('/adminProducts')
        }
        catch (error) {
            console.log('Error creating product:', error);
        }
    }
    return (
        <div className="admin-products">
            <header className="admin-users-products-header">
                <h1> Create Products</h1>
                <p>Welcome, {user ? user.name : 'Admin'}!</p>
            </header>
            <div >
                <form onSubmit={(e) => { handleSubmit(e) }}>
                    <input name='name' placeholder='Product Name' className="admin-input" onChange={(e) => setProduct({ ...product, name: e.target.value })} required />
                    <input name='description' placeholder='Product Description' className="admin-input" onChange={(e) => setProduct({ ...product, description: e.target.value })} required />
                    <input name='price' placeholder='Product Price' className="admin-input" onChange={(e) => setProduct({ ...product, price: e.target.value })} required />
                    <input name='image' placeholder='Product Image URL' className="admin-input" onChange={(e) => setProduct({ ...product, imageUrl: e.target.value })} required />
                    <input name='stock' placeholder='Product Stock' className="admin-input" onChange={(e) => setProduct({ ...product, stock: e.target.value })} required />
                    <input name='category' placeholder='Product Category' className="admin-input" onChange={(e) => setProduct({ ...product, category: e.target.value })} required />
                    <button type='submit'>Add Product</button>
                </form>
            </div>
        </div>
    )
}