import React from 'react';
import { useCustomContext } from '../context/CustomContext';
import CartItem from '../components/CartItem';

const Cart = () => {
    const { cart, clearCart } = useCustomContext();

    const subTotalCal = () => {
        let subTotal = 0;
        if (cart.length > 0) {
          cart.forEach((product) => {
            subTotal += product.price * product.quantity;
          });
        }
        return subTotal;
    };

    const totalCal = () => {
        return subTotalCal() + 350;
    };

    return (
        <div className="content">
            <div className="headerRow">
                <span style={{ fontSize: "25px" }}>Shopping Cart</span>
                
                {cart.length > 0 && 
                    <div style={{ margin: "10px" }}>
                        <button className="item-button" onClick={clearCart}>Clear Cart</button>
                    </div>
                }
            </div>
            {cart.length === 0 ? (
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <p style={{ fontSize: "23px", marginTop: '10px' }}>Your cart is empty</p>
                </div>
            ) : (
                <div style={{display: 'flex'}}>
                    <div style={{display: 'flex', flex: 2,}}>
                            <ul style={{display: 'flex', flexDirection: 'column'}} type="none">
                                {cart.map((product) => (
                                    <li key={product._id}>
                                        <CartItem product={product}/>
                                    </li>
                                ))}
                            </ul>           
                    </div>
                    <div style={{display: 'flex', flex: 1,flexDirection: 'column', marginRight: '30px'}}>
                        <div className="order-summary-container">
                            <span style={{ fontSize: "23px" }}>Order Summary</span>
                            <div className="order-summary-row">
                                <span>Subtotal</span>
                                <span>Rs. {subTotalCal()}</span>
                            </div>
                            <div className="order-summary-row">
                                <span>Shipping Fee</span>
                                <span>Rs. 350</span>
                            </div>
                            <div className="order-summary-row">
                                <span>Total</span>
                                <span>Rs. {totalCal()}</span>
                            </div>
                        </div>           
                    </div>
                </div>
            )}         
        </div>
    );
};

export default Cart;
