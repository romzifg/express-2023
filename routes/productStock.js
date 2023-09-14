const express = require('express');
const router = express.Router();
const ProductStockController = require('../controllers/ProductStockController')
const { authMiddleware } = require('../middleware/UserMiddleware')

router.get('/', authMiddleware, ProductStockController.listStock)
router.post('/', authMiddleware, ProductStockController.createProductStock)
router.put('/:id', authMiddleware, ProductStockController.updateStock)
router.delete('/:id', authMiddleware, ProductStockController.deleteStock)

module.exports = router