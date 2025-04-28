import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function BlogPost() {
    const navigate = useNavigate();
    const location = useLocation();
    const { username } = location.state || { username: "Guest" }; // Retrieve the username from navigation state

    console.log("Logged-in username:", username); // Debugging: Ensure the username is passed correctly

    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]); // State to store user data
    const [postDetails, setPostDetails] = useState({
        name: '',
        text: '',
        date: '',
    });
    const [photo, setPhoto] = useState(null);

    useEffect(() => {
        // Fetch posts from the API
        fetch('http://localhost:3001/api/posts')
            .then(response => response.json())
            .then(data => setPosts(data.posts))
            .catch(error => console.error('Error fetching posts:', error));

        // Fetch users from the API
        fetch('http://localhost:3001/api/users')
            .then(response => response.json())
            .then(data => setUsers(data.users))
            .catch(error => console.error('Error fetching users:', error));
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPostDetails({ ...postDetails, [name]: value });
    };

    const handleFileChange = (e) => {
        setPhoto(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('owner', username); // Use the logged-in username
        formData.append('name', postDetails.name);
        formData.append('text', postDetails.text);
        formData.append('date', new Date().toISOString());
        if (photo) {
            formData.append('photo', photo); // Only append photo if it exists
        }

        // Debugging: Log the FormData content
        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }

        fetch('http://localhost:3001/api/posts', {
            method: 'POST',
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                console.log('Post created:', data);
                setPosts([...posts, data]); // Add the new post to the list
                setPostDetails({ name: '', text: '', date: '' });
                setPhoto(null); // Reset the photo input
            })
            .catch(error => console.error('Error creating post:', error));
    };

    return (
        <div style={styles.container}>
            <div style={styles.sidebar}>
                <h2>All Posts</h2>
                <ul style={styles.postList}>
                    {posts.map(post => {
                        const user = users.find(user => user.username === post.owner); // Find the user associated with the post
                        return (
                            <li key={post.id} style={styles.postItem}>
                                <div style={styles.postHeader}>
                                    <img
                                        src={`http://localhost:3001${user?.profile_picture || '/uploads/icon.png'}`}
                                        alt="User"
                                        style={styles.postUserPicture}
                                    />
                                    <span style={styles.postUsername}>{post.owner}</span>
                                </div>
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
                        );
                    })}
                </ul>
            </div>
            <div style={styles.mainContent}>
                <h1>Create a New Post</h1>
                <form style={styles.form} onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Post Title"
                        value={postDetails.name}
                        onChange={handleInputChange}
                        style={styles.input}
                        required
                    />
                    <textarea
                        name="text"
                        placeholder="Write your post here..."
                        value={postDetails.text}
                        onChange={handleInputChange}
                        style={styles.textarea}
                        required
                    ></textarea>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        style={styles.fileInput}
                    />
                    <button type="submit" style={styles.button}>
                        Submit Post
                    </button>
                </form>
            </div>
            <button
                    style={styles.backButton}
                    onClick={() => navigate('/profile', { state: { username } })}
                >
                    Back to Profile
                </button>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5',
    },
    sidebar: {
        width: '20%',
        backgroundColor: '#f4d03f',
        color: '#17202a',
        padding: '20px',
        boxSizing: 'border-box',
        height: '100vh',
        overflowY: 'auto',
    },
    postList: {
        listStyleType: 'none',
        padding: 0,
        margin: 0,
    },
    postItem: {
        marginBottom: '10px',
        padding: '10px',
        backgroundColor: '#f7dc6f',
        borderRadius: '4px',
        textAlign: 'left',
        color: '#17202a',
    },
    postHeader: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '10px',
    },
    postUserPicture: {
        width: '40px',
        height: '40px',
        borderRadius: '15%',
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
    postImage: {
        width: '100%',
        height: 'auto',
        borderRadius: '4px',
        marginTop: '10px',
    },
    backButton: {
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
    mainContent: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        padding: '20px',
        margin: '0 auto',
        maxWidth: '600px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
    },
    input: {
        marginBottom: '10px',
        padding: '10px',
        fontSize: '16px',
        borderRadius: '4px',
        border: '1px solid #ccc',
    },
    textarea: {
        marginBottom: '10px',
        padding: '10px',
        fontSize: '16px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        height: '100px',
    },
    fileInput: {
        marginBottom: '10px',
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
};

export default BlogPost;import React, {useState} from "react";
import {username}  from "./login";
import { Link } from "react-router-dom";
import Comment from "./comment";
import LikedButton from "./likedButton";


export default function BlogPost() {
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState("");
    const [title, setTitle] = useState("");

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };
    
    const handleChange = (event) => {
        setNewPost(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (newPost.trim()=== "") return;
            
    const newPostObject = {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        title: title,
        content: newPost,
        username: username || "Anonymous",
        
    };
    setPosts([newPostObject, ...posts]);
    setNewPost("");
    setTitle("");
    
    };

    return (
        <div style={{ maxWidth: "500px", margin: "auto" }}>
          <h2>Social Feed</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              placeholder="Skriv din overskrift her..."
              style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
              />
            <textarea
              value={newPost}
              onChange={handleChange}
              placeholder="Skriv dit opslag her..."
              rows={4}
              style={{ width: "100%", padding: "10px" }}
            />
            <button type="submit" style={{ marginTop: "10px" }}>Post</button>
            <br></br>
            <br></br>
            <Link to="/profile">
                <button>Back to Profile</button>
            </Link>
          </form>
    
          <div style={{ marginTop: "30px" }}>
            {posts.map((post) => (
              <div key={post.id} style={{ borderBlock: "10px solid #ccc" ,padding: "10px 0" }}>
                <h3>{post.title}</h3>
                <strong>{post.username}: </strong>
                { post.content}
                <br></br>
                <LikedButton initialLikes={0}/>
                <br></br>
                <Comment postId={post.id} />
              </div>
            ))}
          </div>
          
          
        </div>
      );
}