const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController')
const { authMiddleware } = require('../middleware/UserMiddleware')
const multer = require('multer')
const mulParse = multer()

router.post('/', authMiddleware, mulParse.none(), ProductController.addProduct)

module.exports = router