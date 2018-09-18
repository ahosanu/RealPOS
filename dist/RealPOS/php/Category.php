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
$data = array();

$result = $conn->query("SELECT `category`.ca_id as number,count(`product`.`pro_id`) as total_item, `category`.ca_id, ca_name, discount FROM `category` LEFT JOIN `product` ON category.ca_id = product.ca_id GROUP BY category.ca_id");
if ($result->num_rows > 0) {
    $k = 1;
    while($row = $result->fetch_assoc()){
        $row['number'] = $k++;
        $data[] = $row;
    }
}
echo json_encode($data);
?>