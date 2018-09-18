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
$data = array();
//if (isset($_SESSION['id'])) {
    //$result = $conn->query("SELECT * FROM `user_type` JOIN (SELECT `user`.full_name,`user`.`email`,`user`.`address`,`user`.`mobile`,`user`.`photo`,`user_security`.`ut_id`,`user_security`.`us_id` FROM `user` JOIN `user_security` ON `user`.us_id = `user_security`.`us_id`) as T1 ON `user_type`.`ut_id` = T1.ut_id WHERE NOT `us_id` = '".$_SESSION['id']."'");
    $result = $conn->query("SELECT pro_id as number, pro_id, pro_name, buy_price, sale_price, unit, make_date,expiry_date, Ca_name,discount FROM `product` JOIN category ON product.ca_id = category.ca_id");
    if ($result->num_rows > 0) {
        $k = 1;
        while($row = $result->fetch_assoc()){
            $row['number'] = $k++;
            $data[] = $row;
        }
    }
//}

echo json_encode($data);
?>