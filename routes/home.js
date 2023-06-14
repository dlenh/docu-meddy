const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home");

router.get("/", homeController.getIndex);
router.post("/new", homeController.addMed);
// router.get("/interactions", homeController.checkInteractions);
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
rotuer.post("/signup", authController.postSignup);

module.exports = router;