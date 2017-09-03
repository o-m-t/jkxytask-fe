<?php
	require_once('db.php');
	// 查询新闻
	if ($link) {
		// 新闻类别
		$newstype = $_GET['newstype'];
		$sql = '';
		if($newstype){
			$sql = "SELECT * FROM `news` where `newstype` = '{$newstype}' order by `newstime` desc,`id` desc";
		} else {
			$sql = "SELECT * FROM `news` order by `newstime` desc,`id` desc";
			
		}
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
	// $arr = array('newstype' => '百家',
	// 	'newstitle' => 'ceshi标题',
	// 	'newsimg' => 'img/news_1.JPEG',
	// 	'newstime' => '2017-3-21',
	// 	'newssrc' => '网易'
	// 	);
	
	// echo json_encode($arr);
?>