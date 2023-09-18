const { Category } = require('../models');
const { apiResponse } = require('../utils/response');

exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.findAll();

        return apiResponse({
            statusCode: 200,
            message: 'Success',
            data: categories,
        }, res)
    } catch (error) {
        return apiResponse({
            statusCode: 400,
            message: error.message,
        }, res)
    }
}

exports.getCategoryById = async (req, res) => {
    try {
        const categories = await Category.findByPk(req.params.id);
        if (!categories) {
            return apiResponse({
                statusCode: 404,
                message: 'Not Found',
                data: null,
            }, res)
        }

        return apiResponse({
            statusCode: 200,
            message: 'Success',
            data: categories,
        }, res)
    } catch (error) {
        return apiResponse({
            statusCode: 400,
            message: error.message,
        }, res)
    }
}

exports.storeCategory = async (req, res) => {
    try {
        const newCategory = await Category.create(
            { name: req.body.name, description: req.body.description }
        )

        return apiResponse({
            statusCode: 200,
            message: 'Success',
            data: newCategory,
        }, res)
    } catch (error) {
        return apiResponse({
            statusCode: 400,
            message: error.message,
        }, res)
    }
}

exports.updateCategory = async (req, res) => {
    try {
        await Category.update(req.body, {
            where: { id: req.params.id }
        })

        const newCtg = await Category.findByPk(req.params.id)
        if (!newCtg) {
            return apiResponse({
                statusCode: 404,
                message: 'Not Found',
                data: null,
            }, res)
        }

        return apiResponse({
            statusCode: 200,
            message: 'Success',
            data: newCtg,
        }, res)
    } catch (error) {
        return apiResponse({
            statusCode: 400,
            message: error.message,
        }, res)

    }
}

exports.destroyCategory = async (req, res) => {
    try {
        const ctg = await Category.findByPk(req.params.id)
        if (!newCtg) {
            return apiResponse({
                statusCode: 404,
                message: 'Not Found',
                data: null,
            }, res)
        }

        await ctg.destroy({
            where: { id: req.params.id }
        })

        return apiResponse({
            statusCode: 200,
            message: `Success delete category id ${req.params.id}`,
            data: null,
        }, res)
    } catch (error) {
        return apiResponse({
            statusCode: 400,
            message: error.message,
        }, res)
    }
}