<?php
include '../config/database.php';

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Read JSON data sent from the frontend
$data = json_decode(file_get_contents("php://input"));

if (!isset($data->email, $data->password)) {
    echo json_encode(["message" => "Incomplete data."]);
    exit();
}

try {
    // Search user by email
    $sql = "SELECT id, password FROM users WHERE email = :email";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':email', $data->email);
    $stmt->execute();

    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    if ($user && password_verify($data->password, $user['password'])) {
        // Connection successful
        echo json_encode([
            "message" => "Login successful.",
            "user_id" => $user['id']
        ]);
    } else {
        echo json_encode(["message" => "Invalid email or password."]);
    }
} catch (PDOException $e) {
    error_log("Login error: " . $e->getMessage());
    echo json_encode(["message" => "An error occurred during login."]);
}
?>
