import React from "react";
import { createRoot } from "react-dom/client";
import CreateUser from "./App"; // Import your App component
import BlogPost from "./posts";

// Render the App component
const root = createRoot(document.getElementById("root"));
root.render(<BlogPost />);
