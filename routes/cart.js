const express = require('express');
const router = express.Router();
const CartController = require('../controllers/CartController')
const { authMiddleware } = require('../middleware/UserMiddleware')

router.get('/item', authMiddleware, CartController.getCarts)
router.get('/item/:id', authMiddleware, CartController.getCart)
router.post('/item', authMiddleware, CartController.addToCart)
router.put('/checkout/:id', authMiddleware, CartController.checkout)

module.exports = router
