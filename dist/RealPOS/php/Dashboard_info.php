<?php
include './Connection.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json");

$acc = array('permission'=>'no');

$conn = new Connection();
$conn = $conn->conn();
if(isset($_GET['start']) && isset($_GET['end'])) {
    $result = $conn->query("SELECT * FROM (SELECT count(us_id) as customer FROM `user` WHERE `user`.`us_id` NOT IN (SELECT `user_security`.`us_id` FROM `user_security`)) as t3 JOIN (SELECT sum(quantity) as total_item, sum(Sale_amount) as sale_price, sum((Sale_amount - buy_amount)) as profit FROM (SELECT `t1`.`pro_id`,pro_name,buy_price,sale_price,buy_unit,expiry_date,`sale_unit`,quantity, (sale_unit * sale_price) as Sale_amount, (Sale_unit * buy_price) as buy_amount FROM (SELECT `product`.`pro_id`,`product`.`unit` as quantity,pro_name,buy_price,sale_price,(total_sale + unit) as buy_unit,expiry_date FROM `product` LEFT JOIN (SELECT `buy_product`.`pro_id`, sum(`buy_product`.`unit`) as `total_sale` FROM `buy_product` JOIN `invoice` ON `buy_product`.`in_id` = `invoice`.`in_id` GROUP BY `buy_product`.`pro_id`) as t1 ON `product`.`pro_id` = t1.`pro_id`) as t1 LEFT JOIN (SELECT `buy_product`.`pro_id`, sum(`buy_product`.`unit`) as `sale_unit` FROM `buy_product` JOIN `invoice` ON `buy_product`.`in_id` = `invoice`.`in_id`  and `invoice`.`date_time` >= '".$_GET['start']."' and `invoice`.`date_time` <= '".$_GET['end']."' GROUP BY `buy_product`.`pro_id`) as t2 ON t1.pro_id = t2.pro_id) as t1) as t1");
}else{
    $result = $conn->query("SELECT customer,total_item,sale_price, buy_price,(sale_price - buy_price) as profit FROM (SELECT sum(`product`.`unit`) as total_item FROM `product`) as t1 JOIN (SELECT SUM(`buy_product`.`unit` * `product`.`sale_price`) as sale_price,SUM(`buy_product`.`unit` * `product`.`buy_price`) as buy_price  FROM `product` JOIN `buy_product` ON `product`.`pro_id` = `buy_product`.`pro_id`) as t2 JOIN (SELECT count(us_id) as customer FROM `user` WHERE `user`.`us_id` NOT IN (SELECT `user_security`.`us_id` FROM `user_security`)) as t3");
}
if($result->num_rows > 0) {
    $row  = $result->fetch_assoc();
    $acc = $row;
}else{
    $acc['permission'] = "Wrong E-Mail Address!";
}
echo json_encode($acc);
?>
