const express = require("express");
const router = express.Router();
const pageController = require('../controllers/pageController');
const authController = require('../controllers/authController');
const authCheck = require("../middleware/authCheck");
const authenticate = authCheck.authenticate;
const authenticatePage = authCheck.authenticatePage;
const walletController = require('../controllers/walletController');
const userController = require("../controllers/userController");
const translateController = require("../controllers/translateController");

router.get("/", pageController.home);
router.get("/tasks", pageController.tasks);
router.get("/auth", pageController.auth);
router.get("/confirm-email", pageController.confirmEmail);
router.get("/wallet", authenticatePage, pageController.wallet);
router.post('/signin', authController.signin);
router.post('/signup', authController.signup);
router.get('/authenticate', authenticate);
router.get('/auth/authenticator', pageController.authenticator);
router.get('/translation', pageController.translation);
router.get('/translate', pageController.translation);
router.post('/translate', (req, res) => translateController.translate(req, res));

// ====== WALLET ==== 
router.get('/get-balance', authenticate, walletController.getBalance);


// =======User ===========
router.get('/user', authenticate, userController.getUser);


module.exports = router;