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
	request.post({url:host_str + '/workout/addWorkout', form:{
		workout: {username: 'username'}, 
		dates: {parentWorkout: 'parentWorkout', date: 'date'},
		exercises: {parentDate: 'parentDate', name: 'name', type: 'type'},
		lifts: {parentExercise: 'parentExercise', name: 'name', reps: 'reps', sets: 'sets', weight: 'weight'}}}, function(err,res,body){
			console.log('Body ' + body);
	});*/


	// request.post({url:host_str + '/workout/addWorkout', form:{
	// 	workout: {username: 'username'}, 
	// 	dates: {parentWorkout: 'parentWorkout', date: 'date'},
	// 	exercises: {parentDate: 'parentDate', name: 'name', type: 'type'},
	// 	lifts: {parentExercise: 'parentExercise', name: 'name', reps: 'reps', sets: 'sets', weight: 'weight'}}}, function(err,res,body){
	// 		console.log('Body ' + body);
	// });

	
	//successfully calls add workout with parameter object
	request.post({url:host_str + '/workout/addWorkout', form:{
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
	


	console.log('checking authentication');
	request.post({url:host_str + '/users/add', form:{
		'username': "Grant", "password": "hello", "displayname": "Grant",
		'birthday': '02-13-34', "height": "5'1", "weight": 153, 'level': 'pro'
	}}, function(err,res,body) {
		console.log('created user');
		request.post({url:host_str + '/users/login', form:{
			username: 'Grant',
			password: 'hello'
		}}, function(err,res,body) {
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
				console.log('posted workout');
				console.log(body);
			});
		})
	});


	// request.post({host_str + '/users/add', form:{
	// 	'username': "Grant", "password": "hello", "displayname": "Grant",
	// 	'birthday': '02-13-34', "height": "5'1", "weight": 153, 'level': 'pro'
	// }}, function(err,res,body) {
	// 	console.log('created user');
		
	// });

	/*
	//functional delete test
	request.del(host_str + '/workout', function(err,res,body) {
		console.log(body);
	});
	*/

	// request.post({url:host_str + '/workout/addlift', form:{
	// 	exerciseID: "5446f2a86dbd1b401e1abe11",
	// 	liftID: "5446f2ae6dbd1b401e1abe16"
	// }}, function(err,res,body) {

	// 		console.log(body);
	// });


	// request.del(host_str + '/workout', function(err,res,body) {
	// 	console.log(body);
	// });


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