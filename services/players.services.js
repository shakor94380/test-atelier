const Player = require('../models/player');
const { convertToNumber } = require('../helpers/players.helper');

/**
 * 
 * @returns {object[]}
 */
function getSortPlayers() {
    const players = Player.getAll();
    return players;
}

/**
 * 
 * @param {number} id 
 * @returns {object}
 */
function getInfosPlayer(id) {
   const player = Player.get(id);
   return player;
}

/**
 * 
 * @param {string[]} tags 
 * @returns {object}
 */
function checkPlayers(tags = []) {
    const players = Player.getAll();
    if (!players) {
        return {
            error : 'The file Json is not valid',
            code : 400
        }
    }

    for (let index = 0; index < players.length; index++) {
        const error = _checkInfos(players[index], tags);
        if (error.code) {
            return error;
        }
    }
}
/**
 * 
 * @param {object} player 
 * @param {string[]} tags 
 * @returns {object}
 */
function _checkInfos(player, tags = []) {
    if (tags.includes('rank')) {
        if (isNaN(player.data.rank) || convertToNumber(player.data.rank) <= 0) {
            return {
                code: 422,
                error: 'rank should be a number > 0'
            }
        }
    }

    if (tags.includes('weight')) {
        if (isNaN(player.data.weight) || convertToNumber(player.data.weight) <= 0) {
            return {
                code: 422,
                error: 'weight should be a number > 0'
            }
        }
    }

    if (tags.includes('height')) {
        if (isNaN(player.data.height) || convertToNumber(player.data.height) <= 0) {
            return {
                code: 422,
                error: 'height should be a number > 0'
            }
        }
    }

    if (tags.includes('code')) {
        if (typeof player.country.code !== 'string' || player.country.code.length != 3) {
            return {
                code: 422,
                error: 'code should be a string with length = 3'
            }
        }
    }

    if (tags.includes('last')) {
        if (!Array.isArray(player.data.last)) {
            return {
                code: 422,
                error: 'last should be a Array<Number>'
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
                error: 'last should contain only 0 or 1'
            }
        }
    }

    return {};
}
module.exports = {
    getSortPlayers,
    getInfosPlayer,
    checkPlayers
}