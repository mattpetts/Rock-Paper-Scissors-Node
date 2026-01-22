const readline = require('readline');
const utils = require('./utilities/utils');
const ui = require('./utilities/ui');
const { Game } = require('./classes/Game');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const init = () => {
    rl.question('What is your name? > ', answer => {
        const game = new Game(answer, rl, utils, ui)
        game.startGame();
    });
}

init();