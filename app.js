var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose')
var session = require('express-session');
var Schema = mongoose.Schema
var data = require('./data/db');

//set up database
var connection_string = 'localhost/proj3_liftmate';
if (process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
  connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + '@' +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}
mongoose.connect('mongodb://' + connection_string);

var app = express();

var users = require('./routes/users');
var workout = require('./routes/workout');

app.use(session({
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    secret: 'secret'
}));

// Authentication middleware
// Check that the user's session passed in req.session is valid
app.use(function(req, res, next) {
    if (req.session.userId) {
        var users = db.get('users');
        users.findOne({
            _id: req.session.userId
        }, function(err, user) {
            if (user) {
                req.currentUser = user;
            } else {
                delete req.session.userId;
            }
            next();
        });
    } else {
        next();
    }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Make our db accessible to our router
app.use(function(req,res, next){
    req.userDB = data.User;
    req.workoutDB = data.Workout;
    req.dateDB = data.date;
    req.exercisesDB = data.exercises;
    req.liftDB = data.lift;
    next();
});

app.use('/', index);
app.use('/users', users);
app.use('/workout', workout);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});



//app.set('port', process.env.PORT || 3000);
app.listen(process.env.OPENSHIFT_NODEJS_PORT || 8080, process.env.OPENSHIFT_NODEJS_IP);

var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});



module.exports = app;
