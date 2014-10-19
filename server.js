var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var mongo = require('mongodb');
var mongoose = require('mongoose');

var users = require('./routes/users');

///////////////////// Configure database
var workoutSchema = mongoose.Schema({
	weeks: Number,
	days: [],
	type: String,
	exercises: [] //array of ids to cardio or lifting
});
var cardioSchema = mongoose.Schema({
	exercise: String,
	length: Number
});
var liftingSchema = mongoose.Schema({
	lift: String,
	weight: Number,
	sets: Number,
	reps: Number
});
var userSchema = mongoose.Schema({
    username: String,
    password: String,
    displayname: String,
    age: Number,
    height: String,
    weight: Number,
    level: String
});

var Workout = mongoose.model('Workout',workoutSchema);
var Cardio = mongoose.model('Cardio',cardioSchema);
var Lift = mongoose.model('Lift',liftingSchema);
var User = mongoose.model('User',userSchema);


///////////////////// Routing


var app = express();

app.use(cookieParser());

app.use(function(req,res, next){
    req.userDB = User;
    req.workoutDB = Workout;
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