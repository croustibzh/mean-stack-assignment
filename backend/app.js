const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Headers', "Origin, X-Requested-Width, Content-Type, Accept")
    res.setHeader('Access-Control-Allow-Methods', "GET, POST, PATCH, PUT, OPTIONS");
    next();
});

const Player = require('./Model/player');

mongoose.connect('mongodb+srv://comp3123:admin@cluster0-3eshe.mongodb.net/playersDB?retryWrites=true&w=majority')
    .then(()=>{
        console.log('Connected to database');
    })
    .catch(() => {
        console.log('Connection failed');
    });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false }));


app.post('/api/players', (req,res,next)=>{
    const player = new Player({
        username:req.body.username,
        rank:req.body.rank,
        score:req.body.score,
        time:req.body.time,
        fGame:req.body.fGame,
        status:req.body.status
    })
    
    player.save((err, player) => {
        if (err) return console.error(err);
        console.log(player.name + " saved to players collection.");
      });

    res.status(201).json({
        message: "Added successfully to db"
    }); 
});

app.get('/api/players',(req,res,next)=>{
    res.status(200).json({
        message: 'Posts fetched successfully!',
        //posts:posts
    });
});

module.exports = app;