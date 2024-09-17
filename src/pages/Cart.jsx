import React from 'react';
import { useCustomContext } from '../context/CustomContext';
import CartItem from '../components/CartItem';
import '../styles/Cart.css'
import {loadStripe} from '@stripe/stripe-js';
import { BASE_URL } from '../config';

const Cart = () => {
    const { cart, clearCart, updateCartItemQuantity } = useCustomContext();

    const subTotalCal = () => {
        return cart.reduce((total, product) => total + product.price * product.quantity, 0);
    };

    const totalCal = () => {
        return subTotalCal() + 350;
    };

    const handleRemoveItem = (product) => {
        if (product.quantity > 1) {
            updateCartItemQuantity(product._id, product.quantity - 1);
        } else {
            updateCartItemQuantity(product._id, 0); // Removes the item entirely
        }
    };
    
    const makePayment = async ()  => {
        console.log('press checkout');
        console.log(cart);
        const stripe = await loadStripe('pk_test_51Q07OvEQopSzV9Z8700G81lhGZzTuUcYh9EIZzpOlUZPl3T5G4hNtTcyaoSV2n6vV9Puidty8UG6Nd2CCoN2aew300fbAZygyj'); 
        
        const response = await fetch(`${BASE_URL}/products/checkout`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cart)
        })

        const session = await response.json();

        const result = stripe.redirectToCheckout({
            sessionId: session.id
        });

        if (result.error){
            console.log(result.error);
        }
    }

    return (
        <div className="cart-content">
            <div className="cart-header-row">
                <span className="cart-title">Shopping Cart</span>
                {cart.length > 0 && 
                    <button className="clear-cart-button" onClick={clearCart}>Clear Cart</button>
                }
            </div>
            {cart.length === 0 ? (
                <div className="empty-cart">
                    <p>Your cart is empty</p>
                </div>
            ) : (
                <div className="cart-body">
                    <ul className="cart-items-list">
                        {cart.map((product) => (
                            <CartItem 
                                key={product._id} 
                                product={product} 
                                onRemove={() => handleRemoveItem(product)} 
                            />
                        ))}
                    </ul>           
                    <div className="order-summary">
                        <div className="order-summary-container">
                            <span className="order-summary-title">Order Summary</span>
                            <div className="order-summary-row">
                                <span>Subtotal</span>
                                <span>Rs. {subTotalCal()}</span>
                            </div>
                            <div className="order-summary-row">
                                <span>Shipping Fee</span>
                                <span>Rs. 350</span>
                            </div>
                            <div className="order-summary-row order-total">
                                <span>Total</span>
                                <span>Rs. {totalCal()}</span>
                            </div>
                            <button className="product-button" onClick={makePayment}>Checkout</button>
                        </div>           
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
