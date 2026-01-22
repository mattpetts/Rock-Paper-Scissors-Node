class Player {
    constructor( name ) {
        this._name = name;
        this._score = 0;
    }

    get name() {
        return this._name;
    }

    get score() {
        return this._score;
    }

    set score(value) {
        this._score = value;
    }
}

module.exports = {
    Player
}