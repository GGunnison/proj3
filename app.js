var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose')
var Schema = mongoose.Schema

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



var index = require('./routes/index');
var users = require('./routes/users');
var workout = require('./routes/workout');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


///////////////////// Configure database
var workoutSchema = mongoose.Schema({
    username: String,
    dates: [{type: Schema.Types.ObjectId, ref: 'date'}]
});
 
var dateSchema = mongoose.Schema({
    date: String,
    workout: [{type: Schema.Types.ObjectId, ref: 'exercises'}]
});

var exerciseSchema = mongoose.Schema({
    name: String,
    type: String,
    //has all fields, only take relevant based on type

    //cardio
    exercise: String,
    length: Number,

    //lifting
    lifts:[{type: Schema.Types.ObjectId, re: 'lift'}] 
});

var liftSchema = mongoose.Schema({
    name: String, 
    sets: Number, 
    reps: Number, 
    weight: Number
});


var userSchema = mongoose.Schema({
    username: String,
    password: String,
    displayname: String,
    birthday: String,
    height: String,
    weight: Number,
    level: String
});

var Workout = mongoose.model('Workout',workoutSchema);
var date = mongoose.model('date', dateSchema);
var exercises = mongoose.model('exercises', exerciseSchema);
var lift = mongoose.model('lift', liftSchema)
var User = mongoose.model('User',userSchema);




// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Make our db accessible to our router
app.use(function(req,res, next){
    req.userDB = User;
    req.workoutDB = Workout;
    req.dateDB = date;
    req.exercisesDB = exercises;
    req.liftDB = lift;
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

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});

module.exports = app;
