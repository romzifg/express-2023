const { Unit } = require('../models');
const { apiResponse } = require('../utils/response');

exports.getUnit = async (req, res) => {
    try {
        const unit = await Unit.findAll()

        return apiResponse({
            statusCode: 200,
            message: 'Success',
            data: unit
        }, res)
    } catch (error) {
        return apiResponse({
            statusCode: 400,
            message: error.message
        }, res)
    }
}

exports.createUnit = async (req, res) => {
    try {
        const unit = await Unit.create({
            name: req.body.name,
            status: true
        })

        return apiResponse({
            statusCode: 201,
            message: 'Success',
            data: unit
        })
    } catch (error) {
        return apiResponse({
            statusCode: 400,
            message: error.message
        }, res)
    }
}

exports.updateUnit = async (req, res) => {
    try {
        const unit = await Unit.findOne({ where: { id: req.params.id } })
        if (!unit) {
            return apiResponse({
                statusCode: 404,
                message: 'Not Found',
                data: null
            }, res)
        }

        const newUnit = await unit.update({
            name: req.body.name,
            status: req.body.status
        })

        return apiResponse({
            statusCode: 201,
            message: 'Success',
            data: newUnit
        })
    } catch (error) {
        return apiResponse({
            statusCode: 400,
            message: error.message
        }, res)
    }
}

exports.deleteUnit = async (req, res) => {
    try {
        const unit = await Unit.findOne({ where: { id: req.params.id } })
        if (!unit) {
            return apiResponse({
                statusCode: 404,
                message: 'Not Found',
                data: null
            }, res)
        }

        await unit.destroy()

        return apiResponse({
            statusCode: 200,
            message: `Success delete product for id ${req.params.id}`,
            data: null
        })
    } catch (error) {
        return apiResponse({
            statusCode: 400,
            message: error.message
        }, res)
    }
}