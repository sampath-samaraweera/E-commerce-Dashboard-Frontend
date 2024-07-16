import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import { useCustomContext } from '../context/CustomContext';
import { BASE_URL } from '../config';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function NavBar() {    
  const { setProducts } = useCustomContext();
  const auth = localStorage.getItem('token');
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.clear();
    navigate('/signup');
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
      <AppBar position="static" color="transparent">
        <Box sx={{ display: 'flex', flexDirection: 'row',justifyContent: 'space-between', marginInline: 3 }}>
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h5" sx={{ paddingLeft: '10px' }}>
              Tech Store
            </Typography>
          </Box>
          {auth && !isTokenExpired(auth) ? (
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              {location.pathname === '/' && (
                <Toolbar className="appBarButton">
                  <SearchBar onSearch={searchHandle} />
                </Toolbar>
              )}
              <div className="appBarButton">
                <button className="navButton"  onClick={() => navigate("/")}>Home</button>
              </div>
              <div className="appBarButton">
                <button className="navButton"  onClick={() => navigate("/my_products")}>My Products</button>
              </div>
              <div className="appBarButton">
                <button className="navButton" onClick={logout}>Logout</button>
              </div>
              <div className="appBarButton">
                <button className="navButton" onClick={() => navigate('/cart')}>
                   <ShoppingCartIcon/>
                </button>
              </div>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <div className="appBarButton">
                <button className="navButton" onClick={() => navigate('/signup')}>Signup</button>
              </div>
              <div className="appBarButton">
                <button className="navButton" onClick={() => navigate('/login')}>Login</button>
              </div>
            </Box>
          )}
        </Box>
      </AppBar>
    </Box>
  );
}
