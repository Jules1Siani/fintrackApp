import React, { useEffect, useState } from "react";
import apiClient from "../api/axiosConfig";
import AddTransaction from "./AddTransaction";
import UpdateTransaction from "./UpdateTransaction";

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [editingTransaction, setEditingTransaction] = useState(null);
    const [error, setError] = useState("");

    // Function to retrieve user transactions
    const fetchTransactions = async () => {
        const userId = localStorage.getItem("user_id");
        if (!userId) {
            setError("User not logged in.");
            return;
        }

        try {
            const response = await apiClient.get(`/get_transactions.php?user_id=${userId}`);
            setTransactions(Array.isArray(response.data) ? response.data : []);
        } catch (err) {
            console.error("Error fetching transactions:", err);
            setError("Error while fetching transactions.");
        }
    };

    // Load transactions
    useEffect(() => {
        fetchTransactions();
    }, []);

    // Manage the deletion of a transaction
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this transaction?")) {
            try {
                const response = await apiClient.delete("/delete_transaction.php", {
                    data: { id },
                });
                alert(response.data.message);
                fetchTransactions(); // Refresh list after deletion
            } catch (err) {
                console.error("Error deleting transaction:", err);
            }
        }
    };

    return (
        <div>
            <h2>Transactions</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}

            <AddTransaction onAddComplete={fetchTransactions} />

            {editingTransaction && (
                <UpdateTransaction
                    transaction={editingTransaction}
                    onUpdateComplete={() => {
                        setEditingTransaction(null);
                        fetchTransactions();
                    }}
                />
            )}

            {transactions.length > 0 ? (
                <ul>
                    {transactions.map((transaction) => (
                        <li key={transaction.id}>
                            {transaction.category} - {transaction.amount} USD
                            <button onClick={() => setEditingTransaction(transaction)}>Edit</button>
                            <button onClick={() => handleDelete(transaction.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No transactions found.</p>
            )}
        </div>
    );
};

export default Transactions;
