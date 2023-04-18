const { isInteger } = require('../../helpers/players.helper');

function checkGetId(req, res, next) {
    const paramId = req.params.id;
    if(!paramId || !isInteger(paramId)) {
        return res.status(400).send('param Id is invalid')
    }
    next();
}

module.exports = {
    checkGetId
};