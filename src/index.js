import React from "react";
import { createRoot } from "react-dom/client";
import CreateUser from "./App"; // Import your App component

// Render the App component
const root = createRoot(document.getElementById("root"));
root.render(<CreateUser />);
