var express = require('express');
var router = express.Router();

var requireAuthentication = function(req,res,next) {
	if (!req.currentUser) {
		utils.sendErrResponse(res, 403, 'Must be logged in to perform this action.');
	} 
	else {
		next();
	}
};

var requireContent = function(req, res, next) {
	if (!req.body.content) {
		utils.sendErrResponse(res, 400, 'Content required in request.');
	} else {
		next();
	}
};

//next two methods and definitions from example API code https://github.com/kongming92/6170-p3demo
router.all('*', requireAuthentication);
router.post('*', requireContent);

//get all of a user's workouts
//method modified from example API code https://github.com/kongming92/6170-p3demo
router.get('/', function(req,res) {
	var Workouts = req.workoutDB;
	var user =  ; //TODO: get current username here
	Workouts.find({username: user}, function(err, workouts) {
		if (err) {
			utils.sendErrResponse(res, 500, 'An unknown error occurred.');
		}
		else {
			utils.sendSuccessResponse(res, {workouts: workouts});
		}
	});
});

//add a workout to a user's list of workouts
router.post('/', function(req,res) {
	var Workouts = req.workoutDB;
	var user =  ; //TODO: get current username here
	Workouts.save({username: user, weeks:req.body.weeks, days:req.body.days, type: req.body.type, 
				exercises:req.body.exercises}, function(err) {
		if (err) {
			utils.sendErrResponse(res, 500, 'An unknown error occurred.');
		}
		else {
			utils.sendSuccessResponse(res);
		}
	});
});

//get the exercises from a workout
router.get('/exercise', function(req,res) {

});

//add an exercise to an existing workout
//look up workouts by name
router.post('/exercise', function(req,res) {
	var Workouts = req.workoutDB;
	var user =  ; //TODO: get current username here
	Workouts.findOne({username:user, })
});



module.exports = router;