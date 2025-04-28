import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function Profile() {
    const location = useLocation();
    const { username } = location.state || { username: "Guest" };
    const [users, setUsers] = useState([]);
    const [profilePicture, setProfilePicture] = useState('/uploads/icon.png'); // Default profile picture

    useEffect(() => {
        // Fetch all users from the API
        fetch('http://localhost:3001/api/users')
            .then(response => response.json())
            .then(data => {
                setUsers(data.users);
                const currentUser = data.users.find(user => user.username === username);
                if (currentUser && currentUser.profile_picture) {
                    setProfilePicture(currentUser.profile_picture);
                }
            })
            .catch(error => console.error('Error fetching users:', error));
    }, [username]);

    const handlePictureUpload = (e) => {
        const formData = new FormData();
        formData.append('profilePicture', e.target.files[0]);
        formData.append('username', username);

        fetch('http://localhost:3001/api/upload-profile-picture', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            console.log('Profile picture uploaded:', data);
            setProfilePicture(data.filePath); // Update profile picture
        })
        .catch(error => console.error('Error uploading profile picture:', error));
    };

    return (
        <div style={styles.container}>
            <div style={styles.profileContainer}>
                <div style={styles.sidebar}>
                    <h2>All Users</h2>
                    <ul style={styles.userList}>
                        {users.map(user => (
                            <li key={user.id} style={styles.userItem}>
                                <img
                                    src={`http://localhost:3001${user.profile_picture || '/uploads/icon.png'}`}
                                    alt="User"
                                    style={styles.userPicture}
                                />
                                {user.username}
                            </li>
                        ))}
                    </ul>
                </div>
                <div style={styles.profileDetails}>
                    <h1>Profile</h1>
                    <img
                        src={`http://localhost:3001${profilePicture}`}
                        alt="Profile"
                        style={styles.profilePicture}
                    />
                    <p>Welcome, <strong>{username}</strong>!</p>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handlePictureUpload}
                        style={styles.fileInput}
                    />
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
        backgroundColor: '#007bff',
        color: '#fff',
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
        color: '#fff',
    },
    userPicture: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        objectFit: 'cover',
        marginBottom: '5px',
    },
    profileDetails: {
        flex: 1,
        padding: '20px',
        boxSizing: 'border-box',
        textAlign: 'center',
    },
    profilePicture: {
        width: '150px',
        height: '150px',
        borderRadius: '50%',
        objectFit: 'cover',
        marginBottom: '20px',
    },
    fileInput: {
        marginTop: '10px',
    },
};

export default Profile;