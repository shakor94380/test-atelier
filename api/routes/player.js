const express = require('express');
const router = express.Router();

const playerController = require('../controllers/player.controller');

router.get("/", playerController.getSortedPlayers);

router.get("/stats", playerController.getStats);

router.get("/:id", playerController.get);

module.exports = router;