const { User } = require('../models')

module.exports = {
    register: async (req, res) => {
        try {
            const { name, email, password, passwordConfirm } = req.body

            if (password !== passwordConfirm) {
                return res.status(400).json({
                    status: 'Fail',
                    message: 'password is not match'
                })
            }

            const user = await User.create({
                name, email, password
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
                error
            })
        }
    }
}