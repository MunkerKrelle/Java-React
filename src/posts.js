import React, {useState} from "react";
import {username}  from "./login";


export default function BlogPost() {
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState("");

    const handleChange = (event) => {
        setNewPost(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (newPost.trim()=== "") return;
            
    const newPostObject = {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        content: newPost,
        username: username || "Anonymous",
        
    };
    setPosts([newPostObject, ...posts]);
    setNewPost("");
    
    };

    return (
        <div style={{ maxWidth: "500px", margin: "auto" }}>
          <h2>Social Feed</h2>
          <form onSubmit={handleSubmit}>
            <textarea
              value={newPost}
              onChange={handleChange}
              placeholder="Skriv dit opslag her..."
              rows={4}
              style={{ width: "100%", padding: "10px" }}
            />
            <button type="submit" style={{ marginTop: "10px" }}>Post</button>
          </form>
    
          <div style={{ marginTop: "30px" }}>
            {posts.map((post) => (
              <div key={post.id} style={{ borderBottom: "1px solid #ccc", padding: "10px 0" }}>
                <strong>{post.username}:</strong>
                {post.content}
              </div>
            ))}
          </div>
        </div>
      );
}