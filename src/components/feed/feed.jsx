import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./feed.css"

function BlogPost() {
    const navigate = useNavigate();
    const location = useLocation();
    const { username } = location.state || { username: "Guest" }; // Retrieve the username from navigation state

    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);
    const [postDetails, setPostDetails] = useState({
        name: '',
        text: '',
        date: '',
    });
    const [photo, setPhoto] = useState(null);
    const [comments, setComments] = useState({}); // Store comments for each post
    const [likes, setLikes] = useState({}); // Store likes for each post

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

        // Fetch comments from the API
        fetch('http://localhost:3001/api/comments')
            .then(response => response.json())
            .then(data => {
                const commentsByPost = {};
                data.comments.forEach(comment => {
                    if (!commentsByPost[comment.postref]) {
                        commentsByPost[comment.postref] = [];
                    }
                    commentsByPost[comment.postref].push(comment);
                });
                setComments(commentsByPost);
            })
            .catch(error => console.error('Error fetching comments:', error));
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
        formData.append('owner', username);
        formData.append('name', postDetails.name);
        formData.append('text', postDetails.text);
        formData.append('date', new Date().toISOString());
        if (photo) {
            formData.append('photo', photo);
        }

        fetch('http://localhost:3001/api/posts', {
            method: 'POST',
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                setPosts([...posts, data]);
                setPostDetails({ name: '', text: '', date: '' });
                setPhoto(null);
            })
            .catch(error => console.error('Error creating post:', error));
    };

    const handleLike = (postId) => {
        fetch(`http://localhost:3001/api/likes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userref: username, postref: postId }),
        })
            .then(() => {
                setLikes({ ...likes, [postId]: (likes[postId] || 0) + 1 });
            })
            .catch(error => console.error('Error liking post:', error));
    };

    const handleCommentSubmit = (postId, commentText) => {
        const newComment = {
            userref: username,
            text: commentText,
            date: new Date().toISOString(),
            postref: postId,
        };

        fetch('http://localhost:3001/api/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newComment),
        })
            .then(() => {
                setComments({
                    ...comments,
                    [postId]: [...(comments[postId] || []), newComment],
                });
            })
            .catch(error => console.error('Error submitting comment:', error));
    };

    return (
        <div style={styles.container}>
            
                <div className="postspace">
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
                <h2>All Posts</h2>
                <ul style={styles.postList}>
                    {posts.map(post => {
                        const user = users.find(user => user.username === post.owner);
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
                                <button
                                    style={styles.likeButton}
                                    onClick={() => handleLike(post.id)}
                                >
                                    Like ({likes[post.id] || 0})
                                </button>
                                <div style={styles.commentsSection}>
                                    <h4>Comments</h4>
                                    <ul style={styles.commentList}>
                                        {(comments[post.id] || []).map((comment, index) => (
                                            <li key={index} style={styles.commentItem}>
                                                <strong>{comment.userref}:</strong> {comment.text}
                                            </li>
                                        ))}
                                    </ul>
                                    <form
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            const commentText = e.target.elements.comment.value;
                                            if (commentText.trim() !== '') {
                                                handleCommentSubmit(post.id, commentText);
                                                e.target.reset();
                                            }
                                        }}
                                    >
                                        <input
                                            type="text"
                                            name="comment"
                                            placeholder="Write a comment..."
                                            style={styles.commentInput}
                                        />
                                        <button type="submit" style={styles.commentButton}>
                                            Submit
                                        </button>
                                    </form>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            
        </div>
    );
}

const styles = {

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
    likeButton: {
        padding: '5px 10px',
        fontSize: '14px',
        borderRadius: '4px',
        border: 'none',
        backgroundColor: '#17202a',
        color: '#fff',
        cursor: 'pointer',
        marginTop: '10px',
    },
    commentsSection: {
        marginTop: '10px',
    },
    commentList: {
        listStyleType: 'none',
        padding: 0,
        margin: 0,
    },
    commentItem: {
        marginBottom: '5px',
    },
    commentInput: {
        marginBottom: '10px',
        padding: '5px',
        fontSize: '14px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        width: '100%',
    },
    commentButton: {
        padding: '5px 10px',
        fontSize: '14px',
        borderRadius: '4px',
        border: 'none',
        backgroundColor: '#17202a',
        color: '#fff',
        cursor: 'pointer',
    },
    mainContent: {
        display: 'flex',
        
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        margin: '0 auto',
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

export default BlogPost;