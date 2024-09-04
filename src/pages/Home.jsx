import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {  CircularProgress } from '@mui/material';
import ProductList from '../components/ProductList';
import { BASE_URL } from '../config';
import ImageSlider from '../components/ImageSlider';
import { useCustomContext } from '../context/CustomContext';

const Home = () => {
    const {products, setProducts} = useCustomContext()
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('token');
        console.log('token is ', auth);
        console.log('ex is ', isTokenExpired(auth));
        getProducts()
    }, []);
    

    const isTokenExpired = (token) => {
        if (!token) return true;
    
        const payload = JSON.parse(atob(token.split('.')[1]));
        const expiry = payload.exp;
        const now = Math.floor(Date.now() / 1000); // Current time in seconds
    
        return now >= expiry;
    };

    const getProducts = async () => {
        setLoading(true);
        console.log('fething products')
        try {
            const response = await fetch(`${BASE_URL}/products/getAll`, {
                headers: {
                    'Content-Type': 'application/json',
                    // "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            setProducts(result.data);
            console.log(result)
        } catch (error) {
            console.error('Failed to fetch products:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="content" style={{marginBottom: '100px'}}>
            <ImageSlider/>
            <div style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
                <span style={{ fontSize: "25px" }}>Products</span>
            </div>
            <div>
                {loading ? (
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
                        <CircularProgress />
                    </div>
                ) : (
                    <ProductList products={products} />
                )}
            </div>
        </div>
    );
};

export default Home;
