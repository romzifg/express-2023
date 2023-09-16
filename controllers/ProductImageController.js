const asyncHandler = require('../middleware/asyncHandler')
const { Product, ProductImage } = require('../models');
const { apiResponse } = require('../utils/response');
const fs = require('fs')

exports.getThumbnail = async (req, res) => {
    try {
        const productImage = await ProductImage.findAll({ where: { product_id: req.params.id, is_active: 1 } })

        return apiResponse({
            statusCode: 200,
            message: 'Success',
            data: productImage
        }, res)
    } catch (error) {
        return apiResponse({
            statusCode: error.statusCode,
            message: error.message,
            data: null
        }, res)
    }
}

exports.addThumbnail = asyncHandler(async (req, res) => {
    const product = await Product.findByPk(req.body.product_id)

    if (!product) {
        return apiResponse({
            statusCode: 404,
            message: 'Not Found',
            data: null
        }, res)
    }

    const thumbnails = req.body.image_thumbnails
    if (thumbnails.length === 0) {
        return apiResponse({
            statusCode: 400,
            message: 'Image Empty',
        }, res)
    }

    let payload = []
    await Promise.all(thumbnails.map(async (e) => {
        payload.push({
            product_id: req.body.product_id,
            image_url: e,
        })
    }))

    const thumbnail = await ProductImage.bulkCreate(payload)

    return apiResponse({
        statusCode: 200,
        message: 'Success',
        data: thumbnail
    }, res)
})

exports.changeIsActive = asyncHandler(async (req, res) => {
    const isActive = req.body.ids

    const productImage = await ProductImage.findAll({ where: { product_id: req.body.product_id } })
    await Promise.all(productImage.map((el) => {
        if (!isActive.includes(el.id)) {
            el.is_active = 0
            el.save()
        }
    }))

    await Promise.all(isActive.map(async (el) => {
        await ProductImage.update({
            is_active: 1
        }, { where: { id: el } })
    }))

    return apiResponse({
        statusCode: 200,
        message: 'Success',
        data: isActive
    }, res)
})

exports.deleteImage = asyncHandler(async (req, res) => {
    const productImage = await ProductImage.findByPk(req.params.id)

    if (!productImage) {
        return apiResponse({
            statusCode: 404,
            message: 'Not Found',
            data: null
        }, res)
    }

    const filename = productImage.image_url.replace(`${req.protocol}://${req.get('host')}/public/uploads/`, "")
    const filePath = `./public/uploads/${filename}`

    fs.unlinkSync(filePath, (err) => {
        if (err) {
            return apiResponse({
                statusCode: 400,
                message: "Fail"
            })
        }
    })

    await productImage.destroy()

    return apiResponse({
        statusCode: 200,
        message: `Success delete product image for id ${req.params.id}`,
        data: null
    }, res)
})
