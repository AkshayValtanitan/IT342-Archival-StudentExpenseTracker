import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import "./App.css";

function NavBar({ loggedInUser, onLogout }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        onLogout();
        navigate("/login");
    };

    return (
        <nav className="navbar">
            <Link to="/" className="navbar-logo">
                Student<span>ExpenseTracker</span>
            </Link>

            {!loggedInUser ? (
                <div className="navbar-links">
                    <Link to="/login" className="navbar-link">Sign In</Link>
                    <Link to="/register" className="navbar-link register">Register</Link>
                </div>
            ) : (
                <div className="navbar-user">
                    <div className="navbar-user-badge">
                        {/* <div className="navbar-avatar">
                            {loggedInUser.charAt(0).toUpperCase()} ----------Avatar, later update
                        </div> */}
                        <span className="navbar-username">{loggedInUser}</span>
                    </div>
                    <button className="navbar-logout-btn" onClick={handleLogout}>
                        Sign Out
                    </button>
                </div>
            )}
        </nav>
    );
}

function App() {
    const [loggedInUser, setLoggedInUser] = useState("");

    return (
        <Router>
            <NavBar loggedInUser={loggedInUser} onLogout={() => setLoggedInUser("")} />
            <Routes>
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage onLogin={setLoggedInUser} />} />
                <Route path="/dashboard" element={<DashboardPage username={loggedInUser} />} />
            </Routes>
        </Router>
    );
}

export default App;