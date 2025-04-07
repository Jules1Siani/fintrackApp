import React, { useState } from "react";
import apiClient from "../api/axiosConfig";

const AddTransaction = ({ onAddComplete }) => {
    const [formData, setFormData] = useState({
        type: "expense",
        category: "",
        amount: "",
        description: "",
        transaction_date: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userId = localStorage.getItem("user_id");
        try {
            const response = await apiClient.post("/add_transaction.php", {
                user_id: userId,
                ...formData,
            });
            alert(response.data.message);
            setFormData({
                type: "expense",
                category: "",
                amount: "",
                description: "",
                transaction_date: "",
            });
            onAddComplete();
        } catch (err) {
            console.error("Error adding transaction:", err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Add Transaction</h3>
            <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
            </select>
            <input
                type="text"
                placeholder="Category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            />
            <input
                type="number"
                placeholder="Amount"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            />
            <input
                type="text"
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
            <input
                type="date"
                value={formData.transaction_date}
                onChange={(e) => setFormData({ ...formData, transaction_date: e.target.value })}
            />
            <button type="submit">Add</button>
        </form>
    );
};

export default AddTransaction;
