<?php
	require_once('db.php');
	// 插入新闻
	if ($link) {
		$newstype = $_POST['newstype'];
		$newstitle = $_POST['newstitle'];
		$newsimg = $_POST['newsimg'];
		$newstime = $_POST['newstime'];
		$newssrc = $_POST['newssrc'];
		$sql  = "INSERT INTO `news` (`newstype`, `newstitle`, `newsimg`, `newstime`, `newssrc`) VALUES ('{$newstype}', '{$newstitle}', '{$newsimg}', '{$newstime}', '{$newssrc}')";
		mysqli_query($link, 'set names utf8');
		$result = mysqli_query($link, $sql);
		echo json_encode(array('success' => $result));
	} else {
		echo json_encode(array('success' => 'none'));
	}
	mysqli_close($link);

?>