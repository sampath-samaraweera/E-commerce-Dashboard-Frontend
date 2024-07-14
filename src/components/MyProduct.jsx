import React from 'react';
import '../styles/Product.css';
import CustomButton from '../components/CustomButton';

const MyProduct = ({ product, deleteProduct, updateProduct }) => {

  const extractGoogleDriveFileID = (url) => {
    const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    return match ? match[1] : null;
  };

  console.log(product);

  const fileID = extractGoogleDriveFileID(product.imageUrl);
  const directImageUrl = `https://drive.google.com/uc?export=view&id=${fileID}`;
  console.log(directImageUrl);

  return (
    <div className="product">
      <img src='https://drive.google.com/uc?id=1cSYJ6nTGjUGWOD8X_IJlzD5l1tYho2rH' alt={product.name} className="product-image" onError={(e) => console.log('Error loading image', e)}/>
      <h2 className="product-name">{product.name}</h2>
      <p className="product-price">${product.price}</p>
      <div style={{ display: "flex", flexDirection: 'row', gap: "10px" }}>
        <CustomButton size="small" color="green" onClick={() => updateProduct(product)}>Update</CustomButton>
        {/* <CustomButton size="small" color="red" onClick={() => deleteProduct(product._id)}>Delete</CustomButton> */}
      </div>
    </div>
  );
};

export default MyProduct;
