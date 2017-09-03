<?php
	require_once('db.php');
	// 删除新闻
	if ($link) {
		$delId = $_POST['delId'];
		
		$sql  = "delete from `news` where `id` = '{$delId}'";
		mysqli_query($link, 'set names utf8');
		$result = mysqli_query($link, $sql);
		echo json_encode(array('success' => $result));
	} else {
		echo json_encode(array('success' => 'none'));
	}
	mysqli_close($link);

?>