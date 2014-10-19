var isLoggedIn = function(req,res){
	var currentUser = req.cookies.name
	if (currentUser){
		utils.sendErrResponse(res, 403, 'A user is already logged in');
		return true;
	}
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
	if (!(req.body.username && req.body.password && req.body.displayName && req.body.userHeight &&
	 req.body.userWeight && req.body.level && req.body.age)){
		utils.sendErrResponse(res, 400, 'You did not supply all necessary information');
		return true;
	}
	return false;
}

/* POST to login a user */
// used when the login button is pressed on the home page
router.post('/login', function(req, res) {
	if (isLoggedIn(req,res) || isInvalidLoginBody(req,res)){
		return;
	}
    // Get our form valuess
    var userName = req.body.username;
    var userPassword = req.body.password;

    var userCollection = req.userDB;

    userCollection.findOne({username: userName}, function(err, user){
        //if the username is not in the collection
        if (user){
        	//if the correct password was typed
            if (user.password == userPassword){
                //direct to the freetlist page
                res.cookie("name",userName); //create cookie with username
                utils.sendSuccessResponse(res, {user: user});
            }else{
                utils.sendErrResponse(res, 403, 'Incorrect Password');
            }
              
        //if the username is in the collection
        }else{
            utils.sendErrResponse(res, 403, 'Invalid Username');
        }
    });
   
});

// Logout, clear cookie, return to home page
router.get('/logout', function(req, res) {
	var currentUser = req.cookies.name;
	if (currentUser){
		res.clearCookie('name');
		utils.sendSuccessResponse(res);
	} else {
		utils.sendErrResponse(res, 403, 'No user is logged in');
	}
});

/* POST to Add User */
router.post('/adduser', function(req, res) {
    // Get our form values
    var userName = req.body.username;
    var userPassword = req.body.password;

    var displayName = req.body.displayName;
    var userAge = req.body.userAge;
    var userHeight = req.body.userHeight;
    var userWeight = req.body.userWeight;
    var level = req.body.level;


    // Set our collection
    var userCollection = req.userDB; //usercollection is used to store users

    userCollection.findOne({username: userName}, function(err, user){
        //Do not allow calls to API if a user is already logged in
        if (isLoggedIn(req,res) || isInvalidNewUserBody(req,res)){
        	return;
        }

        // the username is not already in the collection
        if (!(user)){
            // Submit the new user to the DB
            userCollection.insert({
                'username' : userName,
                'password' : userPassword,
                'displayname' : displayName,
                'age' : userAge,
                'height' : userHeight;
                'weight' : userWeight,
                'level' : level
            }, function (err, doc) {
                if (err) {
                   	utils.sendErrResponse(res, 500, "Could not add user to the database!");
                } else {
                    utils.sendSuccessResponse(res);
                }
            });    
        //if the username is already in the collection   
        }else{
        	utils.sendErrResponse(res, 400, 'Username already taken');
        }
        
    });
});