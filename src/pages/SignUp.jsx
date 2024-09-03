import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import CustomTextField from "../components/CustomTextField";
import CustomLoadingButton from "../components/CustomLoadingButton";
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import { BASE_URL } from '../config';

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = React.useState(false);  
    const navigate = useNavigate();

    const collectData = async () => {
        console.log(name, email, password);
        try {
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
                navigate('/');
            } else {
                throw new Error("Invalid response structure");
            }
        } catch (error) {
            console.error("There was an error with the fetch operation:", error);
            // Handle the error appropriately in the UI
        }
    };

    // const handleGoogleLogin = async() => {
    //     window.open("http://localhost:5000/auth/google", "_self");
    // };
    
    // const handleNavigate = () => {
    //     console.log("Navigating to home1");
    //     navigate('/'); 
    // };
    
    // useEffect(() => {
    //     const urlParams = new URLSearchParams(window.location.search);
    //     const token = urlParams.get('token');
    //     console.log("URL Params:", urlParams);
    //     console.log("Token:", token);
    //     if (token) {
    //         localStorage.setItem("token", token);
    //         console.log("Token saved to localStorage:", token);
    //         handleNavigate()
    //         console.log("Navigating to home");
    //     }
    // }, [navigate]); 


    return (
        <div className="formContainer">
            <div className="form">
                <h1>Register</h1>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                    <CustomTextField
                        label="Enter Name"
                        value={name} onChange={(e) => setName(e.target.value)}
                    />
                    <CustomTextField
                        label="Enter Email"
                        value={email} onChange={(e) => setEmail(e.target.value)}
                    />
                    <FormControl sx={{
                            width: '25rem',
                            marginTop: '1rem',
                            '& .MuiOutlinedInput-root': {
                                '&.Mui-focused fieldset': {
                                    borderColor: 'red',
                                },
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                                color: 'red',
                            },
                        }} 
                        variant="outlined" 
                        size="small"
                    >
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            label="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </FormControl>
                </div>
                <div style={{ marginTop: '2rem' }}>
                    <CustomLoadingButton size="medium" color="darkred" onClick={collectData}>SignUp</CustomLoadingButton>
                </div>
                {/* <div style={{ marginTop: '2rem' }}>
                    <CustomLoadingButton size="medium" color="darkred" onClick={handleGoogleLogin}>SignUp with Google</CustomLoadingButton>
                </div> */}
            </div>
        </div>
    );
};

export default SignUp;
