import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import RegisterUser from "./components/RegisterUser";
import LoginUser from "./components/LoginUser";
import Transactions from "./components/Transactions";
import AddTransaction from "./components/AddTransaction";
import Summary from "./components/Summary";
import "./App.css";

function App() {
    const [userAuthenticated, setUserAuthenticated] = useState(() => !!localStorage.getItem("user_id"));

    const handleAuthComplete = () => {
        setUserAuthenticated(true);
    };

    const handleLogout = () => {
        localStorage.removeItem("user_id");
        setUserAuthenticated(false);
    };

    return (
        <Router>
            <NavBar userAuthenticated={userAuthenticated} onLogout={handleLogout} />
            <div style={{ padding: "20px" }}>
                <Routes>
                    {/* Unauthenticated User Routes */}
                    {!userAuthenticated ? (
                        <>
                            <Route
                                path="/"
                                element={<LoginUser onLoginComplete={handleAuthComplete} />}
                            />
                            <Route
                                path="/register"
                                element={<RegisterUser onRegisterComplete={handleAuthComplete} />}
                            />
                            <Route
                                path="*"
                                element={<Navigate to="/" />}
                            />
                        </>
                    ) : (
                        <>
                            {/* Authenticated User Routes */}
                            <Route path="/" element={<AddTransaction />} />
                            <Route path="/transactions" element={<Transactions />} />
                            <Route path="/summary" element={<Summary />} />
                            <Route
                                path="*"
                                element={<Navigate to="/" />}
                            />
                        </>
                    )}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
