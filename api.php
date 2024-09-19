<?php
// credentials.php

// Set the content type to application/json
header('Content-Type: application/json');

// Set a security key to restrict access (Optional but recommended)
$valid_keys = [
    'sk-abhiraj',
    'sk-daya',
    'sk-testkey123',
    'sk-anotherkey456'
];

// Check if the correct security key is provided
if (!isset($_GET['key']) || !in_array($_GET['key'], $valid_keys)) {
    http_response_code(403);
    echo json_encode(['error' => 'Unauthorized access']);
    exit();
}

// Replace with your actual email and password
$email = 'dayabushanturnitin@gmail.com';
$password = '123Q1@+22qwew';

// Output credentials as JSON
echo json_encode([
    'email' => $email,
    'password' => $password
]);
?>
