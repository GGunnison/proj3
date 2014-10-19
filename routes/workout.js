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

//next two methods and definitions from example API code https://github.com/kongming92/6170-p3demo
router.all('*', requireAuthentication);
router.post('*', requireContent);

//get all of a user's workouts
//method modified from example API code https://github.com/kongming92/6170-p3demo
router.get('/', function(req,res) {
	var Workouts = req.workoutDB;
	var user =  ;
	Workouts.find({username: user}, function(err, workouts) {
		if (err) {
			utils.sendErrResponse(res, 500, 'An unknown error occurred.');
		}
		else {
			utils.sendSuccessResponse(res, {workouts: workouts});
		}
	});
});

router.post('/', function(req,res) {

});





module.exports = router;