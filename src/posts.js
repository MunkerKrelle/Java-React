import React, {useState} from "react";
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