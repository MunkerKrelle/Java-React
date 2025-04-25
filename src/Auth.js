import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Auth() {
    const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Create Profile
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = isLogin ? 'http://localhost:3001/api/login' : 'http://localhost:3001/api/users';
        const method = isLogin ? 'POST' : 'POST';

        fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        })
        .then(response => response.json())
        .then(data => {
            if (isLogin) {
                if (data.success) {
                    console.log('Login successful:', data);
                    navigate('/profile', { state: { username } });
                } else {
                    console.error('Login failed:', data.message);
                }
            } else {
                console.log('User created:', data);
                setIsLogin(true); // Switch to login after successful registration
            }
        })
        .catch(error => console.error('Error:', error));
    };

    return (
        <div>
            <h1>{isLogin ? "Login" : "Create Profile"}</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">{isLogin ? "Login" : "Create Account"}</button>
            </form>
            <button onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? "Switch to Create Profile" : "Switch to Login"}
            </button>
        </div>
    );
}

export default Auth;