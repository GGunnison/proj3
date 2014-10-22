var http = require("http");
var express = require('express');
var request = require('request');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	
	var host_str = 'http://localhost:3000';

	
	// request.post({url:host_str + '/users', form:{
	// 	'username' : 'Grant',
	// 	'password' : 'hello',
	// 	'displayName' : 'Dirk1',
	// 	'birthday' : '01-26-1994',
	// 	'height' : '5\' 9\"',
	// 	'weight' : '140',
	// 	'level' : 'amateur'}
	// }, function(err,res,body) {
	// 	console.log(body);
	// });
	

	request.post({url:host_str + '/workout', form:{
		'weight': 100
	}}, function(err,res,body) {
		console.log(body);
	});

	// request.post({url:host_str + '/workout', form:{
	// 	'username' : 'dirk3',
	// 	'password' : 'password',
	// 	'displayName' : 'Dirk',
	// 	'birthday' : '01-26-1994',
	// 	'height' : '5\' 9\"',
	// 	'weight' : '140',
	// 	'level' : 'amateur'}
	// }, function(err,res,body) {
	// 	console.log(body);
	// });

});



module.exports = router;