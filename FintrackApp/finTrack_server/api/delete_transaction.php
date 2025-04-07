<?php
include '../config/config.php';
include '../config/database.php';

header("Content-Type: application/json");

// Reading data sent from the frontend
$data = json_decode(file_get_contents("php://input"));

if (isset($data->id)) {
    $sql = "DELETE FROM transactions WHERE id = :id";
    $stmt = $conn->prepare($sql);

    // Binding parameters
    $stmt->bindParam(':id', $data->id);

    // Execution and response
    if ($stmt->execute()) {
        echo json_encode(["message" => "Transaction deleted successfully."]);
    } else {
        echo json_encode(["message" => "Failed to delete the transaction."]);
    }
} else {
    echo json_encode(["message" => "Incomplete data."]);
}
?>
