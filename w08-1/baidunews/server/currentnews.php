<?php
	require_once('db.php');
	// 根据id查询新闻
	if ($link) {
		$updateId = $_POST['updateId'];
		
		$sql  = "select * from `news` where `id` = '{$updateId}'";
		mysqli_query($link, 'set names utf8');
		$result = mysqli_query($link, $sql);
		$senddata = array();
		while ($row = mysqli_fetch_assoc($result)) {
			array_push($senddata, array(
				'id' => $row['id'],
				'newstype' => $row['newstype'],
				'newstitle' => $row['newstitle'],
				'newsimg' => $row['newsimg'],
				'newstime' => $row['newstime'],
				'newssrc' => $row['newssrc']));
		}
		echo json_encode($senddata);
	} else {
		echo json_encode(array('success' => 'none'));
	}
	mysqli_close($link);

?>