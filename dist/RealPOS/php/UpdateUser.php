
<?php
include './Connection.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET, POST, PUT");

$conn = new Connection();
$conn = $conn->conn();
$json = array();

if (isset($_POST['img'])) {
    $target_dir = "image/";
    $target_file = $target_dir . time() . '_image.png';
    if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
        if (isset($_POST['photo'])){
            if($_POST['photo'] != null)
                unlink($target_dir.basename($_POST['photo']));
        }
        $ok = $conn->query("UPDATE `user` SET `full_name`=\"".$_POST['fullname']."\",`email`=\"".$_POST['email']."\",`mobile`=\"".$_POST['mobile']."\",`address`=\"".$_POST['address']."\",`photo`='/php/" . $target_file . "' WHERE `us_id` = '".$_POST['id']."'");
        if (isset($_POST['type']))
            $ok = $conn->query("UPDATE `user_security` SET `ut_id`='" . $_POST['type'] . "' WHERE `us_id` = '".$_POST['id']."'");
    } else
        $ok = 0;
} else {
    $ok = $conn->query("UPDATE `user` SET `full_name`=\"".$_POST['fullname']."\",`email`=\"".$_POST['email']."\",`mobile`=\"".$_POST['mobile']."\",`address`=\"".$_POST['address']."\" WHERE `us_id` = '".$_POST['id']."'");
    if (isset($_POST['type']))
        $ok = $conn->query("UPDATE `user_security` SET `ut_id`='" . $_POST['type'] . "' WHERE `us_id` = '".$_POST['id']."'");
}
if($ok == 1) {
    $json['msg'] = "yes";
} else {
    $json['msg'] = "no";
}

    $conn->close();

echo json_encode($json);
?>
