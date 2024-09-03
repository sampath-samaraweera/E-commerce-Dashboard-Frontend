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
          <CustomButton size="small" color="green" onClick={() => updateProduct(product)}>Update</CustomButton>
          <CustomButton size="small" color="red" onClick={() => deleteProduct(product._id)}>Delete</CustomButton>
        </div>
      </div>
  );
};

export default MyProduct;
