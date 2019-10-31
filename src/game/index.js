const Playground = require('./playground');

const marker = {
    p1: 'X',
    p2: 'O'
};

function Game(name) {
    this.name = name;
    this.playground = new Playground('Test Playground');
}

Game.prototype.mark = function(player, field) {
    let position = field - 1;

    let status = this.playground.fields[position].mark(marker[player]);

    if(!status.error) {
        let end = false;

        if(endGame(this, player, position)) {
            end = true;
            console.log('Player ' + player + ' has won!');
        }

        return { error: false, endGame: end };
    }

    return { error: true }
};

module.exports = Game;

function endGame(game, player, field) {
    switch (field) {
        case 0:
            if(check(game, player, 1) && check(game, player, 2)) {
                return true;
            }
            if(check(game, player, 3) && check(game, player, 6)) {
                return true;
            }
            if(check(game, player, 4) && check(game, player, 8)) {
                return true;
            }
            break;
        case 1:
            if(check(game, player, 0) && check(game, player, 2)) {
                return true;
            }
            if(check(game, player, 4) && check(game, player, 7)) {
                return true;
            }
            break;
        case 2:
            if(check(game, player, 1) && check(game, player, 0)) {
                return true;
            }
            if(check(game, player, 5) && check(game, player, 8)) {
                return true;
            }
            if(check(game, player, 4) && check(game, player, 6)) {
                return true;
            }
            break;
        case 3:
            if(check(game, player, 4) && check(game, player, 5)) {
                return true;
            }
            if(check(game, player, 0) && check(game, player, 6)) {
                return true;
            }
            break;
        case 4:
            if(check(game, player, 1) && check(game, player, 7)) {
                return true;
            }
            if(check(game, player, 3) && check(game, player, 5)) {
                return true;
            }
            if(check(game, player, 2) && check(game, player, 6)) {
                return true;
            }
            if(check(game, player, 0) && check(game, player, 8)) {
                return true;
            }
            break;
        case 5:
            if(check(game, player, 3) && check(game, player, 4)) {
                return true;
            }
            if(check(game, player, 2) && check(game, player, 8)) {
                return true;
            }
            break;
        case 6:
            if(check(game, player, 0) && check(game, player, 3)) {
                return true;
            }
            if(check(game, player, 7) && check(game, player, 8)) {
                return true;
            }
            if(check(game, player, 2) && check(game, player, 4)) {
                return true;
            }
            break;
        case 7:
            if(check(game, player, 6) && check(game, player, 8)) {
                return true;
            }
            if(check(game, player, 1) && check(game, player, 4)) {
                return true;
            }
            break;
        case 8:
            if(check(game, player, 6) && check(game, player, 7)) {
                return true;
            }
            if(check(game, player, 2) && check(game, player, 5)) {
                return true;
            }
            if(check(game, player, 0) && check(game, player, 4)) {
                return true;
            }
            break;
    }
}

function check(game, player, field) {
    if(game.playground.fields[field].get() === marker[player]) {
        return true;
    }

    return false;
}
