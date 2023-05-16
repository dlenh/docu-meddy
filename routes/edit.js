const express = require("express");
const router = express.Router();
const editController = require("../controllers/edit");

// router.get("/:id", editController.getEdit);
router.get("/remove/:id", editController.deleteMed);
router.post("update/:id", editController.updateMed);

module.exports = router;