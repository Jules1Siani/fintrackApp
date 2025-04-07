import React, { useState, useEffect } from "react";
import apiClient from "../api/axiosConfig";

const UpdateTransaction = ({ transaction, onUpdateComplete }) => {
    const [formData, setFormData] = useState({ ...transaction });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await apiClient.put("/update_transaction.php", formData);
            alert(response.data.message);
            onUpdateComplete();
        } catch (err) {
            console.error("Error while updating the transaction:", err);
        }
    };

    useEffect(() => {
        setFormData({ ...transaction });
    }, [transaction]);

    return (
        <form onSubmit={handleSubmit}>
            <h3>Update Transaction</h3>
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
            <button type="submit">Update</button>
        </form>
    );
};

export default UpdateTransaction;
