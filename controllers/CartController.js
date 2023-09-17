const asyncHandler = require('../middleware/asyncHandler')
const { Cart, CartItem } = require('../models')
const { apiResponse } = require('../utils/response')

exports.addToCart = asyncHandler(async (req, res) => {
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
        user_id: req.user_id,
        total_items,
        total_amount,
    })

    let arrCartItem = []
    await Promise.all(items.map(async (el) => {
        const product = await Product.findOne({ where: { id: el.prouct_id } })
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
    })
})