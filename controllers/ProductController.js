const asyncHandler = require('../middleware/asyncHandler')
const { Product } = require('../models');
const { apiResponse } = require('../utils/response');

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

    return apiResponse({
        statusCode: 200,
        message: 'Success',
        data: newProduct
    }, res)
})

exports.getProducts = asyncHandler(async (req, res) => {
    const product = await Product.findAll();

    return apiResponse({
        statusCode: 200,
        message: 'Success',
        data: product
    }, res)
})

exports.getProduct = asyncHandler(async (req, res) => {
    const product = await Product.findByPk(req.params.id)

    if (!product) {
        return apiResponse({
            statusCode: 404,
            message: 'Not Found',
            data: null
        }, res)
    }

    return apiResponse({
        statusCode: 200,
        message: 'Success',
        data: product
    }, res)
})

exports.updateProduct = asyncHandler(async (req, res) => {
    const product = await Product.findByPk(req.params.id)

    if (!product) {
        return apiResponse({
            statusCode: 404,
            message: 'Not Found',
            data: null
        }, res)
    }

    const file = req.file;
    let filename;
    let pathFile;
    if (file) {
        filename = file.filename
        pathFile = `${req.protocol}://${req.get('host')}/public/uploads/${filename}`
    }

    const newProduct = await product.update({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        categoryId: req.body.categoryId,
        stock: req.body.stock,
        image: pathFile
    })

    return apiResponse({
        statusCode: 200,
        message: 'Success',
        data: newProduct
    }, res)
})

exports.deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findByPk(req.params.id)
    if (!product) {
        return apiResponse({
            statusCode: 404,
            message: 'Not Found',
            data: product
        }, res)
    }

    await product.destroy()

    return apiResponse({
        statusCode: 200,
        message: `Success delete category id ${req.params.id}`,
        data: product
    }, res)
})