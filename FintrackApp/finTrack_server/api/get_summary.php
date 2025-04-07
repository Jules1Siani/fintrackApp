<?php
header("Content-Type: application/json");

include '../config/database.php'; // Include database connection

// Check if a user ID is provided
$user_id = isset($_GET['user_id']) ? intval($_GET['user_id']) : null;

if (!$user_id) {
    echo json_encode(["error" => "User ID is required."]);
    exit();
}

try {
    // Query to calculate total income
    $incomeQuery = "SELECT SUM(amount) AS total_income FROM transactions WHERE user_id = :user_id AND type = 'income'";
    $stmt = $conn->prepare($incomeQuery);
    $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
    $stmt->execute();
    $income = $stmt->fetch(PDO::FETCH_ASSOC)['total_income'] ?? 0;

    // Query to calculate total expenses
    $expenseQuery = "SELECT SUM(amount) AS total_expenses FROM transactions WHERE user_id = :user_id AND type = 'expense'";
    $stmt = $conn->prepare($expenseQuery);
    $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
    $stmt->execute();
    $expenses = $stmt->fetch(PDO::FETCH_ASSOC)['total_expenses'] ?? 0;

    // Calculate the net balance
    $balance = $income - $expenses;

    // Return the summary as a JSON response
    echo json_encode([
        "income" => $income,
        "expenses" => $expenses,
        "balance" => $balance
    ]);
} catch (Exception $e) {
    // Handle any errors that occur
    echo json_encode(["error" => "An error occurred: " . $e->getMessage()]);
    exit();
}
?>
