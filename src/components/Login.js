import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const Login = () => {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate("/")
        }
    }, [])

    const handleLogin = async () => {
        try{
            let response = await fetch("http://localhost:5000/api/users/login", {
                method: 'post',
                body: JSON.stringify({ email, password }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
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
            console.error(error);
        }

    }

    return (
        <div className='login'>
            <h1>Login</h1>
            <input type="text" className="inputBox" placeholder='Enter Email'
                onChange={(e) => setEmail(e.target.value)} value={email} />
            <input type="password" className="inputBox" placeholder='Enter Password'
                onChange={(e) => setPassword(e.target.value)} value={password} />
            <button onClick={handleLogin} className="appButton" type="button">Login</button>
        </div>
    )
}

export default Login