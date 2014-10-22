var http = require("http");
var express = require('express');
var request = require('request');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res) {
	
	var host_str = 'http://localhost:3000';

	/*
	request.post({url:host_str + '/users', form:{
		'username' : 'Grant1',
		'password' : 'hello1',
		'displayName' : 'Dirk1',
		'birthday' : '01-26-1994',
		'height' : '5\' 9\"',
		'weight' : '140',
		'level' : 'amateur'}
	}, function(err,res,body) {
		*/

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
	
	/*
	//successfully calls add workout with parameter object
	request.post({url:host_str + '/workout', form:{
		username: 'Bob',
		date: 'date!!',
		exercise_name: 'chest',
		type: 'lift',
		lift_name: 'bench',
		reps: 5,
		sets: 3,
		weight: 100
	}}, function(err,res,body) {
		console.log(body);
	});
	*/

	request.del(host_str + '/workout', function(err,res,body) {
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