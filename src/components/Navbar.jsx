import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { useNavigate, useLocation } from 'react-router-dom';
import SearchBar from './SearchBar';
import { useCustomContext } from '../context/CustomContext';
import { BASE_URL } from '../config';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CustomButton from './CustomButton';
import { useState } from 'react';

export default function NavBar() {    
  const { setProducts } = useCustomContext();
  const auth = localStorage.getItem('token');
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const logout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const isTokenExpired = (token) => {
    if (!token) return true;
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expiry = payload.exp;
    const now = Math.floor(Date.now() / 1000); // Current time in seconds
    return now >= expiry;
  };

  const searchHandle = async (event) => {
    const key = event.target.value;
    if (key) {
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
      }
    }
  };

  return (
    <Box className='tabBar'>
      <AppBar position="static" sx={{ backgroundColor: '#2C3E50', color: '#ECF0F1' }} elevation={0}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', padding: '0 24px' }}>
          {/* Logo Section */}
          <Typography variant="h5" sx={{ paddingLeft: '10px', fontWeight: 'bold', color: '#ECF0F1' }}>
            Tech Store
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {location.pathname === '/' && (
              <Box sx={{ display: 'flex', justifyContent: 'flex-end',alignItems: 'flex-end', marginRight: 3}}>
                <SearchBar onSearch={searchHandle} />
              </Box>
            )}
            <CustomButton onClick={() => navigate("/")} color="#2C3E50">
              Home
            </CustomButton>
            <CustomButton onClick={() => navigate("/my_products")} color="#2C3E50">
              My Products
            </CustomButton>
            <IconButton color="inherit" onClick={() => navigate('/cart')} sx={{ color: '#ECF0F1' }}>
              <ShoppingCartIcon />
            </IconButton>
            {location.pathname === '/login' ? (
              <CustomButton onClick={() => navigate('/signup')} color="#18BC9C">
                SignUp
              </CustomButton>
            ) : location.pathname === '/signup' ? (
              <CustomButton onClick={() => navigate('/login')} color="#18BC9C">
                LogIn
              </CustomButton>
            ) : auth && !isTokenExpired(auth)?(
              <CustomButton onClick={logout} color="#E74C3C">
                LogOut
              </CustomButton>
            ):(null)}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
