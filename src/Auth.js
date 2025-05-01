import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Auth component to handle user authentication (login and profile creation)
function Auth() {
    const [isLogin, setIsLogin] = useState(true); 
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = isLogin ? 'http://localhost:3001/api/login' : 'http://localhost:3001/api/users'; // Adjust URL based on login or create profile

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        })
            .then(async (response) => {
                const data = await response.json();
                if (!response.ok) {
                    setErrorMessage(data.message || data.error || 'An error occurred.');
                    return;
                }

                // Handle successful login or profile creation
                if (isLogin) {
                    console.log('Login successful:', data);
                    setErrorMessage('');
                    navigate('/profile', { state: { username } }); // Pass username to Profile
                } else {
                    console.log('User created:', data);
                    setErrorMessage('');
                    setIsLogin(true);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                setErrorMessage('An error occurred. Please try again.');
            });
    };

    return (
        <div style={styles.container}>
            <div style={styles.formContainer}>
                <h1>{isLogin ? "Login" : "Create Profile"}</h1>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                <form onSubmit={handleSubmit} style={styles.form}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        style={styles.input}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={styles.input}
                    />
                    <button type="submit" style={styles.button}>
                        {isLogin ? "Login" : "Create Account"}
                    </button>
                </form>
                <button
                    onClick={() => {
                        setIsLogin(!isLogin);
                        setErrorMessage('');
                    }}
                    style={styles.switchButton}
                >
                    {isLogin ? "Switch to Create Profile" : "Switch to Login"}
                </button>
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5',
    },
    formContainer: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        width: '300px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    input: {
        marginBottom: '10px',
        padding: '10px',
        fontSize: '16px',
        borderRadius: '4px',
        border: '1px solid #ccc',
    },
    button: {
        padding: '10px',
        fontSize: '16px',
        borderRadius: '4px',
        border: 'none',
        backgroundColor: '#17202a',
        color: '#fff',
        cursor: 'pointer',
    },
    switchButton: {
        marginTop: '10px',
        padding: '10px',
        fontSize: '14px',
        borderRadius: '4px',
        border: 'none',
        backgroundColor: '#f4d03f',
        color: '#fff',
        cursor: 'pointer',
    },
};

export default Auth;