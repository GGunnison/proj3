var express = require('express');
var router = express.Router();
var utils = require('../utils/utils');
var objectID = require('mongodb').ObjectID;
var moment = require('moment');

var requireAuthentication = function(req,res,next) {
	console.log('in requireAuthentication');
	console.log(req.session.user);
	if (!req.session.user) {
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

//add a workout
router.post('/', function(req,res) {
	var Workouts = req.workoutDB;
	var Dates = req.dateDB;
	var Exercises = req.exercisesDB;
	var Lifts = req.liftDB;

	//username | parentWorkout date | parentDate name type | parentExercise name reps sets weight

	var workout = new Workouts({username: req.body.username});
	workout.save(function(err){
		if (err) utils.sendErrResponse(res, 500, 'Could not save workout to DB.');
		var date = new Dates({parentWorkout: workout._id, date:req.body.date});
		date.save(function(err){
			if (err) utils.sendErrResponse(res, 500, 'Could not save date to DB.');
			workout.dates.push(date);
			var exercise = new Exercises({parentDate: date._id,name:req.body.exercise_name,type:req.body.type});
			exercise.save(function(err){
				if (err) utils.sendErrResponse(res, 500, 'Could not save exercise to DB.');
				date.exercises.push(exercise);
				var lift = new Lifts({parentExercise: exercise._id,name:req.body.lift_name,reps:req.body.reps,sets:req.body.sets,weight:req.body.weight});
				lift.save(function(err){
					if (err) utils.sendErrResponse(res, 500, 'Could not save lift to DB.');
					exercise.lifts.push(lift);
					utils.sendSuccessResponse(res, {workout: workout, date: date, exercise: exercise, lift: lift});
				});
			});
		});
	});
});

//add a workout
router.post('/addWorkout', function(req,res) {
	var Workouts = req.workoutDB;
	var Dates = req.dateDB;
	var Exercises = req.exercisesDB;
	var Lifts = req.liftDB;

	//username | parentWorkout date | parentDate name type | parentExercise name reps sets weight

	var workout = new Workouts({username: req.body.username});
	workout.save(function(err){
		if (err) utils.sendErrResponse(res, 500, 'Could not save workout to DB.');
		var date = new Dates({parentWorkout: workout._id, date:req.body.date});
		date.save(function(err){
			if (err) utils.sendErrResponse(res, 500, 'Could not save date to DB.');
			workout.dates.push(date);
			var exercise = new Exercises({parentDate: date._id,name:req.body.exercise_name,type:req.body.type});
			exercise.save(function(err){
				if (err) utils.sendErrResponse(res, 500, 'Could not save exercise to DB.');
				date.exercises.push(exercise);
				var lift = new Lifts({parentExercise: exercise._id,name:req.body.lift_name,reps:req.body.reps,sets:req.body.sets,weight:req.body.weight});
				lift.save(function(err){
					if (err) utils.sendErrResponse(res, 500, 'Could not save lift to DB.');
					exercise.lifts.push(lift);
					//Save everything
					exercise.save(function(err){
						if (err) utils.sendErrResponse(res, 500, 'Could not save exercise to DB.');
						date.save(function(err){
							if (err) utils.sendErrResponse(res, 500, 'Could not save date to DB.');
							workout.save(function(err){
								if (err) utils.sendErrResponse(res, 500, 'Could not save workout to DB.');
								utils.sendSuccessResponse(res, {workout: workout, date: date, exercise: exercise, lift: lift});
							});
						});
					});
				});
			});
		});
	});
});


//add lift to exercise
router.post('/addlift', function(req,res) {
	var exercises = req.exercisesDB;
	var lifts = req.liftDB;

	var liftID = req.body.liftID;
	var exerciseID = req.body.exerciseID;

	exercises.findOne({_id: exerciseID}, function(err,exercise){
		if (exercise){
			lifts.findOne({_id: liftID}, function(err, lift){
				if (lift){
					exercise.lifts.push(lift);
					exercise.save(function(err){
						if (err) utils.sendErrResponse(res, 500, 'Could not save exercise to DB.');
						utils.sendSuccessResponse(res, {exercise: exercise});
					});
				}else{
					utils.sendErrResponse(res, 500, 'That lift is not in the database.');
				}
			});
		}else{
			utils.sendErrResponse(res, 500, 'That exercise is not in the database.');
		}

	});
});


//add or edit exercise to an existing workout
//look up workouts by name, date
router.put('/', function(req,res) {
	var workouts = req.workoutDB;
	var dates = req.dateDB;
	var exercises = req.exercisesDB;
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
	});
});

//delete the user's workout
router.delete('/', function(req, res){
	console.log('in delete method');
	var username = req.session.user;
	var Workouts = req.workoutDB;

    Workouts.findOne({username: username}, function(err, workout){
        if (workout){
            Workouts.remove({username: username}, function(err, user){
                if (err){
                    utils.sendErrResponse(res, 500, "Could not delete from database")
                }else{
                    utils.sendSuccessResponse(res, {user:user});
                }
            });
        }else{
            //utils.sendErrResponse(res, 500, "No workout for this user")
            utils.sendSuccessResponse(res,'No workout found for this user');
        }
    });
});


module.exports = router;



/*

edit workouts -- mean extending or changing specific days

delete workouts -- actually delete all the information

*/