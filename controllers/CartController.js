const {
    Cart,
    CartItem,
    Product,
    Transaction,
    TransactionItem,
    TransactionLog
} = require('../models')
const { apiResponse } = require('../utils/response')

exports.getCarts = async (req, res) => {
    try {
        const cart = await Cart.findAll({
            where: { user_id: req.user.id },
            include: [
                { model: CartItem, as: 'items' }
            ]
        })

        return apiResponse({
            statusCode: 200,
            message: 'Success',
            data: cart
        }, res)
    } catch (error) {
        console.log(error)
        return apiResponse({
            statusCode: 400,
            message: error.message,
        }, res)
    }
}

exports.getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({
            where: { carat_id: req.params.id },
            include: [
                { model: CartItem, as: 'items' }
            ]
        })

        if (!cart) {
            return apiResponse({
                statusCode: 404,
                message: 'Not Found',
                data: null
            }, res)
        }

        return apiResponse({
            statusCode: 200,
            message: 'Success',
            data: cart
        }, res)
    } catch (error) {
        return apiResponse({
            statusCode: 400,
            message: error.message,
        }, res)
    }
}

exports.addToCart = async (req, res) => {
    try {
        let total_amount = 0
        let total_items = 0

        const items = req.body.items
        await items.forEach(e => {
            const totalAmount = e.amount * e.total
            e.total_amount = totalAmount

            total_amount += totalAmount
            total_items += e.total
        });

        const cart = await Cart.create({
            user_id: req.user.id,
            total_item: total_items,
            total_amount,
            is_checkout: checkout
        })

        let arrCartItem = []
        await Promise.all(items.map(async (el) => {
            const product = await Product.findOne({ where: { id: el.product_id } })
            if (product) {
                arrCartItem.push({
                    ...el,
                    cart_id: cart.cart_id
                })
            }
        }))

        const cartItems = await CartItem.bulkCreate(arrCartItem)

        return apiResponse({
            statusCode: 200,
            message: 'Success',
            data: cartItems
        }, res)
    } catch (error) {
        return apiResponse({
            statusCode: 400,
            message: error.message,
        }, res)
    }
}

exports.checkout = async (req, res) => {
    try {
        let total_amount = 0
        let total_items = 0

        // Cek cart sebelum update cart item
        const cart = await Cart.findOne({ where: { cart_id: req.params.id } })
        if (!cart) {
            return apiResponse({
                statusCode: 404,
                message: 'Not Found',
                data: null
            }, res)
        }

        // hapus data cart item lama
        await CartItem.destroy({ where: { cart_id: req.params.id } })

        const items = req.body.items
        await items.forEach(e => {
            const totalAmount = e.amount * e.total
            e.total_amount = totalAmount

            total_amount += totalAmount
            total_items += e.total
        });

        await cart.update({
            user_id: req.user.id,
            total_item: total_items,
            total_amount,
            is_checkout: 1
        })

        let arrCartItem = []
        await Promise.all(items.map(async (el) => {
            const product = await Product.findOne({ where: { id: el.product_id } })
            if (product) {
                arrCartItem.push({
                    ...el,
                    cart_id: cart.cart_id
                })
            }
        }))

        // Simpan data cart item baru
        await CartItem.bulkCreate(arrCartItem)

        // Save data ke table transaction
        const transaction = await Transaction.create({
            user_id: req.user.id,
            total_item: total_items,
            total_amount,
        })

        let arrTransaction = []
        await Promise.all(items.map(async (el) => {
            const product = await Product.findOne({ where: { id: el.product_id } })
            if (product) {
                arrTransaction.push({
                    ...el,
                    transaction_id: transaction.transaction_id
                })
            }
        }))

        await TransactionItem.bulkCreate(arrTransaction)
        await TransactionLog.create({
            transaction_id: transaction.transaction_id,
            description: `User ${req.user.id} make transaction with transaction id ${transaction.transaction_id}`
        })

        return apiResponse({
            statusCode: 200,
            message: "Success",
            data: transaction
        }, res)
    } catch (error) {
        return apiResponse({
            statusCode: 400,
            message: error.message
        }, res)
    }
}