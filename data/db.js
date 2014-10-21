
var mongoose = require('mongoose')
var Schema = mongoose.Schema
//We should put the schema's in here...

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
    lifts:[{type: Schema.Types.ObjectId, ref: 'lift'}] 
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

exports.User = User;
exports.date = date;
exports.lift = lift;
exports.Workout = Workout;
exports.exercises = exercises
