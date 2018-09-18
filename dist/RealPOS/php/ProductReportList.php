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
    if(isset($_GET['start']) && isset($_GET['end'])) {
        $result = $conn->query("SELECT `pro_id`,pro_name,buy_price,sale_price,buy_unit,expiry_date,`sale_unit`,quantity, Sale_amount, buy_amount, (Sale_amount - buy_amount) as profit FROM (SELECT `t1`.`pro_id`,pro_name,buy_price,sale_price,buy_unit,expiry_date,`sale_unit`,quantity, (sale_unit * sale_price) as Sale_amount, (Sale_unit * buy_price) as buy_amount FROM (SELECT `product`.`pro_id`,`product`.`unit` as quantity,pro_name,buy_price,sale_price,(total_sale + unit) as buy_unit,expiry_date FROM `product` LEFT JOIN (SELECT `buy_product`.`pro_id`, sum(`buy_product`.`unit`) as `total_sale` FROM `buy_product` JOIN `invoice` ON `buy_product`.`in_id` = `invoice`.`in_id` GROUP BY `buy_product`.`pro_id`) as t1 ON `product`.`pro_id` = t1.`pro_id`) as t1 LEFT JOIN (SELECT `buy_product`.`pro_id`, sum(`buy_product`.`unit`) as `sale_unit` FROM `buy_product` JOIN `invoice` ON `buy_product`.`in_id` = `invoice`.`in_id` and `invoice`.`date_time` >= '".$_GET['start']."' and `invoice`.`date_time` <= '".$_GET['end']."' GROUP BY `buy_product`.`pro_id`) as t2 ON t1.pro_id = t2.pro_id) as t1");
     } else {
        $result = $conn->query("SELECT pro_id, pro_id as number,pro_name,quantity,sale_price,buy_price,sale_unit,buy_unit,buy_amount, sale_amount,(sale_amount-buy_amount) as profit,expiry_date FROM (SELECT pro_id,pro_name,quantity,sale_price,buy_price,sale_unit,buy_unit,(sale_unit * buy_price) as buy_amount,(sale_unit*sale_price) as sale_amount,expiry_date FROM (SELECT pro_id,pro_name,quantity,sale_price,buy_price,sale_unit,(sale_unit + quantity) as `buy_unit`,expiry_date FROM (SELECT `product`.`pro_id`,`product`.`pro_name`,`product`.`unit` as `quantity`,sum(`buy_product`.`unit`) as `sale_unit`,`product`.`buy_price`,`product`.`sale_price`,`product`.`expiry_date` FROM `buy_product` RIGHT JOIN `product` ON `buy_product`.`pro_id` = `product`.`pro_id` GROUP BY `product`.`pro_id`) as t1)as t1) as t1");
    }
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