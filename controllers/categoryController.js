const { Category } = require('../models');

exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.findAll();

        return res.status(200).json({
            status: 200,
            message: 'Success',
            data: categories
        })
    } catch (error) {
        return res.status(400).json({
            status: 400,
            message: 'Fail',
            error: error.message
        })
    }
}

exports.getCategoryById = async (req, res) => {
    try {
        const categories = await Category.findByPk(req.params.id);

        if (!categories) {
            return res.status(404).json({
                status: 404,
                message: 'Not Found',
                data: null
            })
        }

        return res.status(200).json({
            status: 200,
            message: 'Success',
            data: categories
        })
    } catch (error) {
        return res.status(400).json({
            status: 400,
            message: 'Fail',
            error: error.message
        })
    }
}

exports.storeCategory = async (req, res) => {
    try {
        let { name, description } = req.body

        const newCategory = await Category.create(
            { name, description }
        )

        return res.status(201).json({
            status: 201,
            message: 'Success',
            data: newCategory
        })

    } catch (error) {
        return res.status(400).json({
            status: 400,
            message: 'Fail',
            error: error.message
        })
    }
}

exports.updateCategory = async (req, res) => {
    try {
        await Category.update(req.body, {
            where: { id: req.params.id }
        })

        const newCtg = await Category.findByPk(req.params.id)

        if (!newCtg) {
            return res.status(404).json({
                status: 404,
                message: 'Not Found'
            })
        }

        return res.status(200).json({
            status: 200,
            message: 'Success',
            data: newCtg
        })
    } catch (error) {
        return res.status(400).json({
            status: 400,
            message: 'Fail',
            error: error.message
        })
    }
}

exports.destroyCategory = async (req, res) => {
    try {
        const ctg = await Category.findByPk(req.params.id)
        if (!ctg) {
            return res.status(404).json({
                status: 404,
                message: 'Not Found'
            })
        }

        await ctg.destroy({
            where: { id: req.params.id }
        })

        return res.status(200).json({
            status: 200,
            message: `Success delete category id ${req.params.id}`
        })
    } catch (error) {
        return res.status(400).json({
            status: 400,
            message: 'Fail',
            error: error.message
        })
    }
}