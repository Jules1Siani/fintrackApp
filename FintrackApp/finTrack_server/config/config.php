<?php
$allowedOrigins = ['http://localhost:3000'];
$allowedHeaders = ['Content-Type', 'Authorization'];
$allowedMethods = ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $allowedOrigins)) {
    header('Access-Control-Allow-Origin: ' . $origin);
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Methods: ' . implode(', ', $allowedMethods));
    header('Access-Control-Allow-Headers: ' . implode(', ', $allowedHeaders));
    exit(0);
}
?>
