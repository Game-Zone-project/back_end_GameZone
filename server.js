'use strict';


const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();
const app = express();
app.use(cors());
const { Client } = require('pg');
const dbUrl = process.env.DB_URL;
const client = new Client(dbUrl);
const port = process.env.PORT;
const API_URL = process.env.API_URL;

app.use(express.json());


//Routes
//http://localhost:3000/
app.get('/', homeHandler);
//http://localhost:3000/getAllGame
app.get('/getAllGame', getAllGamesHandlers);
//http://localhost:3000/addGame
app.post('/addGame', addGameHandler);
//http://localhost:3000/DELETE/5
app.delete('/DELETE/:id', deleteGameHandler);
//http://localhost:3000/updateGames/4
app.put('/updateGames/:id', updateGamesHandler);
//http://localhost:3000/addWishList
app.post('/addWishList', addWishListHandler);
//http://localhost:3000/addWishList
app.get('/getAllWishList', getAllWishListHandler);


//handleserver error
//app.use(handleServerError);

//should be the last line in routes   //// * => mean any thing than your routes links!!
app.get('*', handleNotFoundError);




//creating a constructor for Games
function Games(title, thumbnail, description, genre, game_url, release_date) {
    this.title = title;
    this.thumbnail = thumbnail;
    this.description = description;
    this.genre = genre;
    this.game_url = game_url;
    this.release_date = release_date;

}


function homeHandler(req, res) {
    axios.get(API_URL)
        .then((result) => {
            let shapedData = result.data.map((game) => {
                return new Games(game.title, game.thumbnail, game.short_description, game.genre, game.game_url, game.release_date)
            })
            res.json(shapedData);
        }).catch()
    // .catch((error)=>{
    //     handleServerError(error,req, res);
    // })
}

function getAllGamesHandlers(req, res) {
    let sql = `SELECT * FROM games;`
    client.query(sql).then((result) => {
        //console.log(result.rows);
        res.json(result.rows);
    }).catch()
    // .catch((error)=>{
    //     handleServerError(error,req, res);
    // })
}


function addGameHandler(req, res) {
    let { title, genre, image, review, rating, release_date, game_URL } = req.body;
    let sql = `INSERT INTO games (title, genre, image, review, rating, release_date, game_URL) 
    VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *`;
    let values = [title, genre, image, review, rating, release_date, game_URL];
    client.query(sql, values).then(result => {
        res.status(201).json(result.rows);
    }).catch()
    // .catch((error)=>{
    //     handleServerError(error,req, res);
    // })
}



function deleteGameHandler(req, res) {
    let [id] = req.params.id;
    let sql = `DELETE FROM games WHERE id = $1;`;
    let value = [id];
    client.query(sql, value).then(result => {
        res.status(204).send("deleted");
    }).catch()
    // .catch((error)=>{
    //     handleServerError(error,req, res);
    // })
}

function updateGamesHandler(req, res) {
    let [id] = req.params.id
    let { review } = req.body
    let sql = "UPDATE games SET review=$1 WHERE id=$2 RETURNING *;";
    let values = [review, id];
    console.log(values)
    client.query(sql, values)
        .then(result => {
            res.send(result.rows)
        }).catch()
}

function addWishListHandler(req, res) {
    let { title, genre, image, review, rating, release_date, game_URL } = req.body;
    let sql = `INSERT INTO wishlist (title, genre, image, review, rating, release_date, game_URL) 
        VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *;`
    let values = [title, genre, image, review, rating, release_date, game_URL];
    client.query(sql, values).then(result => {
        res.status(201).json(result.rows);
    }).catch();
}

function getAllWishListHandler(req,res){

    let sql = `SELECT * FROM wishlist;`
    client.query(sql).then((result) => {
        //console.log(result.rows);
        res.json(result.rows);
    }).catch()

}


//404 not found error
function handleNotFoundError(req, res) {
    console.log("hi");
    res.status(404).send("Not Found !");
}

//Handle 500 Error
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send({
        status: 500,
        responseText: 'Sorry, something went wrong'
    });
});


client.connect()
    .then(() => {
        app.listen(port, () => {
            console.log(`Listening to server using ${port}`);
        })
    })
    .catch(() => {
        console.log("error");
    })
