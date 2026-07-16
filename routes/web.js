const express = require("express");
const router = express.Router();
const pageController = require('../controllers/pageController');
const authController = require('../controllers/authController');

router.get("/", pageController.home);
router.get("/", pageController.tasks);
router.get("/", pageController.auth);
router.get("/", pageController.confirmEmail);
router.get("/", pageController.wallet);
router.post('/signin', authController.signin);
router.post('/signup', authController.signup);


module.exports = router;