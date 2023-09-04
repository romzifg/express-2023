const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/CategoryController')
const { authMiddleware, permissionUser } = require('../middleware/UserMiddleware')

router.get('/', CategoryController.getAllCategories)
router.get('/:id', authMiddleware, permissionUser("admin"), CategoryController.getCategoryById)
router.post('/', CategoryController.storeCategory)
router.put('/:id', CategoryController.updateCategory)
router.delete('/:id', CategoryController.destroyCategory)

module.exports = router
