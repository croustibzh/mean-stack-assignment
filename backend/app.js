const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
let ObjectId = require('mongoose').Types.ObjectId;


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Headers', "Origin, X-Requested-Width, Content-Type, Accept")
    res.setHeader('Access-Control-Allow-Methods', "GET, POST, PATCH, PUT, OPTIONS");
    next();
});

const Player = require('./Model/player');

mongoose.connect('mongodb+srv://comp3123:admin@cluster0-3eshe.mongodb.net/playersDB?retryWrites=true&w=majority')
    .then(() => {
        console.log('Connected to database');
    })
    .catch(() => {
        console.log('Connection failed');
    });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.post('/api/players', (req, res, next) => {
    const player = new Player({
        username: req.body.username,
        rank: req.body.rank,
        score: req.body.score,
        time: req.body.time,
        fGame: req.body.fGame,
        status: req.body.status
    })

    player.save((err, player) => {
        if (err) return console.error(err);
        console.log(player.username + " saved to players collection.");
    });
});

app.get('/api/players', (req, res, next) => {
    Player.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log("Error : " + JSON.stringify(err, undefined, 2)) }
    });
});

app.get('/api/players/:id', (req, res, next) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('No record with given id: ${req.params.id}');
    else {

        Player.findById(req.params.id, (err, doc) => {
            if (!err) { res.send(doc); }
            else { console.log("Error fetching player: " + JSON.stringify(err, undefined, 2)) }
        });
    }
});

app.delete('api/players/:id', (req,res,next) =>{
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('No record with given id: ${req.params.id}');
    else {

        Player.findByIdAndRemove(req.params.id, (err, doc) => {
            if (!err) { res.send(doc); }
            else { console.log("Error deleting player : " + JSON.stringify(err, undefined, 2)) }
        });
    }
})
module.exports = app;