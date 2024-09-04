import React from 'react';
import '../styles/Product.css';
import CustomButton from '../components/CustomButton';

const MyProduct = ({ product, deleteProduct, updateProduct }) => {
  
  console.log(product.imageUrl);

  return (
      <div className="product-item">
        <img src={product.imageUrl} alt={product.name} className="product-image" onError={(e) => console.log('Error loading image', e)}/>
        <h2 className="product-name">{product.company} {product.name}</h2>
        <p className="product-price">Rs. {product.price}</p>
        <div style={{ display: "flex", flexDirection: 'row', justifyContent:'center', gap: "10px" }}>
          
          <button className="product-button" onClick={() => updateProduct(product)}>Update</button>
          <button className="product-button-delete" onClick={() => deleteProduct(product._id)}>Delete</button>
        </div>
      </div>
  );
};

export default MyProduct;
