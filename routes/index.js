var express = require('express');
var router = express.Router();
var passport = require('passport');


// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();

	res.redirect('/');
}

// normal routes ===============================================================

	// show the home page (will also have our login links)
	router.get('/', function(req, res) {
		console.log('Res.user:'+req.user);
		if (req.user) {
			console.log('is this it?')
			res.redirect('/workout');
			return;
		}
		res.render('index.ejs');
	});

	// PROFILE SECTION =========================
	router.get('/home', isLoggedIn, function(req, res) {
		res.render('userPage.ejs');
	});

	// LOGOUT ==============================
	router.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

		// process the login form
		router.post('/login', passport.authenticate('local-login', {
			successRedirect : '/home', // redirect to the secure profile section
			failureRedirect : '/', // redirect back to the signup page if there is an error
			failureFlash : true // allow flash messages
		}));


		// process the signup form
		router.post('/signup', passport.authenticate('local-signup', {
			successRedirect : '/', // redirect to the secure profile section
			failureRedirect : '/', // redirect back to the signup page if there is an error
			failureFlash : true // allow flash messages
		}));


// =============================================================================
// AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
// =============================================================================

	// locally --------------------------------
		router.get('/connect/local', function(req, res) {
			res.render('connect-local.ejs', { message: req.flash('loginMessage') });
		});
		router.post('/connect/local', passport.authenticate('local-signup', {
			successRedirect : '/profile', // redirect to the secure profile section
			failureRedirect : '/connect/local', // redirect back to the signup page if there is an error
			failureFlash : true // allow flash messages
		}));


module.exports = router;
