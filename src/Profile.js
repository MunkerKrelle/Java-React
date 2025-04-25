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
        <div style={styles.container}>
            <div style={styles.profileContainer}>
                <div style={styles.sidebar}>
                    <h2>All Users</h2>
                    <h3>
                        {users.map(user => (
                            <ul style={styles.listStyle} key={user.id}>
                                {user.username}
                            </ul>
                        ))}
                    </h3>
                </div>
                <div style={styles.profileDetails}>
                    <h1>Profile</h1>
                    <p>Welcome, <strong>{username}</strong>!</p>
                </div>
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
    profileContainer: {
        display: 'flex',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        width: '800px',
        height: '500px',
    },
    sidebar: {
        width: '30%',
        backgroundColor: '#f4d03f',
        color: '#17202a',
        padding: '20px',
        boxSizing: 'border-box',
    },
    userList: {
        listStyleType: 'none',
        padding: 0,
        margin: 0,
    },
    userItem: {
        marginBottom: '10px',
        padding: '10px',
        backgroundColor: '#0056b3',
        borderRadius: '4px',
        textAlign: 'center',
    },
    profileDetails: {
        flex: 1,
        padding: '20px',
        boxSizing: 'border-box',
    },
    listStyle: {
        listStyleType: 'none',
        padding: 0,
        margin: 0,
    },
};

export default Profile;