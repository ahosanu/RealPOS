<?php
include './Connection.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json");

$conn = new Connection();
$conn = $conn->conn();
session_start();
//if (isset($_SESSION['id'])) {
   // $result = $conn->query("SELECT `full_name`,`ut_name`,`us_id` FROM `user_type` JOIN (SELECT `user`.full_name,`user_security`.`ut_id`,`user_security`.`us_id` FROM `user` JOIN `user_security` ON `user`.us_id = `user_security`.`us_id`) as T1 ON `user_type`.`ut_id` = T1.ut_id WHERE `us_id` = '" . $_SESSION['id'] . "'");
    $result = $conn->query("SELECT `full_name`,`ut_name`,`photo`,`us_id` FROM `user_type` JOIN (SELECT `user`.`photo`,`user`.full_name,`user_security`.`ut_id`,`user_security`.`us_id` FROM `user` JOIN `user_security` ON `user`.us_id = `user_security`.`us_id`) as T1 ON `user_type`.`ut_id` = T1.ut_id WHERE `us_id` = '1'");

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        echo json_encode($row);
    }
//}
?>
