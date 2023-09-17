const express = require('express');
const router = express.Router();
const CartController = require('../controllers/CartController')
const { authMiddleware } = require('../middleware/UserMiddleware')

router.post('/item', authMiddleware, CartController.addToCart)

module.exports = router
