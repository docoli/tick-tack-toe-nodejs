const GameModule = require('../game/index');
const PlayerModule = require('./player');

/**
 *
 * @param name Name of the lobby for recognition
 * @param password Password to protect the lobby
 * @param player Player Name
 * @constructor
 */
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

Lobby.prototype.join = function(password, player) {
    if(this.p2) {
        return { error: true, message: 'Lobby is full' };
    }

    if(this.password) {
        if(this.password !== password) {
            return { error: true, message: 'Unauthorized!' };
        }
    }

    this.p2 = new PlayerModule(player, 'p2');
    this.startGame();
};

module.exports = Lobby;
