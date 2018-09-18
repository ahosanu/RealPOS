<?php
/**
 * Created by PhpStorm.
 * User: Ahosan Ullah
 * Date: 9/9/2018
 * Time: 7:21 AM
 */

include './Connection.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json");

$conn = new Connection();
$conn = $conn->conn();
session_start();
$data = null;
$result = $conn->query("SELECT `us_name` FROM `user_security` WHERE `us_name` = '".$_GET['user']."'");
if ($result->num_rows > 0) {
    $data['alreadyExist'] = true;
}
echo json_encode($data);
?>