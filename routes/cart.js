const express = require('express');
const router = express.Router();
const CartController = require('../controllers/CartController');
const { authMiddleware } = require('../middleware/UserMiddleware');
const { rateLimit } = require('express-rate-limit');

const checkoutLimiter = rateLimit({
    windowMs: 30 * 60 * 1000,
    limit: 5,
    message: 'Too many transaction created from this IP, please try again after an half hour',
    standardHeaders: 'draft-7',
    legacyHeaders: false,
})

router.get('/item', authMiddleware, CartController.getCarts)
router.get('/item/:id', authMiddleware, CartController.getCart)
router.post('/item', authMiddleware, CartController.addToCart)
router.put('/checkout/:id', checkoutLimiter, authMiddleware, CartController.checkout)

module.exports = router
