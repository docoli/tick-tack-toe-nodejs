require('dotenv').config({ path: '.env' });

const express = require('express');
const LobbyModule = require('./lobby/index');

let lobbies = [];

const app = express();

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.listen(process.env.PORT, function () {
    console.log('App listening on port ' + process.env.PORT + '!');
    console.log('INFO: Server is running in ' + process.env.NODE_ENV + ' mode!');
});

function newLobby(name, password, player) {
    lobbies.push({ name: name, object: new LobbyModule(name, password, player) });
}

function joinLobby(name, password, player) {
    let lobby = null;

    for(let key in lobbies) {
        let entry = lobbies[key];
        let object = entry.object;
        if(entry.name === name && object.password === password) {
            entry.join(password, player);
        }
    }
}
