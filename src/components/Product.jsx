import React from 'react';
import '../styles/Product.css';
import { useCustomContext } from '../context/CustomContext';

const Product = ({ product }) => {
  const { addToCart } = useCustomContext()
  
  return (
    <div className="product-item">
      <img src={product.imageUrl} alt={product.name} className="product-image" onError={(e) => console.log('Error loading image', e)}/>
      <h2 className="product-name">{product.company} {product.name}</h2>
      <p className="product-price">Rs. {product.price}</p>
      <button className="product-button" onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
};

export default Product;