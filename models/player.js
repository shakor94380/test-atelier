const dataPath = require('../data/players.json');

class Player {
    constructor(data) {
        this.data = data.players;
    }

    getAll() {
        return this.data;
    }

    get(id) {
        return this.data.find((player => player.id === id));
    }
}

module.exports = new Player(dataPath);