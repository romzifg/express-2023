const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController')
const { authMiddleware } = require('../middleware/UserMiddleware')
const { uploadOption } = require('../utils/fileUpload')

router.post('/', authMiddleware, uploadOption.single('image'), ProductController.addProduct)
router.get('/', authMiddleware, ProductController.getProducts)
router.get('/:id', authMiddleware, ProductController.getProduct)

module.exports = router