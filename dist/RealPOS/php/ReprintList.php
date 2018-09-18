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
header("Access-Control-Allow-Methods: GET, POST, PUT");

$conn = new Connection();
$conn = $conn->conn();
session_start();
$data = array();
//if (isset($_SESSION['id'])) {
    //$result = $conn->query("SELECT * FROM `user_type` JOIN (SELECT `user`.full_name,`user`.`email`,`user`.`address`,`user`.`mobile`,`user`.`photo`,`user_security`.`ut_id`,`user_security`.`us_id` FROM `user` JOIN `user_security` ON `user`.us_id = `user_security`.`us_id`) as T1 ON `user_type`.`ut_id` = T1.ut_id WHERE NOT `us_id` = '".$_SESSION['id']."'");
    $result = $conn->query("SELECT pro_name,sale_price,`buy_product`.`unit`,discount FROM `product` JOIN `buy_product` ON `product`.`pro_id` = `buy_product`.`pro_id` and `buy_product`.`in_id` = '".$_GET['id']."'");
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()){
            $data[] = $row;
        }
    }
//}

echo json_encode($data);
?>