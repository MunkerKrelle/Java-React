// @ts-nocheck
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Profile component to display user profile and posts
function Profile() {
    const navigate = useNavigate();
    const location = useLocation();
    const { username } = location.state || { username: "Guest" };
    const [users, setUsers] = useState([]);
    const [profilePicture, setProfilePicture] = useState('/uploads/icon.png');
    const [userPosts, setUserPosts] = useState([]);

    // Fetch all users and user posts on component mount
    useEffect(() => { 
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

    // Fetch user posts when the username changes
    useEffect(() => {
        fetch(`http://localhost:3001/api/posts?owner=${username}`)
            .then(response => response.json())
            .then(data => {
                // Sort posts by date in descending order
                const sortedPosts = data.posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
                setUserPosts(sortedPosts);
            })
            .catch(error => console.error('Error fetching user posts:', error));
    }, [username]);

    // Handle profile picture upload
    const handlePictureUpload = (e) => {
        const formData = new FormData();
        formData.append('profilePicture', e.target.files[0]);
        formData.append('username', username);

        fetch('http://localhost:3001/api/upload-profile-picture', {
            method: 'POST',
            body: formData,
        })
            .then(response => response.json())
            .then(data => setProfilePicture(data.filePath))
            .catch(error => console.error('Error uploading profile picture:', error));
    };

    return (
        <div>
        <div style={styles.container}>
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
            <div style={styles.profileContainer}>
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
                <div style={styles.postsSection}>
                    <h2>Your Posts</h2>
                    <ul style={styles.postList}>
                        {userPosts.map(post => (
                            <li key={post.id} style={styles.postItem}>
                                <h3 style={styles.postTitle}>{post.name}</h3>
                                <p style={styles.postText}>{post.text}</p>
                                {post.photo && (
                                    <img
                                        src={`http://localhost:3001${post.photo}`}
                                        alt="Post"
                                        style={styles.postImage}
                                    />
                                )}
                                <p style={styles.postDate}>{post.date}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <button
                    style={styles.postButton}
                    onClick={() => navigate('/posts', { state: { username } })}
                >
                    Go to Posts
                </button>
        </div>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        alignItems: 'flex-start', // Align items to the top
        height: '100vh',
        backgroundColor: '#f5f5f5',
        overflow: 'hidden', // Prevent horizontal overflow
    },
    sidebar: {
        width: '20%',
        backgroundColor: '#f4d03f',
        color: '#17202a',
        padding: '20px',
        boxSizing: 'border-box',
        height: '100vh',
        overflowY: 'auto', // Make the sidebar scrollable if content overflows
    },
    userList: {
        listStyleType: 'none',
        padding: 0,
        margin: 0,
    },
    userItem: {
        display: 'flex', 
        alignItems: 'center', 
        marginBottom: '10px',
        padding: '10px',
        backgroundColor: '#f7dc6f',
        borderRadius: '4px',
        textAlign: 'left',
        color: '#17202a',
    },
    userPicture: {
        width: '40px',
        height: '40px',
        borderRadius: '10px',
        objectFit: 'cover',
        marginRight: '10px',
    },
    profileContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start', // Align content to the top
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        padding: '20px',
        margin: '0 auto',
        maxWidth: '600px',
        height: '100vh', // Set height to viewport height
        overflowY: 'auto', // Enable vertical scrolling for posts
        position: 'relative', // Enable absolute positioning for child elements
    },
    profilePicture: {
        width: '150px',
        height: '150px',
        borderRadius: '15px',
        objectFit: 'cover',
        marginBottom: '20px',
    },
    fileInput: {
        marginTop: '10px',
    },
    postImage: {
        alignItems: 'center',
        maxHeight: '200px', 
        objectFit: 'cover', 
        borderRadius: '8px', 
        marginTop: '10px', 
    },
    postList: {
        listStyleType: 'none',
        padding: 0,
        margin: 0,
        width: '100%',
    },
    postItem: {
        marginBottom: '10px',
        padding: '10px',
        backgroundColor: '#f7dc6f',
        borderRadius: '4px',
        textAlign: 'left',
        color: '#17202a',
        width: '100%',
        boxSizing: 'border-box',
    },
    postHeader: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '10px',
    },
    postUserPicture: {
        width: '40px',
        height: '40px',
        borderRadius: '10px',
        objectFit: 'cover',
        marginRight: '10px',
    },
    postUsername: {
        fontWeight: 'bold',
        color: '#17202a',
    },
    postTitle: {
        fontWeight: 'bold',
        marginBottom: '5px',
    },
    postText: {
        marginBottom: '5px',
    },
    postDate: {
        fontSize: '12px',
        color: '#555',
    },
    postButton: {
        position: 'absolute',
        top: '20px', // Distance from the bottom
        right: '20px', // Distance from the right
        padding: '10px',
        fontSize: '16px',
        borderRadius: '4px',
        border: 'none',
        backgroundColor: '#17202a',
        color: '#fff',
        cursor: 'pointer',
    },
    postsSection: {
        width: '100%', // Ensure the posts section takes full width
    },
};

export default Profile;