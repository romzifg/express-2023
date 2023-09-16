const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController')
const { authMiddleware } = require('../middleware/UserMiddleware')

router.post('/', authMiddleware, ProductController.addProduct)
router.get('/', authMiddleware, ProductController.getProducts)
router.get('/:id', authMiddleware, ProductController.getProduct)
router.put('/:id', authMiddleware, ProductController.updateProduct)
router.delete('/:id', authMiddleware, ProductController.deleteProduct)

module.exports = router