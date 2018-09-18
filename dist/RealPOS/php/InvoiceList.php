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
    $result = $conn->query("SELECT `in_id`,`in_id` as `number`,`in_serial`,`full_name`,`date_time`,`address`,`email`,`mobile`,`pay_on`,`change_amount`, `t1`.`bu_name`,`t1`.`bu_mobile`,`t1`.`bu_address` FROM `user` RIGHT JOIN (SELECT `invoice`.`in_serial`,`pay_on`,`change_amount`,`invoice`.`us_id`,`invoice`.`in_id`,`invoice`.`date_time`,`buyer`.`bu_name`,`buyer`.`bu_mobile`,`buyer`.`bu_address` FROM `buyer` RIGHT JOIN `invoice` ON `buyer`.`bu_id` = `invoice`.`bu_id`) as `t1` ON `user`.`us_id` = `t1`.`us_id`");
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