const express = require('express');
const router = express.Router();
const { checkGetId} = require('../middlewares/requests.middleware');

const playerController = require('../controllers/player.controller');

router.get("/", playerController.getSortedPlayers);

router.get("/:id", checkGetId, playerController.get);

module.exports = router;