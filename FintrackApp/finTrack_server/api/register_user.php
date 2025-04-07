<?php
include '../config/database.php';

// CORS Headers
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE, PUT");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

// Handle OPTIONS (preflight) requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Read JSON data sent from the frontend
$data = json_decode(file_get_contents("php://input"));

if (!isset($data->username, $data->email, $data->password)) {
    echo json_encode(["message" => "Incomplete data."]);
    exit();
}

// Check if the user already exists
$sql = "SELECT id FROM users WHERE email = :email";
$stmt = $conn->prepare($sql);
$stmt->bindParam(':email', $data->email);
$stmt->execute();

if ($stmt->rowCount() > 0) {
    echo json_encode(["message" => "Email already exists."]);
    exit();
}

// Add a new user
$sql = "INSERT INTO users (username, email, password) VALUES (:username, :email, :password)";
$stmt = $conn->prepare($sql);

try {
    $stmt->execute([
        ':username' => $data->username,
        ':email' => $data->email,
        ':password' => password_hash($data->password, PASSWORD_BCRYPT),
    ]);

    // Retrieve the added user ID
    $userId = $conn->lastInsertId();

    // Return a response with the user_id
    echo json_encode([
        "message" => "User registered successfully.",
        "user_id" => $userId
    ]);
} catch (PDOException $e) {
    error_log("Registration error: " . $e->getMessage());
    echo json_encode(["message" => "Error: Unable to register user."]);
}
?>
