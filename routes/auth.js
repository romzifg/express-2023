const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');
const { authMiddleware } = require('../middleware/UserMiddleware');

router.post('/register', AuthController.register)
router.post('/login', AuthController.login)
router.post('/logout', authMiddleware, AuthController.logoutUser)
router.get('/me', authMiddleware, AuthController.getCurrentUser)

module.exports = router