import React from "react";
import { createRoot } from "react-dom/client";
<<<<<<< HEAD
import CreateUser from "./App"; // Import your App component
import BlogPost from "./posts";
=======
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./Auth";
import Profile from "./Profile";
>>>>>>> main

const root = createRoot(document.getElementById("root"));
<<<<<<< HEAD
root.render(<BlogPost />);
=======
root.render(
    <Router>
        <Routes>
            <Route path="/" element={<Auth />} />
            <Route path="/profile" element={<Profile />} />
        </Routes>
    </Router>
);
>>>>>>> main
