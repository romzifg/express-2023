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
        let name = req.body.name
        let description = req.body.description

        if (!name && !description) {
            return res.status(400).json({
                error: true,
                status: 'fail',
                message: "name and description is empty"
            })
        }

        return res.status(200).json({
            error: false,
            status: 'success',
            message: `Name: ${name}, Description: ${description}`
        })
    }
}