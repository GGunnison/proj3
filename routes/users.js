var express = require('express');
var router = express.Router();
var utils = require('../utils/utils');
var request = require('request');
//var data = require('../data/db.js');

/*
Check that the user is logged to make sure that they
have access to the information they are requesting from the server.

Will throw a 400 error if the user is logged to make sure they aren't trying to repeat the action

*/
var isLoggedIn = function(req,res){
	if (req.session.user){
		utils.sendErrResponse(res, 400, 'User is already logged in');
		return true;
	}else{
	    return false;
}
};
/*
Authentication is required upon logging in including username and password

If either one is not given by the client a 400 error will be given

*/
var isInvalidLoginBody = function(req,res){
	if (!(req.body.username && req.body.password)){
		utils.sendErrResponse(res, 400, 'You did not supply a username and/or password');
		return true;
	}
	return false;
}

/*
Check to make sure that when an user is created all of the information is provided by the client

Will throw a 400 error is all of the information is not provided

*/
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
/*
POST /login
No request parameters

Success: true is correct username and password is provided by the client

Content: the user object is returned to the client, which inlcudes all of
the user information

Error: 403 for Incorrect password, 402 for incorrect username


*/

router.post('/login', function(req, res) {

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
                utils.sendErrResponse(res, 403, 'Incorrect Password');
            }
              
        //if the username is not in the collection
        }else{
            utils.sendErrResponse(res, 402, 'Invalid Username');
        }
    });
});

/*
GET /logout
No request parameters

Response:

    Success: If an user is logged in the session will be ended
        - nothing is sent back to the page, the session is deleted
    Error: 406 for logging out an user that is not currently logged in
*/
router.get('/logout', function(req, res) {
	if (req.session.user){
        delete req.session.user
		utils.sendSuccessResponse(res);
	} else {
		utils.sendErrResponse(res, 406, 'No user is logged in');
	}
});

/* POST to Add User /add

No request parameters

Response:
    Success: If username is successfully added to the database
        - user object is given back to the client
    Error: 500 if the user cannot be added to the database
           400 if the user already exists in the database


 */
router.post('/add', function(req, res) {

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
/*

DELETE/:username to delete user 

Request parameters:
    -username: a string representing the user to delete from the database

Response:
    Success: true if the user is deleted from the database and logged out of their session and 
            their workouts are deleted from the database.
            -User object is given back to the client
    Error: 410 Unknown error deleting the workout information of the user
           500 Could not delete user from the database
*/
router.delete('/:username', function(req, res){

    console.log('in user delete');
    var userCollection = req.userDB;
    var workouts = req.workoutDB;
    var username = req.param('username');
    console.log('deleting user ' + username);

    userCollection.findOne({username: username}, function(err, user){
        if (user){

            request.del('http://localhost:3000/workout', function(err) {
                if(err){
                    utils.sendErrResponse(res, 410, "Unknown error deleting")
                }else{
                    utils.sendSuccessResponse(res, 'Successfully deleted user'); //can this be sent and then do stuff after?
                    userCollection.remove({username: username}, function(err){
                        if (err){
                            //utils.sendErrResponse(res, 500, "Could not delete from database")
                        }else{
                            console.log('user to delete has been located');
                            //logout 
                            if (req.session.user){
                                delete req.session.user
                            }
                            //utils.sendSuccessResponse(res,'success!');
                        }
                    });      
                }
            });

        }else{
            console.log('user not in database');
            utils.sendErrResponse(res, 500, "User not in the database")
        }

    });
});

/*

PUT/:username to edit user

Request parameters:
    -username: a string representing the user to delete from the database

Response:

    Success: true if the data of the user is properly updated in the database
        - an user object is returned to the page upon a success
    Error: 423: true if an user tries to edit another user's information
           500: true if the information was not properly put back into the database
*/


router.put('/:username', function(req, res){

    // Get our form values
    var userName = req.body.username
    var password = req.body.password;
    var birthday = req.body.birthday;
    var height = req.body.height;
    var weight = req.body.weight;
    var level = req.body.level;
    var username = req.param('username');


    // if (isInvalidNewUserBody(req, res)){
    //     utils.sendErrResponse(res, 400, 'Not all the fields were given that are required')
    // };

    // Set our collection
    var userCollection = req.userDB; //usercollection is used to store users

    userCollection.findOne({'username': userName}, function(err, user){
        // the username is logged in and allowed to edit
        if (username == userName){
            // Submit the potentially editted fields to the DB
            userCollection.update({
                'username' : username},{ //TODO: some weird set stuff was here, I deleted it
                'password' : password,
                'birthday' : birthday,
                'height' : height,
                'weight' : weight,
                'level' : level
            }, function (err, doc) {
                if (err) {
                    utils.sendErrResponse(res, 500, "Could not add user to the database!");
                } else {
                    utils.sendSuccessResponse(res, user);
                }
            });    
        //if the user being editted is not the one logged in 
        }else{
            utils.sendErrResponse(res, 423, "You cannot edit another user's information");
        }
        
    });
});

module.exports = router;