import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCustomContext } from '../context/CustomContext';
import '../styles/ProductDetails.css';

const ProductDetails = () => {
    const { id } = useParams();
    const { products, addToCart } = useCustomContext();
    const product = products.find((item) => item._id === id);
    const [quantity, setQuantity] = useState(1);

    const navigate = useNavigate();

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) {
            addToCart(product);
        }
        alert("Added " + quantity + " "+ product.company +" "+product.name + ' devices' + ' to cart');
        navigate('/');
    };

    return (
        <div className="product-details">
            <div style={{ marginRight: '100px' }}>
                <img src={product.imageUrl} alt={product.name} className="product-image" />
            </div>
            <div className="product-info">
                <h2>{product.company} {product.name}</h2>
                <p style={{ textAlign: 'left' }}>{product.description}</p>
                <p style={{ fontSize: '20px' }}>Rs. {product.price}</p>
                <div className="quantity-control" style={{ gap: 10 }}>
                    <button onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}>-</button>
                    <span>{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)}>+</button>
                </div>
                <button className="product-button" onClick={handleAddToCart}>Add to Cart</button>
            </div>
        </div>
    );
};

export default ProductDetails;
