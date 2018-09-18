
<?php
include './Connection.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET, POST, PUT");

$conn = new Connection();
$conn = $conn->conn();
$json = array();

/*    $conn->query("INSERT INTO `user`(`type_id`, `full_name`, `password`, `email`, `address`, `mobile`) VALUES
('" . $_POST['type'] . "', '" . $_POST['fullname'] . "', '12345' ,'" . $_POST['email'] . "', '" . $_POST['address'] . "', '" . $_POST['mobile'] . "')");
*/
if (isset($_POST['img'])) {
    $target_dir = "image/";
    $target_file = $target_dir . time() . '_image.png';

    if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
        $ok = $conn->query("INSERT INTO `user`(`full_name`, `email`, `photo`, `mobile`, `address`) VALUES ('" . $_POST['fullname'] . "','" . $_POST['email'] . "','/php/" . $target_file . "','" . $_POST['mobile'] . "','" . $_POST['address'] . "')");
        if (isset($_POST['user_name']) && $ok == 1)
            $okk = $conn->query("INSERT INTO `user_security`(`us_id`, `us_name`, `password`, `ut_id`) VALUES ('" . $conn->insert_id . "','" . $_POST['user_name'] . "','" . md5('12345') . "','" . $_POST['type'] . "')");

        if ($ok == 1)
            $json['msg'] = "yes";
        else {
            $json['msg'] = "no";
            unlink($target_dir);
        }
    } else
        $json['msg'] = "no";

} else {
    $ok = $conn->query("INSERT INTO `user`(`full_name`, `email`, `photo`, `mobile`, `address`) VALUES ('" . $_POST['fullname'] . "','" . $_POST['email'] . "','/php/image/user.png','" . $_POST['mobile'] . "','" . $_POST['address'] . "')");
    if (isset($_POST['user_name']) && $ok == 1)
        $okk = $conn->query("INSERT INTO `user_security`(`us_id`, `us_name`, `password`, `ut_id`) VALUES ('" . $conn->insert_id . "','" . $_POST['user_name'] . "','" . md5('12345') . "','" . $_POST['type'] . "')");

    if ($ok == 1)
        $json['msg'] = "yes";
    else {
        $json['msg'] = "no";
    }
}
    $conn->close();

echo json_encode($json);
?>
