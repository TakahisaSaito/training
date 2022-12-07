<?php 

// $_POSTで受け取れる

// 例えば、年齢を追加して返す
$res['name'] = $_POST['name'];

// echoすると返せる
echo json_encode($res); // json形式にして返す

?>