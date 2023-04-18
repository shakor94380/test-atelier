const playerService = require('../../services/players.services');

const getSortedPlayers = function (req, res) {

    const players = playerService.getSortPlayers();
    const sortPlayer = players.sort((p1, p2) => (p1.data.rank > p2.data.rank) ? 1 : (p1.data.rank < p2.data.rank) ? -1 : 0);
    res.status(200).json(sortPlayer);
};

const get = function (req, res) {

    const id = parseInt(req.params.id);
    const player = playerService.getInfosPlayer(id);
    res.status(200).json(player);
};

module.exports = {
    getSortedPlayers,
    get
}