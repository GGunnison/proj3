var express = require('express');
var router = express.Router();
var utils = require('../utils/utils');
var Workouts = require('../models/Workout.js');
var Exercises = require('../models/Exercise.js');

//gets all workouts for a user
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

//gets a single workout (designated by id) for a user
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

//POST add a workout
router.post('/', function(req,res) {
	console.log('in POST /');
	var userid = req.user._id;

	//create workout for the current user, specified date, and with no exercises
	var workout = new Workouts({user: userid, date: new Date('Jun 23, 1912'), exercises: []}); //TODO: this
	//save the workout to the DB
	workout.save(function(err){
		if (err){
			console.log("error adding workout");
			utils.sendErrResponse(res, 500, 'Could not save workout to DB.');
		}else{
			console.log("succesfully added");
			utils.sendSuccessResponse(res, {workout: workout, user: userid, date: workout.date});
		}
	});
});

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
						utils.sendErrResponse(res,500, "Could not retrieve after editing");
					}else{
						console.log('date after getting retrieving again in edit');
						utils.sendSuccessResponse(res, {workout:workout});
					}
				});
			}
		});
	});
});

//DELETE workout
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
					utils.sendErrResponse(res,500,'Could not save exercise');
				}else{
					workout.save(function(err){
						if (err){
							utils.sendErrResponse(res, 500, 'Could not save workout to database');
						}else{
							utils.sendSuccessResponse(res, {workout: workout})
						}
					});
				}
			})

		}
	});
});

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
				utils.sendErrResponse(res,500,'Could not update exercise');
			}
			else {
				utils.sendSuccessResponse(res, {exercise: exercise});
			}
		});
	});
});

//delete exercise from workout/DB
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

