const express = require('express');
const router = express.Router();
const TransactionController = require('../controllers/TransactionController')
const { authMiddleware } = require('../middleware/UserMiddleware')

router.get('/list', authMiddleware, TransactionController.getTransactions)
router.get('/detail/:id', authMiddleware, TransactionController.getTransaction)
router.get('/logs', authMiddleware, TransactionController.getLogs)
router.put('/attachment/:id', authMiddleware, TransactionController.uploadAttachment)
router.put('/confirm/:id', authMiddleware, TransactionController.confirmTransaction)

module.exports = router
