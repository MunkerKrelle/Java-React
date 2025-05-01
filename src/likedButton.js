import { useState } from "react";

// LikedButton component to handle like/unlike functionality
function LikedButton({initialLikes = 0}) {
    const [likes, setLikes] = useState(initialLikes);
    const [liked, setLiked] = useState(false);

    const handleLike = () => {
        setLikes(likes + (liked ? -1 : 1));
        setLiked(!liked);
    };

    return (
        <button onClick={handleLike}>
            {liked ? "Unlike" : "Like"} {likes}
        </button>
    );
}
export default LikedButton;