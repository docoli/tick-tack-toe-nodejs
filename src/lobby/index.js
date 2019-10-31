const GameModule = require('../game/index');
const PlayerModule = require('./player');

function Lobby(name, password, player) {
    this.name = name;
    this.password = null;

    if(password) {
        this.password = password;
    }

    this.game = null;
    this.p1 = new PlayerModule(player, 'p1');
    this.p2 = null;
}

Lobby.prototype.startGame = function() {
    if(!this.p2) {
        return { error: true, message: 'Missing Player 2' };
    }

    this.game = new GameModule(this.name);
};

Lobby.prototype.login = function(password) {
    if(this.p2) {
        return { error: true, message: 'Lobby is full' };
    }

    if(this.password) {
        if(this.password !== password) {
            return { error: true, message: 'Unauthorized!' };
        }
    }
};

module.exports = Lobby;
