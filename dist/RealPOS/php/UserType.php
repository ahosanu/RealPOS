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
$data = array();

$result = $conn->query("SELECT * FROM `user_type`");
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()){
        $data[] = $row;
    }
}
echo json_encode($data);
?>