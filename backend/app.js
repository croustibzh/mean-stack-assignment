const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
app.use(cors({origin: 'http://localhost:4200'}));

const Player = require('./Model/player');

mongoose.connect('mongodb+srv://comp3123:admin@cluster0-3eshe.mongodb.net/players?retryWrites=true&w=majority')
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
        rank: req.body.rank,
        score: req.body.score,
        available:req.body.available,
        time:req.body.time,
        fGame: req.body.gamesPLayed
    });
    player.save();
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