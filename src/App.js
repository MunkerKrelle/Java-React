import React, { useState, useEffect } from "react";

function GetName() {
    const [users, setUsers] = useState([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        // Fetch data from the API
        fetch('http://localhost:3001/api/users')
            .then(response => response.json())
            .then(data => setUsers(data.users))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Send user input to the API
        fetch('http://localhost:3001/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('User added:', data);
            // Optionally, fetch users again to update the list
            setUsers(prevUsers => [...prevUsers, { id: data.id, username }]);
            setUsername('');
            setPassword('');
        })
        .catch(error => console.error('Error adding user:', error));
    };

    return (
        <div>
            <h1>Hello World</h1>
            <h2>User List:</h2>
            <ul>
                {users.map(user => (
                    <li key={user.id}>{user.username}</li>
                ))}
            </ul>
            <h2>Add User:</h2>
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
                <button type="submit">Add User</button>
            </form>
        </div>
    );
}

export default GetName;
