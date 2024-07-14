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

            // Check if the response is OK
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            let result = await response.json();
            console.log(result);
            // Ensure result.data and result.auth are not undefined
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

    return (
        <div className="formContainer">
            <div className="form">
                <h1>Register</h1>
                <div style={{  display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column'}}
                >
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
                            type={showPassword ? 'text' : 'password'}
                            label="Password"
                        />
                    </FormControl>
                </div>
                <div style={{ marginTop: '2rem' }}>
                    <CustomLoadingButton size="medium" color="darkred" onClick={collectData}>SignUp</CustomLoadingButton>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
