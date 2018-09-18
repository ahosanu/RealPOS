<?php
include './Connection.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json");

$acc = array('permission'=>'no');

$conn = new Connection();
$conn = $conn->conn();

$result = $conn->query("SELECT `us_id`,`us_name`,`password`,`access` FROM (SELECT `user_security`.`us_id`,`user_security`.`us_name`,`user_security`.`password`,`user_security`.`ut_id` FROM `user_security` WHERE  us_name = '". $_GET['user']."') as t1 JOIN `user_type` ON t1.ut_id = `user_type`.`ut_id`");

if($result->num_rows > 0) {
    $row  = $result->fetch_assoc();
    if($row['password'] == md5($_GET['password'])) {
            session_start();
            $acc['permission'] = "yes";
            $acc['access'] = $row['access'];
            $_SESSION['name'] = $row['us_name'];
            $_SESSION['id'] = $row['us_id'];
    }else{
        $acc['permission'] = "Wrong Password!";
    }
}else{
    $acc['permission'] = "Wrong E-Mail Address!";
}
echo json_encode($acc);
?>
