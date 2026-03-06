import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./RegisterPage.css";

const RegisterPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                "http://localhost:8080/api/auth/register",
                { name, email, password },
                { withCredentials: true }
            );
            setIsError(false);
            setMessage(res.data.message);
        } catch (err) {
            setIsError(true);
            setMessage(err.response?.data?.message || "Server error");
        }
    };

    return (
        <div className="register-container">
            <div className="register-box">
                <div className="register-logo">Student<span>ExpenseTracker</span></div>

                <h2 className="register-h2">Create account</h2>
                <p className="register-subtitle">Join and start tracking your expenses</p>

                <form onSubmit={handleRegister} className="register-form">
                    <div>
                        <label className="register-label">Full Name</label>
                        <input
                            type="text"
                            placeholder="Enter your full name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="register-input"
                        />
                    </div>
                    <div>
                        <label className="register-label">Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="register-input"
                        />
                    </div>
                    <div>
                        <label className="register-label">Password</label>
                        <input
                            type="password"
                            placeholder="Min. 6 characters"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="register-input"
                        />
                    </div>
                    <button type="submit" className="register-button">Create Account</button>
                </form>

                {message && (
                    <p className={`register-message ${isError ? "error" : "success"}`}>
                        {message}
                    </p>
                )}

                <p className="register-switch">
                    Already have an account? <Link to="/login">Sign in</Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;