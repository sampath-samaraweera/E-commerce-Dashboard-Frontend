import React from 'react';
import '../styles/Product.css';
import { useCustomContext } from '../context/CustomContext';
import { useNavigate } from 'react-router-dom';

const Product = ({ product }) => {
  const { addToCart, setOpen, setSnackPack } = useCustomContext()
  const navigate = useNavigate();

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };    
  
  const handleClick = (message) => {
    console.log(message)
    setSnackPack((prev) => [...prev, { message, key: new Date().getTime() }]);
  };

  const handleAddToCart = (event, product) => {
    event.stopPropagation(); // Prevents the parent onClick from being triggered
    handleClick('Item added to cart');
    addToCart(product);
    setOpen(true)
  };

  return (
    <div className="product-item" onClick={() => handleProductClick(product._id)}>
      <img src={product.imageUrl} alt={product.name} className="product-image" onError={(e) => console.log('Error loading image', e)}/>
      <h2 className="product-name">{product.company} {product.name}</h2>
      <p className="product-price">Rs. {product.price}</p>
      <button className="product-button" onClick={(e) => handleAddToCart(e, product)}>Add to Cart</button>
    </div>
  );
};

export default Product;