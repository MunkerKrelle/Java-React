import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function Profile() {
    const location = useLocation();
    const { username } = location.state || { username: "Guest" };
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Fetch all users from the API
        fetch('http://localhost:3001/api/users')
            .then(response => response.json())
            .then(data => setUsers(data.users))
            .catch(error => console.error('Error fetching users:', error));
    }, []);

    return (
        <div style={{ display: 'flex' }}>
            {/* Left side: List of all users */}
            <div style={{ width: '25%', borderRight: '1px solid #ccc', padding: '10px' }}>
                <h2>All Users</h2>
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {users.map(user => (
                        <li key={user.id} style={{ marginBottom: '10px' }}>
                            {user.username}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Right side: Profile details */}
            <div style={{ flex: 1, padding: '10px' }}>
                <h1>Profile</h1>
                <p>Welcome, {username}!</p>
            </div>
        </div>
    );
}

export default Profile;