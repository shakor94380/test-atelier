const Player = require('../models/player');
const { isEven } = require('../helpers/players.helper');
const players = Player.getAll();

/**
 * 
 * @returns {string}
 */
function getRatio() {
    const groupByCountry = players.reduce((list, player) => {
        if (!list[player.country.code]) {
            list[player.country.code] = [];
        }
        player.data.last.forEach((element) => list[player.country.code].push(element));
        return list;
    },{});
    const ratio = Object.keys(groupByCountry).map((key) => {
        const scores = groupByCountry[key];
        return { code: key, ratio : scores.reduce((sum, a) => sum + a, 0) / scores.length};
    }).reduce((max, element) => {
        return maxElement = element.ratio > max.ratio ? element : max;
    },{ ratio : 0 })
    if ( ratio && ratio.ratio > 0) {
        return ratio.code;
    }
        return {}
}

/**
 * 
 * @returns {number}
 */
function getAverageIMC() {
    const imcList = players.map((player) => (player.data.weight / 1000) / Math.pow(player.data.height / 100, 2));
    const averageImc =  imcList.reduce((sum, a) => sum + a, 0) / imcList.length;
    return averageImc;
}

/**
 * 
 * @returns {number}
 */
function getMedianeHeight() {
    const weightList = players.sort((p1, p2) => (p1.data.height > p2.data.height) ? 1 : (p1.data.height < p2.data.height) ? -1 : 0);
    const n = isEven(weightList.length) ? weightList.length : weightList.length + 1;
    const indexMedian = n / 2;
    if (indexMedian === 0) {
        return;
    }
    return players[indexMedian - 1].data.height;
}

module.exports = {
    getRatio,
    getAverageIMC,
    getMedianeHeight
}