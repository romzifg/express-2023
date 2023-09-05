const { User } = require('../models')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user.id)
    const cookieOption = {
        expiresIn: new Date(
            Date.now() + (process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000)
        ),
        httpOnly: true
    }

    res.cookie('jwt', token, cookieOption)

    user.password = undefined

    res.status(statusCode).json({
        status: statusCode,
        message: 'Success',
        user
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

        createSendToken(user, 201, res)
    } catch (error) {
        return res.status(400).json({
            status: 400,
            message: 'Fail',
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

        createSendToken(userData, 200, res)
    } catch (error) {
        return res.status(400).json({
            status: 400,
            message: 'Fail',
            error: error.message
        })

    }
}

exports.logoutUser = async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expiresIn: new Date(0)
    })

    res.status(200).json({
        status: 200,
        message: "User Logout"
    })
}