const { Coupon } = require('../models');
const { apiResponse } = require('../utils/response');

exports.getAllCoupons = async (req, res) => {
    try {
        const coupons = await Coupon.findAll()

        return apiResponse({
            statusCode: 200,
            message: 'Success',
            data: coupons
        }, res)
    } catch (error) {
        return apiResponse({
            statusCode: 400,
            message: error.message,
        }, res)
    }
}

exports.getCoupon = async (req, res) => {
    try {
        const coupon = await Coupon.findOne({ where: { id: req.params.id } })
        if (!coupon) {
            return apiResponse({
                statusCode: 404,
                message: 'Not Found',
                data: null,
            }, res)
        }

        return apiResponse({
            statusCode: 200,
            message: 'Success',
            data: coupon
        }, res)
    } catch (error) {
        return apiResponse({
            statusCode: 400,
            message: error.message,
        }, res)
    }
}

exports.createCoupon = async (req, res) => {
    try {
        const coupon = await Coupon.create({
            name: req.body.name,
            code: (req.body.code).toUpperCase(),
            expired_date: req.body.expired_date,
            disc_value: req.body.disc_value
        })

        return apiResponse({
            statusCode: 201,
            message: 'Success',
            data: coupon
        }, res)
    } catch (error) {
        return apiResponse({
            statusCode: 400,
            message: error.message,
        }, res)
    }
}

exports.checkCoupon = async (req, res) => {
    try {
        const coupon = await Coupon.findOne({ where: { code: req.body.code } })
        if (!coupon) {
            return apiResponse({
                statusCode: 404,
                message: 'Not Found',
                data: null,
            }, res)
        }

        if (new Date(coupon.expired_date) < new Date()) {
            await coupon.update({ status: "EXPIRED" })
        }

        return apiResponse({
            statusCode: 200,
            message: 'Success',
            data: coupon
        }, res)
    } catch (error) {
        return apiResponse({
            statusCode: 400,
            message: error.message,
        }, res)
    }
}

exports.updateCoupon = async (req, res) => {
    try {
        const coupon = await Coupon.findOne({ where: { id: req.params.id } })
        if (!coupon) {
            return apiResponse({
                statusCode: 404,
                message: 'Not Found',
                data: null,
            }, res)
        }

        await coupon.update({
            name: req.body.name,
            code: (req.body.code)?.toUpperCase(),
            expired_date: req.body.expired_date,
            disc_value: req.body.disc_value
        })

        return apiResponse({
            statusCode: 200,
            message: 'Success',
            data: coupon
        }, res)
    } catch (error) {
        return apiResponse({
            statusCode: 400,
            message: error.message,
        }, res)
    }
}

exports.destroyCoupon = async (req, res) => {
    try {
        const coupon = await Coupon.findOne({ where: { id: req.params.id } })
        if (!coupon) {
            return apiResponse({
                statusCode: 404,
                message: 'Not Found',
                data: null,
            }, res)
        }

        await coupon.destroy()

        return apiResponse({
            statusCode: 200,
            message: `Success delete coupon with id ${req.params.id}`,
            data: null
        }, res)
    } catch (error) {
        return apiResponse({
            statusCode: 400,
            message: error.message,
        }, res)
    }
}