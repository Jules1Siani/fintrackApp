import React, { useState } from "react";
import apiClient from "../api/axiosConfig";

const RegisterUser = ({ onRegisterComplete }) => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await apiClient.post("/register_user.php", formData);
            setMessage(response.data.message);

            if (response.data.user_id) {
                localStorage.setItem("user_id", response.data.user_id);
                onRegisterComplete();
            }
        } catch (err) {
            console.error("Error during registration:", err);
            setMessage("An error occurred during registration.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Register</h2>
            {message && <p>{message}</p>}
            <input
                type="text"
                placeholder="Username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            />
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
            <button type="submit">Register</button>
        </form>
    );
};

export default RegisterUser;
