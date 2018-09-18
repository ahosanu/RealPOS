
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
if ($_POST['m_id'] == "no") {
    $ok = $conn->query("INSERT INTO `buyer`(`bu_name`, `bu_mobile`, `bu_address`) VALUES ('".$_POST['name']."','".$_POST['mobile']."','".$_POST['address']."')");
   if ($ok == 1)
        $ok = $conn->query("INSERT INTO `invoice`(`bu_id`, `saler_id`, `in_serial`, `vat_rat`, `pa_id`, `date_time`) VALUES (\"" . $conn->insert_id . "\",'1','rp-" . time() . "','" . $_POST['vat'] . "','" . $_POST['pay'] . "','" . time() . "')");
} else {
    $ok = $conn->query("INSERT INTO `invoice`(`saler_id`, `us_id`, `in_serial`, `vat_rat`, `pa_id`, `date_time`) VALUES ('1',\"" . $_POST['m_id'] . "\",'rp-" . time() . "','" . $_POST['vat'] . "','" . $_POST['pay'] . "','" . time() . "')");
}
if($ok == 1)
    $json['msg'] = $conn->insert_id;
else
    $json['msg'] = "no";
/*$json['msg'] = "2";*/
$conn->close();
echo json_encode($json);
?>
