
<?php
include './Connection.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET, POST, PUT");

$conn = new Connection();
$conn = $conn->conn();
$json = array();

$ok = "DELETE FROM `product` WHERE `ca_id` = '".$_GET['ca_id']."'";
$ok = $conn->query($ok);
$ok2 = "DELETE FROM `category` WHERE `ca_id` = '".$_GET['ca_id']."'";
$ok2 = $conn->query($ok2);

if ($ok == 1 && $ok2 == 1)
    $json['msg'] = "yes";
else
    $json['msg'] = "no";
$conn->close();
echo json_encode($json);
?>
