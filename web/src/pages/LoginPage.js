import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./LoginPage.css";

const LoginPage = ({ onLogin }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                "http://localhost:8080/api/auth/login",
                { email, password },
                { withCredentials: true }
            );
            if (res.data.success) {
                const userRes = await axios.get("http://localhost:8080/api/user/me", {
                    withCredentials: true
                });
                // onLogin(email);
                onLogin(userRes.data.data.name);
                navigate("/dashboard");
            } else {
                setMessage(res.data.message);
            }
        } catch (err) {
            setMessage(err.response?.data?.message || "Server error");
        }

        
    };

    return (
        <div className="login-page-container">
            <div className="login-page-box">
                <div className="login-page-logo">Student<span>ExpenseTracker</span></div>

                <h2 className="login-page-title">Welcome back</h2>
                <p className="login-page-subtitle">Sign in to your account to continue</p>

                <form onSubmit={handleLogin} className="login-page-form">
                    <div>
                        <label className="login-page-label">Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="login-page-input"
                        />
                    </div>
                    <div>
                        <label className="login-page-label">Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="login-page-input"
                        />
                    </div>
                    <button type="submit" className="login-page-button">Sign In</button>
                </form>

                {message && <div className="login-page-message">{message}</div>}

                <p className="login-page-switch">
                    Don't have an account? <Link to="/register">Create one</Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;