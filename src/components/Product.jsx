import React from 'react';
import '../styles/Product.css';

const Product = ({ product }) => {
  return (
    <div className="product">
      <img src={product.image} alt={product.name} className="product-image" />
      <h2 className="product-name">{product.name}</h2>
      <p className="product-price">${product.price}</p>
      <button className="product-button">Add to Cart</button>
    </div>
  );
};

export default Product;