import React, { useEffect, useState } from "react";
import axios from "axios";
import "./DashboardPage.css";

const DashboardPage = ({ username }) => {
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (!username) {
            setMessage("You must be logged in to view this page.");
            return;
        }

        const fetchUser = async () => {
            try {
                const res = await axios.get("http://localhost:8080/api/user/me", {
                    withCredentials: true
                });
                if (res.data.success) {
                    setUser(res.data.data);
                } else {
                    setMessage(res.data.message);
                }
            } catch (err) {
                setMessage(err.response?.data?.message || "Server error");
            }
        };

        fetchUser();
    }, [username]);

    if (!username) {
        return (
            <div className="dashboard-page-container">
                <p className="dashboard-page-message">{message}</p>
            </div>
        );
    }

    return (
        <div className="dashboard-page-container">

            {/* Profile card */}
            <div className="dashboard-page-card">
                <div className="dashboard-page-user-info">
                    <div className="dashboard-page-avatar">
                        {user?.name?.charAt(0).toUpperCase() ?? "?"}
                    </div>
                    <div>
                        <h3>Welcome back, {user?.name}!</h3>
                        <p>You're successfully logged in</p>
                    </div>
                    <span className="dashboard-page-badge">● Active Session</span>
                </div>
                <div className="dashboard-page-section-title">Quick Links</div>
                        <ul className="dashboard-page-list">
                            <li>Profile Info</li>
                            <li>Recent Activity</li>
                            <li>Settings</li>
                        </ul>
            </div>

            <div className="dashboard-page-header">
                <h2 className="dashboard-page-title">
                    Dash<span>board</span>
                </h2>
            </div>

            {user ? (
                <>

                    {/* Quick links card */}
                    <div className="dashboard-page-tabs">
                        
                    </div>
                </>
            ) : (
                <p className="dashboard-page-message">{message || "Loading your dashboard..."}</p>
            )}
        </div>
    );
};

export default DashboardPage;