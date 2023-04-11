const playerService = require('../../services/players.services');

const getSortedPlayers = function (req, res) {
    const error = playerService.checkPlayers(['rank']);
    if (error && error.code) {
        throw new Error(error.error);
    }
    const players = playerService.getSortPlayers();
    const sortPlayer = players.sort((p1, p2) => (p1.data.rank > p2.data.rank) ? 1 : (p1.data.rank < p2.data.rank) ? -1 : 0);
    res.status(200).json(sortPlayer);
};

const get = function (req, res) {
    const error = playerService.checkPlayers();
    if (error && error.code) {
        throw new Error(error.error);
    }
    const id = parseInt(req.params.id);
    const player = playerService.getInfosPlayer(id);
    res.status(200).json(player);
};

const getStats = function(req, res) {
    const error = playerService.checkPlayers(['height', 'weight', 'code', 'last']);
    if (error && error.code) {
        throw new Error(error.error);
    }
    const ratio = playerService.getRatio();
    const averageIMC = playerService.getAverageIMC();
    const medianeHeight = playerService.getMedianeHeight();
    const stats = {
        ratio : ratio,
        imc : averageIMC,
        height : medianeHeight
    };
    res.status(200).json(stats);
};

module.exports = {
    getSortedPlayers,
    get,
    getStats
}