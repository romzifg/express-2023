const asyncHandler = require('../middleware/asyncHandler')
const { Product } = require('../models')

exports.addProduct = asyncHandler(async (req, res) => {
    const newProduct = await Product.create({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        categoryId: req.body.categoryId,
        stock: req.body.stock,
        image: req.body.image
    })
})