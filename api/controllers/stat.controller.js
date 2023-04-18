const statsService = require('../../services/stats.service');

const getStats = function(req, res) {
    const ratio = statsService.getRatio();
    const averageIMC = statsService.getAverageIMC();
    const medianeHeight = statsService.getMedianeHeight();
    const stats = {
        ratio : ratio,
        imc : averageIMC,
        height : medianeHeight
    };
    res.status(200).json(stats);
};

module.exports = {
    getStats
}