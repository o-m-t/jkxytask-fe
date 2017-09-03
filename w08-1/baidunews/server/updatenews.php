<?php
	require_once('db.php');
	// 根据id查询新闻
	if ($link) {
		$updateId = $_POST['updateId'];
		$newstype = $_POST['newstype'];
		$newstitle = $_POST['newstitle'];
		$newsimg = $_POST['newsimg'];
		$newstime = $_POST['newstime'];
		$newssrc = $_POST['newssrc'];

		$sql  = "update `news` set `newstype`='{$newstype}', `newstitle`='{$newstitle}', `newsimg`='{$newsimg}', `newstime`='{$newstime}', `newssrc`='{$newssrc}' where `id`='{$updateId}'";
		mysqli_query($link, 'set names utf8');
		$result = mysqli_query($link, $sql);
		echo json_encode(array('success' => $result));
	} else {
		echo json_encode(array('success' => 'none'));
	}
	mysqli_close($link);

?>