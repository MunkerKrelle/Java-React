import React from "react";
import { useLocation } from "react-router-dom";

function Profile() {
    const location = useLocation();
    const { username } = location.state || { username: "Guest" };

    return (
        <div>
            <h1>Profile</h1>
            <p>Welcome, {username}!</p>
        </div>
    );
}

export default Profile;