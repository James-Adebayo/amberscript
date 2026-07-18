const express = require("express");
const router = express.Router();
const pageController = require('../controllers/pageController');
const authController = require('../controllers/authController');
const authCheck = require("../middleware/authCheck");
const authenticate = authCheck.authenticate;
const walletController = require('../controllers/walletController');

router.get("/", pageController.home);
router.get("/", pageController.tasks);
router.get("/", pageController.auth);
router.get("/", pageController.confirmEmail);
router.get("/", pageController.wallet);
router.post('/signin', authController.signin);
router.post('/signup', authController.signup);
router.get('/authenticate', authenticate);
router.get('/auth/authenticator', pageController.authenticator);

// ====== WALLET ==== 
router.get('/get-balance', walletController.getBalance);


module.exports = router;