import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {  CircularProgress } from '@mui/material';
import ProductList from '../components/ProductList';
import { BASE_URL } from '../config';
import ImageSlider from '../components/ImageSlider';
import { useCustomContext } from '../context/CustomContext';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const Home = () => {
    const {products, setProducts, open, setOpen, snackPack, setSnackPack} = useCustomContext()
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    const [messageInfo, setMessageInfo] = useState(undefined);

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

    useEffect(() => {
        if (snackPack.length && !messageInfo) {
          // Set a new snack when we don't have an active one
          setMessageInfo({ ...snackPack[0] });
          setSnackPack((prev) => prev.slice(1));
          setOpen(true);
        } else if (snackPack.length && messageInfo && open) {
          // Close an active snack when a new one is added
          setOpen(false);
        }
    }, [snackPack, messageInfo, open]);

    const handleExited = () => {
    setMessageInfo(undefined);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          setOpen(false);
          return;
        }
        setOpen(false);
      };

    return (
        <div className="content" style={{marginBottom: '100px'}}>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                key={messageInfo ? messageInfo.key : undefined}
                open={open}
                autoHideDuration={1500}
                onClose={handleClose}
                TransitionProps={{ onExited: handleExited }}
                message={messageInfo ? messageInfo.message : undefined}
            >
                <Alert
                    onClose={handleClose}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%', color: 'white' }}
                >
                    {messageInfo ? messageInfo.message : undefined}
                </Alert>
            </Snackbar>
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
