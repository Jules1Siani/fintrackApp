import React, { useState } from "react";
import apiClient from "../api/axiosConfig";

const LoginUser = ({ onLoginComplete }) => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await apiClient.post("/login_user.php", formData);
            setMessage(response.data.message);

            if (response.data.user_id) {
                // Store user_id and pass to transaction management
                localStorage.setItem("user_id", response.data.user_id);
                onLoginComplete();
            }
        } catch (err) {
            console.error("Error during login:", err);
            setMessage("An error occurred during login.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            {message && <p>{message}</p>}
            <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            <button type="submit">Login</button>
        </form>
    );
};

export default LoginUser;
