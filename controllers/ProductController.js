const asyncHandler = require('../middleware/asyncHandler')
const { Product } = require('../models')

exports.addProduct = asyncHandler(async (req, res) => {
    const file = req.file;
    if (!file) {
        res.status(400)
        throw new Error('File is empty')
    }

    const filename = file.filename
    const pathFile = `${req.protocol}://${req.get('host')}/public/uploads/${filename}`

    const newProduct = await Product.create({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        categoryId: req.body.categoryId,
        stock: req.body.stock,
        image: pathFile
    })

    return res.status(200).json({
        error: false,
        status: 'Success',
        data: newProduct
    })
})