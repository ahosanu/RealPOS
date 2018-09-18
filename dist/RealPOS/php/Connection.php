<?php
/**
 * Created by PhpStorm.
 * User: ahosa
 * Date: 2/8/2018
 * Time: 2:40 PM
 */

class Connection
{
    public $sqlconnection = null;
    public function conn(){
        $conn = new mysqli('localhost','root','','realpos');
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }
        return $conn;
    }
}