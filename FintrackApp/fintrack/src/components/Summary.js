import React, { useEffect, useState } from "react";
import apiClient from "../api/axiosConfig";

const Summary = () => {
    const [summary, setSummary] = useState({ income: 0, expenses: 0, balance: 0 });
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const userId = localStorage.getItem("user_id");
                const response = await apiClient.get(`/get_summary.php?user_id=${userId}`);
                setSummary(response.data);
            } catch (err) {
                setError("Error fetching summary data.");
            }
        };
        fetchSummary();
    }, []);

    return (
        <div>
            <h2>Financial Summary</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <p><strong>Total Income:</strong> {summary.income} USD</p>
            <p><strong>Total Expenses:</strong> {summary.expenses} USD</p>
            <p><strong>Net Balance:</strong> {summary.balance} USD</p>
            {summary.balance >= 0 ? (
                <p style={{ color: "green" }}>You are in good standing!</p>
            ) : (
                <p style={{ color: "red" }}>You are in deficit.</p>
            )}
        </div>
    );
};

export default Summary;
