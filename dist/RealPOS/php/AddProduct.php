
<?php
include './Connection.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET, POST, PUT");

$conn = new Connection();
$conn = $conn->conn();
$json = array();

/*    $conn->query("INSERT INTO `user`(`type_id`, `full_name`, `password`, `email`, `address`, `mobile`) VALUES
('" . $_POST['type'] . "', '" . $_POST['fullname'] . "', '12345' ,'" . $_POST['email'] . "', '" . $_POST['address'] . "', '" . $_POST['mobile'] . "')");
*/

//$ok = $conn->query("INSERT INTO `user`(`full_name`, `email`, `photo`, `mobile`, `address`) VALUES ('" . $_POST['fullname'] . "','" . $_POST['email'] . "','/php/".$target_file."','" . $_POST['mobile'] . "','" . $_POST['address'] . "')");
$ok = 0;
if(isset($_POST['mk_date']) && isset($_POST['exp_date'])) {
    $json['msg'] = $_POST['mk_date'];
    $ok = $conn->query("INSERT INTO `product`(`pro_name`, `buy_price`, `sale_price`, `unit`, `ca_id`, `make_date`, `expiry_date`) 
VALUES (\"" . $_POST['pro_name'] . "\",\"" . $_POST['buy_price'] . "\",\"" . $_POST['sale_price'] . "\",\"" . $_POST['unit'] . "\",\"" . $_POST['ca_id'] . "\",\"" . $_POST['mk_date'] . "\",\"" . $_POST['exp_date'] . "\")");
} else
    $ok = $conn->query("INSERT INTO `product`(`pro_name`, `buy_price`, `sale_price`, `unit`, `ca_id`) VALUES ('".$_POST['pro_name']."','".$_POST['buy_price']."','".$_POST['sale_price']."','".$_POST['unit']."','".$_POST['ca_id']."')");

if ($ok == 1)
    $json['msg'] = "yes";
else
    $json['msg'] = "no".$_POST['exp_date'].$conn->error;
$conn->close();
echo json_encode($json);
?>
