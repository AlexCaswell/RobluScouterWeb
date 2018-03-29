<?php


$url = $_POST['url'];

$ch = curl_init();

if($_POST['post'] == 'true') {
	$params = json_decode($_POST['params']);
	curl_setopt($ch, CURLOPT_POSTFIELDS, $params);
}
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

	echo curl_exec($ch);
	curl_close($ch);


?>