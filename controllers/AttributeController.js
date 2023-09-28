const { Attribute } = require('../models');
const { apiResponse } = require('../utils/response');

exports.getAttribute = async (req, res) => {
    try {
        const attribute = await Attribute.findAll()

        return apiResponse({
            statusCode: 200,
            message: 'Success',
            data: attribute
        }, res)
    } catch (error) {
        return apiResponse({
            statusCode: 400,
            message: error.message
        }, res)
    }
}

exports.createAttribute = async (req, res) => {
    try {
        const attribute = await Attribute.create({
            name: req.body.name,
            status: true
        })

        return apiResponse({
            statusCode: 201,
            message: 'Success',
            data: attribute
        })
    } catch (error) {
        return apiResponse({
            statusCode: 400,
            message: error.message
        }, res)
    }
}

exports.updateAttribute = async (req, res) => {
    try {
        const attribute = await Attribute.findOne({ where: { id: req.params.id } })
        if (!attribute) {
            return apiResponse({
                statusCode: 404,
                message: 'Not Found',
                data: null
            }, res)
        }

        const newAttribute = await attribute.update({
            name: req.body.name,
            status: req.body.status
        })

        return apiResponse({
            statusCode: 201,
            message: 'Success',
            data: newAttribute
        })
    } catch (error) {
        return apiResponse({
            statusCode: 400,
            message: error.message
        }, res)
    }
}

exports.deleteAttribute = async (req, res) => {
    try {
        const attribute = await Attribute.findOne({ where: { id: req.params.id } })
        if (!attribute) {
            return apiResponse({
                statusCode: 404,
                message: 'Not Found',
                data: null
            }, res)
        }

        await attribute.destroy()

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