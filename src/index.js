import React from "react";
import { createRoot } from "react-dom/client";
import BlogPost from "./posts";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./Auth";
import Profile from "./Profile";
import Home from "./page/home/homepage";

// Render the App component
const root = createRoot(document.getElementById("root"));

root.render(
    <Router>
        <Routes>
            <Route path="/" element={<Auth />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/posts" element={<Home />} /> {/* Add BlogPost route */}
        </Routes>
    </Router>
);
