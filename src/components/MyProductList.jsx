import React, { useState } from 'react';
import MyProduct from './MyProduct';
import { useNavigate } from 'react-router-dom';
import '../styles/ProductList.css';
import { BASE_URL } from '../config';
import {  CircularProgress } from '@mui/material';

const MyProductList = ({products, getMyProducts}) => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    

    const deleteProduct = async (id) => {
        setLoading(true);
        try {
            const response = await fetch(`${BASE_URL}/products/product/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`
                }
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            let result = await response.json();
            console.log("deleted");
            alert('Item deleted successfully')
            if (result) {
                getMyProducts();
            }
        } catch (error) {
            console.error('Failed to delete product:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateProduct = (item) => {
        navigate('/update/' + item._id);
    };


    return (
    <>
        
    {loading ?(
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
            <CircularProgress />
        </div>
    ):(
        
        <div className="product-list">
            {products.map((product) => (
                <MyProduct 
                    key={product._id} 
                    product={product}
                    deleteProduct={deleteProduct}
                    updateProduct={updateProduct}
                />
            ))}
        </div>
    )}
    </>
    );
};

export default MyProductList;
