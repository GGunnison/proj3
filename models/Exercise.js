var mongoose = require('mongoose');

var exerciseSchema = mongoose.Schema({
    name: String,
    repCount: Number,
    setCount: Number,
    weight: Number
});


module.exports = mongoose.model('Exercise', exerciseSchema);