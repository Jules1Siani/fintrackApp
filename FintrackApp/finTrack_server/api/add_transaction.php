<?php
include '../config/database.php';

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->user_id, $data->type, $data->category, $data->amount, $data->transaction_date)) {
    echo json_encode(["message" => "Incomplete data."]);
    exit();
}

// Data validation
if (!is_numeric($data->amount) || !strtotime($data->transaction_date)) {
    echo json_encode(["message" => "Invalid data provided."]);
    exit();
}

$sql = "INSERT INTO transactions (user_id, type, category, amount, description, transaction_date)
        VALUES (:user_id, :type, :category, :amount, :description, :transaction_date)";
$stmt = $conn->prepare($sql);

try {
    $stmt->execute([
        ':user_id' => $data->user_id,
        ':type' => $data->type,
        ':category' => $data->category,
        ':amount' => $data->amount,
        ':description' => $data->description,
        ':transaction_date' => $data->transaction_date,
    ]);

    echo json_encode(["message" => "Transaction added successfully."]);
} catch (PDOException $e) {
    error_log("Error adding transaction: " . $e->getMessage());
    echo json_encode(["message" => "Error while adding the transaction."]);
}
?>
