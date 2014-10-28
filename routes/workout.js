var express = require('express');
var router = express.Router();
var utils = require('../utils/utils');
var Workouts = require('../models/Workout.js');
var Exercises = require('../models/Exercise.js');
var moment = require('moment');


/*
GET /
No parameters
Success: true if user has stored workouts
Content: returns all workouts for the currently logged in user
Error: 500 if unable to retrieve workout from database
*/
router.get('/', function(req,res) {
	var userID = req.user._id;
	console.log(userID);
	Workouts.find({_id: userID}, function(err, workouts) {
		if (err) {
			utils.sendErrResponse(res,500,'Could not retrieve workout from database');
		}else{
			console.log('got here');
			console.log(workouts);
			res.render('userPage', {workout: workouts});
		}
	});
});

/*
GET /single
Parameters:
	workoutID: id of the workout to return
Success: true if workoutID exists in database
Content: returns workout specified by id
Error: 500 if unable to retrieve workout from database
*/
router.get('/single', function(req,res) {
	console.log('in GET /single');

	var workoutID = req.query.workoutID;

	Workouts.findOne({_id: workoutID}, function(err, workout) {
		if (err) {
			utils.sendErrResponse(res,500,'Could not retrieve workout from database');
		}else{
			utils.sendSuccessResponse(res, {workout: workout});
		}
	});
});

/*
POST /
Parameters:
	userID: id of the user to add the workout to
	date: date object representing the date this workout occurred
Success: true if workout is saved to database
Content: returns workout, userID, date
Error: 500 if unable to retrieve workout from database
*/
router.post('/', function(req,res) {
	console.log('in POST /');
	var userID = req.user._id;
	var date = req.body.date;
	console.log(req.body);
	//create workout for the current user, specified date, and with no exercises
	var workout = new Workouts({user: userID, date: new Date(date), exercises: []}); 
	workout.save(function(err){
		if (err){
			console.log("error adding workout");
			utils.sendErrResponse(res, 500, 'Could not save workout to DB.');
		}else{
			
			res.render('userPage', {workout: workout, userID: userID, date: workout.date});
		}
	});
});

/*
PUT /
Parameters:
	workoutID: id of the workout to edit
	newDate: date to update the workout with
Success: true if workoutID can be updated
Content: returns workout after editing
Error: 500 if unable to save workout, 501 if unable to retrieve edited workout
*/
router.put('/', function(req, res){
	var workoutID = req.body.workoutID;
	var newDate = req.body.date;

	Workouts.findOne({_id: workoutID}, function(err,workout) {
		workout.date = newDate;

		workout.save(function(err) {
			if (err) {
				utils.sendErrResponse(res,500, "Could not save workout after edit");
			}else{
				//utils.sendSuccessResponse(res,workout);
				Workouts.findOne({_id: workoutID}, function(err,workout) {
					if (err) {
						utils.sendErrResponse(res,501, "Could not retrieve after editing");
					}else{
						console.log('date after getting retrieving again in edit');
						utils.sendSuccessResponse(res, {workout:workout});
					}
				});
			}
		});
	});
});

/*
DELETE /
Parameters:
	workoutID: id of the workout to delete
Success: true if workoutID is deleted
Content: nothing
Error: 500 if unable to retrieve workout from database
*/
router.delete('/', function(req,res){
	var workoutID = req.body.workoutID;
	Workouts.remove({_id: workoutID}, function(err){
		if (err){
			console.log("Could not delete workout");
			utils.sendErrResponse(res, 500, "Could not delete from database")
		}else{
			console.log("Deleted workout");
			utils.sendSuccessResponse(res, {succeeded: true});
		}
	});
});


/////////////////////////////////////////////////////////////////////////////
//Exercises //
/////////////////////////////////////////////////////////////////////////////


/*
POST /exercises
Parameters:
	workoutID: id of the workout to return
	exerciseName, description, repCount, setCount, weight, time, exercises: all exercise properties to add
Success: true if workoutID exists in database
Content: returns workout specified by id
Error: 500 if no workout exists with specified id, 501 if exercise could not be saved, 502 if workout 
could not be saved
*/
router.post('/exercises', function(req,res) {
	var workoutID = req.body.workoutID; //the ID of the workout we want to add the exercise to
	var exerciseName = req.body.name;
	var description = req.body.description;
	var repCount = req.body.repCount;
	var setCount = req.body.setCount;
	var weight = req.body.weight;
	var time = req.body.time;
	var exercise = new Exercises({name: exerciseName, description: description, repCount: repCount, 
										setCount: setCount, weight: weight});

	Workouts.findOne({_id: workoutID}, function(err, workout){
		if (err){
			utils.sendErrResponse(res, 500, 'Could not find workout with that ID');
		}else{
			workout.exercises.push(exercise);
			exercise.save(function(err) {
				if (err) {
					utils.sendErrResponse(res,501,'Could not save exercise');
				}else{
					workout.save(function(err){
						if (err){
							utils.sendErrResponse(res, 502, 'Could not save workout to database');
						}else{
							utils.sendSuccessResponse(res, {workout: workout})
						}
					});
				}
			})

		}
	});
});


/*
PUT /exercises
Parameters:
	exerciseID: id of the exercise to edit
	exerciseName, repCount, setCount, weight: parameters to edit (none are required)
Success: true if workout can be successfully saved
Content: returns exercise that was just added
Error: 500 if unable to retrieve workout from database
*/
router.put('/exercises', function(req, res){
	var exerciseName = req.body.name;
	var repCount = req.body.repCount;
	var setCount = req.body.setCount;
	var weight = req.body.weight;
	var exerciseID = req.body.exerciseID;

	Exercises.findOne({_id: exerciseID}, function(err,exercise) {
		if (!exercise) {
			utils.sendErrResponse(res,500,'Could not find exercise in database');
			return;
		}
		if (exerciseName) {
			exercise.exerciseName = exerciseName;
		}if(repCount) {
			exercise.repCount = repCount;
		}if(setCount) {
			exercise.setCount = setCount;
		}if(weight) {
			exercise.weight = weight;
		}
		exercise.save(function(err) {
			if(err) {
				utils.sendErrResponse(res,501,'Could not update exercise');
			}
			else {
				utils.sendSuccessResponse(res, {exercise: exercise});
			}
		});
	});
});

/*
DELETE /exercises
Parameters:
	exerciseID: id of the exercise to delete
Success: true if workout can be deleted
Content: none
Error: 500 if workout could not be removed
*/
router.delete('/exercises', function(req,res) {
	var exerciseID = req.body.exerciseID;

	Exercises.remove({_id: exerciseID}, function(err){
		if (err){
			utils.sendErrResponse(res, 500, 'Could not remove exercise from db');
		}else{
			utils.sendSuccessResponse(res);
		}
	})
});

module.exports = router;

