import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomTable from './CustomTable';
import { TextField } from '@mui/material';
import { Search } from '@mui/icons-material';
import { BASE_URL } from '../config';

const ProductListTable = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('token');
        console.log(auth);
        if (auth && !isTokenExpired(auth)) {
            getProducts();
        }else{
            navigate("/login");
        }
    }, [navigate]);

    const isTokenExpired = (token) => {
        if (!token) return true;
    
        const payload = JSON.parse(atob(token.split('.')[1]));
        const expiry = payload.exp;
        const now = Math.floor(Date.now() / 1000); // Current time in seconds
    
        return now >= expiry;
    };

    const getProducts = async () => {
        let response = await fetch(`${BASE_URL}/products/getAll`,{
            headers:{
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
        });
        let result = await response.json();
        setProducts(result.data);
    }

    const deleteProduct = async (id) => {
        console.log(id)
        let response = await fetch(`${BASE_URL}/products/product/${id}`, {
            method: "Delete",
            headers:{
                "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
        });
        let result = await response.json();
        if (result) {
            getProducts();
        }
    }
    const searchHandle = async (event)=>{
        let key = event.target.value;
        if(key){
            let result = await fetch(`${BASE_URL}/products/search/${key}`,{
                headers:{
                    "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`
                }
            });
            result = await result.json()
            if(result){
                setProducts(result.data)
            }
        }else{
            getProducts();
        }
    }
    const updateProduct = (item) =>{
        navigate('/update/'+item._id)
    }
    return (
        <div className="product-list">
            <span style={{fontSize:"25px"}}>Product List</span>
            <div style={{display:"flex", alignItems:"center",justifyContent:"center", gap: "10px"}}>
                <Search/>
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
            <div className="table">
                <CustomTable rows={products} deleteProduct={deleteProduct} updateProduct={updateProduct}/>
            </div>
        </div>
    )
}

export default ProductListTable;