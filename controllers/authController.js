const { User } = require('../models')

module.exports = {
    register: async (req, res) => {
        try {
            if (req.body.password !== req.body.passwordConfirm) {
                return res.status(400).json({
                    status: 'Fail',
                    message: 'Validation Error',
                    error: ['password is not match']
                })
            }

            const user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            })

            delete user.password
            return res.status(201).json({
                status: 'Success',
                data: user
            })
        } catch (error) {
            console.log(error)
            return res.status(400).json({
                status: 'Fail',
                error: error.errors.map(err => err.message)
            })
        }
    }
}