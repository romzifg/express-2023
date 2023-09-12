const { Coupon } = require('../models');
const asyncHandler = require('../middleware/asyncHandler')

exports.getAllCoupons = async (req, res) => {
    try {
        const coupons = await Coupon.findAll()

        return res.status(200).json({
            status: 200,
            message: 'Success',
            data: coupons
        })
    } catch (error) {
        return res.status(400).json({
            status: 400,
            message: 'Fail',
            error: error.message
        })
    }
}

exports.getCoupon = async (req, res) => {
    try {
        const coupon = await Coupon.findOne({ where: { id: req.params.id } })
        if (!coupon) {
            return res.status(404).json({
                status: 404,
                message: 'Not Found',
                data: null
            })
        }

        return res.status(200).json({
            status: 200,
            message: 'Success',
            data: coupon
        })
    } catch (error) {
        return res.status(400).json({
            status: 400,
            message: 'Fail',
            error: error.message
        })
    }
}

exports.createCoupon = asyncHandler(async (req, res) => {
    const coupon = await Coupon.create({
        name: req.body.name,
        code: (req.body.code).toUpperCase(),
        expired_date: req.body.expired_date,
        disc_value: req.body.disc_value
    })

    return res.status(200).json({
        status: 200,
        message: 'Success',
        data: coupon
    })
})

exports.updateCoupon = asyncHandler(async (req, res) => {
    const coupon = await Coupon.findOne({ where: { id: req.params.id } })
    if (!coupon) {
        return res.status(404).json({
            status: 404,
            message: 'Not Found',
            data: null
        })
    }

    await coupon.update({
        name: req.body.name,
        code: (req.body.code)?.toUpperCase(),
        expired_date: req.body.expired_date,
        disc_value: req.body.disc_value
    })

    return res.status(200).json({
        status: 200,
        message: 'Success',
        data: coupon
    })
})

exports.destroyCoupon = asyncHandler(async (req, res) => {
    const coupon = await Coupon.findOne({ where: { id: req.params.id } })
    if (!coupon) {
        return res.status(404).json({
            status: 404,
            message: 'Not Found',
            error: 'Data Not Found'
        })
    }

    await coupon.destroy()

    return res.status(200).json({
        status: 200,
        message: `Success delete coupon with id ${req.params.id}`,
    })
})