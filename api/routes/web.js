const express = require("express");
const router = express.Router();

const pageController = require('../controllers/pageController');

router.get("/", pageController.home);
router.get("/", pageController.tasks);
router.get("/", pageController.auth);
router.get("/", pageController.wallet);

module.exports = router;