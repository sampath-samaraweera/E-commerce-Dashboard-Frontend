import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CustomTextField from "../components/CustomTextField";
import CustomLoadingButton from "../components/CustomLoadingButton";
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import { BASE_URL } from '../config';
import '../styles/Login.css';
import OutlinedLoadingButton from '../components/OutlinedLoadingButton';
import { Google } from '@mui/icons-material';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false); 
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('token');
        if (auth && !isTokenExpired(auth)) {
            navigate("/")
        }
    }, [navigate])

    const isTokenExpired = (token) => {
        if (!token) return true;
    
        const payload = JSON.parse(atob(token.split('.')[1]));
        const expiry = payload.exp;
        const now = Math.floor(Date.now() / 1000); // Current time in seconds
    
        return now >= expiry;
    };

    const handleLogin = async () => {
        setLoading(true);
        try {
            if (!email) {
                alert("Please enter your email")
            } else if (!password) {
                alert("Please enter your password")
            } else {
                let response = await fetch(`${BASE_URL}/users/login`, {
                    method: 'post',
                    body: JSON.stringify({ email, password }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                let result = await response.json();
                if (result.auth && result.data) {
                    localStorage.setItem('user', JSON.stringify(result.data));
                    localStorage.setItem('token', JSON.stringify(result.auth));
                    alert("Login successful");
                    navigate("/")
                } else {
                    alert("Login details incorrect.")
                }
            }

        } catch (error) {
            console.error("Fetching Error", error);
        } finally {
            setLoading(false);
        }
    }

    const handleGoogleLogin = async () => {
        window.open("http://localhost:5000/auth/google", "_self");
    };
    
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        if (token) {
            localStorage.setItem("token", JSON.stringify(token));
            const payload = JSON.parse(atob(token.split('.')[1]));
            const user = { _id: payload.id }
            localStorage.setItem("user", JSON.stringify(user));
            navigate('/');
        }
    }, [navigate]); 

    return (
        <div className="formContainer">
            <div className="form">
                <h1>Login</h1>
                <div className="form-fields">
                    <CustomTextField
                        className="password-field" 
                        label="Enter Email"
                        value={email} onChange={(e) => setEmail(e.target.value)}
                    />
                    <FormControl 
                        className="password-field" 
                        variant="outlined" 
                        size="small" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                    >
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type='password'
                            label="Password"
                        />
                    </FormControl>
                </div>
                <div className="form-actions">
                    <CustomLoadingButton 
                        size="medium" 
                        color='#18BC9C'
                        onClick={handleLogin} 
                        loading={loading} 
                        width='200px'
                    >
                        Login
                    </CustomLoadingButton>
                    <OutlinedLoadingButton 
                        size="medium" 
                        color="#2C3E50" 
                        onClick={handleGoogleLogin} 
                        width='200px'
                    >
                       <Google/>&nbsp;Login with Google
                    </OutlinedLoadingButton>
                    <div style={{display:'flex', gap:'10px'}}>
                        <span style={{ fontSize: '15px', color: '#2C3E50' }}>Don't have an account?</span>
                        <span className='sign-up-link' onClick={() => navigate('/signup')} >
                                SignUp
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
