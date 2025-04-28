import React from "react";
import { createRoot } from "react-dom/client";
import GetName from "./App"; // Import your App component
import Login from ".//login";
import TopBar from "./components/topBar/topBar";
import Home from "./page/home/homepage";

// Render the App component
const root = createRoot(document.getElementById("root"));
root.render(<Home/>);

// const login = createRoot(document.getElementById("login"));
// login.render(<Login />);