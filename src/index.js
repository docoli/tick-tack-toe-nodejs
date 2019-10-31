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
    let index = getLobbyIndex(name, password);

    lobbies[index].join(password, player);
}

function performAction(name, password, player, field) {
    let index = getLobbyIndex(name, password);

    let response = lobbies[index].game.mark(player, field);

    if(response.error) {
        console.log('Error: ', response.message);
        return;
    } else if(response.endGame === true) {
        if(response.winner === 'Draw') {
            console.log('No winner, this was a draw!');

            return;
        }
    }
}

function getLobbyIndex(name, password) {
    for(let key in lobbies) {
        let entry = lobbies[key];
        let object = entry.object;
        if(entry.name === name && object.password === password) {
            return key;
        }
    }

    return null;
}
