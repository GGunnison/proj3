var express = require('express');
var router = express.Router();
var utils = require('../utils/utils');
var objectID = require('mongodb').ObjectID;
var moment = require('moment');

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

//add a workout
router.post('/', function(req,res) {
	var Workouts = req.workoutDB;
	var Dates = req.dateDB;
	var Exercises = req.exercisesDB;
	var Lifts = req.liftDB;

	//username | parentWorkout date | parentDate name type | parentExercise name reps sets weight
	
	console.log(req.body);
	console.log(req.body[workout]);

	/*{ 
		workout: {username: 'username'}, 
		dates: {parentWorkout: 'parentWorkout', date: 'date'},
		exercises: {parentDate: 'parentDate', name: 'name', type: 'type'},
		lifts: {parentExercise: 'parentExercise', name: 'name', reps: 'reps', sets: 'sets', weight: 'weight'}
	}*/


	var workout = new Workouts({username: "Bob"});
	workout.save(function(err){
		if (err) utils.sendErrResponse(res, 500, 'Could not save workout to DB.');
		var date = new Dates({parentWorkout: workout._id,date:'10-21-2014'});
		date.save(function(err){
			if (err) utils.sendErrResponse(res, 500, 'Could not save date to DB.');
			workout.dates.push(date);
			var exercise = new Exercises({parentDate: date._id,name:'Chest',type:'lift'});
			exercise.save(function(err){
				if (err) utils.sendErrResponse(res, 500, 'Could not save exercise to DB.');
				date.exercises.push(exercise);
				var lift = new Lifts({parentExercise: exercise._id,name:'bench',reps:5,sets:2,weight:85});
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
	
	console.log(req.body);
	console.log(req.body[workout]);

	/*{ 
		workout: {username: 'username'}, 
		dates: {parentWorkout: 'parentWorkout', date: 'date'},
		exercises: {parentDate: 'parentDate', name: 'name', type: 'type'},
		lifts: {parentExercise: 'parentExercise', name: 'name', reps: 'reps', sets: 'sets', weight: 'weight'}
	}*/


	var workout = new Workouts({username: 'Bill'});
	workout.save(function(err){
		if (err) utils.sendErrResponse(res, 500, 'Could not save workout to DB.');
		var date = new Dates({parentWorkout: workout._id,date:'10-21-2014'});
		date.save(function(err){
			if (err) utils.sendErrResponse(res, 500, 'Could not save date to DB.');
			Workouts.update({username: 'Bill'}, {$addToSet:{'dates': date}}, function(err){
	    		var exercise = new Exercises({parentDate: date._id,name:'Chest',type:'lift'});
				exercise.save(function(err){
					if (err) utils.sendErrResponse(res, 500, 'Could not save exercise to DB.');
					Dates.update({_id: date._id}, {$addToSet:{exercises: exercise}}, function(err){
						var lift = new Lifts({parentExercise: exercise._id,name:'bench',reps:5,sets:2,weight:85});
						lift.save(function(err){
							if (err) utils.sendErrResponse(res, 500, 'Could not save lift to DB.');
							Exercises.update({_id: exercise._id}, {$addToSet:{lifts: lift}}, function(err){
								utils.sendSuccessResponse(res, {workout: workout, date: date, exercise: exercise, lift: lift});
							});	
						});
					});
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
	});*/


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
					utils.sendSuccessResponse(res, {exercise: exercise});
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
	})
});

//delete all workout? one day? one excerise? -- different methods for these?
router.delete('/:username', function(req, res){
	console.log(req.username);
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