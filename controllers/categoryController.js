const { Category } = require('../models');

module.exports = {
    getAllCategories: async (req, res) => {
        res.status(200).json({
            error: false,
            status: "success",
            message: "Success Get All Data",
            data: [
                {
                    id: 1,
                    name: "Category 1"
                },
                {
                    id: 2,
                    name: "Category 2"
                },
            ]
        })
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
    }
}