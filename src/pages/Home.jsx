import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, CircularProgress } from '@mui/material';
import { Search } from '@mui/icons-material';
import ProductList from '../components/ProductList';
import { BASE_URL } from '../config';

const Home = () => {
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
        console.log('fething products')
        try {
            const response = await fetch(`${BASE_URL}/products/products`, {
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
            console.log(result)
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
                <span style={{ fontSize: "25px" }}>Product List</span>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
                    <Search />
                    <TextField
                        sx={{
                            width: '25rem',
                            marginBottom: '15px',
                            '& .MuiOutlinedInput-root': {
                                '&.Mui-focused fieldset': {
                                    borderColor: 'red', // border color when focused
                                },
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                                color: 'red', // label color when focused
                            },
                        }}
                        size="small"
                        type="search"
                        variant="standard"
                        label="Search Product"
                        onChange={searchHandle}
                    />
                </div>
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
