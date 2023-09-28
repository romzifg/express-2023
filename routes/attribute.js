const express = require('express');
const router = express.Router();
const AttributeController = require('../controllers/AttributeController');
const { authMiddleware } = require('../middleware/UserMiddleware');

router.get('/', authMiddleware, AttributeController.getAttribute)
router.post('/', authMiddleware, AttributeController.createAttribute)
router.put('/:id', authMiddleware, AttributeController.updateAttribute)
router.delete('/:id', authMiddleware, AttributeController.deleteAttribute)

module.exports = router
