
<?php
include './Connection.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET, POST, PUT");

$conn = new Connection();
$conn = $conn->conn();
$json = array();

$ok = 0;
$exp_date = $_POST['exp_date'] === 'null' ? 'NULL' : $_POST['exp_date'];
$mk_date = $_POST['mk_date'] === 'null' ? 'NULL' : $_POST['mk_date'];

//$ok = $conn->query("UPDATE `product` SET `pro_name`=\"".$_POST['pro_name']."\",`buy_price`=\"".$_POST['buy_price']."\",`sale_price`=\"".$_POST['sale_price']."\",`unit`=\"".$_POST['unit']."\",`ca_id`=\"".$_POST['ca_id']."\",`make_date`='". $mk_date ."',`expiry_date`='" .$exp_date."' WHERE `pro_id`= \"".$_POST['pro_id']."\"");
$ok = "UPDATE `product` SET `pro_name`=\"".$_POST['pro_name']."\",`buy_price`=\"".$_POST['buy_price']."\",`sale_price`=\"".$_POST['sale_price']."\",`unit`=\"".$_POST['unit']."\",`ca_id`=\"".$_POST['ca_id']."\",`make_date`=$mk_date,`expiry_date`=$exp_date WHERE `pro_id`= \"".$_POST['pro_id']."\"";
$ok = $conn->query($ok);

if ($ok == 1)
    $json['msg'] = "yes";
else
    $json['msg'] = "no".$ok;
$conn->close();
echo json_encode($json);
?>
