const express = require('express');
const router = express.Router();
const ProductImageController = require('../controllers/ProductImageController')
const { authMiddleware } = require('../middleware/UserMiddleware')

router.get('/:id', authMiddleware, ProductImageController.getThumbnail)
router.post('/', authMiddleware, ProductImageController.addThumbnail)
router.post('/isActive', authMiddleware, ProductImageController.changeIsActive)
router.delete('/:id', authMiddleware, ProductImageController.deleteImage)

module.exports = router