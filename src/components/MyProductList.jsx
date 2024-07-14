import React, { useState } from 'react';
import MyProduct from './MyProduct';
import { useNavigate } from 'react-router-dom';
import '../styles/ProductList.css';
import { BASE_URL } from '../config';

const MyProductList = ({products, getProducts}) => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    
    const deleteProduct = async (id) => {
        setLoading(true);
        try {
            let response = await fetch(`${BASE_URL}/products/product/${id}`, {
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
            if (result) {
                getProducts();
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
    <div className="product-list">
        {products.map((product) => (
            <MyProduct 
                key={product._id} 
                product={product}
                loading={loading}
                deleteProduct={deleteProduct}
                updateProduct={updateProduct}
            />
        ))}
    </div>
    );
};

export default MyProductList;
