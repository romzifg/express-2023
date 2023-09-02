const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController')

router.get('/', categoryController.getAllCategories)
router.get('/:id', categoryController.getCategoryById)
router.post('/', categoryController.storeCategory)
router.put('/:id', categoryController.updateCategory)
router.delete('/:id', categoryController.destroyCategory)

module.exports = router
