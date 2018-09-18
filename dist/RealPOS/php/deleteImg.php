<?php
/**
 * Created by PhpStorm.
 * User: Ahosan Ullah
 * Date: 16-Sep-18
 * Time: 3:57 PM
 */

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET, POST, PUT");
$json = array();
if(isset($_GET['code'])) {
    $file_name = $_GET['code'];
    unlink("./image/".$file_name.".png");
    $json['msg'] = 'yes';
}
echo json_encode($json);
?>