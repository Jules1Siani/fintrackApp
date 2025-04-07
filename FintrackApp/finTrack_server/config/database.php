<?php
include_once 'config.php';

$host = 'localhost';
$db_name = 'fintrack_db';
$username = 'root';
$password = '38wYTc8k@p8PNxR';

try {
    $conn = new PDO("mysql:host=$host;dbname=$db_name", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Connection error: " . $e->getMessage());
}
?>
