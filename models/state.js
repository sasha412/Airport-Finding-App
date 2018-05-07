var mongoose = require('mongoose');


//State schema
var stateSchema = mongoose.Schema({
    name: {
        type: String
    },
    code: {
        type: String
    },
    loc: {
        type: {
            type: String
        },
        coordinates: {
            type: Array
        }
    }

});


var State = mongoose.model('State',stateSchema);

module.exports = State;

//Get States

module.exports.getStates = function (callback, limit) {
    State.find(callback);
}