var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dbconfig = require('./db.js')

/* 主页 根据新闻类别获取新闻 */
router.get('/', function(req, res, next) {
	var newstype = req.query.newstype;
	console.log(newstype);
	var connection = mysql.createConnection(dbconfig);

	connection.connect();

	var sql = '';
	if (newstype) {
		sql = 'SELECT * FROM `news` where `newstype` = ? order by `newstime` desc,`id` desc';
	} else {
		sql = 'SELECT * FROM `news` order by `newstime` desc,`id` desc';
	}
	
	connection.query(sql,[newstype],function(err, rows, fields) {
		if (err) throw err;
		// console.log(rows);
		res.json(rows);
	});
});

module.exports = router;
