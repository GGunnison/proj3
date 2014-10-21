var http = require("http");
var express = require('express');
var request = require('request');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	
	var host_str = 'http://localhost:3000';

	var formData = {
		'username' : 'dirk',
		'password' : 'password',
		'displayname' : 'Dirk',
		'birth' : '01-26-1994',
		'height' : '5\' 9\"',
		'weight' : '140',
		'level' : 'amateur',
		'content-type': 'application/json; charset=UTF-8'
	};

	/*request.post({url:host_str + '/users', formData:formData}, function optionalCallback(err, res, body) {
	  if (err) {
	    return console.error(err);
	  }

	  console.log('Success! Response body:', body);
	  //res.render('index', { title: 'Express' });
	});
	*/

	request.post({url:host_str + '/users', form:{'username':'dirk', 'password':'password'}});

});

module.exports = router;