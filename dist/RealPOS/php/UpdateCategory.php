
<?php
include './Connection.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET, POST, PUT");

$conn = new Connection();
$conn = $conn->conn();
$json = array();
$ok = $conn->query("UPDATE `category` SET `ca_name`=\"".$_POST['name']."\",`discount`='".$_POST['discount']."' WHERE `ca_id`='".$_POST['id']."'");
if($ok == 1)
    $json['msg'] = "yes";
else
    $json['msg'] = "no";

$conn->close();

echo json_encode($json);
?>
