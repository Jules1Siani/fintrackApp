<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include '../config/database.php';

$user_id = isset($_GET['user_id']) ? intval($_GET['user_id']) : null;

if (!$user_id) {
    echo json_encode(["message" => "User ID is required."]);
    exit();
}

try {
    $sql = "SELECT * FROM transactions WHERE user_id = :user_id ORDER BY transaction_date DESC";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
    $stmt->execute();

    $transactions = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($transactions ?: []); // Return empty array if no transactions
} catch (Exception $e) {
    error_log("Error fetching transactions: " . $e->getMessage());
    echo json_encode(["message" => "Error fetching transactions."]);
}
?>
