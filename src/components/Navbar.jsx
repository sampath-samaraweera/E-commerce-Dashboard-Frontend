import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {useNavigate} from 'react-router-dom';


export default function NavBar() {    
  const auth = localStorage.getItem('token');
  const navigate = useNavigate();
  const logout = () => {
      localStorage.clear();
      navigate('/signup')
  }
  const isTokenExpired = (token) => {
    if (!token) return true;

    const payload = JSON.parse(atob(token.split('.')[1]));
    const expiry = payload.exp;
    const now = Math.floor(Date.now() / 1000); // Current time in seconds

    return now >= expiry;
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h5"  sx={{ padding: '20px' }}>
            Tech Store
          </Typography>
          {auth && !isTokenExpired(auth) ?(
            <Toolbar sx={{ flexGrow: 1 , justifyContent: 'flex-end'}}>
              <Toolbar className="appBarButton">
                <Button color="inherit" href="/">Home</Button>
              </Toolbar>
              <Toolbar className="appBarButton">
                <Button color="inherit" href="/my_products">My Products</Button>
              </Toolbar>
              <Toolbar className="appBarButton">
                <Button color="inherit" onClick={logout} >Logout</Button>
              </Toolbar>
            </Toolbar>
          ):(
            <Toolbar sx={{ flexGrow: 1 , justifyContent: 'flex-end'}}>
              <Toolbar className="appBarButton">
                <Button color="inherit" href="/signup">Signup</Button>
              </Toolbar>
              <Toolbar className="appBarButton">
                <Button color="inherit" href="/login">Login</Button>
              </Toolbar>
            </Toolbar>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
