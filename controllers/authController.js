const { User } = require('../models')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}

exports.register = async (req, res) => {
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

        const token = signToken(user.id);

        return res.status(201).json({
            status: 'Success',
            token: token,
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

exports.login = async (req, res) => {
    try {
        if (!req.body.email || !req.body.password) {
            return res.status(400).json({
                status: 'Fail',
                message: 'Error Validation',
                error: 'Email or Password cannot be empty, please fill it'
            })
        }

        const userData = await User.findOne({ where: { email: req.body.email } })
        if (!userData || !(await userData.CorrectPassword(req.body.password, userData.password))) {
            return res.status(400).json({
                status: 'Fail',
                message: 'Error Login',
                error: 'Invalid Email or Password'
            })
        }

        const token = signToken(userData.id);

        return res.status(201).json({
            status: 'Success',
            message: 'Login success',
            token: token,
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            status: 'Fail',
        })

    }
}