import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CartContext } from '../context/AuthContext';
import "../styles/ProductDetail.css";

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`https://literate-space-engine-xrw6446qv9v92v9g9-5000.app.github.dev/api/products/${id}`);
                const data = await response.json();

                setProduct(data);
            } catch (error) {
                console.error('Error fetching product:', error);
                setLoading(false);
            }
            finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    function handleAddToCart() {
        // Implement add to cart functionality here
        addToCart(product);
        console.log(`Product ${id} added to cart`);
    }

    return (
        <div className="product-detail">

            {loading ? (
                <p>Loading product details...</p>
            ) : product ? (
                <div>
                    <div className="product-detail-breadcrump">
                        <Link to="/">Home</Link>
                        <span> / </span>
                        <p style={{margin: 0}}>{product.category}</p>
                    </div>
                    <div className="product-detail-container">
                        <div className="product-detail-image-corousel">
                            <img src={product.imageUrl} alt={product.name} />
                        </div>
                        <div className="product-detail-content">
                            <h1>{product.name}</h1>
                            <p className="product-detail-description">{product.description}</p>
                            {
                                product.price && <p className="product-detail-price">Price: ${product.price.toFixed(2)}</p>

                            }
                            <div className="product-detail-button-container">
                                <button onClick={handleAddToCart}>Add to Cart</button>
                            </div>
                        </div>
                    </div>

                </div>
            ) : (
                <p>Product not found.</p>
            )}
        </div>
    );
}

export default ProductDetail;