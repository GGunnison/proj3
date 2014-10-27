var express = require('express');
var router = express.Router();
var utils = require('../utils/utils.js');
var Workouts = require('../models/Workout.js');
var Exercises = require('../models/Exercise.js');
//var ExerciseTemplate = require('../model/ExerciseTemplate.js');

/* GET users listing. 
router.get('/', function(req, res) {
	console.log('IN /WORKOUT GET');
	res.render('index');
});*/

router.get('/', function(req,res) {
	var workoutID = req.body.workoutID;
	Workouts.findOne({_id: workoutID}, function(err, workout) {
		if (err) {
			utils.sendErrResponse(res,500,'Could not retrieve workout from database');
		}else{
			utils.sendSuccessResponse(res, workout);
		}
	});
});

//POST add a workout
router.post('/', function(req,res) {
	console.log('in POST /workout');
	//var currentUser = req.session.user; // <- uncomment once passport is working
	var userid = req.body.userid; //using userID for now until we get Passport working.
	console.log('userid: ');
	console.log(userid)
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
//
router.put('/', function(req, res){
	//var currentUser = req.session.user; //TODO: removed for testing
	var currentUser = 'bob'; //added for testing
	var newdate = req.body.date;

	Workouts.update({user: currentUser/*removed ._id*/}, {$set: {date: newdate}}, function(err, workout){
		if (err){
			utils.sendErrResponse(res, 500, "Could not update workout");
		}else{
			utils.sendSuccessResponse(res, {workout: workout, user: currentUser._id, date: workout.date, exercises: workout.exercises});
		}
	});
});

//DELETE workout
router.delete('/', function(req,res){
	var workoutID = req.body.workoutID;
	Workouts.remove({_id: workoutID}, function(err, workout){
		if (err){
			console.log("Could not delete workout");
			utils.sendErrResponse(res, 500, "Could not delete from database")
		}else{
			console.log("Delete workout");
			utils.sendSuccessResponse(res);
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

	Workouts.update({_id: workoutID}, {$addToSet:{exercises: exercise}}, function(err, workout){
		if (err){
			utils.sendErrResponse(res, 500, 'Could not find workout with that ID');
		}else{
			workout.save(function(err){
				if (err){
					utils.sendErrResponse(res, 500, 'Could not save workout to database');
				}else{
					utils.sendSuccessResponse(res, {workout: workout})
				}
			});
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

//find exercise
//delete exercise from db
//done

//get all data for new exercise
//find exercise to change
//update exercise
//save exercise


router.put('/exercises', function(req, res){
	var workoutID = req.body.workoutID; //the ID of the workout we want to add the exercise to
	var exerciseName = req.body.name;
	var description = req.body.description;
	var repCount = req.body.repCount;
	var setCount = req.body.setCount;
	var weight = req.body.weight;
	var time = req.body.time;
	var exerciseID = req.body.exerciseID;
	Exercises.update({_id: exerciseID}, {$set:{name: exerciseName, description: description, repCount: repCount,
		setCount: setCount, weight: weight}}, function(err, exercise){
			if (err){
				utils.sendErrResponse(res, 500, 'Could not update the exercise');
			}else{
				utils.sendSuccessResponse(res, {exercise: exercise});
			}
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
