var http = require("http");
var express = require('express');
var request = require('request');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	res.render('index', { title: 'Express' });
	
	require('request').debug = true


	request('http://localhost:3000/users/testing', function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	    console.log(body);
	  }
	});

});

module.exports = router;
