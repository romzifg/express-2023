const express = require('express');
const router = express.Router();
const UploadController = require('../controllers/UploadController')
const { authMiddleware } = require('../middleware/UserMiddleware')
const { uploadOption } = require('../utils/fileUpload')

router.post('/single', authMiddleware, uploadOption.single('image'), UploadController.single)
router.post('/multiple', authMiddleware, uploadOption.array('images'), UploadController.multiple)

module.exports = router