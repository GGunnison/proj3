var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var mongo = require('mongodb');
var mongoose = require('mongoose');

var users = require('./routes/users');

///////////////////// Configure database
var Workout = mongoose.Schema({
	username: String,
	dates: [Date]
});

var Date = mongoose.Schema({
	date: String,
	workout: [Exercise]
});

var Exercise = mongoose.Schema({
	name: String,
	type: String,
	//has all fields, only take relevant based on type

	//cardio
	exercise: String,
	length: Number

	//lifting
	lift: String,
	weight: Number,
	sets: Number,
	reps: Number
});


var userSchema = mongoose.Schema({
    username: String,
    password: String,
    displayname: String,
    birthday: String,
    height: String,
    weight: Number,
    level: String
});

var Workout = mongoose.model('Workout',workoutSchema);
var Date = mongoose.model('Date',dateSchema);
var Exercise = mongoose.model('Exercise',exerciseSchema);
var User = mongoose.model('User',userSchema);


///////////////////// Routing


var app = express();

app.use(cookieParser());

app.use(function(req,res, next){
    req.userDB = User;
    req.workoutDB = Workout;
    req.dateDB = Date;
    req.exerciseDB = Exercise;
    req.liftDB = Lift;
    req.cardioDB = Cardio;
    next();
});

//var index = require('./routes/index');
var workout = require('./routes/workout'); 

//app.use('/', index);
app.use('/workout', workout);

module.exports = app;

app.listen(process.env.OPENSHIFT_NODEJS_PORT || 8080, process.env.OPENSHIFT_NODEJS_IP);
console.log("Listening on port 8080");