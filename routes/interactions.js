const express = require("express");
const router = express.Router();
const interactionsController = require("../controllers/interactionsController");

router.post("/interactions, interactionsController.checkInteractions");

module.exports = router;