const mongoose = require('mongoose');

const players = mongoose.Schema({
    username: {type: String, required: true},
    rank: {type:Number, require: true},
    score :{type: Number, required:true},
    status :{type: String, required:true},
    time: {type: String, required:true},
    fGame: {type: String, required:true}

 }
);

module.exports = mongoose.model('playerSchema', players);
