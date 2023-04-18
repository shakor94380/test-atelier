const { convertToNumber } = require('../../helpers/players.helper');
const dataPath = require('../../data/players.json');

function _checkInfos(player, index) {
    if (isNaN(player.data.rank) || convertToNumber(player.data.rank) <= 0) {
        return {
            code: 422,
            error: `rank from index : ${index} should be a number > 0`
        }
    }

        if (isNaN(player.data.weight) || convertToNumber(player.data.weight) <= 0) {
            return {
                code: 422,
                error: `weight from index : ${index} should be a number > 0`
            }
        }

        if (isNaN(player.data.height) || convertToNumber(player.data.height) <= 0) {
            return {
                code: 422,
                error: `height from index : ${index} should be a number > 0`
            }
        }

        if (typeof player.country.code !== 'string' || player.country.code.length != 3) {
            return {
                code: 422,
                error: `code from index : ${index} should be a string with length = 3`
            }
        }

        if (!Array.isArray(player.data.last)) {
            return {
                code: 422,
                error: `last from index : ${index} should be a Array<Number>`
            }
        }
        let valueisValid = true;
        for (let index = 0; index < player.data.last.length; index++) {
            if (![0, 1].includes(Number(player.data.last[index]))) {
                valueisValid = false;
                break;
            }
        }
        if (!valueisValid) {
            return {
                code: 422,
                error: `last from index : ${index} should contain only 0 or 1`
            }
        }

    return {};
}

function checkPlayersData(req, res, next){
    const players = dataPath.players;
    if (!players) {
        return res.status(400).send('The file Json is not valid');
    }

    for (let index = 0; index < players.length; index++) {
        const error = _checkInfos(players[index], index);
        if (error.code) {
            return res.status(error.code).send(error.error);
        }
    }
    next();
}

module.exports = {
    checkPlayersData
};