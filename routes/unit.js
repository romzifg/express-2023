const express = require('express');
const router = express.Router();
const UnitController = require('../controllers/UnitController');
const { authMiddleware } = require('../middleware/UserMiddleware');

router.get('/', authMiddleware, UnitController.getUnit)
router.post('/', authMiddleware, UnitController.createUnit)
router.put('/:id', authMiddleware, UnitController.updateUnit)
router.delete('/:id', authMiddleware, UnitController.deleteUnit)

module.exports = router
