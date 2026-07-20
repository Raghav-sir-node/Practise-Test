import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext} from '../context/AuthContext';

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

    function handleAddToCart(item) {
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
                    <h1>{product.name}</h1>
                    <p>{product.description}</p>
                    <p>Price: ${product.price.toFixed(2)}</p>
                    <div>
                        <button onClick={handleAddToCart}>Add 2 Cart</button>
                    </div>
                </div>
            ) : (
                <p>Product not found.</p>
            )}
        </div>
    );
}

export default ProductDetail;