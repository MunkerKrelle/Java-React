import React, {useState} from "react"; 
import LikedButton from "./likedButton"; 


// Comment component to display and add comments
function Comment({postId}) {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    const addComment = () => {
        if (newComment.trim() === '') return; // Prevent empty comments

        const comment = {
            postId: postId,
            text: newComment,
            id: Date.now(),
        };

        setComments([...comments, comment]);
        setNewComment(''); // Clear the input field
    };

    return (
        <div className="comment-section">
            <h3>Comments</h3>
            <div className="comments-list">
                {comments.map(comment => (
                    <div key={comment.id} className="comment">
                        <p>{comment.text}</p>
                    <LikedButton initialLikes={0} /> 
                    <br></br>    
                    </div>
                ))}
            </div>
            <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
            />
            <br />
            <button onClick={addComment}>Submit</button>
        </div>
    );    
}

export default Comment;