const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController')

router.get('/', categoryController.getAllCategories)
router.post('/', categoryController.storeCategory)
router.get('/:name', (req, res) => {
    res.json({
        message: `${req.params.name}`
    })
})

module.exports = router
