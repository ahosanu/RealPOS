
<?php
include './Connection.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET, POST, PUT");

$conn = new Connection();
$conn = $conn->conn();
$json = array();
$ok = $conn->query("INSERT INTO `buy_product`(`pro_id`, `in_id`, `discount`, `unit`) VALUES ('".$_GET['pro_id']."','".$_GET['in_id']."','".$_GET['discount']."','".$_GET['unit']."')");
if($ok == 1) {
    $conn->query("UPDATE `product` SET `unit`=`unit`-'".$_GET['unit']."' WHERE `pro_id`='".$_GET['pro_id']."'");
    $json['msg'] = "yes";
}else
    $json['msg'] = "no";

$conn->close();

echo json_encode($json);
?>
