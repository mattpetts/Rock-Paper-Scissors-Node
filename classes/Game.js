const { Player } = require('./Player');
const { Computer } = require('./Computer');

class Game {
    constructor(name, rl, utils, ui) {
        this._player      = new Player(name);
        this._cpu         = new Computer('Computer');
        this._gamesPlayed = 0;
        this._bestOf      = 5;
        this._rl          = rl;
        this._utils       = utils;
        this._ui          = ui;
    }

    determineWinner(user, cpu) {
        const winConditions = { rock: 'scissors', paper: 'rock', scissors: 'paper' };

        if (user === cpu) {
            return 'draw';
        }
        return winConditions[user] === cpu ? 'user' : 'cpu';
    };

    handleResult(result) {
        if ( result === 'user') {
            console.log(this._ui.color(`${this._player.name}`, 'green'), 'wins!');
            this._player.score = this._player.score + 1;
            ++this._gamesPlayed
        } else if (result === 'cpu') {
            console.log(this._ui.color(`${cpu.name}`, 'red'), 'wins!');
            this._cpu.score = this._cpu.score + 1;
            ++this._gamesPlayed
        } else {
            console.log(this._ui.color(`It's a draw!`, 'yellow'));
        }
    }

    startGame() {
        const newRound = () => {

            if (this._gamesPlayed === this._bestOf) {
                this._ui.dividerOutput('🎉 Game Over!', 'green')
                this._rl.close();
                process.exit();
            }

            this._ui.roundHeader(this._gamesPlayed  + 1, this._bestOf);

            this._rl.question(
                this._ui.color('Choose rock, paper, or scissors > ', 'yellow'),
                (answer) => {
                    const userAnswer = this._utils.normaliseAnswer(answer);

                    if (!this._utils.answerIsValid(userAnswer)) {
                        console.log(this._ui.color(`❌ "${answer}" is not a valid move`, 'red'));
                        return newRound();
                    }

                    const cpuAnswer = this._cpu.generateMove();

                    const result = this.determineWinner(userAnswer, cpuAnswer);

                    console.log(
                    this._ui.color(`${this._player.name}`, 'blue'),
                    'picked',
                    this._ui.color(userAnswer, 'bold')
                    );

                    console.log(
                    this._ui.color(`${this._cpu.name}`, 'red'),
                    'picked',
                    this._ui.color(cpuAnswer, 'bold')
                    );

                    this.handleResult(result);
                    this._ui.dividerOutput(`Player score: ${this._player.score} | CPU score: ${this._cpu.score}`, 'cyan');


                    newRound();
                }
            );
        }

        newRound();
    }
}

module.exports = {
    Game
}