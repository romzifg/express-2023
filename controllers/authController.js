const { User } = require('../models')
const jwt = require('jsonwebtoken')
const { apiResponse } = require('../utils/response')
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

    return apiResponse({
        statusCode: 200,
        message: 'Success',
        data: user,
    }, res)
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
        return apiResponse({
            statusCode: 400,
            message: error.errors.map(err => err.message),
        }, res)
    }
}

exports.login = async (req, res) => {
    try {
        if (!req.body.email || !req.body.password) {
            return apiResponse({
                statusCode: 400,
                message: 'Error Validation, Email or Password cannot be empty',
            }, res)
        }

        const userData = await User.findOne({ where: { email: req.body.email } })
        if (!userData || !(await userData.CorrectPassword(req.body.password, userData.password))) {
            return apiResponse({
                statusCode: 400,
                message: 'Invalid Email Or Password',
            }, res)
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

    return apiResponse({
        statusCode: 200,
        message: 'User Logout',
        data: null,
    }, res)
}

exports.getCurrentUser = async (req, res) => {
    const currentUser = await User.findByPk(req.user.id)

    if (currentUser) {
        return apiResponse({
            statusCode: 200,
            message: 'Success',
            data: {
                id: currentUser.id,
                name: currentUser.name,
                email: currentUser.email,
                role_id: currentUser.role_id
            },
        }, res)
    }

    return apiResponse({
        statusCode: 404,
        message: 'Not Found, Invalid token',
        data: null
    }, res)
}