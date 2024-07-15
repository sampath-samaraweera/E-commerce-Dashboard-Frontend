import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import MyProductList from '../components/MyProductList';
import { BASE_URL } from '../config';
import CustomButton from "../components/CustomButton";
import SearchBar from '../components/SearchBar';

const MyProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('token');
        console.log('token is ', auth);
        if (auth && !isTokenExpired(auth)) {
            getProducts();
        } else {
            navigate("/login");
        }
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
        try {
            const response = await fetch(`${BASE_URL}/products/getAll`, {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            setProducts(result.data);
        } catch (error) {
            console.error('Failed to fetch products:', error);
        } finally {
            setLoading(false);
        }
    };

    const searchHandle = async (event) => {
        const key = event.target.value;
        if (key) {
            setLoading(true);
            try {
                const response = await fetch(`${BASE_URL}/products/search/${key}`, {
                    headers: {
                        "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();
                if (result) {
                    setProducts(result.data);
                }
            } catch (error) {
                console.error('Failed to search products:', error);
            } finally {
                setLoading(false);
            }
        } else {
            getProducts();
        }
    };

    return (
        <div className="content">
            <div className="headerRow">
                <span style={{ fontSize: "25px" }}>My Product List</span>
                <SearchBar onSearch={searchHandle}/>
                <div style={{ margin: "10px" }}>
                    <CustomButton size="small" color="green" onClick={() =>  navigate('/add_my_product')}>Add Product</CustomButton>
                </div>
            </div>
            <div>
                {loading ? (
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
                        <CircularProgress />
                    </div>
                ) : (
                    <MyProductList products={products} getProducts={getProducts} />
                )}
            </div>
        </div>
    );
};

export default MyProducts;
