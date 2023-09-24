const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');
const { authMiddleware } = require('../middleware/UserMiddleware');
const { rateLimit } = require('express-rate-limit');

const createAccountLimiter = rateLimit({
    windowMs: 30 * 60 * 1000,
    limit: 5,
    message: 'Too many accounts created from this IP, please try again after an hour',
    standardHeaders: 'draft-7',
    legacyHeaders: false,
})

router.post('/register', createAccountLimiter, AuthController.register)
router.post('/login', AuthController.login)
router.post('/logout', authMiddleware, AuthController.logoutUser)
router.get('/me', authMiddleware, AuthController.getCurrentUser)

module.exports = router