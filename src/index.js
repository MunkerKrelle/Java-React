import React from "react";
import { createRoot } from "react-dom/client";
import CreateUser from "./App"; // Import your App component
import BlogPost from "./posts";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./Auth";
import Profile from "./Profile";

const root = createRoot(document.getElementById("root"));

root.render(
    <Router>
        <Routes>
            <Route path="/" element={<Auth />} />
            {/* <Route path="/profile" element={<Profile />} />
            <Route path="/create-user" element={<CreateUser />} /> */}
            <Route path="/posts" element={<BlogPost />} />
        </Routes>
    </Router>
);
