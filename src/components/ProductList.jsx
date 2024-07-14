import React from 'react';
import Product from './Product';
import '../styles/ProductList.css';

const ProductList = ({products}) => {
  return (
    <div className="product-list">
      {products.map((product) => (
        <Product key={product._id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
