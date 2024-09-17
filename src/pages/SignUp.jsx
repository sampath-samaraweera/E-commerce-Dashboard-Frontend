import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import CustomTextField from "../components/CustomTextField";
import CustomLoadingButton from "../components/CustomLoadingButton";
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import { BASE_URL } from '../config';
import '../styles/Login.css';

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = React.useState(false);  
    const navigate = useNavigate();

    const collectData = async () => {
        console.log(name, email, password);
        try {
            if (!name) {
                alert("Please enter your name")
            } else if (!email) {
                alert("Please enter your email")
            } else if (!password) {
                alert("Please enter your password")
            } else {
                let response = await fetch(`${BASE_URL}/users/register`, {
                    method: 'POST',
                    body: JSON.stringify({ name, email, password }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                let result = await response.json();
                console.log(result);
                if (result.auth && result.data) {
                    localStorage.setItem("user", JSON.stringify(result.data));
                    localStorage.setItem("token", JSON.stringify(result.auth));
                    alert("Your account has been created successfully");
                    navigate('/');
                } else {
                    throw new Error("Invalid response structure");
                }
            }
        } catch (error) {
            console.error("There was an error with the fetch operation:", error);
            // Handle the error appropriately in the UI
        }
    };

    return (
        <div className="formContainer">
            <div className="form">
                <h1>SignUp</h1>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '15px' }}>
                    <CustomTextField
                        label="Enter Name"
                        value={name} onChange={(e) => setName(e.target.value)}
                    />
                    <CustomTextField
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
                    <CustomLoadingButton size="medium" color='#18BC9C' onClick={collectData} width='200px'>SignUp</CustomLoadingButton>
                    <div style={{display:'flex', gap:'10px'}}>
                        <span style={{ fontSize: '15px', color: '#2C3E50' }}>Already have an account?</span>
                        <span className='sign-up-link' onClick={() => navigate('/login')} >
                                Login
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
