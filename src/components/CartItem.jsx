import React from 'react';
import '../styles/CartItem.css';

const CartItem = ({key, product, onRemove}) => {

  return (
      <div className="item-container">
          <img src={product.imageUrl} alt={product.name} className="item-image" onError={(e) => console.log('Error loading image', e)}/>
          <div style={{display: 'flex', flexDirection: 'column', paddingTop: '10px'}}>
            <span className="item-name">{product.company} {product.name}</span>
            <span className="item-category">{product.category}</span>
          </div>
          <span className="item-price">Rs. {product.price}</span>
          <span className="item-qty">Qty - {product.quantity}</span>
          <div style={{display: 'flex', flexDirection: 'column', paddingTop: '10px', alignItems: 'end'}}>
            <button className="item-button" onClick={() => onRemove()}>Remove</button>
          </div>
      </div>
  );
};

export default CartItem;
