var express = require('express');
var router = express.Router();
var utils = require('../utils/utils');
//var data = require('../data/db.js');


var isLoggedIn = function(req,res){
	if (req.session.user){
		utils.sendErrResponse(res, 403, 'A user is already logged in');
		return true;
	}
    console.log('no user currently logged in');
	return false;
};

var isInvalidLoginBody = function(req,res){
	if (!(req.body.username && req.body.password)){
		utils.sendErrResponse(res, 400, 'You did not supply a username and/or password');
		return true;
	}
	return false;
}

var isInvalidNewUserBody = function(req,res){
    console.log("req.body: " + JSON.stringify(req.body));

	if (!(req.body.username && req.body.password && req.body.displayname && req.body.height &&
	 req.body.weight && req.body.level && req.body.birthday)){
		utils.sendErrResponse(res, 400, 'You did not supply all necessary information');
		return true;
	}
    console.log('valid new user body');
	return false;
}


/* POST to login a user */
// used when the login button is pressed on the home page
router.post('/login', function(req, res) {
    console.log('in POST /login');

	if (isLoggedIn(req,res) || isInvalidLoginBody(req,res)){
        console.log("invalid body or already logged in")
		return;
	}
    // Get our form values
    var userName = req.body.username;
    var userPassword = req.body.password;
    var userCollection = req.userDB;

    userCollection.findOne({username: userName}, function(err, user){
        //if the username is in the collection
        if (user){
        	//if the correct password was typed
            if (user.password == userPassword){

                //direct to main page
                req.session.user = userName;
                //we need to send the workout information here too??
                utils.sendSuccessResponse(res, user);

            }else{
                console.log('here')
                utils.sendErrResponse(res, 403, 'Incorrect Password');
            }
              
        //if the username is not in the collection
        }else{
            console.log('this one?')
            utils.sendErrResponse(res, 403, 'Invalid Username');
        }
    });
});

// Logout, return to home page
router.get('/logout', function(req, res) {
    console.log("in GET /");
	if (req.session.user){
        delete req.session.user
		utils.sendSuccessResponse(res);
	} else {
		utils.sendErrResponse(res, 403, 'No user is logged in');
	}
});

/* POST to Add User */
router.post('/add', function(req, res) {
    console.log("in POST /");

    // Get our form values
    var userName = req.body.username;
    var userPassword = req.body.password;

    var displayName = req.body.displayName;
    var birthday = req.body.birthday;
    var height = req.body.height;
    var weight = req.body.weight;
    var level = req.body.level;

    // Set our collection
    var userCollection = req.userDB; //usercollection is used to store users

    userCollection.findOne({username: userName}, function(err, user){
        //Do not allow calls to API if a user is already logged in
        if (isLoggedIn(req,res) || isInvalidNewUserBody(req,res)){
            console.log("user already logged in - returning");
        	return;
        }

        // the username is not already in the collection
        if (!(user)){
            var newUser = new userCollection({
                'username' : userName,
                'password' : userPassword,
                'displayname' : displayName,
                'birthday' : birthday,
                'height' : height,
                'weight' : weight,
                'level' : level
            });

            // Submit the new user to the DB
            newUser.save(function (err, doc) {
                if (err) {
                   	utils.sendErrResponse(res, 500, "Could not add user to the database!");
                } else {
                    utils.sendSuccessResponse(res, newUser);
                }
            });    
        //if the username is already in the collection   
        }else{
        	utils.sendErrResponse(res, 400, 'Username already taken');
        }
        
    });
});

//we need to use different routes here... just variables instead of paths
//Delete the user and all the data in the workout db with that user
router.delete('/:username', function(req, res){
    console.log('in user delete');
    var userCollection = req.userDB;
    var workouts = req.workoutDB;
    var username = req.param('username');
    console.log('deleting user ' + username);
    userCollection.findOne({username: username}, function(err, user){
        if (user){
            userCollection.remove({username: username}, function(err, user){
                if (err){
                    utils.sendErrResponse(res, 500, "Could not delete from database")
                }else{
                    //logout 
                    var currentUser = req.cookies.name;
                    if (currentUser == username){
                        res.clearCookie('name');
                        $.delete('/workout/:'+username, function(err, res){
                            if(err){
                                utils.sendErrResponse(res, 400, "Unknown error deleting")
                            }
                        });
                        utils.sendSuccessResponse(res, {user:user});
                        //call router here to logout??
                        }
                    }
            });
        }else{
            util.sendErrResponse(res, 500, "User not in the database")
        }


    });
});

//Put to edit the user 
router.put('/', function(req, res){
    // Get our form values
    var userName = req.body.username
    var userPassword = req.body.password;
    var userBirthday = req.body.userBirthday;
    var userHeight = req.body.userHeight;
    var userWeight = req.body.userWeight;
    var level = req.body.level;


    // Set our collection
    var userCollection = req.userDB; //usercollection is used to store users

    userCollection.findOne({username: userName}, function(err, user){
        // the username is logged in and allowed to edit
        if (username ==req.cookie.username){
            // Submit the potentially editted fields to the DB
            userCollection.update({
                'username' : userName, //TODO: some weird set stuff was here, I deleted it
                'password' : userPassword,
                'birthday' : userBirthday,
                'height' : userHeight,
                'weight' : userWeight,
                'level' : level
            }, function (err, doc) {
                if (err) {
                    utils.sendErrResponse(res, 500, "Could not add user to the database!");
                } else {
                    utils.sendSuccessResponse(res, {user:user});
                }
            });    
        //if the user being editted is not the one logged in 
        }else{
            utils.sendErrResponse(res, 400, "You cannot edit another user's information");
        }
        
    });
});

module.exports = router;