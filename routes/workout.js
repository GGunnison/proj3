var express = require('express');
var router = express.Router();
var utils = require('../utils/utils');
var objectID = require('mongodb').ObjectID;
var moment = require('moment');


/*

Require authentication on all access to the server
When not logged in the method will throw a 403 error

*/
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

/*
Used for create and eqit requests to the server. 

Sends a 400 error if there is no content

*/
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
/*
GET / for workouts
No response parameters:
Response:
	Success: true if a workout is found
		-returns the workout found

	Error: 500 error if a workout isn't found
*/
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

/*
POST /addWorkout to add a workout for the user

No request parameters
Response:
	Success: true when we build all of dependent objects and add a workout to the db
		-send all of the dependent objects to the client
	Error:
		500 for any of the databases not being saved to for one of the dependent objects
*/

router.post('/addWorkout', function(req,res) {
	var Workouts = req.workoutDB;
	var Dates = req.dateDB;
	var Exercises = req.exercisesDB;
	var Lifts = req.liftDB;

	//username | parentWorkout date | parentDate name type | parentExercise name reps sets weight

	console.log('got here');
	var workout = new Workouts({username: req.body.username});
	workout.save(function(err){
		if (err) utils.sendErrResponse(res, 500, 'Could not save workout to DB.');
		console.log('got here');
		var date = new Dates({parentWorkout: workout._id, date:req.body.date});
		date.save(function(err){
			if (err) utils.sendErrResponse(res, 500, 'Could not save date to DB.');
			workout.dates.push(date);
			console.log('got here');
			var exercise = new Exercises({parentDate: date._id,name:req.body.exercise_name,type:req.body.type});
			exercise.save(function(err){
				if (err) utils.sendErrResponse(res, 500, 'Could not save exercise to DB.');
				date.exercises.push(exercise);
				console.log('got here');
				var lift = new Lifts({parentExercise: exercise._id,name:req.body.lift_name,reps:req.body.reps,sets:req.body.sets,weight:req.body.weight});
				lift.save(function(err){
					if (err) utils.sendErrResponse(res, 500, 'Could not save lift to DB.');
					console.log('got here');
					exercise.lifts.push(lift);
					//Save everything
					exercise.save(function(err){
						if (err) utils.sendErrResponse(res, 500, 'Could not save exercise to DB.');
						console.log('got here');
						date.save(function(err){
							if (err) utils.sendErrResponse(res, 500, 'Could not save date to DB.');
							console.log('got here');
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

/*
POST /addlift to add something to the daily exercise

No Response paramter
Response:
	Success: true if we add a lift to a workout
		-returns the exercise to the client
	Error: 500 Either the lift or exercise did not make it into the database
*/
router.post('/addlift', function(req,res) {
	var exercises = req.exercisesDB;
	var lifts = req.liftDB;

	var id = req.body.liftid;
	var exerciseID = req.body.parentExercise; //id reference
    var liftname = req.body.liftname;
    var sets = req.body.sets;
    var reps = req.body.reps;
    var weight = req.body.weight;
    console.log('THe Start');

    // Submit the lift to the DB
    if (id != null){
    	var newLift = new lifts({
	    	'_id' : id,
	        'parentExercise' : exerciseID,
	        'name' : liftname,
	        'sets': sets,
	        'reps' : reps,
	        'weight' : weight
		});
    }else{
	    var newLift = new lifts({
		    'parentExercise' : exerciseID,
		    'name' : liftname,
		    'sets': sets,
		    'reps' : reps,
		    'weight' : weight
		});
    }
    // Submit the new lift to the DB
    newLift.save(function (err, doc) {
        if (err) {
        	console.log('uh oh');
           	utils.sendErrResponse(res, 500, "Could not add lift to the database!");
        } else {
			var liftID = newLift._id;
			exercises.findOne({_id: exerciseID}, function(err,exercise){
				if (exercise){
					lifts.findOne({_id: liftID}, function(err, lift){
						if (lift){
							exercise.lifts.push(lift);
							exercise.save(function(err){
								console.log('first one');
								if (err) utils.sendErrResponse(res, 500, 'Could not save exercise to DB.');
								utils.sendSuccessResponse(res, {exercise: exercise});
							});
						}else{
							console.log('second one');
							utils.sendErrResponse(res, 500, 'That lift is not in the database.');
						}
					});
				}else{
					console.log('third one');
					utils.sendErrResponse(res, 500, 'That exercise is not in the database.');
				}
			});            
        }
    });  
});

//add lift to exercise
router.delete('/deletelift', function(req,res) {
	var lifts = req.liftDB;
	var exercises = req.exercisesDB;
	var liftID = req.body.liftID;

	lifts.findOne({_id: liftID}, function(err, lift){
		if (lift){
			var exerciseID = lift.parentExercise;
			console.log('Parent ID ' + exerciseID);
			exercises.findOne({_id: exerciseID}, function(err,exercise){
				if (exercise){
					var index = exercise.lifts.indexOf(liftID);
					exercise.lifts.splice(index, 1);
					exercise.save(function(err){
						if (err) utils.sendErrResponse(res, 500, 'Could not splice lift from exercise.');
			            lifts.remove({_id: liftID}, function(err, d){
			                if (err){
			                	console.log('first one');
			                    utils.sendErrResponse(res, 500, "Could not delete lift from database");
			                }else{
			                    utils.sendSuccessResponse(res, {exercise:exercise});
			                }
			            });							
					});				
				}else{
					console.log('second one');
					utils.sendErrResponse(res, 500, "Error accessing exercise of the lift");
				}
			});
		}else{
			console.log('third one');
			utils.sendErrResponse(res, 500, 'That lift is not in the database.');
		}
	});
});


//delete the user's workout

/*
DELETE / for workout
No response parameters
Response:
	Success: true if the user's workout is deleted from the database
		-returns an user object to the client
	Error: 500 - Couldn't delete from the database
*/
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

