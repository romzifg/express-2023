const { Category } = require('../models');

module.exports = {
    getAllCategories: async (req, res) => {
        try {
            const categories = await Category.findAll();

            return res.status(200).json({
                status: 'Success',
                data: categories
            })
        } catch (error) {
            return res.status(400).json({
                status: 'Fail',
                error
            })
        }
    },

    getCategoryById: async (req, res) => {
        try {
            const categories = await Category.findByPk(req.params.id);

            if (!categories) {
                return res.status(404).json({
                    status: 'Not Found',
                    data: null
                })
            }

            return res.status(200).json({
                status: 'Success',
                data: categories
            })
        } catch (error) {
            return res.status(400).json({
                status: 'Fail',
                error
            })
        }
    },

    storeCategory: async (req, res) => {
        try {
            let { name, description } = req.body

            const newCategory = await Category.create(
                { name, description }
            )

            return res.status(201).json({
                status: 'Success',
                data: newCategory
            })

        } catch (error) {
            return res.status(400).json({
                status: 'Fail',
                error
            })
        }
    },

    updateCategory: async (req, res) => {
        try {
            const ctg = await Category.update(req.body, {
                where: { id: req.params.id }
            })

            const newCtg = await Category.findByPk(req.params.id)

            if (!newCtg) {
                return res.status(404).json({
                    status: 'Fail',
                    message: 'Not Found'
                })
            }

            return res.status(200).json({
                status: 'Success',
                data: newCtg
            })
        } catch (error) {
            return res.status(400).json({
                status: 'Fail',
                error
            })
        }
    },

    destroyCategory: async (req, res) => {
        try {
            const ctg = await Category.findByPk(req.params.id)
            if (!ctg) {
                return res.status(404).json({
                    status: 'Fail',
                    message: 'Not Found'
                })
            }

            await ctg.destroy({
                where: { id: req.params.id }
            })

            return res.status(200).json({
                status: 'Success',
                message: `Success delete category id ${req.params.id} `
            })
        } catch (error) {
            return res.status(400).json({
                status: 'Fail',
                error
            })
        }
    }
}