var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var workoutSchema = mongoose.Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    date: Date,
    exercises: [{type: Schema.Types.ObjectId, ref: 'Exercise'}]
});


module.exports = mongoose.model('Workout', workoutSchema);