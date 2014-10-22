var express = require('express');
var router = express.Router();
var utils = require('../utils/utils');

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
//router.all('*', requireAuthentication);
//router.post('*', requireContent);

//get an user's workouts
//method modified from example API code https://github.com/kongming92/6170-p3demo
router.get('/', function(req,res) {
	var workouts = req.workoutDB;
	
	workouts.findOne({username: req.cookies.username}, function(err, workout) {
		if (err) {
			utils.sendErrResponse(res, 500, 'An unknown error occurred.');
		}
		else {
			utils.sendSuccessResponse(res, {workout: workout});
		}
	});
});

//add a workout to a user's list of workouts

//HOW DO WE BUILD/PACKAGE THE WORKOUTS?? 
// HOW DO WE INSERT THE OBJECT??
router.post('/', function(req,res) {
	console.log('in workout post /');
	var Workouts = req.workoutDB;
	var Dates = req.dateDB;
	var Exercises = req.exercisesDB;
	var Lifts = req.liftDB;

	var workout = new Workouts({username: "Bob"});
	workout.save(function(err){
		if (err) return handleError(err);
		var date = new Dates({parentWorkout: workout._id,date:'10-21-2014'});
		date.save(function(err){
			if (err) return console.log(err);
			var exercise = new Exercises({parentDate: date._id,name:'Chest',type:'lift'});
			exercise.save(function(err){
				if (err) return handleError(err);
				var lift = new Lifts({parentExercise: exercise._id,name:'bench',reps:5,sets:2,weight:85});
				lift.save(function(err){
					if (err) return handleError(err);
				});
			});
		});
	});
});

	//exercises.findOne()

	/*
	var lift = {name : req.body.liftName, 
	var


	var dateObject = 
	
	workouts.update({username: req.cookies.username},
	 {$addToSet{dates: dateObject}}, function(err) {
		if (err) {
			utils.sendErrResponse(res, 500, 'An unknown error occurred.');
		}
		else {
			utils.sendSuccessResponse(res);
		}
>>>>>>> 91b2ea7f7af4afef4cbe04f1edff66ef96856eaa
	});
});


//add or edit exercise to an existing workout
//look up workouts by name, date
router.put('/', function(req,res) {
	var workouts = req.workoutDB;
	var user =  req.body.username;
	var date = req.body.date;

	workouts.findOne({username:user}, function(err, workout) {
	
		workout.dates.findOne({date:date}, function(err, date){
			if (err){
				//add new date with all exercises...
				//workouts.update({username:user}, {$addToSet: {dates: date}}, function...)
			}else{
				//edit existing
				utils.sendSuccessResponse(res, date.workout)
			}
		});
	})
});
//delete all workout? one day? one excerise? -- different methods for these?
router.delete('/:username', function(req, res){

    workouts.findOne({username: req.username}, function(err, workout){
        if (workout){
            workouts.remove({username: req.username}, function(err, user){
                if (err){
                    utils.sendErrResponse(res, 500, "Could not delete from database")
                }else{
                    utils.sendSuccessResponse(res, {user:user});
                }
            });
        }else{
            utils.sendErrResponse(res, 500, "No workout for this user")
        }
    });
});




module.exports = router;



/*

edit workouts -- mean extending or changing specific days

delete workouts -- actually delete all the information

*/