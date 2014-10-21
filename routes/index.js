var http = require("http");
var express = require('express');
var request = require('request');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	// res.render('index', { title: 'Express' });
	
	var host_str = 'http://localhost:3000';

	var formData = {
	  my_field: 'my_value',
	};

	request.post({url:host_str + '/users', formData: formData}, function optionalCallback(err, httpResponse, body) {
	  if (err) {
	    return console.error('upload failed:', err);
	  }
	  console.log('Upload successful!  Server responded with:', body);
	});

});

module.exports = router;