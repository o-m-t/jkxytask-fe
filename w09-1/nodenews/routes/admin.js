var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dbconfig = require('./db.js')

var connection = mysql.createPool(dbconfig);

/* 获取所有新闻 */
router.get('/getnews', function(req, res, next) {
	var newstype = req.query.newstype;
	console.log('获取新闻列表 ' +  newstype);
	var sql = '';
	if (newstype) {
		sql = 'SELECT * FROM `news` where `newstype` = ? order by `newstime` desc,`id` desc';
	} else {
		sql = 'SELECT * FROM `news` order by `newstime` desc,`id` desc';
	}
	
	connection.query(sql,function(err, rows, fields) {
		if (err) throw err;
		// console.log(rows);
		res.json(rows);
	});
});

/* 新增一条新闻 */
router.post('/insertnews', function(req, res, next) {
	var newstype = req.body.newstype;
	var newstitle = req.body.newstitle;
	var newsimg = req.body.newsimg;
	var newstime = req.body.newstime;
	var newssrc = req.body.newssrc;
	console.log('新增 ' + newstitle);
	var sql = 'INSERT INTO `news` (`newstype`, `newstitle`, `newsimg`, `newstime`, `newssrc`) VALUES (?, ?, ?, ?, ?)';
	
	connection.query(sql, [newstype, newstitle, newsimg, newstime, newssrc], function(err, rows, fields) {
		if (err) throw err;
		// console.log(rows);
		res.json(rows.insertId);
	});
});

/* 删除一条新闻 */
router.post('/delnews', function(req, res, next) {
	var delId = req.body.delId;
	console.log('删除 ' + delId);
	var sql = 'delete from `news` where `id` = ?';
	
	connection.query(sql, [delId], function(err, rows, fields) {
		if (err) throw err;
		// console.log(rows);
		res.json(rows.affectedRows);
	});
});

/* 获取一条新闻 */
router.post('/currentnews', function(req, res, next) {
	var updateId = req.body.updateId;
	console.log('获取 ' + updateId);
	var sql = 'select * from `news` where `id` = ?';
	
	connection.query(sql, [updateId], function(err, rows, fields) {
		if (err) throw err;
		// console.log(rows);
		res.json(rows);
	});
});

/* 修改一条新闻 */
router.post('/updatenews', function(req, res, next) {
	var updateId = req.body.updateId;
	var newstype = req.body.newstype;
	var newstitle = req.body.newstitle;
	var newsimg = req.body.newsimg;
	var newstime = req.body.newstime;
	var newssrc = req.body.newssrc;
	console.log('修改 ' + updateId);
	var sql = 'update `news` set `newstype`=?, `newstitle`=?, `newsimg`=?, `newstime`=?, `newssrc`=? where `id`=?';
	
	connection.query(sql, [newstype, newstitle, newsimg, newstime, newssrc, updateId], function(err, rows, fields) {
		if (err) throw err;
		// console.log(rows);
		res.json(rows.changedRows);
	});
});


module.exports = router;
