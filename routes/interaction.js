const express = require("express");
const router = express.Router();
const interactionController = require("../controllers/interaction");

// router.get("/", homeController.getIndex);
// router.post("/new", homeController.addMed);
router.get("/interaction", interactionController.checkInteraction);

module.exports = router;