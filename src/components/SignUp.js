import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/');
        }
    }, []);

    const collectData = async () => {
        console.log(name, email, password);
        try {
            let response = await fetch("http://localhost:5000/register", {
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
        <div className="register">
            <h1>Register</h1>
            <input className="inputBox" type="text" placeholder="Enter Name"
                value={name} onChange={(e) => setName(e.target.value)}
            />
            <input className="inputBox" type="text" placeholder="Enter Email"
                value={email} onChange={(e) => setEmail(e.target.value)}
            />
            <input className="inputBox" type="password" placeholder="Enter password"
                value={password} onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={collectData} className="appButton" type="button">Sign Up</button>
        </div>
    );
};

export default SignUp;
