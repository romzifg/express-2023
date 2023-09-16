const asyncHandler = require('../middleware/asyncHandler')
const { Product, ProductImage, ProductStock } = require('../models');
const { apiResponse } = require('../utils/response');
const fs = require('fs')

exports.addProduct = asyncHandler(async (req, res) => {
    const newProduct = await Product.create({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        categoryId: req.body.categoryId,
        image: req.body.image
    })

    return apiResponse({
        statusCode: 200,
        message: 'Success',
        data: newProduct
    }, res)
})

exports.getProducts = asyncHandler(async (req, res) => {
    const product = await Product.findAll({
        include: [
            { model: ProductImage, as: 'product_thumbnail', attributes: ['id', 'image_url', 'is_active'] },
            { model: ProductStock, as: 'product_stock', attributes: ['current_stock', 'old_stock'] }
        ]
    });

    return apiResponse({
        statusCode: 200,
        message: 'Success',
        data: product
    }, res)
})

exports.getProduct = asyncHandler(async (req, res) => {
    const product = await Product.findOne({
        where: { id: req.params.id },
        include: [
            { model: ProductImage, as: 'product_thumbnail', attributes: ['id', 'image_url', 'is_active'] },
            { model: ProductStock, as: 'product_stock', attributes: ['current_stock', 'old_stock'] }
        ]
    })

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

    if (req.body.image && req.body.image !== null) {
        const filename = product.image.replace(`${req.protocol}://${req.get('host')}/public/uploads/`, "")
        const filePath = `./public/uploads/${filename}`

        fs.unlinkSync(filePath, (err) => {
            if (err) {
                return apiResponse({
                    statusCode: 400,
                    message: "Fail"
                })
            }
        })
    }

    const newProduct = await product.update({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        categoryId: req.body.categoryId,
        image: req.body.image === null ? product.image : req.body.image
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

    const filename = product.image.replace(`${req.protocol}://${req.get('host')}/public/uploads/`, "")
    const filePath = `./public/uploads/${filename}`

    fs.unlinkSync(filePath, (err) => {
        if (err) {
            return apiResponse({
                statusCode: 400,
                message: "Fail"
            })
        }
    })

    await product.destroy()

    return apiResponse({
        statusCode: 200,
        message: `Success delete product for id ${req.params.id}`,
        data: null
    }, res)
})