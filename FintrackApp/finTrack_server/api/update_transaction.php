<?php
include '../config/config.php';
include '../config/database.php';

header("Content-Type: application/json");

// Reading data sent from the frontend
$data = json_decode(file_get_contents("php://input"));

if (isset($data->id, $data->type, $data->category, $data->amount, $data->transaction_date)) {
    $sql = "UPDATE transactions SET type = :type, category = :category, amount = :amount, 
            description = :description, transaction_date = :transaction_date WHERE id = :id";
    $stmt = $conn->prepare($sql);

    // Binding parameters
    $stmt->bindParam(':id', $data->id);
    $stmt->bindParam(':type', $data->type);
    $stmt->bindParam(':category', $data->category);
    $stmt->bindParam(':amount', $data->amount);
    $stmt->bindParam(':description', $data->description);
    $stmt->bindParam(':transaction_date', $data->transaction_date);

    // Execution and response
    if ($stmt->execute()) {
        echo json_encode(["message" => "Transaction updated successfully."]);
    } else {
        echo json_encode(["message" => "Failed to update the transaction."]);
    }
} else {
    echo json_encode(["message" => "Incomplete data."]);
}
?>
