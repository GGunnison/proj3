var http = require("http");
var express = require('express');
var request = require('request');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res) {
	
	var host_str = 'http://localhost:3000';


	request.post({url:host_str + '/users', form:{
		'username' : 'Grant1',
		'password' : 'hello1',
		'displayName' : 'Dirk1',
		'birthday' : '01-26-1994',
		'height' : '5\' 9\"',
		'weight' : '140',
		'level' : 'amateur'}
	}, function(err,res,body) {

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
		workout: {username: 'username'}, 
		dates: {parentWorkout: 'parentWorkout', date: 'date'},
		exercises: {parentDate: 'parentDate', name: 'name', type: 'type'},
		lifts: {parentExercise: 'parentExercise', name: 'name', reps: 'reps', sets: 'sets', weight: 'weight'}
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
});



module.exports = router;