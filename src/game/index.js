const Playground = require('./playground');

const marker = {
    p1: 'X',
    p2: 'O'
};

function Game(name) {
    this.name = name;
    this.turn = 'p1';
    this.playground = new Playground('Test Playground');
}

Game.prototype.mark = function(player, field) {
    if(this.turn !== player) {
        return { error: true, message: 'Wrong Player' };
    }

    let position = field - 1;

    let status = this.playground.fields[position].mark(marker[player]);

    if(!status.error) {
        let end = endGame(this, player, position);

        if(end === 1) {
            console.log('Player ' + player + ' has won!');

            return { error: false, endGame: true, winner: player };
        } else if(end === 2) {
            return { error: false, endGame: true, winner: 'Draw' };
        }


    }

    return { error: true }
};

module.exports = Game;

//executes endgame conditions
function endGame(game, player, field) {
    switch (field) {
        case 0:
            if(check(game, player, 1) && check(game, player, 2)) {
                return 1;
            }
            if(check(game, player, 3) && check(game, player, 6)) {
                return 1;
            }
            if(check(game, player, 4) && check(game, player, 8)) {
                return 1;
            }
            break;
        case 1:
            if(check(game, player, 0) && check(game, player, 2)) {
                return 1;
            }
            if(check(game, player, 4) && check(game, player, 7)) {
                return 1;
            }
            break;
        case 2:
            if(check(game, player, 1) && check(game, player, 0)) {
                return 1;
            }
            if(check(game, player, 5) && check(game, player, 8)) {
                return 1;
            }
            if(check(game, player, 4) && check(game, player, 6)) {
                return 1;
            }
            break;
        case 3:
            if(check(game, player, 4) && check(game, player, 5)) {
                return 1;
            }
            if(check(game, player, 0) && check(game, player, 6)) {
                return 1;
            }
            break;
        case 4:
            if(check(game, player, 1) && check(game, player, 7)) {
                return 1;
            }
            if(check(game, player, 3) && check(game, player, 5)) {
                return 1;
            }
            if(check(game, player, 2) && check(game, player, 6)) {
                return 1;
            }
            if(check(game, player, 0) && check(game, player, 8)) {
                return 1;
            }
            break;
        case 5:
            if(check(game, player, 3) && check(game, player, 4)) {
                return 1;
            }
            if(check(game, player, 2) && check(game, player, 8)) {
                return 1;
            }
            break;
        case 6:
            if(check(game, player, 0) && check(game, player, 3)) {
                return 1;
            }
            if(check(game, player, 7) && check(game, player, 8)) {
                return 1;
            }
            if(check(game, player, 2) && check(game, player, 4)) {
                return 1;
            }
            break;
        case 7:
            if(check(game, player, 6) && check(game, player, 8)) {
                return 1;
            }
            if(check(game, player, 1) && check(game, player, 4)) {
                return 1;
            }
            break;
        case 8:
            if(check(game, player, 6) && check(game, player, 7)) {
                return 1;
            }
            if(check(game, player, 2) && check(game, player, 5)) {
                return 1;
            }
            if(check(game, player, 0) && check(game, player, 4)) {
                return 1;
            }
            break;
    }

    if(checkFull(game)) {
        return 2;
    }

    return 0;
}

//Checks if a field is already marked
function check(game, player, field) {
    if(game.playground.fields[field].get() === marker[player]) {
        return true;
    }

    return false;
}

//End condition if the field is full and there is no winner
function checkFull(game) {
    for(let key in game.playground.fields) {
        let field = game.playground.fields[key];
        if(!field.get()) {
            return false;
        }
    }

    return true;
}
