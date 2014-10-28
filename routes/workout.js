var express = require('express');
var router = express.Router();
var utils = require('../utils/utils');
var Workouts = require('../models/Workout.js');
var Exercises = require('../models/Exercise.js');
//var ExerciseTemplate = require('../model/ExerciseTemplate.js');

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

//gets a single workout (designated by id) for a suer
router.get('/single', function(req,res) {
	console.log('in GET / single');
	var workoutID = req.query.workoutID;
	console.log('workoutID:');
	console.log(workoutID);
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
	//var currentUser = req.session.user; // <- uncomment once passport is working
	var userid = req.body.userid; //using userID for now until we get Passport working.

	//create workout for the current user, specified date, and with no exercises
	var workout = new Workouts({user: userid, date: new Date('Jun 23, 1912'), exercises: []});
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
	//var currentUser = req.session.user; //TODO: removed for testing
	var currentUser = req.body.user; //added for testing
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
		
	
	//Workouts.update({user: currentUser/*._id*/}, {$set: {date: newdate}}, function(err){
	/*	if (err){
			utils.sendErrResponse(res, 500, "Could not update workout");
		}else{
			Workouts.findOne({user: currentUser}, function(err,workout) {
				utils.sendSuccessResponse(res, workout);
			});
		}
	});
*/
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

//POST add an Exercise to a Workout
//eventually want to add info in from template instead of random form

router.post('/exercises', function(req,res) {
	//var currentUser = req.session.user;
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

// 	exercise.save(function(err){
// 		if (err){
// 			console.log("error adding exercise");
// 			utils.sendErrResponse(res, 500, 'Could not save exercise to DB.');
// 		}else{
// 			console.log("succesfully added");
// 			//find the workout with the specified ID
// 			Workouts.findOne({_id: workoutID}, function(err, workout){
// 				if (err){
// 					console.log('No workout with that ID');
// 					utils.sendErrResponse(res, 500, 'Could not find a workout with that ID.');
// 				}else{
// 					//add exercise to the workout
// 					workout.exercises.push(exercise);
// 					//save the workout to the DB
// 					workout.save(function(err){
// 						if (err){
// 							console.log("error saving workout");
// 							utils.sendErrResponse(res, 500, 'Could not save workout to DB.');
// 						}else{
// 							console.log("succesfully added exercise to workout!");
// 							utils.sendSuccessResponse(res, {workout: workout, exercise: exercise});
// 						}
// 					});
// 				}
// 			});
// 		}
// 	});
// });


//get all data for new exercise
//find exercise to change
//update exercise
//save exercise


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
	/*
	Exercises.update({_id: exerciseID}, {$set:{name: exerciseName, description: description, repCount: repCount,
		setCount: setCount, weight: weight}}, function(err, exercise){
			if (err){
				utils.sendErrResponse(res, 500, 'Could not update the exercise');
			}else{
				utils.sendSuccessResponse(res, {exercise: exercise});
			}
		});
	});
	*/
});

//delete exercise from workout/DB
router.delete('/exercises', function(req,res) {
	var exerciseID = req.body.exerciseID;

	Exercises.remove({_id: exerciseID}, function(err){
		if (err){
			utils.sendErrResponse(res, 500, 'Could not remove exercise from db');
		}else{
			utils.sendSuccessResponse(res);
			//DO WE NEED TO SAVE THE WORKOUT HERE?
		}
	})
});


//CHECK IF THIS WORKS PROPERLY


// 	var workoutID = req.body.workoutID;
// 	var exerciseID = req.body.exerciseID;

// 	Exercises.findOne({_id: exerciseID}, function(err, exercise){
// 		if (exercise){
// 			Workouts.findOne({_id: workoutID}, function(e, workout){
// 				if (workout){
// 					var index = workout.exercises.indexOf(exerciseID);
// 					if (index < 0){
// 						console.log('The exercise is not in the workout');
// 						utils.sendErrResponse(res, 500, "The exercise was not a part of the workout");
// 					}else{
// 						workout.exercises.splice(index, 1); //remove exercise from the workout's exercise list
// 						workout.save(function(e2){
// 							if (e2){
// 								console.log("Couldn't save workout");
// 							}else{
// 					            Exercises.remove({_id: exerciseID}, function(e3, d){
// 					                if (e3){
// 					                	console.log('Could not remove exercise from DB');
// 					                    utils.sendErrResponse(res, 500, "Could not delete exercise from database");
// 					                }else{
// 					                	console.log("Succesfully removed exercise from DB");
// 					                    utils.sendSuccessResponse(res, {workout:workout});
// 					                }
// 					            });
// 							}
// 						});
// 					}
// 				}else{
// 					console.log("Could not find workout with that ID");
// 				}
// 			});
// 		}else{
// 			console.log('Could not find exercise with that ID');
// 		}
// 	});
// });

module.exports = router;
