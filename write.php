<?php
error_reporting(E_ALL);
$data = $_POST['data'];
$f = fopen('test.json', 'w+');
$string_data = json_encode($data);
fwrite($f, $string_data);
fclose($f);
?>
