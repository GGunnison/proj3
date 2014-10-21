var http = require("http");
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	res.render('index', { title: 'Express' });


	var options = {
		host: 'localhost',
		port: 3000,
		path: '/users/testing',
		method: 'GET'
	};
	console.log("making get request");
	//on initial response
	var req = http.request(options, function(res)
	{
		console.log("got request");
		console.log(res.testing);
	});

});

module.exports = router;
