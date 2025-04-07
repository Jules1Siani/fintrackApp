import React from "react";
import { Link } from "react-router-dom";

const NavBar = ({ userAuthenticated, onLogout }) => {
    return (
        <nav style={{ padding: "10px", backgroundColor: "#4CAF50", color: "white" }}>
            <Link to="/" style={{ marginRight: "10px", color: "white", textDecoration: "none" }}>
                Home
            </Link>
            {userAuthenticated ? (
                <>
                    <Link to="/transactions" style={{ marginRight: "10px", color: "white", textDecoration: "none" }}>
                        Transactions
                    </Link>
                    <Link to="/summary" style={{ marginRight: "10px", color: "white", textDecoration: "none" }}>
                        Summary
                    </Link>
                    <button onClick={onLogout} style={{ backgroundColor: "red", color: "white", border: "none" }}>
                        Logout
                    </button>
                </>
            ) : (
                <>
                    <Link to="/" style={{ marginRight: "10px", color: "white", textDecoration: "none" }}>
                        Login
                    </Link>
                    <Link to="/register" style={{ color: "white", textDecoration: "none" }}>
                        Register
                    </Link>
                </>
            )}
        </nav>
    );
};

export default NavBar;
