import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import '../styles/global.css';
const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://literate-space-engine-xrw6446qv9v92v9g9-5000.app.github.dev/api/products').then(response => response.json()).then(data => {
            setProducts(data.slice(0,5));
            setLoading(false);
        }).catch(error => {
            console.log('Error fetching products:', error);
            setLoading(true);
        });
    }, []);
console.log(loading)
    return (
        <div className="home">
            <h1>Welcome to our e-commerce platform! </h1>
            <p>Explore our latest products below:</p>
            {loading ? (
                <p>Loading products...</p>
            ) : (
                <div className="product-list">
                    {products.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Home;