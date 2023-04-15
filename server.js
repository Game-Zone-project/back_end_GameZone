'use strict';

const express = require('express');
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();
app.use(cors());
const port = process.env.PORT;
const API_URL = process.env.API_URL;



//    Routes
//   http://localhost:3000/
app.get('/', homeHandler);





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
        })
        .catch((err) => { console.log(err); })
}



app.listen(port, () => {
    console.log(`Listening to server using ${port}`);
})
