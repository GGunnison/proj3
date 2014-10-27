var mongoose = require('mongoose');

var exerciseSchema = mongoose.Schema({
    name: String,
    description: String,
    repCount: Number,
    setCount: Number,
    time: Number
});


module.exports = mongoose.model('Exercise', exerciseSchema);