import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CustomTextField from "../components/CustomTextField";
import CustomLoadingButton from "../components/CustomLoadingButton";
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import { BASE_URL } from '../config';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
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
        try{
            let response = await fetch(`${BASE_URL}/users/login`, {
                method: 'post',
                body: JSON.stringify({ email, password }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(email, password)
            let result = await response.json();
            console.log(result)
            if (result.auth && result.data) {
                console.log(result.data)
                localStorage.setItem('user', JSON.stringify(result.data));
                localStorage.setItem('token', JSON.stringify(result.auth));
                navigate("/")
            } else {
                alert("Login details incorrect.")
            }
        }
        catch(error){
            console.error("Fetching Error", error);
        }
        finally{
            setLoading(false);
        }
    }

    return (
        <div className="formContainer">
            <div className="form">
                <h1>Login</h1>
                <div style={{  display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column'}}
                >
                    <CustomTextField
                        label="Enter Email"
                        value={email} onChange={(e) => setEmail(e.target.value)}
                    />
                    <FormControl sx={{
                            width: '25rem',
                            marginTop: '1rem',
                            '& .MuiOutlinedInput-root': {
                                '&.Mui-focused fieldset': {
                                    borderColor: 'red', // border color when focused
                                },
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                                color: 'red', // label color when focused
                            },
                        }} 
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
                <div style={{ marginTop: '2rem' }}>
                    <CustomLoadingButton size="medium" color="darkred" onClick={handleLogin} loading={loading}>Login</CustomLoadingButton>
                </div>
            </div>
        </div>
    );
}

export default Login