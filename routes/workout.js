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
	var workouts = req.workoutDB;

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
	});
});

//get the exercises from a workout

//I don't think we need to do this method... we should return the entire workout at once
//client side should parse the json's for the exercises for individual dates

//HOW DO WE UNPACKAGE THE WORKOUT?? dot notion??
router.get('/', function(req,res) {
	var workouts = req.workoutDB
	var user = req.body.username

	workouts.findOne({username:user}, function(err, workout){
		if (err){
			utils.sendErrResponse(res, 500, "An unknown error occured")
		}

	})
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

});



module.exports = router;



/*

edit workouts -- mean extending or changing specific days

delete workouts -- actually delete all the information

*/