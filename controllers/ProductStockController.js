const { Product, ProductStock } = require('../models');
const { apiResponse } = require('../utils/response');

exports.listStock = async (req, res) => {
    try {
        const product = await ProductStock.findAll({
            include: [
                { model: Product, as: 'product', attributes: ['id', 'name'] }
            ]
        })

        return apiResponse({
            statusCode: 200,
            message: 'Success',
            data: product
        }, res)
    } catch (error) {
        return apiResponse({
            statusCode: 400,
            message: error.message,
        }, res)
    }
}

exports.createProductStock = async (req, res) => {
    try {
        const listStock = req.body.stock
        let arrStock = []

        if (!req.body.stock || listStock.length > 0) {
            // Maping data stock yang di request dari fronend
            await Promise.all(listStock.map(async (el) => {
                const product = await Product.findOne({ where: { id: el.id } })
                const productStock = await ProductStock.findOne({ where: { product_id: el.id } })
                if (product) {
                    // pengecekan data stock berdasarkan ID
                    if (productStock) {
                        // update data stock yang sudah ada
                        await productStock.update({
                            current_stock: el.current_stock,
                            old_stock: el?.old_stock ?? 0,
                            diff_stock: el.old_stock === 0 ? 0 : el.old_stock - el.current_stock
                        })
                    } else {
                        // Jika tida akan masuk ke arr Stock
                        arrStock.push({
                            product_id: el.id,
                            current_stock: el.current_stock,
                            old_stock: el?.old_stock ?? 0,
                            diff_stock: el.old_stock === 0 ? 0 : el.old_stock - el.current_stock
                        })
                    }
                }
            }))

            // Menyimpan data stock baru 
            const newStock = await ProductStock.bulkCreate(arrStock)

            return apiResponse({
                statusCode: 200,
                message: 'Success',
                data: newStock
            }, res)
        } else {
            return apiResponse({
                statusCode: 400,
                message: 'Stock Empty'
            }, res)
        }
    } catch (error) {
        return apiResponse({
            statusCode: 400,
            message: error.message
        }, res)
    }
}

exports.updateStock = async (req, res) => {
    try {
        const stock = ProductStock.findOne({ where: { id: req.params.id } })
        if (!stock) {
            return apiResponse({
                statusCode: 404,
                message: 'Not Found',
                data: null
            }, res)
        }

        const newStock = stock.update({
            current_stock: req.body.current_stock,
            old_stock: req.body.old_stock,
            diff_stock: req.body.old_stock - req.body.current_stock
        })

        return apiResponse({
            statusCode: 200,
            message: 'Success',
            data: newStock
        }, res)
    } catch (error) {
        return apiResponse({
            statusCode: 400,
            message: error.message,
        }, res)
    }
}

exports.deleteStock = async (req, res) => {
    try {
        const stock = ProductStock.findOne({ where: { id: req.params.id } })
        if (!stock) {
            return apiResponse({
                statusCode: 404,
                message: 'Not Found',
                data: null
            }, res)
        }

        await stock.destroy()

        return apiResponse({
            statusCode: 200,
            message: `Success delete stock ${req.params.id}`,
            data: null
        }, res)
    } catch (error) {
        return apiResponse({
            statusCode: 400,
            message: error.message,
        }, res)
    }
}