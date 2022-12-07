<?php

$raw = file_get_contents('php://input');
$data = json_decode($raw);

$db =  new mysqli("wp-mysql.cazql5dnpwcc.ap-northeast-1.rds.amazonaws.com","root","tukaima0","test");

$name_query = "SELECT * FROM user WHERE username ='". $data[0] . "'" ;
$user_select = $db->query($name_query);
$position = $data_select->fetch_assoc();

if($position["position"] == 0){
    $position_name = 'worker';
}else{
    $position_name = 'manager';
};

$query = "SELECT * FROM list WHERE " . $position_name . "='". $data[0] . "'" ;
$data_select = $db->query($query);
$row = $data_select->fetch_all();

mysqli_close($db);

echo json_encode($row);

?>