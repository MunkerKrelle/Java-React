import React from "react";
import { createRoot } from "react-dom/client";
import GetName from "./App"; // Import your App component
import Login from ".//login";

// Render the App component
const root = createRoot(document.getElementById("root"));
root.render(<Login />);
